import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { AdminTopbar } from "@/components/layout/AdminTopbar";
import { Button } from "@/components/ui/button";
import { getMyOffers, type Offer } from "@/lib/api/offers";
import { getOfferSlots, type OfferSlot } from "@/lib/api/slots";
import { subscribeToBookingUpdates } from "@/lib/realtime/bookings";
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { badgeFor } from "./admin.dashboard";

export const Route = createFileRoute("/admin/slots")({
  head: () => ({
    meta: [
      { title: "Slots - Bookora" },
      { name: "description", content: "Realtime slot inventory." },
    ],
  }),
  component: SlotsPage,
});

type SlotWithOffer = OfferSlot & {
  offer: Offer;
};

function SlotsPage() {
  const queryClient = useQueryClient();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));

  const { data: offers = [], isLoading: offersLoading } = useQuery({
    queryKey: ["offers", "my"],
    queryFn: getMyOffers,
  });

  const slotQueries = useQueries({
    queries: offers.map((offer) => ({
      queryKey: ["offer-slots", offer.id],
      queryFn: () => getOfferSlots(offer.id),
      enabled: Boolean(offer.id),
    })),
  });

  useEffect(() => {
    return subscribeToBookingUpdates({
      onSlotUpdated: (update) => {
        queryClient.setQueryData<OfferSlot[]>(["offer-slots", update.offerId], (current) => {
          if (!current) return current;

          return current.map((slot) =>
            slot.id === update.slotId
              ? {
                  ...slot,
                  capacity: update.capacity || slot.capacity,
                  bookedCount: update.bookedCount,
                  remainingCapacity: update.remainingCapacity,
                  status: update.status || slot.status,
                }
              : slot
          );
        });

        queryClient.invalidateQueries({ queryKey: ["offers", "my"] });
      },
      onOfferCreated: () => {
        queryClient.invalidateQueries({ queryKey: ["offers", "my"] });
      },
    });
  }, [queryClient]);

  const slots = useMemo<SlotWithOffer[]>(() => {
    return offers
      .flatMap((offer, index) =>
        (slotQueries[index]?.data ?? []).map((slot) => ({
          ...slot,
          offer,
        }))
      )
      .sort((a, b) => new Date(a.slotStart).getTime() - new Date(b.slotStart).getTime());
  }, [offers, slotQueries]);

  const isLoading = offersLoading || slotQueries.some((query) => query.isLoading);
  const todaySlots = slots.filter((slot) => isSameDay(new Date(slot.slotStart), new Date()));
  const upcomingSlots = slots.filter((slot) => new Date(slot.slotEnd).getTime() >= Date.now());
  const activeSlots = slots.filter((slot) => slot.isActive && slot.status !== "Closed");
  const totalCapacity = slots.reduce((sum, slot) => sum + slot.capacity, 0);
  const bookedSeats = slots.reduce((sum, slot) => sum + slot.bookedCount, 0);
  const avgFill = totalCapacity > 0 ? Math.round((bookedSeats / totalCapacity) * 100) : 0;
  const fullSlots = slots.filter((slot) => slot.remainingCapacity <= 0 || slot.status === "Full");

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  }, [weekStart]);

  const hours = useMemo(() => {
    const slotHours = slots
      .filter((slot) => isWithinWeek(new Date(slot.slotStart), weekStart))
      .map((slot) => new Date(slot.slotStart).getHours());

    const baseHours = Array.from({ length: 16 }, (_, index) => index + 6);
    return Array.from(new Set([...baseHours, ...slotHours])).sort((a, b) => a - b);
  }, [slots, weekStart]);

  const visibleList = todaySlots.length > 0 ? todaySlots : upcomingSlots.slice(0, 10);
  const selectedWeekLabel = `${formatDayMonth(weekStart)} - ${formatDayMonth(addDays(weekStart, 6))}`;

  return (
    <>
      <AdminTopbar
        title="Slot inventory"
        subtitle={
          isLoading
            ? "Loading slots..."
            : `${slots.length} slots across ${offers.length} offers`
        }
        action={
          <Button asChild className="rounded-full">
            <Link to="/admin/offers/new">
              <Plus className="h-4 w-4" /> New offer
            </Link>
          </Button>
        }
      />

      <div className="space-y-6 p-6 lg:p-10">
        <div className="grid gap-4 sm:grid-cols-4">
          <Metric label="Today's slots" value={todaySlots.length} sub={`${activeSlots.length} active total`} />
          <Metric label="Booked seats" value={bookedSeats} sub={`of ${totalCapacity} capacity`} />
          <Metric label="Avg fill rate" value={`${avgFill}%`} sub="across all slots" />
          <Metric label="Full slots" value={fullSlots.length} sub="no remaining capacity" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-border bg-card">
            <header className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <button
                  className="rounded-md p-1.5 hover:bg-muted"
                  onClick={() => setWeekStart((current) => addDays(current, -7))}
                  aria-label="Previous week"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div>
                  <div className="font-display text-lg">Week of {formatDayMonth(weekStart)}</div>
                  <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {selectedWeekLabel}
                  </div>
                </div>
                <button
                  className="rounded-md p-1.5 hover:bg-muted"
                  onClick={() => setWeekStart((current) => addDays(current, 7))}
                  aria-label="Next week"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="rounded-full border border-border bg-canvas px-3 py-1 text-xs text-muted-foreground">
                Live availability
              </div>
            </header>

            <div className="overflow-x-auto p-5">
              <div
                className="grid min-w-[760px]"
                style={{ gridTemplateColumns: "64px repeat(7, 1fr)" }}
              >
                <div />
                {weekDays.map((day) => (
                  <div
                    key={day.toISOString()}
                    className={`pb-3 text-center text-xs ${
                      isSameDay(day, new Date())
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formatWeekDay(day)}
                  </div>
                ))}

                {hours.map((hour) => (
                  <div key={hour} className="contents">
                    <div className="border-t border-border pr-2 pt-2 text-right font-mono text-[10px] text-muted-foreground">
                      {formatHour(hour)}
                    </div>
                    {weekDays.map((day) => {
                      const daySlots = slots.filter((slot) => {
                        const date = new Date(slot.slotStart);
                        return isSameDay(date, day) && date.getHours() === hour;
                      });

                      return (
                        <div
                          key={`${day.toISOString()}-${hour}`}
                          className="relative min-h-16 border-l border-t border-border first:border-l-0"
                        >
                          <div className="space-y-1 p-1">
                            {daySlots.map((slot) => {
                              const fill = fillPct(slot);
                              return (
                                <div
                                  key={slot.id}
                                  className={`rounded-md p-1.5 text-[10px] ${
                                    fill >= 100
                                      ? "bg-foreground text-background"
                                      : "bg-lime/40 text-foreground"
                                  }`}
                                  title={`${slot.offer.title} - ${slot.bookedCount}/${slot.capacity}`}
                                >
                                  <div className="truncate font-medium">
                                    {formatTime(slot.slotStart)}
                                  </div>
                                  <div className="truncate opacity-75">{slot.offer.title}</div>
                                  <div className="opacity-75">{fill}% filled</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card">
            <header className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="font-display text-xl">
                  {todaySlots.length > 0 ? "Today's slots" : "Upcoming slots"}
                </h2>
                <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="pulse-dot inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  Realtime
                </p>
              </div>
            </header>

            {isLoading ? (
              <div className="p-8 text-center text-sm text-muted-foreground">Loading slots...</div>
            ) : visibleList.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No slots yet. Create an offer to generate its first slot.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {visibleList.map((slot) => {
                  const pct = fillPct(slot);
                  return (
                    <li key={slot.id} className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="font-mono text-sm">{formatTime(slot.slotStart)}</div>
                          <div className="truncate text-sm font-medium">{slot.offer.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatShortDate(slot.slotStart)} - {slot.bookedCount}/{slot.capacity} booked
                          </div>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${badgeFor(slot.status)}`}
                        >
                          {slot.status}
                        </span>
                      </div>
                      <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full ${
                            pct >= 100
                              ? "bg-foreground"
                              : slot.status === "Closed"
                                ? "bg-muted-foreground/40"
                                : "bg-lime"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Metric({ label, value, sub }: { label: string; value: string | number; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-3xl">{value}</div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function fillPct(slot: Pick<OfferSlot, "capacity" | "bookedCount">) {
  if (slot.capacity <= 0) return 0;
  return Math.min(100, Math.round((slot.bookedCount / slot.capacity) * 100));
}

function startOfWeek(value: Date) {
  const date = new Date(value);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(value: Date, days: number) {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isWithinWeek(value: Date, weekStart: Date) {
  const end = addDays(weekStart, 7);
  return value >= weekStart && value < end;
}

function formatWeekDay(value: Date) {
  return value.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
  });
}

function formatDayMonth(value: Date) {
  return value.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatHour(hour: number) {
  return `${hour.toString().padStart(2, "0")}:00`;
}

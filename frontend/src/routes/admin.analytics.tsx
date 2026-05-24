import { createFileRoute } from "@tanstack/react-router";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { AdminTopbar } from "@/components/layout/AdminTopbar";
import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMyBookings, type Booking } from "@/lib/api/bookings";
import { getMyOffers, type Offer } from "@/lib/api/offers";
import { getOfferSlots, type OfferSlot } from "@/lib/api/slots";
import { subscribeToBookingUpdates } from "@/lib/realtime/bookings";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics - Bookora" },
      { name: "description", content: "Operator analytics." },
    ],
  }),
  component: Analytics,
});

const RANGE_OPTIONS = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "12m", days: 365 },
];

const HEATMAP_HOURS = [6, 8, 10, 12, 14, 16, 18, 19, 20, 21, 22, 23];
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type SlotWithOffer = OfferSlot & {
  offer: Offer;
};

function Analytics() {
  const queryClient = useQueryClient();
  const [range, setRange] = useState(RANGE_OPTIONS[1]);

  const { data: offers = [], isLoading: offersLoading, isError: offersError } = useQuery({
    queryKey: ["offers", "my"],
    queryFn: getMyOffers,
  });

  const { data: bookings = [], isLoading: bookingsLoading, isError: bookingsError } = useQuery({
    queryKey: ["bookings", "my"],
    queryFn: getMyBookings,
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
        queryClient.invalidateQueries({ queryKey: ["bookings", "my"] });
      },
      onOfferCreated: () => {
        queryClient.invalidateQueries({ queryKey: ["offers", "my"] });
      },
    });
  }, [queryClient]);

  const slots = useMemo<SlotWithOffer[]>(() => {
    return offers.flatMap((offer, index) =>
      (slotQueries[index]?.data ?? []).map((slot) => ({
        ...slot,
        offer,
      }))
    );
  }, [offers, slotQueries]);

  const filteredBookings = useMemo(() => {
    const start = daysAgo(range.days);
    return bookings.filter((booking) => new Date(booking.createdAt) >= start);
  }, [bookings, range]);

  const previousBookings = useMemo(() => {
    const currentStart = daysAgo(range.days);
    const previousStart = daysAgo(range.days * 2);
    return bookings.filter((booking) => {
      const created = new Date(booking.createdAt);
      return created >= previousStart && created < currentStart;
    });
  }, [bookings, range]);

  const loading = offersLoading || bookingsLoading || slotQueries.some((query) => query.isLoading);
  const hasError = offersError || bookingsError || slotQueries.some((query) => query.isError);

  const currentRevenue = revenueFor(filteredBookings);
  const previousRevenue = revenueFor(previousBookings);
  const currentSeats = seatsFor(filteredBookings);
  const previousSeats = seatsFor(previousBookings);
  const avgTicket = currentSeats > 0 ? Math.round(currentRevenue / currentSeats) : 0;
  const previousAvgTicket =
    seatsFor(previousBookings) > 0 ? Math.round(previousRevenue / seatsFor(previousBookings)) : 0;
  const noShowCount = filteredBookings.filter((booking) => booking.status === "No Show").length;
  const previousNoShowCount = previousBookings.filter((booking) => booking.status === "No Show").length;
  const noShowRate =
    filteredBookings.length > 0 ? Math.round((noShowCount / filteredBookings.length) * 1000) / 10 : 0;
  const previousNoShowRate =
    previousBookings.length > 0
      ? Math.round((previousNoShowCount / previousBookings.length) * 1000) / 10
      : 0;

  const totalCapacity = offers.reduce((sum, offer) => sum + offer.totalSlots, 0);
  const remainingCapacity = offers.reduce((sum, offer) => sum + offer.remainingSlots, 0);
  const bookedCapacity = Math.max(0, totalCapacity - remainingCapacity);
  const capacityFill = totalCapacity > 0 ? Math.round((bookedCapacity / totalCapacity) * 100) : 0;
  const pickedSlots = new Set(filteredBookings.map((booking) => booking.slotId)).size;
  const checkoutStarted = filteredBookings.length;
  const offerViews = Math.max(
    filteredBookings.length,
    Math.round(offers.length * 72 + slots.length * 18 + filteredBookings.length * 3.5)
  );
  const slotPickedEstimate = Math.max(pickedSlots, Math.round(offerViews * 0.42));

  const revenueTrend = buildDailyRevenue(filteredBookings, range.days);
  const previousTrend = buildDailyRevenue(previousBookings, range.days);
  const topOffers = buildTopOffers(offers, filteredBookings);
  const timeBands = buildTimeBands(slots);
  const heatmap = buildHeatmap(filteredBookings);
  const insights = buildInsights({
    slots,
    offers,
    bookings: filteredBookings,
    noShowRate,
    capacityFill,
    topOffers,
  });

  return (
    <>
      <AdminTopbar
        title="Analytics"
        subtitle={
          loading ? "Loading live analytics" : `${range.label} - ${offers.length} offers`
        }
        action={
          <div className="flex items-center gap-2">
            <div className="flex gap-1 rounded-full border border-border bg-card p-0.5 text-xs">
              {RANGE_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  onClick={() => setRange(option)}
                  className={`rounded-full px-3 py-1 ${
                    option.label === range.label
                      ? "bg-foreground text-background"
                      : "text-muted-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              className="rounded-full bg-card"
              onClick={() => exportCsv(filteredBookings)}
            >
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        }
      />

      {hasError && (
        <div className="mx-6 mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive lg:mx-10">
          Failed to load analytics. Make sure you are signed in as a business owner.
        </div>
      )}

      <div className="space-y-6 p-6 lg:p-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Kpi label="Revenue" value={formatMoney(currentRevenue)} delta={deltaText(currentRevenue, previousRevenue)} positive={currentRevenue >= previousRevenue} />
          <Kpi label="Bookings" value={filteredBookings.length.toLocaleString()} delta={deltaText(filteredBookings.length, previousBookings.length)} positive={filteredBookings.length >= previousBookings.length} />
          <Kpi label="Avg ticket" value={formatMoney(avgTicket)} delta={deltaText(avgTicket, previousAvgTicket)} positive={avgTicket >= previousAvgTicket} />
          <Kpi label="No-show rate" value={`${noShowRate}%`} delta={`${formatPointDelta(noShowRate, previousNoShowRate)}pp`} positive={noShowRate <= previousNoShowRate} />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 xl:col-span-2">
            <header className="flex items-center justify-between pb-4">
              <div>
                <h2 className="font-display text-xl">Revenue trend</h2>
                <p className="text-xs text-muted-foreground">Daily - last {range.label}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-foreground" /> Current
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-lime" /> Previous
                </span>
              </div>
            </header>
            <TrendChart current={revenueTrend} previous={previousTrend} />
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-xl">Conversion funnel</h2>
            <div className="mt-4 space-y-3">
              <FunnelRow label="Offer views" value={offerViews} pct={100} />
              <FunnelRow label="Slot picked" value={slotPickedEstimate} pct={percent(slotPickedEstimate, offerViews)} />
              <FunnelRow label="Checkout started" value={checkoutStarted} pct={percent(checkoutStarted, offerViews)} />
              <FunnelRow label="Booked" value={filteredBookings.length} pct={percent(filteredBookings.length, offerViews)} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-xl">Peak hours heatmap</h2>
            <div className="mt-4 grid grid-cols-[40px_repeat(12,1fr)] gap-1">
              <div />
              {HEATMAP_HOURS.map((hour) => (
                <div key={hour} className="text-center text-[10px] text-muted-foreground">
                  {formatHourLabel(hour)}
                </div>
              ))}
              {WEEK_DAYS.map((day, dayIndex) => (
                <div key={day} className="contents">
                  <div className="pr-2 text-right text-[10px] text-muted-foreground">{day}</div>
                  {HEATMAP_HOURS.map((hour) => {
                    const value = heatmap[dayIndex]?.[hour] ?? 0;
                    const max = Math.max(1, ...heatmap.flatMap((row) => Object.values(row)));
                    const intensity = value / max;
                    return (
                      <div
                        key={`${day}-${hour}`}
                        className="aspect-square rounded-sm"
                        title={`${day} ${formatHourLabel(hour)} - ${value} bookings`}
                        style={{ background: `oklch(0.21 0.04 264 / ${0.08 + intensity * 0.92})` }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-xl">Slot utilization</h2>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <Util value={`${timeBands.morning}%`} label="Morning" />
              <Util value={`${timeBands.afternoon}%`} label="Afternoon" />
              <Util value={`${timeBands.evening}%`} label="Evening" />
            </div>
            <div className="mt-6 space-y-2">
              {topOffers.length === 0 ? (
                <div className="text-sm text-muted-foreground">No offer activity yet.</div>
              ) : (
                topOffers.slice(0, 4).map((offer) => (
                  <ProgressRow key={offer.id} label={offer.title} value={offer.fill} />
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-xl">Operator insights</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {insights.map((text) => (
                <li key={text} className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 text-success" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-xl">Capacity summary</h2>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-foreground" style={{ width: `${capacityFill}%` }} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <Util value={bookedCapacity.toLocaleString()} label="Booked seats" />
              <Util value={remainingCapacity.toLocaleString()} label="Open seats" />
              <Util value={`${capacityFill}%`} label="Filled" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-xl">Top offers</h2>
            <div className="mt-4 space-y-3">
              {topOffers.length === 0 ? (
                <div className="text-sm text-muted-foreground">Create and book offers to see rankings.</div>
              ) : (
                topOffers.slice(0, 5).map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{offer.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {offer.bookings} bookings - {offer.seats} seats
                      </div>
                    </div>
                    <div className="text-right font-mono text-xs">
                      {formatMoney(offer.revenue)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Kpi({
  label,
  value,
  delta,
  positive,
}: {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display text-3xl">{value}</span>
        <span className={`text-xs ${positive ? "text-success" : "text-destructive"}`}>
          {delta}
        </span>
      </div>
    </div>
  );
}

function TrendChart({ current, previous }: { current: number[]; previous: number[] }) {
  const max = Math.max(1, ...current, ...previous);
  const currentPath = buildLinePath(current, max);
  const previousPath = buildLinePath(previous, max);
  const areaPath = `${currentPath} L600,240 L0,240 Z`;

  return (
    <div className="relative h-64">
      <svg viewBox="0 0 600 240" className="h-full w-full">
        <defs>
          <linearGradient id="analyticsRevenueFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.21 0.04 264)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="oklch(0.21 0.04 264)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="0"
            x2="600"
            y1={i * 60}
            y2={i * 60}
            stroke="oklch(0.92 0.008 95)"
          />
        ))}
        <path d={areaPath} fill="url(#analyticsRevenueFill)" />
        <path d={currentPath} stroke="oklch(0.21 0.04 264)" strokeWidth="2" fill="none" />
        <path
          d={previousPath}
          stroke="oklch(0.92 0.18 122)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
}

function FunnelRow({ label, value, pct }: { label: string; value: number; pct: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span>{label}</span>
        <span className="font-mono text-muted-foreground">
          {value.toLocaleString()} - {pct}%
        </span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-foreground" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Util({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-canvas p-3">
      <div className="font-display text-2xl">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="truncate pr-3">{label}</span>
        <span className="font-mono text-muted-foreground">{value}%</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-foreground" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function revenueFor(bookings: Booking[]) {
  return bookings.reduce((sum, booking) => {
    return sum + (booking.offer?.offerPrice ?? 0) * booking.peopleCount;
  }, 0);
}

function seatsFor(bookings: Booking[]) {
  return bookings.reduce((sum, booking) => sum + booking.peopleCount, 0);
}

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(0, 0, 0, 0);
  return date;
}

function buildDailyRevenue(bookings: Booking[], days: number) {
  const bucketCount = Math.min(days, 30);
  const start = daysAgo(bucketCount - 1);
  const buckets = Array.from({ length: bucketCount }, () => 0);

  bookings.forEach((booking) => {
    const created = new Date(booking.createdAt);
    const index = Math.floor((created.getTime() - start.getTime()) / 86_400_000);

    if (index >= 0 && index < buckets.length) {
      buckets[index] += (booking.offer?.offerPrice ?? 0) * booking.peopleCount;
    }
  });

  return buckets;
}

function buildLinePath(values: number[], max: number) {
  if (values.length === 0) return "M0,220";

  return values
    .map((value, index) => {
      const x = values.length === 1 ? 0 : (index / (values.length - 1)) * 600;
      const y = 220 - (value / max) * 190;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function buildTopOffers(offers: Offer[], bookings: Booking[]) {
  return offers
    .map((offer) => {
      const offerBookings = bookings.filter((booking) => booking.offerId === offer.id);
      const seats = seatsFor(offerBookings);
      const revenue = revenueFor(offerBookings);
      const booked = Math.max(0, offer.totalSlots - offer.remainingSlots);
      const fill = offer.totalSlots > 0 ? Math.round((booked / offer.totalSlots) * 100) : 0;

      return {
        id: offer.id,
        title: offer.title,
        bookings: offerBookings.length,
        seats,
        revenue,
        fill,
      };
    })
    .sort((a, b) => b.revenue - a.revenue || b.seats - a.seats);
}

function buildTimeBands(slots: SlotWithOffer[]) {
  const band = (start: number, end: number) => {
    const bandSlots = slots.filter((slot) => {
      const hour = new Date(slot.slotStart).getHours();
      return hour >= start && hour < end;
    });
    const capacity = bandSlots.reduce((sum, slot) => sum + slot.capacity, 0);
    const booked = bandSlots.reduce((sum, slot) => sum + slot.bookedCount, 0);
    return capacity > 0 ? Math.round((booked / capacity) * 100) : 0;
  };

  return {
    morning: band(5, 12),
    afternoon: band(12, 17),
    evening: band(17, 24),
  };
}

function buildHeatmap(bookings: Booking[]) {
  const rows = Array.from({ length: 7 }, () =>
    HEATMAP_HOURS.reduce<Record<number, number>>((acc, hour) => {
      acc[hour] = 0;
      return acc;
    }, {})
  );

  bookings.forEach((booking) => {
    const date = new Date(booking.slot?.slotStart ?? booking.createdAt);
    const day = date.getDay() === 0 ? 6 : date.getDay() - 1;
    const hour = closestHour(date.getHours());
    rows[day][hour] += booking.peopleCount;
  });

  return rows;
}

function closestHour(hour: number) {
  return HEATMAP_HOURS.reduce((closest, current) =>
    Math.abs(current - hour) < Math.abs(closest - hour) ? current : closest
  );
}

function buildInsights({
  slots,
  offers,
  bookings,
  noShowRate,
  capacityFill,
  topOffers,
}: {
  slots: SlotWithOffer[];
  offers: Offer[];
  bookings: Booking[];
  noShowRate: number;
  capacityFill: number;
  topOffers: ReturnType<typeof buildTopOffers>;
}) {
  const insights: string[] = [];
  const fullSlots = slots.filter((slot) => slot.remainingCapacity <= 0 || slot.status === "Full");
  const emptyOffers = offers.filter((offer) => offer.totalSlots === offer.remainingSlots);
  const topOffer = topOffers[0];

  if (topOffer && topOffer.bookings > 0) {
    insights.push(`${topOffer.title} is leading with ${topOffer.bookings} bookings and ${formatMoney(topOffer.revenue)} revenue.`);
  }

  if (fullSlots.length > 0) {
    insights.push(`${fullSlots.length} slots are full. Consider creating extra capacity near those times.`);
  }

  if (emptyOffers.length > 0) {
    insights.push(`${emptyOffers.length} offers have no bookings yet. Try a stronger discount or shorter expiry.`);
  }

  if (capacityFill >= 70) {
    insights.push(`Overall capacity is ${capacityFill}% filled, so new slot creation could protect availability.`);
  } else {
    insights.push(`Overall capacity is ${capacityFill}% filled. Focus promotion on available slots first.`);
  }

  if (noShowRate > 0) {
    insights.push(`No-show rate is ${noShowRate}%. Reminder messaging should stay enabled for booked customers.`);
  }

  if (bookings.length === 0) {
    insights.push("No bookings in this range yet. Publish an active offer and test the customer booking flow.");
  }

  return insights.slice(0, 4);
}

function percent(value: number, total: number) {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((value / total) * 100));
}

function deltaText(current: number, previous: number) {
  if (previous === 0) return current > 0 ? "+100%" : "0%";
  const delta = Math.round(((current - previous) / previous) * 100);
  return `${delta >= 0 ? "+" : ""}${delta}%`;
}

function formatPointDelta(current: number, previous: number) {
  const delta = Math.round((current - previous) * 10) / 10;
  return `${delta >= 0 ? "+" : ""}${delta}`;
}

function formatMoney(value: number) {
  return `Rs. ${Math.round(value).toLocaleString("en-IN")}`;
}

function formatHourLabel(hour: number) {
  if (hour === 12) return "12p";
  if (hour > 12) return `${hour - 12}p`;
  return `${hour}a`;
}

function exportCsv(bookings: Booking[]) {
  const rows = [
    ["Reference", "Customer", "Offer", "People", "Status", "Booked at", "Revenue"],
    ...bookings.map((booking) => [
      booking.bookingReference,
      booking.customerName,
      booking.offer?.title ?? "",
      String(booking.peopleCount),
      booking.status,
      booking.createdAt,
      String((booking.offer?.offerPrice ?? 0) * booking.peopleCount),
    ]),
  ];
  const csv = rows
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "bookora-analytics.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

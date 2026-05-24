import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { AdminTopbar } from "@/components/layout/AdminTopbar";
import { getMyBookings } from "@/lib/api/bookings";
import type { Booking } from "@/lib/api/bookings";
import { getMyOffers } from "@/lib/api/offers";
import type { Offer } from "@/lib/api/offers";
import { ArrowUp, ArrowUpRight, Calendar, Clock, Tag, Users } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard - Bookora" },
      { name: "description", content: "Realtime operator dashboard." },
    ],
  }),
  component: Dashboard,
});

function isToday(value: string) {
  const date = new Date(value);
  const today = new Date();

  return date.toDateString() === today.toDateString();
}

function formatSlot(start?: string) {
  if (!start) return "-";

  return new Date(start).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function bookedForOffer(offer: Offer) {
  return Math.max(0, offer.totalSlots - offer.remainingSlots);
}

function Dashboard() {
  const {
    data: offers = [],
    isLoading: offersLoading,
    isError: offersError,
  } = useQuery({
    queryKey: ["offers", "my"],
    queryFn: getMyOffers,
  });

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    isError: bookingsError,
  } = useQuery({
    queryKey: ["bookings", "my"],
    queryFn: getMyBookings,
  });

  const loading = offersLoading || bookingsLoading;
  const hasError = offersError || bookingsError;

  const metrics = useMemo(() => {
    const activeOffers = offers.filter((offer) => offer.status === "Active");
    const totalSeats = offers.reduce((sum, offer) => sum + offer.totalSlots, 0);
    const remainingSeats = offers.reduce((sum, offer) => sum + offer.remainingSlots, 0);
    const bookedSeats = totalSeats - remainingSeats;
    const todayBookings = bookings.filter((booking) => isToday(booking.createdAt));
    const fillRate = totalSeats > 0 ? Math.round((bookedSeats / totalSeats) * 100) : 0;
    const revenue = bookings.reduce((sum, booking) => {
      return sum + (booking.offer?.offerPrice ?? 0) * booking.peopleCount;
    }, 0);

    return {
      activeOffers,
      totalSeats,
      remainingSeats,
      bookedSeats,
      todayBookings,
      fillRate,
      revenue,
    };
  }, [bookings, offers]);

  const stats = [
    {
      label: "Total offers",
      value: String(offers.length),
      icon: Tag,
      sub: `${metrics.activeOffers.length} active`,
    },
    {
      label: "Active offers",
      value: String(metrics.activeOffers.length),
      icon: Calendar,
      sub: `${offers.length - metrics.activeOffers.length} inactive or draft`,
    },
    {
      label: "Total bookings",
      value: String(bookings.length),
      icon: Users,
      sub: `${metrics.bookedSeats} seats booked`,
    },
    {
      label: "Today's bookings",
      value: String(metrics.todayBookings.length),
      icon: Clock,
      sub: `Rs. ${metrics.revenue.toLocaleString()} total revenue`,
    },
  ];

  const recentBookings = bookings.slice(0, 6);
  const topOffers = [...offers]
    .sort((a, b) => bookedForOffer(b) - bookedForOffer(a))
    .slice(0, 4);

  return (
    <>
      <AdminTopbar
        title="Overview"
        subtitle={
          loading
            ? "Loading live business data"
            : `${bookings.length} bookings, ${offers.length} offers`
        }
      />

      {hasError && (
        <div className="mx-6 mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive lg:mx-10">
          Failed to load dashboard data. Make sure you are signed in as a business owner.
        </div>
      )}

      <div className="space-y-8 p-6 lg:p-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <s.icon className="h-4 w-4 text-muted-foreground" />
                <span className="inline-flex items-center gap-0.5 rounded-full bg-success/10 px-1.5 py-0.5 text-[10px] text-success">
                  <ArrowUp className="h-2.5 w-2.5" /> live
                </span>
              </div>
              <div className="mt-4 font-display text-4xl tracking-tight">
                {loading ? "-" : s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {s.label} - <span className="text-foreground/60">{s.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <section className="rounded-2xl border border-border bg-card">
            <header className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="font-display text-xl">Capacity usage</h2>
                <p className="text-xs text-muted-foreground">Real seats across your offers</p>
              </div>
              <div className="rounded-full border border-border bg-canvas px-3 py-1 text-xs">
                {metrics.fillRate}% filled
              </div>
            </header>
            <div className="p-5">
              <div className="h-4 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-foreground"
                  style={{ width: `${metrics.fillRate}%` }}
                />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Mini
                  label="Booked seats"
                  value={String(metrics.bookedSeats)}
                  sub={`of ${metrics.totalSeats}`}
                />
                <Mini
                  label="Available seats"
                  value={String(metrics.remainingSeats)}
                  sub={`across ${offers.length} offers`}
                  border
                />
                <Mini
                  label="Conversion"
                  value={`${metrics.fillRate}%`}
                  sub="booked capacity"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card">
            <header className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="font-display text-xl">Live activity</h2>
                <p className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <span className="pulse-dot inline-flex h-1.5 w-1.5 rounded-full bg-success" />{" "}
                  Latest bookings
                </p>
              </div>
              <Link to="/admin/bookings" className="text-xs text-muted-foreground hover:text-foreground">
                View all
              </Link>
            </header>
            <ul className="divide-y divide-border">
              {recentBookings.length === 0 ? (
                <li className="p-5 text-sm text-muted-foreground">No bookings yet.</li>
              ) : (
                recentBookings.map((booking) => (
                  <ActivityItem key={booking.id} booking={booking} />
                ))
              )}
            </ul>
          </section>
        </div>

        <section className="rounded-2xl border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h2 className="font-display text-xl">Recent bookings</h2>
              <p className="text-xs text-muted-foreground">Most recent customer reservations</p>
            </div>
            <Link
              to="/admin/bookings"
              className="inline-flex items-center gap-1 text-xs font-medium"
            >
              All bookings <ArrowUpRight className="h-3 w-3" />
            </Link>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b border-border">
                  <Th>Ref</Th>
                  <Th>Customer</Th>
                  <Th>Offer</Th>
                  <Th>Slot</Th>
                  <Th>People</Th>
                  <Th>Total</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length === 0 ? (
                  <tr>
                    <Td className="text-muted-foreground" colSpan={7}>
                      No bookings yet.
                    </Td>
                  </tr>
                ) : (
                  recentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-border last:border-0 hover:bg-muted/40"
                    >
                      <Td className="font-mono text-xs">{booking.bookingReference}</Td>
                      <Td>
                        {booking.customerName}
                        <div className="text-xs text-muted-foreground">
                          {booking.customerPhone}
                        </div>
                      </Td>
                      <Td>{booking.offer?.title ?? "-"}</Td>
                      <Td className="text-muted-foreground">
                        {formatSlot(booking.slot?.slotStart)}
                      </Td>
                      <Td>{booking.peopleCount}</Td>
                      <Td>
                        Rs. {((booking.offer?.offerPrice ?? 0) * booking.peopleCount).toLocaleString()}
                      </Td>
                      <Td>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] ${badgeFor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs text-muted-foreground">Slot utilization</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-4xl">{metrics.fillRate}%</span>
              <span className="text-xs text-success">live</span>
            </div>
            <div className="mt-4 space-y-2">
              {topOffers.map((offer) => {
                const booked = bookedForOffer(offer);
                const pct =
                  offer.totalSlots > 0 ? Math.round((booked / offer.totalSlots) * 100) : 0;

                return (
                  <div key={offer.id}>
                    <div className="flex justify-between text-xs">
                      <span className="truncate pr-3">{offer.title}</span>
                      <span className="font-mono text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-foreground" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs text-muted-foreground">Top offers</div>
            <div className="mt-3 space-y-3">
              {topOffers.length === 0 ? (
                <div className="text-sm text-muted-foreground">No offers yet.</div>
              ) : (
                topOffers.map((offer) => {
                  const booked = bookedForOffer(offer);

                  return (
                    <div key={offer.id} className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-amber-200 to-rose-200 text-[10px] font-mono">
                        {offer.id.slice(-2)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{offer.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {booked} booked - {offer.remainingSlots} left
                        </div>
                      </div>
                      <span className="font-mono text-xs">
                        Rs. {(offer.offerPrice * booked).toLocaleString()}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-foreground p-5 text-background">
            <div className="text-xs text-background/60">Realtime engine</div>
            <div className="mt-2 font-display text-4xl">Live</div>
            <div className="text-xs text-background/60">
              Marketplace capacity updates after every booking.
            </div>
            <div className="mt-4 flex h-16 items-end gap-1">
              {topOffers.length === 0
                ? Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-lime/40"
                      style={{ height: `${20 + i * 4}%` }}
                    />
                  ))
                : topOffers.map((offer) => {
                    const booked = bookedForOffer(offer);
                    const pct =
                      offer.totalSlots > 0
                        ? Math.max(8, Math.round((booked / offer.totalSlots) * 100))
                        : 8;

                    return (
                      <div
                        key={offer.id}
                        className="flex-1 rounded-sm bg-lime/70"
                        style={{ height: `${pct}%` }}
                      />
                    );
                  })}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1">
                <span className="pulse-dot inline-flex h-1.5 w-1.5 rounded-full bg-lime" /> Healthy
              </span>
              <span className="text-background/60">{metrics.remainingSeats} seats open</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function ActivityItem({ booking }: { booking: Booking }) {
  return (
    <li className="flex items-center gap-3 p-4">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-muted text-xs">
        {booking.customerName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm">
          <span className="font-medium">{booking.customerName}</span> -{" "}
          {booking.offer?.title ?? "Offer"}
        </div>
        <div className="text-xs text-muted-foreground">
          {formatSlot(booking.slot?.slotStart)} - {booking.peopleCount}{" "}
          {booking.peopleCount === 1 ? "person" : "people"}
        </div>
      </div>
      <span className={`rounded-full px-2 py-0.5 text-[10px] ${badgeFor(booking.status)}`}>
        {booking.status}
      </span>
    </li>
  );
}

function Mini({
  label,
  value,
  sub,
  border,
}: {
  label: string;
  value: string;
  sub: string;
  border?: boolean;
}) {
  return (
    <div className={`rounded-xl bg-canvas p-5 ${border ? "sm:border-x sm:border-border" : ""}`}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl">{value}</div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-5 py-3 text-left font-medium">{children}</th>
);

const Td = ({
  children,
  className = "",
  colSpan,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}) => (
  <td colSpan={colSpan} className={`px-5 py-3 align-top ${className}`}>
    {children}
  </td>
);

export function badgeFor(s: string) {
  switch (s) {
    case "Confirmed":
    case "Active":
    case "Available":
      return "bg-success/10 text-success";
    case "Pending":
    case "Draft":
      return "bg-warning/10 text-warning";
    case "Cancelled":
    case "Expired":
      return "bg-destructive/10 text-destructive";
    case "Completed":
      return "bg-info/10 text-info";
    case "Paused":
    case "Closed":
      return "bg-muted text-muted-foreground";
    case "No Show":
    case "Full":
      return "bg-foreground/10 text-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

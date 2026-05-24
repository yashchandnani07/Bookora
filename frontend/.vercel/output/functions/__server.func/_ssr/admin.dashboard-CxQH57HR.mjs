import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AdminTopbar } from "./AdminTopbar-DS0sefyF.mjs";
import { a as getMyBookings } from "./bookings-HTZk0Hqs.mjs";
import { b as getMyOffers } from "./offers-jEIiW0Gu.mjs";
import { T as Tag, p as Calendar, U as Users, a as Clock, a2 as ArrowUp, o as ArrowUpRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./button-DjOZMqFS.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./client-Bk_QgbDl.mjs";
function isToday(value) {
  const date = new Date(value);
  const today = /* @__PURE__ */ new Date();
  return date.toDateString() === today.toDateString();
}
function formatSlot(start) {
  if (!start) return "-";
  return new Date(start).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit"
  });
}
function bookedForOffer(offer) {
  return Math.max(0, offer.totalSlots - offer.remainingSlots);
}
function Dashboard() {
  const {
    data: offers = [],
    isLoading: offersLoading,
    isError: offersError
  } = useQuery({
    queryKey: ["offers", "my"],
    queryFn: getMyOffers
  });
  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    isError: bookingsError
  } = useQuery({
    queryKey: ["bookings", "my"],
    queryFn: getMyBookings
  });
  const loading = offersLoading || bookingsLoading;
  const hasError = offersError || bookingsError;
  const metrics = reactExports.useMemo(() => {
    const activeOffers = offers.filter((offer) => offer.status === "Active");
    const totalSeats = offers.reduce((sum, offer) => sum + offer.totalSlots, 0);
    const remainingSeats = offers.reduce((sum, offer) => sum + offer.remainingSlots, 0);
    const bookedSeats = totalSeats - remainingSeats;
    const todayBookings = bookings.filter((booking) => isToday(booking.createdAt));
    const fillRate = totalSeats > 0 ? Math.round(bookedSeats / totalSeats * 100) : 0;
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
      revenue
    };
  }, [bookings, offers]);
  const stats = [{
    label: "Total offers",
    value: String(offers.length),
    icon: Tag,
    sub: `${metrics.activeOffers.length} active`
  }, {
    label: "Active offers",
    value: String(metrics.activeOffers.length),
    icon: Calendar,
    sub: `${offers.length - metrics.activeOffers.length} inactive or draft`
  }, {
    label: "Total bookings",
    value: String(bookings.length),
    icon: Users,
    sub: `${metrics.bookedSeats} seats booked`
  }, {
    label: "Today's bookings",
    value: String(metrics.todayBookings.length),
    icon: Clock,
    sub: `Rs. ${metrics.revenue.toLocaleString()} total revenue`
  }];
  const recentBookings = bookings.slice(0, 6);
  const topOffers = [...offers].sort((a, b) => bookedForOffer(b) - bookedForOffer(a)).slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Overview", subtitle: loading ? "Loading live business data" : `${bookings.length} bookings, ${offers.length} offers` }),
    hasError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-6 mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive lg:mx-10", children: "Failed to load dashboard data. Make sure you are signed in as a business owner." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 p-6 lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 rounded-full bg-success/10 px-1.5 py-0.5 text-[10px] text-success", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-2.5 w-2.5" }),
            " live"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-display text-4xl tracking-tight", children: loading ? "-" : s.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
          s.label,
          " - ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: s.sub })
        ] })
      ] }, s.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[1.6fr_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between border-b border-border p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Capacity usage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Real seats across your offers" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-full border border-border bg-canvas px-3 py-1 text-xs", children: [
              metrics.fillRate,
              "% filled"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-foreground", style: {
              width: `${metrics.fillRate}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Booked seats", value: String(metrics.bookedSeats), sub: `of ${metrics.totalSeats}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Available seats", value: String(metrics.remainingSeats), sub: `across ${offers.length} offers`, border: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Conversion", value: `${metrics.fillRate}%`, sub: "booked capacity" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between border-b border-border p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Live activity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pulse-dot inline-flex h-1.5 w-1.5 rounded-full bg-success" }),
                " ",
                "Latest bookings"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/bookings", className: "text-xs text-muted-foreground hover:text-foreground", children: "View all" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: recentBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "p-5 text-sm text-muted-foreground", children: "No bookings yet." }) : recentBookings.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityItem, { booking }, booking.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between border-b border-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Recent bookings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Most recent customer reservations" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/bookings", className: "inline-flex items-center gap-1 text-xs font-medium", children: [
            "All bookings ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Ref" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Offer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Slot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "People" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { className: "text-muted-foreground", colSpan: 7, children: "No bookings yet." }) }) : recentBookings.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { className: "font-mono text-xs", children: booking.bookingReference }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Td, { children: [
              booking.customerName,
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: booking.customerPhone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: booking.offer?.title ?? "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { className: "text-muted-foreground", children: formatSlot(booking.slot?.slotStart) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: booking.peopleCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Td, { children: [
              "Rs. ",
              ((booking.offer?.offerPrice ?? 0) * booking.peopleCount).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] ${badgeFor(booking.status)}`, children: booking.status }) })
          ] }, booking.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-6 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Slot utilization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-4xl", children: [
              metrics.fillRate,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-success", children: "live" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: topOffers.map((offer) => {
            const booked = bookedForOffer(offer);
            const pct = offer.totalSlots > 0 ? Math.round(booked / offer.totalSlots * 100) : 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate pr-3", children: offer.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground", children: [
                  pct,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-foreground", style: {
                width: `${pct}%`
              } }) })
            ] }, offer.id);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Top offers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-3", children: topOffers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "No offers yet." }) : topOffers.map((offer) => {
            const booked = bookedForOffer(offer);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-amber-200 to-rose-200 text-[10px] font-mono", children: offer.id.slice(-2) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium", children: offer.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                  booked,
                  " booked - ",
                  offer.remainingSlots,
                  " left"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs", children: [
                "Rs. ",
                (offer.offerPrice * booked).toLocaleString()
              ] })
            ] }, offer.id);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-foreground p-5 text-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-background/60", children: "Realtime engine" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-4xl", children: "Live" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-background/60", children: "Marketplace capacity updates after every booking." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex h-16 items-end gap-1", children: topOffers.length === 0 ? Array.from({
            length: 12
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 rounded-sm bg-lime/40", style: {
            height: `${20 + i * 4}%`
          } }, i)) : topOffers.map((offer) => {
            const booked = bookedForOffer(offer);
            const pct = offer.totalSlots > 0 ? Math.max(8, Math.round(booked / offer.totalSlots * 100)) : 8;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 rounded-sm bg-lime/70", style: {
              height: `${pct}%`
            } }, offer.id);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pulse-dot inline-flex h-1.5 w-1.5 rounded-full bg-lime" }),
              " Healthy"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-background/60", children: [
              metrics.remainingSeats,
              " seats open"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function ActivityItem({
  booking
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-full bg-muted text-xs", children: booking.customerName.split(" ").map((n) => n[0]).join("").slice(0, 2) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: booking.customerName }),
        " -",
        " ",
        booking.offer?.title ?? "Offer"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        formatSlot(booking.slot?.slotStart),
        " - ",
        booking.peopleCount,
        " ",
        booking.peopleCount === 1 ? "person" : "people"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] ${badgeFor(booking.status)}`, children: booking.status })
  ] });
}
function Mini({
  label,
  value,
  sub,
  border
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl bg-canvas p-5 ${border ? "sm:border-x sm:border-border" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-2xl", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: sub })
  ] });
}
const Th = ({
  children
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 text-left font-medium", children });
const Td = ({
  children,
  className = "",
  colSpan
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan, className: `px-5 py-3 align-top ${className}`, children });
function badgeFor(s) {
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
export {
  badgeFor,
  Dashboard as component
};

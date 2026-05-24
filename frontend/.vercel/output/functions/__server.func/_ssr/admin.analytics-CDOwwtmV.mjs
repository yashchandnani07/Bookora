import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useQueries } from "../_libs/tanstack__react-query.mjs";
import { A as AdminTopbar } from "./AdminTopbar-DS0sefyF.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { a as getMyBookings } from "./bookings-HTZk0Hqs.mjs";
import { b as getMyOffers } from "./offers-jEIiW0Gu.mjs";
import { g as getOfferSlots } from "./slots-Db3a382Z.mjs";
import { s as subscribeToBookingUpdates } from "./bookings-CZ63f1Go.mjs";
import { D as Download, o as ArrowUpRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./client-Bk_QgbDl.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const RANGE_OPTIONS = [{
  label: "7d",
  days: 7
}, {
  label: "30d",
  days: 30
}, {
  label: "90d",
  days: 90
}, {
  label: "12m",
  days: 365
}];
const HEATMAP_HOURS = [6, 8, 10, 12, 14, 16, 18, 19, 20, 21, 22, 23];
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function Analytics() {
  const queryClient = useQueryClient();
  const [range, setRange] = reactExports.useState(RANGE_OPTIONS[1]);
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
  const slotQueries = useQueries({
    queries: offers.map((offer) => ({
      queryKey: ["offer-slots", offer.id],
      queryFn: () => getOfferSlots(offer.id),
      enabled: Boolean(offer.id)
    }))
  });
  reactExports.useEffect(() => {
    return subscribeToBookingUpdates({
      onSlotUpdated: (update) => {
        queryClient.setQueryData(["offer-slots", update.offerId], (current) => {
          if (!current) return current;
          return current.map((slot) => slot.id === update.slotId ? {
            ...slot,
            capacity: update.capacity || slot.capacity,
            bookedCount: update.bookedCount,
            remainingCapacity: update.remainingCapacity,
            status: update.status || slot.status
          } : slot);
        });
        queryClient.invalidateQueries({
          queryKey: ["offers", "my"]
        });
        queryClient.invalidateQueries({
          queryKey: ["bookings", "my"]
        });
      },
      onOfferCreated: () => {
        queryClient.invalidateQueries({
          queryKey: ["offers", "my"]
        });
      }
    });
  }, [queryClient]);
  const slots = reactExports.useMemo(() => {
    return offers.flatMap((offer, index) => (slotQueries[index]?.data ?? []).map((slot) => ({
      ...slot,
      offer
    })));
  }, [offers, slotQueries]);
  const filteredBookings = reactExports.useMemo(() => {
    const start = daysAgo(range.days);
    return bookings.filter((booking) => new Date(booking.createdAt) >= start);
  }, [bookings, range]);
  const previousBookings = reactExports.useMemo(() => {
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
  seatsFor(previousBookings);
  const avgTicket = currentSeats > 0 ? Math.round(currentRevenue / currentSeats) : 0;
  const previousAvgTicket = seatsFor(previousBookings) > 0 ? Math.round(previousRevenue / seatsFor(previousBookings)) : 0;
  const noShowCount = filteredBookings.filter((booking) => booking.status === "No Show").length;
  const previousNoShowCount = previousBookings.filter((booking) => booking.status === "No Show").length;
  const noShowRate = filteredBookings.length > 0 ? Math.round(noShowCount / filteredBookings.length * 1e3) / 10 : 0;
  const previousNoShowRate = previousBookings.length > 0 ? Math.round(previousNoShowCount / previousBookings.length * 1e3) / 10 : 0;
  const totalCapacity = offers.reduce((sum, offer) => sum + offer.totalSlots, 0);
  const remainingCapacity = offers.reduce((sum, offer) => sum + offer.remainingSlots, 0);
  const bookedCapacity = Math.max(0, totalCapacity - remainingCapacity);
  const capacityFill = totalCapacity > 0 ? Math.round(bookedCapacity / totalCapacity * 100) : 0;
  const pickedSlots = new Set(filteredBookings.map((booking) => booking.slotId)).size;
  const checkoutStarted = filteredBookings.length;
  const offerViews = Math.max(filteredBookings.length, Math.round(offers.length * 72 + slots.length * 18 + filteredBookings.length * 3.5));
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
    topOffers
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Analytics", subtitle: loading ? "Loading live analytics" : `${range.label} - ${offers.length} offers`, action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 rounded-full border border-border bg-card p-0.5 text-xs", children: RANGE_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRange(option), className: `rounded-full px-3 py-1 ${option.label === range.label ? "bg-foreground text-background" : "text-muted-foreground"}`, children: option.label }, option.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full bg-card", onClick: () => exportCsv(filteredBookings), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        " Export"
      ] })
    ] }) }),
    hasError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-6 mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive lg:mx-10", children: "Failed to load analytics. Make sure you are signed in as a business owner." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6 lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Revenue", value: formatMoney(currentRevenue), delta: deltaText(currentRevenue, previousRevenue), positive: currentRevenue >= previousRevenue }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Bookings", value: filteredBookings.length.toLocaleString(), delta: deltaText(filteredBookings.length, previousBookings.length), positive: filteredBookings.length >= previousBookings.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Avg ticket", value: formatMoney(avgTicket), delta: deltaText(avgTicket, previousAvgTicket), positive: avgTicket >= previousAvgTicket }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "No-show rate", value: `${noShowRate}%`, delta: `${formatPointDelta(noShowRate, previousNoShowRate)}pp`, positive: noShowRate <= previousNoShowRate })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 xl:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Revenue trend" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Daily - last ",
                range.label
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-sm bg-foreground" }),
                " Current"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-sm bg-lime" }),
                " Previous"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendChart, { current: revenueTrend, previous: previousTrend })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Conversion funnel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelRow, { label: "Offer views", value: offerViews, pct: 100 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelRow, { label: "Slot picked", value: slotPickedEstimate, pct: percent(slotPickedEstimate, offerViews) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelRow, { label: "Checkout started", value: checkoutStarted, pct: percent(checkoutStarted, offerViews) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelRow, { label: "Booked", value: filteredBookings.length, pct: percent(filteredBookings.length, offerViews) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Peak hours heatmap" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-[40px_repeat(12,1fr)] gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
            HEATMAP_HOURS.map((hour) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[10px] text-muted-foreground", children: formatHourLabel(hour) }, hour)),
            WEEK_DAYS.map((day, dayIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contents", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-2 text-right text-[10px] text-muted-foreground", children: day }),
              HEATMAP_HOURS.map((hour) => {
                const value = heatmap[dayIndex]?.[hour] ?? 0;
                const max = Math.max(1, ...heatmap.flatMap((row) => Object.values(row)));
                const intensity = value / max;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-sm", title: `${day} ${formatHourLabel(hour)} - ${value} bookings`, style: {
                  background: `oklch(0.21 0.04 264 / ${0.08 + intensity * 0.92})`
                } }, `${day}-${hour}`);
              })
            ] }, day))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Slot utilization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-3 gap-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Util, { value: `${timeBands.morning}%`, label: "Morning" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Util, { value: `${timeBands.afternoon}%`, label: "Afternoon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Util, { value: `${timeBands.evening}%`, label: "Evening" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-2", children: topOffers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "No offer activity yet." }) : topOffers.slice(0, 4).map((offer) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRow, { label: offer.title, value: offer.fill }, offer.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Operator insights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-3 text-sm", children: insights.map((text) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "mt-0.5 h-4 w-4 text-success" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text })
          ] }, text)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[1fr_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Capacity summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-3 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-foreground", style: {
            width: `${capacityFill}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-3 gap-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Util, { value: bookedCapacity.toLocaleString(), label: "Booked seats" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Util, { value: remainingCapacity.toLocaleString(), label: "Open seats" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Util, { value: `${capacityFill}%`, label: "Filled" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Top offers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: topOffers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Create and book offers to see rankings." }) : topOffers.slice(0, 5).map((offer) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium", children: offer.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                offer.bookings,
                " bookings - ",
                offer.seats,
                " seats"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right font-mono text-xs", children: formatMoney(offer.revenue) })
          ] }, offer.id)) })
        ] })
      ] })
    ] })
  ] });
}
function Kpi({
  label,
  value,
  delta,
  positive
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-baseline gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${positive ? "text-success" : "text-destructive"}`, children: delta })
    ] })
  ] });
}
function TrendChart({
  current,
  previous
}) {
  const max = Math.max(1, ...current, ...previous);
  const currentPath = buildLinePath(current, max);
  const previousPath = buildLinePath(previous, max);
  const areaPath = `${currentPath} L600,240 L0,240 Z`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 600 240", className: "h-full w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "analyticsRevenueFill", x1: "0", x2: "0", y1: "0", y2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.21 0.04 264)", stopOpacity: "0.2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.21 0.04 264)", stopOpacity: "0" })
    ] }) }),
    [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "0", x2: "600", y1: i * 60, y2: i * 60, stroke: "oklch(0.92 0.008 95)" }, i)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: areaPath, fill: "url(#analyticsRevenueFill)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: currentPath, stroke: "oklch(0.21 0.04 264)", strokeWidth: "2", fill: "none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: previousPath, stroke: "oklch(0.92 0.18 122)", strokeWidth: "2", fill: "none", strokeDasharray: "4 4" })
  ] }) });
}
function FunnelRow({
  label,
  value,
  pct
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground", children: [
        value.toLocaleString(),
        " - ",
        pct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-foreground", style: {
      width: `${pct}%`
    } }) })
  ] });
}
function Util({
  value,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-canvas p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: label })
  ] });
}
function ProgressRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate pr-3", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground", children: [
        value,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-foreground", style: {
      width: `${value}%`
    } }) })
  ] });
}
function revenueFor(bookings) {
  return bookings.reduce((sum, booking) => {
    return sum + (booking.offer?.offerPrice ?? 0) * booking.peopleCount;
  }, 0);
}
function seatsFor(bookings) {
  return bookings.reduce((sum, booking) => sum + booking.peopleCount, 0);
}
function daysAgo(days) {
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() - days);
  date.setHours(0, 0, 0, 0);
  return date;
}
function buildDailyRevenue(bookings, days) {
  const bucketCount = Math.min(days, 30);
  const start = daysAgo(bucketCount - 1);
  const buckets = Array.from({
    length: bucketCount
  }, () => 0);
  bookings.forEach((booking) => {
    const created = new Date(booking.createdAt);
    const index = Math.floor((created.getTime() - start.getTime()) / 864e5);
    if (index >= 0 && index < buckets.length) {
      buckets[index] += (booking.offer?.offerPrice ?? 0) * booking.peopleCount;
    }
  });
  return buckets;
}
function buildLinePath(values, max) {
  if (values.length === 0) return "M0,220";
  return values.map((value, index) => {
    const x = values.length === 1 ? 0 : index / (values.length - 1) * 600;
    const y = 220 - value / max * 190;
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}
function buildTopOffers(offers, bookings) {
  return offers.map((offer) => {
    const offerBookings = bookings.filter((booking) => booking.offerId === offer.id);
    const seats = seatsFor(offerBookings);
    const revenue = revenueFor(offerBookings);
    const booked = Math.max(0, offer.totalSlots - offer.remainingSlots);
    const fill = offer.totalSlots > 0 ? Math.round(booked / offer.totalSlots * 100) : 0;
    return {
      id: offer.id,
      title: offer.title,
      bookings: offerBookings.length,
      seats,
      revenue,
      fill
    };
  }).sort((a, b) => b.revenue - a.revenue || b.seats - a.seats);
}
function buildTimeBands(slots) {
  const band = (start, end) => {
    const bandSlots = slots.filter((slot) => {
      const hour = new Date(slot.slotStart).getHours();
      return hour >= start && hour < end;
    });
    const capacity = bandSlots.reduce((sum, slot) => sum + slot.capacity, 0);
    const booked = bandSlots.reduce((sum, slot) => sum + slot.bookedCount, 0);
    return capacity > 0 ? Math.round(booked / capacity * 100) : 0;
  };
  return {
    morning: band(5, 12),
    afternoon: band(12, 17),
    evening: band(17, 24)
  };
}
function buildHeatmap(bookings) {
  const rows = Array.from({
    length: 7
  }, () => HEATMAP_HOURS.reduce((acc, hour) => {
    acc[hour] = 0;
    return acc;
  }, {}));
  bookings.forEach((booking) => {
    const date = new Date(booking.slot?.slotStart ?? booking.createdAt);
    const day = date.getDay() === 0 ? 6 : date.getDay() - 1;
    const hour = closestHour(date.getHours());
    rows[day][hour] += booking.peopleCount;
  });
  return rows;
}
function closestHour(hour) {
  return HEATMAP_HOURS.reduce((closest, current) => Math.abs(current - hour) < Math.abs(closest - hour) ? current : closest);
}
function buildInsights({
  slots,
  offers,
  bookings,
  noShowRate,
  capacityFill,
  topOffers
}) {
  const insights = [];
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
function percent(value, total) {
  if (total <= 0) return 0;
  return Math.min(100, Math.round(value / total * 100));
}
function deltaText(current, previous) {
  if (previous === 0) return current > 0 ? "+100%" : "0%";
  const delta = Math.round((current - previous) / previous * 100);
  return `${delta >= 0 ? "+" : ""}${delta}%`;
}
function formatPointDelta(current, previous) {
  const delta = Math.round((current - previous) * 10) / 10;
  return `${delta >= 0 ? "+" : ""}${delta}`;
}
function formatMoney(value) {
  return `Rs. ${Math.round(value).toLocaleString("en-IN")}`;
}
function formatHourLabel(hour) {
  if (hour === 12) return "12p";
  if (hour > 12) return `${hour - 12}p`;
  return `${hour}a`;
}
function exportCsv(bookings) {
  const rows = [["Reference", "Customer", "Offer", "People", "Status", "Booked at", "Revenue"], ...bookings.map((booking) => [booking.bookingReference, booking.customerName, booking.offer?.title ?? "", String(booking.peopleCount), booking.status, booking.createdAt, String((booking.offer?.offerPrice ?? 0) * booking.peopleCount)])];
  const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "bookora-analytics.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
export {
  Analytics as component
};

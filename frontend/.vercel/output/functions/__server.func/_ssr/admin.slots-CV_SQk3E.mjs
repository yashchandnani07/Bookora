import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, b as useQueries } from "../_libs/tanstack__react-query.mjs";
import { A as AdminTopbar } from "./AdminTopbar-DS0sefyF.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { b as getMyOffers } from "./offers-jEIiW0Gu.mjs";
import { g as getOfferSlots } from "./slots-Db3a382Z.mjs";
import { s as subscribeToBookingUpdates } from "./bookings-CZ63f1Go.mjs";
import { c as badgeFor } from "./router-Dn9S88Ix.mjs";
import "../_libs/sonner.mjs";
import { P as Plus, J as ChevronLeft, p as Calendar, K as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "./client-Bk_QgbDl.mjs";
import "./bookings-HTZk0Hqs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function SlotsPage() {
  const queryClient = useQueryClient();
  const [weekStart, setWeekStart] = reactExports.useState(() => startOfWeek(/* @__PURE__ */ new Date()));
  const {
    data: offers = [],
    isLoading: offersLoading
  } = useQuery({
    queryKey: ["offers", "my"],
    queryFn: getMyOffers
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
    }))).sort((a, b) => new Date(a.slotStart).getTime() - new Date(b.slotStart).getTime());
  }, [offers, slotQueries]);
  const isLoading = offersLoading || slotQueries.some((query) => query.isLoading);
  const todaySlots = slots.filter((slot) => isSameDay(new Date(slot.slotStart), /* @__PURE__ */ new Date()));
  const upcomingSlots = slots.filter((slot) => new Date(slot.slotEnd).getTime() >= Date.now());
  const activeSlots = slots.filter((slot) => slot.isActive && slot.status !== "Closed");
  const totalCapacity = slots.reduce((sum, slot) => sum + slot.capacity, 0);
  const bookedSeats = slots.reduce((sum, slot) => sum + slot.bookedCount, 0);
  const avgFill = totalCapacity > 0 ? Math.round(bookedSeats / totalCapacity * 100) : 0;
  const fullSlots = slots.filter((slot) => slot.remainingCapacity <= 0 || slot.status === "Full");
  const weekDays = reactExports.useMemo(() => {
    return Array.from({
      length: 7
    }, (_, index) => addDays(weekStart, index));
  }, [weekStart]);
  const hours = reactExports.useMemo(() => {
    const slotHours = slots.filter((slot) => isWithinWeek(new Date(slot.slotStart), weekStart)).map((slot) => new Date(slot.slotStart).getHours());
    const baseHours = Array.from({
      length: 16
    }, (_, index) => index + 6);
    return Array.from(/* @__PURE__ */ new Set([...baseHours, ...slotHours])).sort((a, b) => a - b);
  }, [slots, weekStart]);
  const visibleList = todaySlots.length > 0 ? todaySlots : upcomingSlots.slice(0, 10);
  const selectedWeekLabel = `${formatDayMonth(weekStart)} - ${formatDayMonth(addDays(weekStart, 6))}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Slot inventory", subtitle: isLoading ? "Loading slots..." : `${slots.length} slots across ${offers.length} offers`, action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/offers/new", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " New offer"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6 lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Today's slots", value: todaySlots.length, sub: `${activeSlots.length} active total` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Booked seats", value: bookedSeats, sub: `of ${totalCapacity} capacity` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Avg fill rate", value: `${avgFill}%`, sub: "across all slots" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Full slots", value: fullSlots.length, sub: "no remaining capacity" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[1.5fr_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-md p-1.5 hover:bg-muted", onClick: () => setWeekStart((current) => addDays(current, -7)), "aria-label": "Previous week", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-lg", children: [
                  "Week of ",
                  formatDayMonth(weekStart)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
                  " ",
                  selectedWeekLabel
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-md p-1.5 hover:bg-muted", onClick: () => setWeekStart((current) => addDays(current, 7)), "aria-label": "Next week", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full border border-border bg-canvas px-3 py-1 text-xs text-muted-foreground", children: "Live availability" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-[760px]", style: {
            gridTemplateColumns: "64px repeat(7, 1fr)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
            weekDays.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `pb-3 text-center text-xs ${isSameDay(day, /* @__PURE__ */ new Date()) ? "font-semibold text-foreground" : "text-muted-foreground"}`, children: formatWeekDay(day) }, day.toISOString())),
            hours.map((hour) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contents", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pr-2 pt-2 text-right font-mono text-[10px] text-muted-foreground", children: formatHour(hour) }),
              weekDays.map((day) => {
                const daySlots = slots.filter((slot) => {
                  const date = new Date(slot.slotStart);
                  return isSameDay(date, day) && date.getHours() === hour;
                });
                return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative min-h-16 border-l border-t border-border first:border-l-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 p-1", children: daySlots.map((slot) => {
                  const fill = fillPct(slot);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-md p-1.5 text-[10px] ${fill >= 100 ? "bg-foreground text-background" : "bg-lime/40 text-foreground"}`, title: `${slot.offer.title} - ${slot.bookedCount}/${slot.capacity}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-medium", children: formatTime(slot.slotStart) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate opacity-75", children: slot.offer.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "opacity-75", children: [
                      fill,
                      "% filled"
                    ] })
                  ] }, slot.id);
                }) }) }, `${day.toISOString()}-${hour}`);
              })
            ] }, hour))
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "flex items-center justify-between border-b border-border p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: todaySlots.length > 0 ? "Today's slots" : "Upcoming slots" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pulse-dot inline-flex h-1.5 w-1.5 rounded-full bg-success" }),
              "Realtime"
            ] })
          ] }) }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "Loading slots..." }) : visibleList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "No slots yet. Create an offer to generate its first slot." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: visibleList.map((slot) => {
            const pct = fillPct(slot);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm", children: formatTime(slot.slotStart) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium", children: slot.offer.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                    formatShortDate(slot.slotStart),
                    " - ",
                    slot.bookedCount,
                    "/",
                    slot.capacity,
                    " booked"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `shrink-0 rounded-full px-2 py-0.5 text-[10px] ${badgeFor(slot.status)}`, children: slot.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full ${pct >= 100 ? "bg-foreground" : slot.status === "Closed" ? "bg-muted-foreground/40" : "bg-lime"}`, style: {
                width: `${pct}%`
              } }) })
            ] }, slot.id);
          }) })
        ] })
      ] })
    ] })
  ] });
}
function Metric({
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-3xl", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: sub })
  ] });
}
function fillPct(slot) {
  if (slot.capacity <= 0) return 0;
  return Math.min(100, Math.round(slot.bookedCount / slot.capacity * 100));
}
function startOfWeek(value) {
  const date = new Date(value);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}
function addDays(value, days) {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date;
}
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isWithinWeek(value, weekStart) {
  const end = addDays(weekStart, 7);
  return value >= weekStart && value < end;
}
function formatWeekDay(value) {
  return value.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric"
  });
}
function formatDayMonth(value) {
  return value.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
  });
}
function formatShortDate(value) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
  });
}
function formatTime(value) {
  return new Date(value).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit"
  });
}
function formatHour(hour) {
  return `${hour.toString().padStart(2, "0")}:00`;
}
export {
  SlotsPage as component
};

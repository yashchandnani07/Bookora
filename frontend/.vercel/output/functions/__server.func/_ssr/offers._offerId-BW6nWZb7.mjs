import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PublicNav, F as Footer } from "./Footer-DV6EqzRY.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { a as getOfferById } from "./offers-jEIiW0Gu.mjs";
import { g as getOfferSlots } from "./slots-Db3a382Z.mjs";
import { s as subscribeToBookingUpdates } from "./bookings-CZ63f1Go.mjs";
import { a as Route$a } from "./router-Dn9S88Ix.mjs";
import "../_libs/sonner.mjs";
import { M as MapPin, H as Star, a as Clock, U as Users, C as Check, A as ArrowRight, q as ShieldCheck, d as Share2, p as Calendar } from "../_libs/lucide-react.mjs";
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
import "./Logo-9RWBOztj.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./client-Bk_QgbDl.mjs";
const COVER_GRADIENTS = ["from-amber-200 via-rose-200 to-orange-300", "from-stone-200 via-amber-100 to-rose-200", "from-emerald-200 via-lime-200 to-teal-200", "from-purple-200 via-pink-100 to-rose-200", "from-neutral-300 via-stone-200 to-zinc-300", "from-zinc-300 via-stone-300 to-amber-200", "from-orange-200 via-red-200 to-rose-300", "from-sky-200 via-blue-100 to-indigo-200"];
function gradientForId(id) {
  const idx = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % COVER_GRADIENTS.length;
  return COVER_GRADIENTS[idx];
}
function formatDate(value) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function formatSlot(value) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit"
  });
}
function OfferDetail() {
  const {
    offerId
  } = Route$a.useParams();
  const [selectedSlotId, setSelectedSlotId] = reactExports.useState(null);
  const queryClient = useQueryClient();
  const {
    data: offer,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["offer", offerId],
    queryFn: () => getOfferById(offerId),
    retry: false
  });
  const {
    data: slots = [],
    isLoading: slotsLoading
  } = useQuery({
    queryKey: ["offer-slots", offerId],
    queryFn: () => getOfferSlots(offerId)
  });
  reactExports.useEffect(() => {
    return subscribeToBookingUpdates((update) => {
      if (update.offerId !== offerId) return;
      queryClient.setQueryData(["offer", offerId], (current) => current ? {
        ...current,
        remainingSlots: update.remainingSlots,
        totalSlots: update.totalSlots || current.totalSlots
      } : current);
      queryClient.setQueryData(["offer-slots", offerId], (current) => {
        if (!current) return current;
        return current.map((slot) => slot.id === update.slotId ? {
          ...slot,
          capacity: update.capacity || slot.capacity,
          bookedCount: update.bookedCount,
          remainingCapacity: update.remainingCapacity,
          status: update.status
        } : slot);
      });
    });
  }, [offerId, queryClient]);
  reactExports.useEffect(() => {
    if (selectedSlotId || slots.length === 0) return;
    const firstAvailable = slots.find((slot) => slot.status === "Available" && slot.remainingCapacity > 0);
    if (firstAvailable) {
      setSelectedSlotId(firstAvailable.id);
    }
  }, [selectedSlotId, slots]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-canvas", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[60vh] place-items-center text-muted-foreground", children: "Loading offer..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  if (isError || !offer) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-canvas", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[60vh] place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display", children: "Offer not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/offers", className: "mt-4 inline-block text-sm underline", children: "Back to offers" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  const booked = offer.totalSlots - offer.remainingSlots;
  const pct = offer.totalSlots > 0 ? booked / offer.totalSlots * 100 : 0;
  const discountPct = offer.originalPrice > 0 ? Math.round((1 - offer.offerPrice / offer.originalPrice) * 100) : 0;
  const savings = offer.originalPrice - offer.offerPrice;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-canvas", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/offers", className: "hover:text-foreground", children: "Offers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: offer.category || "General" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: offer.business?.name ?? "-" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${gradientForId(offer.id)}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-3 text-xs", children: [
            discountPct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-foreground px-2.5 py-0.5 text-background", children: [
              "-",
              discountPct,
              "% off"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pulse-dot inline-flex h-1.5 w-1.5 rounded-full bg-success" }),
              "Live, ends ",
              formatDate(offer.endDate)
            ] }),
            offer.business?.city && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              " ",
              offer.business.city
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-5xl leading-tight", children: offer.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-muted-foreground", children: [
            "by ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: offer.business?.name ?? "-" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-3 gap-3", children: [{
            label: "Rating",
            value: "4.9",
            sub: "318 reviews",
            icon: Star
          }, {
            label: "Duration",
            value: "1 slot",
            sub: "current MVP",
            icon: Clock
          }, {
            label: "Per booking",
            value: `1-${offer.maxBookingPerCustomer}`,
            sub: "people",
            icon: Users
          }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-2xl", children: s.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: s.sub })
          ] }, s.label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose mt-10 max-w-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "About this offer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: offer.description || `A curated experience by ${offer.business?.name ?? "this venue"}.` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-8 font-display text-xl", children: "What's included" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2 sm:grid-cols-2", children: ["Curated session experience", "Equipment included", "Complimentary refreshments", "Locker and towel service", "Trained host", "Confirmation after booking"].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-success" }),
              " ",
              x
            ] }, x)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:sticky lg:top-24 lg:self-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-elegant", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-4xl", children: [
                "Rs. ",
                offer.offerPrice.toLocaleString()
              ] }),
              offer.originalPrice > offer.offerPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground line-through", children: [
                "Rs. ",
                offer.originalPrice.toLocaleString()
              ] }),
              savings > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto rounded-full bg-lime px-2 py-0.5 text-xs font-medium", children: [
                "Save Rs. ",
                savings.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Realtime availability" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                  booked,
                  "/",
                  offer.totalSlots
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-foreground", style: {
                width: `${pct}%`
              } }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Select slot" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                slotsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground", children: "Loading slots..." }),
                !slotsLoading && slots.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground", children: "No slots are available for this offer yet." }),
                !slotsLoading && slots.map((slot) => {
                  const full = slot.remainingCapacity <= 0 || slot.status !== "Available";
                  const selected = selectedSlotId === slot.id;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: full, onClick: () => setSelectedSlotId(slot.id), className: `flex items-center justify-between rounded-lg border p-3 text-left transition-colors disabled:cursor-not-allowed ${selected ? "border-foreground bg-foreground/5" : "border-border bg-card hover:border-foreground/30 disabled:opacity-60"}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: formatSlot(slot.slotStart) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
                        "Ends ",
                        formatSlot(slot.slotEnd)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-xs", children: full ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-success", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }),
                      slot.remainingCapacity,
                      " left"
                    ] }) })
                  ] }, slot.id);
                })
              ] })
            ] }),
            selectedSlotId ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6 w-full rounded-full", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/book/$offerId", params: {
              offerId: offer.id
            }, search: {
              slotId: selectedSlotId
            }, children: [
              "Continue to book ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, className: "mt-6 w-full rounded-full", size: "lg", children: "Select a slot to continue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3" }),
                " Free reschedule"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1 hover:text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3 w-3" }),
                " Share"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl border border-border bg-card p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-medium", children: offer.business?.name ?? "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: offer.business?.address ? `${offer.business.address}, ${offer.business.city}` : offer.business?.city ?? "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 aspect-[16/9] rounded-lg bg-gradient-to-br from-stone-200 via-canvas to-stone-100" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
        " More from this venue"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-sm text-muted-foreground", children: [
        "Discover more offers from ",
        offer.business?.name ?? "this venue",
        " on the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/offers", className: "underline hover:text-foreground", children: "marketplace" }),
        "."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  OfferDetail as component
};

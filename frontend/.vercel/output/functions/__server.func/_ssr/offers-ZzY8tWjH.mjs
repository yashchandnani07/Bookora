import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link, e as useRouterState, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PublicNav, F as Footer } from "./Footer-DV6EqzRY.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { B as Button, c as cn } from "./button-DjOZMqFS.mjs";
import { S as Switch } from "./switch-DkA5ZPe7.mjs";
import { R as Root, T as Track, a as Range, b as Thumb } from "../_libs/radix-ui__react-slider.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CUSP6kj8.mjs";
import { g as getAllOffers } from "./offers-jEIiW0Gu.mjs";
import { s as subscribeToBookingUpdates } from "./bookings-CZ63f1Go.mjs";
import { a as Clock, A as ArrowRight, S as Search, M as MapPin, b as SlidersHorizontal, F as Funnel } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./client-Bk_QgbDl.mjs";
const Slider = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Root,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = Root.displayName;
const CATEGORIES = ["All", "Gym", "Salon", "Cafe", "Restaurant", "Clinic", "Coaching", "Turf", "Spa", "Other"];
const SORT_OPTIONS = [{
  value: "ending-soon",
  label: "Ending soon"
}, {
  value: "price-low",
  label: "Price: low to high"
}, {
  value: "price-high",
  label: "Price: high to low"
}, {
  value: "discount",
  label: "Best discount"
}, {
  value: "availability",
  label: "Most available"
}];
const COVER_GRADIENTS = ["from-amber-200 via-rose-200 to-orange-300", "from-stone-200 via-amber-100 to-rose-200", "from-emerald-200 via-lime-200 to-teal-200", "from-purple-200 via-pink-100 to-rose-200", "from-neutral-300 via-stone-200 to-zinc-300", "from-zinc-300 via-stone-300 to-amber-200", "from-orange-200 via-red-200 to-rose-300", "from-sky-200 via-blue-100 to-indigo-200"];
function gradientForId(id) {
  const idx = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % COVER_GRADIENTS.length;
  return COVER_GRADIENTS[idx];
}
function discountFor(offer) {
  if (offer.originalPrice <= 0) return 0;
  return Math.round((1 - offer.offerPrice / offer.originalPrice) * 100);
}
function OffersListing() {
  const [active, setActive] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("All");
  const [availableOnly, setAvailableOnly] = reactExports.useState(true);
  const [maxPrice, setMaxPrice] = reactExports.useState(1e3);
  const [sortBy, setSortBy] = reactExports.useState("ending-soon");
  const queryClient = useQueryClient();
  const pathname = useRouterState({
    select: (state) => state.location.pathname
  });
  const {
    data: offers = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["offers", "all"],
    queryFn: getAllOffers
  });
  reactExports.useEffect(() => {
    return subscribeToBookingUpdates({
      onSlotUpdated: (update) => {
        queryClient.setQueryData(["offers", "all"], (current) => {
          if (!current) return current;
          return current.map((offer) => offer.id === update.offerId ? {
            ...offer,
            remainingSlots: update.remainingSlots,
            totalSlots: update.totalSlots || offer.totalSlots
          } : offer);
        });
        queryClient.setQueryData(["offer", update.offerId], (current) => current ? {
          ...current,
          remainingSlots: update.remainingSlots,
          totalSlots: update.totalSlots || current.totalSlots
        } : current);
      },
      onOfferCreated: () => {
        queryClient.invalidateQueries({
          queryKey: ["offers", "all"]
        });
      }
    });
  }, [queryClient]);
  reactExports.useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [search]);
  const cities = reactExports.useMemo(() => {
    const values = offers.map((offer) => offer.business?.city).filter((value) => Boolean(value));
    return ["All", ...Array.from(new Set(values)).sort()];
  }, [offers]);
  const highestPrice = reactExports.useMemo(() => {
    return Math.max(1e3, ...offers.map((offer) => Math.ceil(offer.offerPrice)));
  }, [offers]);
  reactExports.useEffect(() => {
    setMaxPrice(highestPrice);
  }, [highestPrice]);
  const filtered = reactExports.useMemo(() => {
    const matches = offers.filter((offer) => {
      const haystack = [offer.title, offer.description, offer.category, offer.business?.name, offer.business?.city, offer.business?.address].filter(Boolean).join(" ").toLowerCase();
      return (!debouncedSearch || haystack.includes(debouncedSearch)) && (active === "All" || offer.category === active) && (city === "All" || offer.business?.city === city) && (!availableOnly || offer.remainingSlots > 0) && offer.offerPrice <= maxPrice;
    });
    return [...matches].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.offerPrice - b.offerPrice;
        case "price-high":
          return b.offerPrice - a.offerPrice;
        case "discount":
          return discountFor(b) - discountFor(a);
        case "availability":
          return b.remainingSlots - a.remainingSlots;
        case "ending-soon":
        default:
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      }
    });
  }, [active, availableOnly, city, debouncedSearch, maxPrice, offers, sortBy]);
  if (pathname !== "/offers") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  }
  function resetFilters() {
    setActive("All");
    setSearch("");
    setDebouncedSearch("");
    setCity("All");
    setAvailableOnly(true);
    setMaxPrice(highestPrice);
    setSortBy("ending-soon");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-canvas", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 pt-14 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start justify-between gap-6 md:flex-row md:items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Marketplace" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-5xl leading-tight md:text-6xl", children: "Live offers near you." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 max-w-xl text-muted-foreground", children: [
            "Limited-time slots from ",
            offers.length,
            "+ venues. Updated in real time."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pulse-dot inline-flex h-1.5 w-1.5 rounded-full bg-success" }),
          "Live marketplace"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-2 shadow-card md:flex-row md:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center gap-2 px-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search offers, venues, categories...", className: "border-0 bg-transparent shadow-none focus-visible:ring-0", value: search, onChange: (event) => setSearch(event.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden h-6 w-px bg-border md:block" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: city, onValueChange: setCity, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-36 border-0 bg-transparent px-0 shadow-none focus:ring-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: cities.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: item, children: item === "All" ? "All cities" : item }, item)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden h-6 w-px bg-border md:block" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
          "Today"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "rounded-full", onClick: () => setAvailableOnly(true), children: "Find slots" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 -mx-6 overflow-x-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: CATEGORIES.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActive(category), className: `whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors ${active === category ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-foreground/30"}`, children: category }, category)) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 lg:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden w-72 shrink-0 lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 space-y-6 rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
            "Filters"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs text-muted-foreground hover:text-foreground", onClick: resetFilters, children: "Reset" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBlock, { title: "Availability", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Show available only" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: availableOnly, onCheckedChange: setAvailableOnly })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBlock, { title: "City", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: city, onValueChange: setCity, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: cities.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: item, children: item === "All" ? "All cities" : item }, item)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBlock, { title: "Max price", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Up to" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
              "Rs. ",
              maxPrice.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { min: 0, max: highestPrice, step: 50, value: [maxPrice], onValueChange: ([value]) => setMaxPrice(value) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBlock, { title: "Sort by", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortBy, onValueChange: setSortBy, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SORT_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: isLoading ? "Loading..." : `${filtered.length} of ${offers.length} offers` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1 text-muted-foreground hover:text-foreground lg:hidden", onClick: resetFilters, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4" }),
            "Reset filters"
          ] })
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-muted-foreground", children: "Loading offers..." }),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-destructive", children: "Failed to load offers." }),
        !isLoading && !isError && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-muted-foreground", children: "No offers match your filters." }),
        !isLoading && !isError && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3", children: filtered.map((offer) => /* @__PURE__ */ jsxRuntimeExports.jsx(OfferCard, { o: offer }, offer.id)) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function FilterBlock({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground", children: title }),
    children
  ] });
}
function OfferCard({
  o
}) {
  const booked = o.totalSlots - o.remainingSlots;
  const pct = o.totalSlots > 0 ? booked / o.totalSlots * 100 : 0;
  const remaining = o.remainingSlots;
  const discountPct = discountFor(o);
  const endsIn = new Date(o.endDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/offers/$offerId", params: {
    offerId: o.id
  }, className: "group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-pop", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative aspect-[16/10] bg-gradient-to-br ${gradientForId(o.id)}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 top-0 flex items-start justify-between p-3", children: [
        discountPct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-foreground/85 px-2 py-0.5 text-[10px] font-medium text-background backdrop-blur", children: [
          "-",
          discountPct,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto inline-flex items-center gap-1 rounded-full bg-canvas/90 px-2 py-0.5 text-[10px] backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5" }),
          "ends ",
          endsIn
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 flex items-end justify-between p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-canvas/90 px-2 py-0.5 text-[10px] backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${remaining === 0 ? "bg-destructive" : "bg-success"}` }),
        remaining === 0 ? "Waitlist" : `${remaining} slots left`
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: o.business?.name ?? "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: o.business?.city ? `- ${o.business.city}` : "" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-display text-xl leading-snug", children: o.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl", children: [
          "Rs. ",
          o.offerPrice.toLocaleString()
        ] }),
        o.originalPrice > o.offerPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground line-through", children: [
          "Rs. ",
          o.originalPrice.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-foreground", style: {
        width: `${pct}%`
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
          booked,
          "/",
          o.totalSlots,
          " booked"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium group-hover:gap-1.5", children: [
          "Book now",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
        ] })
      ] })
    ] })
  ] });
}
export {
  OfferCard,
  OffersListing as component
};

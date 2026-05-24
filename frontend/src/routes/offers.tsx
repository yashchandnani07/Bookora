import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Clock, Filter, ArrowRight, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getAllOffers, type Offer } from "@/lib/api/offers";
import { subscribeToBookingUpdates } from "@/lib/realtime/bookings";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Live offers - Bookora" },
      {
        name: "description",
        content: "Discover live, limited-time offers from venues near you. Book in seconds.",
      },
    ],
  }),
  component: OffersListing,
});

const CATEGORIES = [
  "All",
  "Gym",
  "Salon",
  "Cafe",
  "Restaurant",
  "Clinic",
  "Coaching",
  "Turf",
  "Spa",
  "Other",
];

const SORT_OPTIONS = [
  { value: "ending-soon", label: "Ending soon" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "discount", label: "Best discount" },
  { value: "availability", label: "Most available" },
];

const COVER_GRADIENTS = [
  "from-amber-200 via-rose-200 to-orange-300",
  "from-stone-200 via-amber-100 to-rose-200",
  "from-emerald-200 via-lime-200 to-teal-200",
  "from-purple-200 via-pink-100 to-rose-200",
  "from-neutral-300 via-stone-200 to-zinc-300",
  "from-zinc-300 via-stone-300 to-amber-200",
  "from-orange-200 via-red-200 to-rose-300",
  "from-sky-200 via-blue-100 to-indigo-200",
];

function gradientForId(id: string) {
  const idx =
    id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % COVER_GRADIENTS.length;
  return COVER_GRADIENTS[idx];
}

function discountFor(offer: Offer) {
  if (offer.originalPrice <= 0) return 0;
  return Math.round((1 - offer.offerPrice / offer.originalPrice) * 100);
}

function OffersListing() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [city, setCity] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("ending-soon");

  const queryClient = useQueryClient();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const { data: offers = [], isLoading, isError } = useQuery({
    queryKey: ["offers", "all"],
    queryFn: getAllOffers,
  });

  useEffect(() => {
    return subscribeToBookingUpdates({
      onSlotUpdated: (update) => {
        queryClient.setQueryData<Offer[]>(["offers", "all"], (current) => {
          if (!current) return current;

          return current.map((offer) =>
            offer.id === update.offerId
              ? {
                  ...offer,
                  remainingSlots: update.remainingSlots,
                  totalSlots: update.totalSlots || offer.totalSlots,
                }
              : offer
          );
        });

        queryClient.setQueryData<Offer>(["offer", update.offerId], (current) =>
          current
            ? {
                ...current,
                remainingSlots: update.remainingSlots,
                totalSlots: update.totalSlots || current.totalSlots,
              }
            : current
        );
      },
      onOfferCreated: () => {
        queryClient.invalidateQueries({ queryKey: ["offers", "all"] });
      },
    });
  }, [queryClient]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [search]);

  const cities = useMemo(() => {
    const values = offers
      .map((offer) => offer.business?.city)
      .filter((value): value is string => Boolean(value));

    return ["All", ...Array.from(new Set(values)).sort()];
  }, [offers]);

  const highestPrice = useMemo(() => {
    return Math.max(1000, ...offers.map((offer) => Math.ceil(offer.offerPrice)));
  }, [offers]);

  useEffect(() => {
    setMaxPrice(highestPrice);
  }, [highestPrice]);

  const filtered = useMemo(() => {
    const matches = offers.filter((offer) => {
      const haystack = [
        offer.title,
        offer.description,
        offer.category,
        offer.business?.name,
        offer.business?.city,
        offer.business?.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        (!debouncedSearch || haystack.includes(debouncedSearch)) &&
        (active === "All" || offer.category === active) &&
        (city === "All" || offer.business?.city === city) &&
        (!availableOnly || offer.remainingSlots > 0) &&
        offer.offerPrice <= maxPrice
      );
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
    return <Outlet />;
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

  return (
    <div className="bg-canvas">
      <PublicNav />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pt-14 pb-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Marketplace
              </div>
              <h1 className="mt-2 font-display text-5xl leading-tight md:text-6xl">
                Live offers near you.
              </h1>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Limited-time slots from {offers.length}+ venues. Updated in real time.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="pulse-dot inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              Live marketplace
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-2 shadow-card md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search offers, venues, categories..."
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="hidden h-6 w-px bg-border md:block" />
            <div className="flex items-center gap-2 px-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="h-9 w-36 border-0 bg-transparent px-0 shadow-none focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item === "All" ? "All cities" : item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="hidden h-6 w-px bg-border md:block" />
            <div className="flex items-center gap-2 px-3 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Today
            </div>
            <Button className="rounded-full" onClick={() => setAvailableOnly(true)}>
              Find slots
            </Button>
          </div>

          <div className="mt-6 -mx-6 overflow-x-auto px-6">
            <div className="flex gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActive(category)}
                  className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    active === category
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card hover:border-foreground/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-6 lg:flex-row">
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-24 space-y-6 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </div>
                  <button
                    className="text-xs text-muted-foreground hover:text-foreground"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                </div>

                <FilterBlock title="Availability">
                  <div className="flex items-center justify-between text-sm">
                    <span>Show available only</span>
                    <Switch checked={availableOnly} onCheckedChange={setAvailableOnly} />
                  </div>
                </FilterBlock>

                <FilterBlock title="City">
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="bg-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item === "All" ? "All cities" : item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FilterBlock>

                <FilterBlock title="Max price">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Up to</span>
                      <span className="font-mono">Rs. {maxPrice.toLocaleString()}</span>
                    </div>
                    <Slider
                      min={0}
                      max={highestPrice}
                      step={50}
                      value={[maxPrice]}
                      onValueChange={([value]) => setMaxPrice(value)}
                    />
                  </div>
                </FilterBlock>

                <FilterBlock title="Sort by">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FilterBlock>
              </div>
            </aside>

            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between text-sm">
                <div className="text-muted-foreground">
                  {isLoading ? "Loading..." : `${filtered.length} of ${offers.length} offers`}
                </div>
                <button
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground lg:hidden"
                  onClick={resetFilters}
                >
                  <Filter className="h-4 w-4" />
                  Reset filters
                </button>
              </div>

              {isLoading && (
                <div className="py-20 text-center text-muted-foreground">Loading offers...</div>
              )}

              {isError && (
                <div className="py-20 text-center text-destructive">Failed to load offers.</div>
              )}

              {!isLoading && !isError && filtered.length === 0 && (
                <div className="py-20 text-center text-muted-foreground">
                  No offers match your filters.
                </div>
              )}

              {!isLoading && !isError && filtered.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((offer) => (
                    <OfferCard key={offer.id} o={offer} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}

export function OfferCard({ o }: { o: Offer }) {
  const booked = o.totalSlots - o.remainingSlots;
  const pct = o.totalSlots > 0 ? (booked / o.totalSlots) * 100 : 0;
  const remaining = o.remainingSlots;
  const discountPct = discountFor(o);
  const endsIn = new Date(o.endDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  return (
    <Link
      to="/offers/$offerId"
      params={{ offerId: o.id }}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-pop"
    >
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${gradientForId(o.id)}`}>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {discountPct > 0 && (
            <span className="rounded-full bg-foreground/85 px-2 py-0.5 text-[10px] font-medium text-background backdrop-blur">
              -{discountPct}%
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-canvas/90 px-2 py-0.5 text-[10px] backdrop-blur">
            <Clock className="h-2.5 w-2.5" />
            ends {endsIn}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-canvas/90 px-2 py-0.5 text-[10px] backdrop-blur">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                remaining === 0 ? "bg-destructive" : "bg-success"
              }`}
            />
            {remaining === 0 ? "Waitlist" : `${remaining} slots left`}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{o.business?.name ?? "-"}</span>
          <span>{o.business?.city ? `- ${o.business.city}` : ""}</span>
        </div>
        <h3 className="mt-1 font-display text-xl leading-snug">{o.title}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-2xl">Rs. {o.offerPrice.toLocaleString()}</span>
          {o.originalPrice > o.offerPrice && (
            <span className="text-sm text-muted-foreground line-through">
              Rs. {o.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-foreground" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">
            {booked}/{o.totalSlots} booked
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium group-hover:gap-1.5">
            Book now
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

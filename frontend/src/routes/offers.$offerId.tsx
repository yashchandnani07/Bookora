import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getOfferById } from "@/lib/api/offers";
import type { Offer } from "@/lib/api/offers";
import { getOfferSlots, type OfferSlot } from "@/lib/api/slots";
import { subscribeToBookingUpdates } from "@/lib/realtime/bookings";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  MapPin,
  Share2,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/offers/$offerId")({
  head: () => ({
    meta: [
      { title: "Offer - Bookora" },
      { name: "description", content: "Book a live slot powered by Bookora." },
    ],
  }),
  component: OfferDetail,
});

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

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatSlot(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function OfferDetail() {
  const { offerId } = Route.useParams();
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: offer, isLoading, isError } = useQuery({
    queryKey: ["offer", offerId],
    queryFn: () => getOfferById(offerId),
    retry: false,
  });

  const { data: slots = [], isLoading: slotsLoading } = useQuery({
    queryKey: ["offer-slots", offerId],
    queryFn: () => getOfferSlots(offerId),
  });

  useEffect(() => {
    return subscribeToBookingUpdates((update) => {
      if (update.offerId !== offerId) return;

      queryClient.setQueryData<Offer>(["offer", offerId], (current) =>
        current
          ? {
              ...current,
              remainingSlots: update.remainingSlots,
              totalSlots: update.totalSlots || current.totalSlots,
            }
          : current
      );

      queryClient.setQueryData<OfferSlot[]>(["offer-slots", offerId], (current) => {
        if (!current) return current;

        return current.map((slot) =>
          slot.id === update.slotId
            ? {
                ...slot,
                capacity: update.capacity || slot.capacity,
                bookedCount: update.bookedCount,
                remainingCapacity: update.remainingCapacity,
                status: update.status,
              }
            : slot
        );
      });
    });
  }, [offerId, queryClient]);

  useEffect(() => {
    if (selectedSlotId || slots.length === 0) return;

    const firstAvailable = slots.find(
      (slot) => slot.status === "Available" && slot.remainingCapacity > 0
    );

    if (firstAvailable) {
      setSelectedSlotId(firstAvailable.id);
    }
  }, [selectedSlotId, slots]);

  if (isLoading) {
    return (
      <div className="bg-canvas">
        <PublicNav />
        <div className="grid min-h-[60vh] place-items-center text-muted-foreground">
          Loading offer...
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !offer) {
    return (
      <div className="bg-canvas">
        <PublicNav />
        <div className="grid min-h-[60vh] place-items-center">
          <div className="text-center">
            <p className="text-xl font-display">Offer not found</p>
            <Link to="/offers" className="mt-4 inline-block text-sm underline">
              Back to offers
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const booked = offer.totalSlots - offer.remainingSlots;
  const pct = offer.totalSlots > 0 ? (booked / offer.totalSlots) * 100 : 0;
  const discountPct =
    offer.originalPrice > 0
      ? Math.round((1 - offer.offerPrice / offer.originalPrice) * 100)
      : 0;
  const savings = offer.originalPrice - offer.offerPrice;

  return (
    <div className="bg-canvas">
      <PublicNav />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/offers" className="hover:text-foreground">
              Offers
            </Link>
            <span>/</span>
            <span>{offer.category || "General"}</span>
            <span>/</span>
            <span className="text-foreground">{offer.business?.name ?? "-"}</span>
          </div>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div
                className={`aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${gradientForId(offer.id)}`}
              />

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
                {discountPct > 0 && (
                  <span className="rounded-full bg-foreground px-2.5 py-0.5 text-background">
                    -{discountPct}% off
                  </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-0.5">
                  <span className="pulse-dot inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  Live, ends {formatDate(offer.endDate)}
                </span>
                {offer.business?.city && (
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {offer.business.city}
                  </span>
                )}
              </div>

              <h1 className="mt-4 font-display text-5xl leading-tight">{offer.title}</h1>
              <p className="mt-2 text-muted-foreground">
                by <span className="text-foreground">{offer.business?.name ?? "-"}</span>
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { label: "Rating", value: "4.9", sub: "318 reviews", icon: Star },
                  { label: "Duration", value: "1 slot", sub: "current MVP", icon: Clock },
                  {
                    label: "Per booking",
                    value: `1-${offer.maxBookingPerCustomer}`,
                    sub: "people",
                    icon: Users,
                  },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border bg-card p-4">
                    <s.icon className="h-4 w-4 text-muted-foreground" />
                    <div className="mt-3 font-display text-2xl">{s.value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>

              <div className="prose mt-10 max-w-none">
                <h2 className="font-display text-2xl">About this offer</h2>
                <p className="text-muted-foreground">
                  {offer.description ||
                    `A curated experience by ${offer.business?.name ?? "this venue"}.`}
                </p>
                <h3 className="mt-8 font-display text-xl">What's included</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {[
                    "Curated session experience",
                    "Equipment included",
                    "Complimentary refreshments",
                    "Locker and towel service",
                    "Trained host",
                    "Confirmation after booking",
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-success" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl">
                    Rs. {offer.offerPrice.toLocaleString()}
                  </span>
                  {offer.originalPrice > offer.offerPrice && (
                    <span className="text-muted-foreground line-through">
                      Rs. {offer.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {savings > 0 && (
                    <span className="ml-auto rounded-full bg-lime px-2 py-0.5 text-xs font-medium">
                      Save Rs. {savings.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Realtime availability</span>
                    <span className="font-mono">
                      {booked}/{offer.totalSlots}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-foreground" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="mt-6 space-y-1.5">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Select slot
                  </div>
                  <div className="grid gap-2">
                    {slotsLoading && (
                      <div className="rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground">
                        Loading slots...
                      </div>
                    )}

                    {!slotsLoading && slots.length === 0 && (
                      <div className="rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground">
                        No slots are available for this offer yet.
                      </div>
                    )}

                    {!slotsLoading &&
                      slots.map((slot) => {
                        const full =
                          slot.remainingCapacity <= 0 || slot.status !== "Available";
                        const selected = selectedSlotId === slot.id;

                        return (
                          <button
                            key={slot.id}
                            disabled={full}
                            onClick={() => setSelectedSlotId(slot.id)}
                            className={`flex items-center justify-between rounded-lg border p-3 text-left transition-colors disabled:cursor-not-allowed ${
                              selected
                                ? "border-foreground bg-foreground/5"
                                : "border-border bg-card hover:border-foreground/30 disabled:opacity-60"
                            }`}
                          >
                            <div>
                              <div className="text-sm font-medium">
                                {formatSlot(slot.slotStart)}
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                Ends {formatSlot(slot.slotEnd)}
                              </div>
                            </div>
                            <div className="text-right text-xs">
                              {full ? (
                                <span className="text-muted-foreground">Full</span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-success">
                                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                  {slot.remainingCapacity} left
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </div>

                {selectedSlotId ? (
                  <Button asChild className="mt-6 w-full rounded-full" size="lg">
                    <Link
                      to="/book/$offerId"
                      params={{ offerId: offer.id }}
                      search={{ slotId: selectedSlotId }}
                    >
                      Continue to book <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button disabled className="mt-6 w-full rounded-full" size="lg">
                    Select a slot to continue
                  </Button>
                )}

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Free reschedule
                  </span>
                  <button className="inline-flex items-center gap-1 hover:text-foreground">
                    <Share2 className="h-3 w-3" /> Share
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-border bg-card p-5">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Location
                </div>
                <div className="mt-2 font-medium">{offer.business?.name ?? "-"}</div>
                <div className="text-sm text-muted-foreground">
                  {offer.business?.address
                    ? `${offer.business.address}, ${offer.business.city}`
                    : offer.business?.city ?? "-"}
                </div>
                <div className="mt-3 aspect-[16/9] rounded-lg bg-gradient-to-br from-stone-200 via-canvas to-stone-100" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <Calendar className="h-3 w-3" /> More from this venue
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Discover more offers from {offer.business?.name ?? "this venue"} on the{" "}
            <Link to="/offers" className="underline hover:text-foreground">
              marketplace
            </Link>
            .
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

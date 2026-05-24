import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/lib/api/bookings";
import { getOfferById } from "@/lib/api/offers";
import { getOfferSlots } from "@/lib/api/slots";
import { ArrowRight, Check, Loader2, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/book/$offerId")({
  validateSearch: (search: Record<string, unknown>) => ({
    slotId: typeof search.slotId === "string" ? search.slotId : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book - Bookora" },
      { name: "description", content: "Complete your Bookora reservation." },
    ],
  }),
  component: Book,
});

function formatSlot(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Book() {
  const { offerId } = Route.useParams();
  const { slotId } = Route.useSearch();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [specialNote, setSpecialNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: offer, isLoading: offerLoading } = useQuery({
    queryKey: ["offer", offerId],
    queryFn: () => getOfferById(offerId),
    retry: false,
  });

  const { data: slots = [], isLoading: slotsLoading } = useQuery({
    queryKey: ["offer-slots", offerId],
    queryFn: () => getOfferSlots(offerId),
  });

  const selectedSlot = useMemo(() => {
    if (slotId) {
      return slots.find((slot) => slot.id === slotId);
    }

    return slots.find(
      (slot) => slot.status === "Available" && slot.remainingCapacity > 0
    );
  }, [slotId, slots]);

  const maxPeople = Math.max(
    1,
    Math.min(
      offer?.maxBookingPerCustomer ?? 1,
      selectedSlot?.remainingCapacity ?? 1
    )
  );

  async function handleSubmit() {
    if (!offer || !selectedSlot) {
      setError("Please select an available slot before booking.");
      toast.error("Please select an available slot");
      return;
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      setError("Customer name and phone number are required.");
      toast.error("Name and phone are required");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const booking = await createBooking({
        offerId: offer.id,
        slotId: selectedSlot.id,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        peopleCount,
        specialNote: specialNote.trim() || undefined,
      });

      toast.success("Booking confirmed");
      navigate({
        to: "/booking-confirmed",
        search: { bookingId: booking.id },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create booking.");
      toast.error("Failed to create booking");
    } finally {
      setSubmitting(false);
    }
  }

  if (offerLoading || slotsLoading) {
    return (
      <div className="bg-canvas">
        <PublicNav />
        <div className="grid min-h-[60vh] place-items-center text-muted-foreground">
          Loading booking...
        </div>
        <Footer />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="bg-canvas">
        <PublicNav />
        <div className="grid min-h-[60vh] place-items-center">Offer not found.</div>
        <Footer />
      </div>
    );
  }

  const total = offer.offerPrice * peopleCount;
  const discount = Math.max(0, offer.originalPrice - offer.offerPrice) * peopleCount;

  return (
    <div className="bg-canvas">
      <PublicNav />
      <section>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center gap-2 text-xs">
            {["Slot", "Your details", "Confirm"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${
                    i <= 1 ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={i <= 1 ? "text-foreground" : "text-muted-foreground"}>{s}</span>
                {i < 2 && <span className="h-px w-8 bg-border" />}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h1 className="font-display text-4xl">Your details</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                We'll send your confirmation to these contact details.
              </p>

              {error && (
                <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}

              {!selectedSlot && (
                <div className="mt-6 rounded-lg border border-warning/30 bg-warning/10 px-4 py-2 text-sm text-warning">
                  No available slot was selected for this offer.
                </div>
              )}

              <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Customer name</Label>
                    <Input
                      placeholder="Jordan Kim"
                      className="bg-card"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                    {customerName.trim() && (
                      <div className="text-[11px] text-success inline-flex items-center gap-1">
                        <Check className="h-3 w-3" /> Looks good
                      </div>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Phone number</Label>
                    <div className="flex">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-card px-3 text-sm text-muted-foreground">
                        +91
                      </span>
                      <Input
                        placeholder="98765 43210"
                        className="rounded-l-none bg-card"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>
                    Email <span className="text-muted-foreground text-xs">optional</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    className="bg-card"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Selected slot</Label>
                    <div className="flex items-center justify-between rounded-md border border-input bg-card px-3 py-2 text-sm">
                      <span>
                        {selectedSlot
                          ? `${formatSlot(selectedSlot.slotStart)} - ${formatSlot(
                              selectedSlot.slotEnd
                            )}`
                          : "No available slot"}
                      </span>
                      <Link
                        to="/offers/$offerId"
                        params={{ offerId }}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Change
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Number of people</Label>
                    <div className="inline-flex items-center gap-3 rounded-md border border-input bg-card px-3 py-2">
                      <button
                        type="button"
                        className="grid h-6 w-6 place-items-center rounded-md hover:bg-muted"
                        onClick={() => setPeopleCount((value) => Math.max(1, value - 1))}
                      >
                        -
                      </button>
                      <span className="font-mono text-sm">{peopleCount}</span>
                      <button
                        type="button"
                        className="grid h-6 w-6 place-items-center rounded-md hover:bg-muted"
                        onClick={() =>
                          setPeopleCount((value) => Math.min(maxPeople, value + 1))
                        }
                      >
                        +
                      </button>
                      <span className="ml-auto text-xs text-muted-foreground">
                        Max {maxPeople}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>
                    Special note <span className="text-muted-foreground text-xs">optional</span>
                  </Label>
                  <Textarea
                    placeholder="Allergies, accessibility needs, special requests..."
                    className="bg-card"
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                  />
                </div>

                <div className="rounded-xl border border-border bg-card p-4 text-xs text-muted-foreground">
                  <div className="inline-flex items-center gap-1 text-foreground">
                    <ShieldCheck className="h-3.5 w-3.5" /> Secure and private
                  </div>
                  <p className="mt-1">
                    Your details are only shared with {offer.business?.name ?? "the venue"} to
                    manage your booking.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    to="/offers/$offerId"
                    params={{ offerId: offer.id }}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Back
                  </Link>
                  <Button
                    size="lg"
                    className="rounded-full"
                    onClick={handleSubmit}
                    disabled={submitting || !selectedSlot}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Confirming...
                      </>
                    ) : (
                      <>
                        Confirm booking <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Order summary
                </div>
                <div className="mt-4 flex gap-3">
                  <div className="aspect-square h-16 rounded-lg bg-gradient-to-br from-amber-200 via-rose-200 to-orange-300" />
                  <div>
                    <div className="text-sm font-medium leading-tight">{offer.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {offer.business?.name ?? "Venue"} - {offer.business?.city ?? "City"}
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                  <Row
                    label={`Rs. ${offer.offerPrice.toLocaleString()} x ${peopleCount}`}
                    value={`Rs. ${total.toLocaleString()}`}
                  />
                  <Row label="Platform fee" value="Rs. 0" muted />
                  <Row label="Discount" value={`- Rs. ${discount.toLocaleString()}`} muted />
                </div>
                <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-display text-3xl">Rs. {total.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" /> Booking confirmed instantly
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={muted ? "text-muted-foreground" : ""}>{label}</span>
      <span className={muted ? "text-muted-foreground" : ""}>{value}</span>
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AdminTopbar } from "@/components/layout/AdminTopbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { createOffer } from "@/lib/api/offers";
import { useBusinessProfile } from "@/hooks/use-business";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/offers/new")({
  head: () => ({
    meta: [
      { title: "Create offer · Bookora" },
      { name: "description", content: "Compose a new limited-time offer." },
    ],
  }),
  component: NewOffer,
});

function NewOffer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: business } = useBusinessProfile();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");
  const [originalPrice, setOriginalPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [totalSlots, setTotalSlots] = useState("");
  const [maxBookingPerCustomer, setMaxBookingPerCustomer] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");

  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(publishStatus: "Draft" | "Active") {
    if (!business?.id) {
      setError("Business not found. Please complete your profile first.");
      toast.error("Business profile is missing");
      return;
    }

    if (!title || !startDate || !endDate || !offerPrice || !originalPrice || !totalSlots) {
      setError("Please fill in all required fields.");
      toast.error("Please fill required offer fields");
      return;
    }

    const isSavingDraft = publishStatus === "Draft";
    isSavingDraft ? setSaving(true) : setPublishing(true);
    setError(null);

    try {
      await createOffer({
        title,
        description,
        category,
        originalPrice: parseFloat(originalPrice),
        offerPrice: parseFloat(offerPrice),
        totalSlots: parseInt(totalSlots, 10),
        maxBookingPerCustomer: parseInt(maxBookingPerCustomer, 10),
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        status: publishStatus,
        businessId: business.id,
      });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["offers", "my"] }),
        queryClient.invalidateQueries({ queryKey: ["offers", "all"] }),
      ]);

      toast.success(publishStatus === "Active" ? "Offer published" : "Draft saved");
      navigate({ to: "/admin/offers" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create offer.");
      toast.error("Failed to create offer");
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  }

  const discountPct =
    originalPrice && offerPrice && parseFloat(originalPrice) > 0
      ? Math.round((1 - parseFloat(offerPrice) / parseFloat(originalPrice)) * 100)
      : 0;

  const bookedPreview = 0;
  const totalPreview = parseInt(totalSlots, 10) || 24;
  const pctPreview = totalPreview > 0 ? (bookedPreview / totalPreview) * 100 : 0;

  return (
    <>
      <AdminTopbar
        title="New offer"
        subtitle="Compose, preview, and publish in seconds"
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full bg-card"
              onClick={() => handleSubmit("Draft")}
              disabled={saving || publishing}
            >
              {saving ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</> : "Save draft"}
            </Button>
            <Button
              className="rounded-full"
              onClick={() => handleSubmit("Active")}
              disabled={saving || publishing}
            >
              {publishing ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Publishing…</> : "Publish offer"}
            </Button>
          </div>
        }
      />

      {error && (
        <div className="mx-6 mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive lg:mx-10">
          {error}
        </div>
      )}

      <div className="p-6 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <Section title="Basics" desc="Name your offer and describe what's included.">
              <Field label="Offer title">
                <Input
                  placeholder="Peak Hour Training · 60 min"
                  className="bg-card"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field>
              <Field label="Description">
                <Textarea
                  placeholder="A guided session…"
                  rows={4}
                  className="bg-card"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Category">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="Choose" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Gym", "Salon", "Cafe", "Restaurant", "Clinic", "Coaching", "Turf", "Spa", "Other"].map(
                        (c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Status">
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="bg-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Draft", "Active", "Paused", "Expired", "Cancelled"].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </Section>

            <Section title="Pricing" desc="Set your original and offer pricing.">
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Original price">
                  <Input
                    placeholder="₹1200"
                    className="bg-card"
                    type="number"
                    min="0"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                  />
                </Field>
                <Field label="Offer price">
                  <Input
                    placeholder="₹599"
                    className="bg-card"
                    type="number"
                    min="0"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                  />
                </Field>
                <Field label="Discount %">
                  <Input
                    className="bg-card"
                    readOnly
                    value={discountPct > 0 ? `${discountPct}%` : ""}
                    placeholder="Auto"
                  />
                </Field>
              </div>
            </Section>

            <Section title="Schedule" desc="When customers can book this offer.">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Start date">
                  <Input
                    type="date"
                    className="bg-card"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Field>
                <Field label="End date">
                  <Input
                    type="date"
                    className="bg-card"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Field>
              </div>
            </Section>

            <Section title="Capacity & rules" desc="Manage availability and per-customer limits.">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Total capacity">
                  <Input
                    placeholder="24"
                    className="bg-card"
                    type="number"
                    min="1"
                    value={totalSlots}
                    onChange={(e) => setTotalSlots(e.target.value)}
                  />
                </Field>
                <Field label="Max booking per customer">
                  <Input
                    placeholder="4"
                    className="bg-card"
                    type="number"
                    min="1"
                    value={maxBookingPerCustomer}
                    onChange={(e) => setMaxBookingPerCustomer(e.target.value)}
                  />
                </Field>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Enable waitlist</div>
                    <div className="text-xs text-muted-foreground">
                      Auto-promote when seats free up.
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Section>

            <Section title="Legal" desc="Terms shown at checkout & on confirmation.">
              <Field label="Terms & conditions">
                <Textarea
                  rows={3}
                  placeholder="Non-transferable. Cancellations within 2 hours are non-refundable…"
                  className="bg-card"
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                />
              </Field>
            </Section>

            <div className="flex items-center justify-between border-t border-border pt-6">
              <Link
                to="/admin/offers"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to offers
              </Link>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-full bg-card"
                  onClick={() => handleSubmit("Draft")}
                  disabled={saving || publishing}
                >
                  {saving ? "Saving…" : "Save draft"}
                </Button>
                <Button
                  className="rounded-full"
                  onClick={() => handleSubmit("Active")}
                  disabled={saving || publishing}
                >
                  {publishing ? "Publishing…" : "Publish offer"}
                </Button>
              </div>
            </div>
          </form>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Live preview
            </div>
            <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-[16/10] bg-gradient-to-br from-amber-200 via-rose-200 to-orange-300" />
              <div className="p-4">
                <div className="text-xs text-muted-foreground">
                  {business?.name || "Your business"} · {business?.city || "Your city"}
                </div>
                <div className="mt-1 font-display text-xl">
                  {title || "Offer title"}
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-2xl">
                    ₹{offerPrice ? parseFloat(offerPrice).toLocaleString() : "—"}
                  </span>
                  {originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{parseFloat(originalPrice).toLocaleString()}
                    </span>
                  )}
                  {discountPct > 0 && (
                    <span className="ml-auto rounded-full bg-lime px-2 py-0.5 text-[10px]">
                      -{discountPct}%
                    </span>
                  )}
                </div>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-foreground" style={{ width: `${pctPreview}%` }} />
                </div>
                <div className="mt-2 text-[11px] text-muted-foreground">
                  {bookedPreview}/{totalPreview} booked
                </div>
                <Button className="mt-4 w-full rounded-full">Book now</Button>
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              This preview updates as you edit the form.
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 border-b border-border pb-8 md:grid-cols-[220px_1fr]">
      <div>
        <h2 className="font-display text-xl">{title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

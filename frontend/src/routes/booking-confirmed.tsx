import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getBookingById } from "@/lib/api/bookings";
import { CalendarPlus, Check, Download, MapPin, MessageCircle, Share2 } from "lucide-react";

export const Route = createFileRoute("/booking-confirmed")({
  validateSearch: (search: Record<string, unknown>) => ({
    bookingId: typeof search.bookingId === "string" ? search.bookingId : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Booking confirmed - Bookora" },
      { name: "description", content: "Your Bookora reservation is confirmed." },
    ],
  }),
  component: Confirmed,
});

function formatSlot(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function toCalendarDate(value: string) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function cleanFilename(value: string) {
  return value.replace(/[^a-z0-9-]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
}

function Confirmed() {
  const { bookingId } = Route.useSearch();

  const { data: booking, isLoading, isError } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingById(bookingId!),
    enabled: Boolean(bookingId),
    retry: false,
  });

  if (!bookingId) {
    return (
      <div className="bg-canvas">
        <PublicNav />
        <div className="grid min-h-[60vh] place-items-center text-center">
          <div>
            <p className="font-display text-2xl">Booking reference missing</p>
            <Link to="/offers" className="mt-4 inline-block text-sm underline">
              Browse offers
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-canvas">
        <PublicNav />
        <div className="grid min-h-[60vh] place-items-center text-muted-foreground">
          Loading confirmation...
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="bg-canvas">
        <PublicNav />
        <div className="grid min-h-[60vh] place-items-center text-center">
          <div>
            <p className="font-display text-2xl">Booking not found</p>
            <Link to="/offers" className="mt-4 inline-block text-sm underline">
              Browse offers
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const business = booking.offer?.business;
  const businessName = business?.name || "Bookora partner venue";
  const location = business?.address
    ? `${business.address}, ${business.city}`
    : business?.city || businessName;
  const slotText = `${formatSlot(booking.slot.slotStart)} - ${formatSlot(
    booking.slot.slotEnd
  )}`;

  function handleAddToCalendar() {
    const title = `Bookora booking: ${booking.offer?.title ?? "Offer"}`;
    const description = [
      `Booking reference: ${booking.bookingReference}`,
      `Customer: ${booking.customerName}`,
      `People: ${booking.peopleCount}`,
      `Status: ${booking.status}`,
    ].join("\\n");

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Bookora//Booking Confirmation//EN",
      "BEGIN:VEVENT",
      `UID:${booking.id}@bookora`,
      `DTSTAMP:${toCalendarDate(new Date().toISOString())}`,
      `DTSTART:${toCalendarDate(booking.slot.slotStart)}`,
      `DTEND:${toCalendarDate(booking.slot.slotEnd)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    downloadFile(
      `${cleanFilename(booking.bookingReference)}.ics`,
      ics,
      "text/calendar;charset=utf-8"
    );
  }

  function handleDownloadPass() {
    const pass = [
      "BOOKORA BOOKING PASS",
      "",
      `Reference: ${booking.bookingReference}`,
      `Offer: ${booking.offer?.title ?? "-"}`,
      `Business: ${businessName}`,
      `Slot: ${slotText}`,
      `Customer: ${booking.customerName}`,
      `People: ${booking.peopleCount}`,
      `Status: ${booking.status}`,
      `Location: ${location}`,
      "",
      "Show this pass at the venue when you arrive.",
    ].join("\n");

    downloadFile(
      `${cleanFilename(booking.bookingReference)}-pass.txt`,
      pass,
      "text/plain;charset=utf-8"
    );
  }

  async function handleShare() {
    const shareUrl = window.location.href;
    const shareData = {
      title: "Bookora booking confirmed",
      text: `${booking.offer?.title ?? "Booking"} confirmed. Reference: ${
        booking.bookingReference
      }`,
      url: shareUrl,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    window.alert("Booking link copied to clipboard.");
  }

  function handleContactVenue() {
    if (business?.phone) {
      window.location.href = `tel:${business.phone}`;
      return;
    }

    if (business?.email) {
      window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
        `Booking ${booking.bookingReference}`
      )}`;
      return;
    }

    window.alert("Venue contact details are not available yet.");
  }

  return (
    <div className="bg-canvas">
      <PublicNav />
      <section>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-3xl border border-border bg-card p-10 shadow-elegant">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-lime">
                <Check className="h-6 w-6" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Confirmed
                </div>
                <h1 className="font-display text-3xl leading-tight">
                  You're booked, {booking.customerName}.
                </h1>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">
              Your booking is confirmed. Show this code at the venue when you arrive.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-[1fr_220px]">
              <div className="space-y-4">
                <Detail label="Reference" value={booking.bookingReference} mono />
                <Detail label="Offer" value={booking.offer?.title ?? "-"} />
                <Detail label="Business" value={businessName} />
                <Detail label="Slot" value={slotText} />
                <Detail
                  label="Customer"
                  value={`${booking.customerName} - ${booking.peopleCount} ${
                    booking.peopleCount === 1 ? "person" : "people"
                  }`}
                />
                <Detail
                  label="Status"
                  value={
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" /> {booking.status}
                    </span>
                  }
                />
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-canvas p-4">
                <div className="grid h-44 w-44 grid-cols-12 gap-px overflow-hidden rounded-md bg-foreground p-1.5">
                  {Array.from({ length: 144 }).map((_, i) => {
                    const seed = booking.bookingReference.charCodeAt(
                      i % booking.bookingReference.length
                    );
                    const on = (seed + i) % 3 === 0 || i % 11 === 0;
                    return <span key={i} className={on ? "bg-canvas" : "bg-foreground"} />;
                  })}
                </div>
                <div className="font-mono text-xs">{booking.bookingReference}</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Button className="rounded-full" onClick={handleAddToCalendar}>
                <CalendarPlus className="h-4 w-4" /> Add to calendar
              </Button>
              <Button variant="outline" className="rounded-full bg-card" onClick={handleDownloadPass}>
                <Download className="h-4 w-4" /> Download pass
              </Button>
              <Button variant="outline" className="rounded-full bg-card" onClick={handleShare}>
                <Share2 className="h-4 w-4" /> Share
              </Button>
              <Button variant="outline" className="rounded-full bg-card" onClick={handleContactVenue}>
                <MessageCircle className="h-4 w-4" /> Contact venue
              </Button>
            </div>

            <div className="mt-8 grid gap-3 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground sm:grid-cols-2">
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {location}
              </div>
              <div>Arrive 10 minutes before your slot.</div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between text-sm">
            <Link to="/offers" className="text-muted-foreground hover:text-foreground">
              Browse more offers
            </Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Back to home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Detail({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-border pb-2">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className={`text-right ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}

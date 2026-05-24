import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PublicNav, F as Footer } from "./Footer-DV6EqzRY.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { g as getBookingById } from "./bookings-HTZk0Hqs.mjs";
import { R as Route$d } from "./router-Dn9S88Ix.mjs";
import "../_libs/sonner.mjs";
import { C as Check, c as CalendarPlus, D as Download, d as Share2, e as MessageCircle, M as MapPin } from "../_libs/lucide-react.mjs";
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
function formatSlot(value) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit"
  });
}
function toCalendarDate(value) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}
function downloadFile(filename, content, type) {
  const blob = new Blob([content], {
    type
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
function cleanFilename(value) {
  return value.replace(/[^a-z0-9-]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
}
function Confirmed() {
  const {
    bookingId
  } = Route$d.useSearch();
  const {
    data: booking,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingById(bookingId),
    enabled: Boolean(bookingId),
    retry: false
  });
  if (!bookingId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-canvas", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[60vh] place-items-center text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl", children: "Booking reference missing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/offers", className: "mt-4 inline-block text-sm underline", children: "Browse offers" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-canvas", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[60vh] place-items-center text-muted-foreground", children: "Loading confirmation..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  if (isError || !booking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-canvas", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[60vh] place-items-center text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl", children: "Booking not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/offers", className: "mt-4 inline-block text-sm underline", children: "Browse offers" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  const business = booking.offer?.business;
  const businessName = business?.name || "Bookora partner venue";
  const location = business?.address ? `${business.address}, ${business.city}` : business?.city || businessName;
  const slotText = `${formatSlot(booking.slot.slotStart)} - ${formatSlot(booking.slot.slotEnd)}`;
  function handleAddToCalendar() {
    const title = `Bookora booking: ${booking.offer?.title ?? "Offer"}`;
    const description = [`Booking reference: ${booking.bookingReference}`, `Customer: ${booking.customerName}`, `People: ${booking.peopleCount}`, `Status: ${booking.status}`].join("\\n");
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Bookora//Booking Confirmation//EN", "BEGIN:VEVENT", `UID:${booking.id}@bookora`, `DTSTAMP:${toCalendarDate((/* @__PURE__ */ new Date()).toISOString())}`, `DTSTART:${toCalendarDate(booking.slot.slotStart)}`, `DTEND:${toCalendarDate(booking.slot.slotEnd)}`, `SUMMARY:${title}`, `DESCRIPTION:${description}`, `LOCATION:${location}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    downloadFile(`${cleanFilename(booking.bookingReference)}.ics`, ics, "text/calendar;charset=utf-8");
  }
  function handleDownloadPass() {
    const pass = ["BOOKORA BOOKING PASS", "", `Reference: ${booking.bookingReference}`, `Offer: ${booking.offer?.title ?? "-"}`, `Business: ${businessName}`, `Slot: ${slotText}`, `Customer: ${booking.customerName}`, `People: ${booking.peopleCount}`, `Status: ${booking.status}`, `Location: ${location}`, "", "Show this pass at the venue when you arrive."].join("\n");
    downloadFile(`${cleanFilename(booking.bookingReference)}-pass.txt`, pass, "text/plain;charset=utf-8");
  }
  async function handleShare() {
    const shareUrl = window.location.href;
    const shareData = {
      title: "Bookora booking confirmed",
      text: `${booking.offer?.title ?? "Booking"} confirmed. Reference: ${booking.bookingReference}`,
      url: shareUrl
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
      window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(`Booking ${booking.bookingReference}`)}`;
      return;
    }
    window.alert("Venue contact details are not available yet.");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-canvas", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-10 shadow-elegant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 place-items-center rounded-full bg-lime", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Confirmed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl leading-tight", children: [
              "You're booked, ",
              booking.customerName,
              "."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Your booking is confirmed. Show this code at the venue when you arrive." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 md:grid-cols-[1fr_220px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Reference", value: booking.bookingReference, mono: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Offer", value: booking.offer?.title ?? "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Business", value: businessName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Slot", value: slotText }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Customer", value: `${booking.customerName} - ${booking.peopleCount} ${booking.peopleCount === 1 ? "person" : "people"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Status", value: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs text-success", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }),
              " ",
              booking.status
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 rounded-xl border border-border bg-canvas p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-44 w-44 grid-cols-12 gap-px overflow-hidden rounded-md bg-foreground p-1.5", children: Array.from({
              length: 144
            }).map((_, i) => {
              const seed = booking.bookingReference.charCodeAt(i % booking.bookingReference.length);
              const on = (seed + i) % 3 === 0 || i % 11 === 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: on ? "bg-canvas" : "bg-foreground" }, i);
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs", children: booking.bookingReference })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-full", onClick: handleAddToCalendar, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "h-4 w-4" }),
            " Add to calendar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full bg-card", onClick: handleDownloadPass, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            " Download pass"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full bg-card", onClick: handleShare, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
            " Share"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full bg-card", onClick: handleContactVenue, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
            " Contact venue"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-3 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
            location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Arrive 10 minutes before your slot." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/offers", className: "text-muted-foreground hover:text-foreground", children: "Browse more offers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-muted-foreground hover:text-foreground", children: "Back to home" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Detail({
  label,
  value,
  mono
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-4 border-b border-dashed border-border pb-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-right ${mono ? "font-mono" : ""}`, children: value })
  ] });
}
export {
  Confirmed as component
};

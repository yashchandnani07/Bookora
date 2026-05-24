import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PublicNav, F as Footer } from "./Footer-DV6EqzRY.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { T as Textarea } from "./textarea-F69quoCd.mjs";
import { c as createBooking } from "./bookings-HTZk0Hqs.mjs";
import { a as getOfferById } from "./offers-jEIiW0Gu.mjs";
import { g as getOfferSlots } from "./slots-Db3a382Z.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as Route$9 } from "./router-Dn9S88Ix.mjs";
import { C as Check, q as ShieldCheck, L as LoaderCircle, A as ArrowRight, I as Lock } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "./client-Bk_QgbDl.mjs";
function formatSlot(value) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit"
  });
}
function Book() {
  const {
    offerId
  } = Route$9.useParams();
  const {
    slotId
  } = Route$9.useSearch();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = reactExports.useState("");
  const [customerPhone, setCustomerPhone] = reactExports.useState("");
  const [customerEmail, setCustomerEmail] = reactExports.useState("");
  const [peopleCount, setPeopleCount] = reactExports.useState(1);
  const [specialNote, setSpecialNote] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const {
    data: offer,
    isLoading: offerLoading
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
  const selectedSlot = reactExports.useMemo(() => {
    if (slotId) {
      return slots.find((slot) => slot.id === slotId);
    }
    return slots.find((slot) => slot.status === "Available" && slot.remainingCapacity > 0);
  }, [slotId, slots]);
  const maxPeople = Math.max(1, Math.min(offer?.maxBookingPerCustomer ?? 1, selectedSlot?.remainingCapacity ?? 1));
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
        customerEmail: customerEmail.trim() || void 0,
        peopleCount,
        specialNote: specialNote.trim() || void 0
      });
      toast.success("Booking confirmed");
      navigate({
        to: "/booking-confirmed",
        search: {
          bookingId: booking.id
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create booking.");
      toast.error("Failed to create booking");
    } finally {
      setSubmitting(false);
    }
  }
  if (offerLoading || slotsLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-canvas", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[60vh] place-items-center text-muted-foreground", children: "Loading booking..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  if (!offer) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-canvas", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[60vh] place-items-center", children: "Offer not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  const total = offer.offerPrice * peopleCount;
  const discount = Math.max(0, offer.originalPrice - offer.offerPrice) * peopleCount;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-canvas", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-xs", children: ["Slot", "Your details", "Confirm"].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-5 w-5 place-items-center rounded-full text-[10px] ${i <= 1 ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`, children: i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: i <= 1 ? "text-foreground" : "text-muted-foreground", children: s }),
        i < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-border" })
      ] }, s)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Your details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "We'll send your confirmation to these contact details." }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive", children: error }),
          !selectedSlot && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-lg border border-warning/30 bg-warning/10 px-4 py-2 text-sm text-warning", children: "No available slot was selected for this offer." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-8 space-y-5", onSubmit: (e) => e.preventDefault(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Customer name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Jordan Kim", className: "bg-card", value: customerName, onChange: (e) => setCustomerName(e.target.value) }),
                customerName.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-success inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
                  " Looks good"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-l-md border border-r-0 border-input bg-card px-3 text-sm text-muted-foreground", children: "+91" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "98765 43210", className: "rounded-l-none bg-card", value: customerPhone, onChange: (e) => setCustomerPhone(e.target.value) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                "Email ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "optional" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", placeholder: "you@email.com", className: "bg-card", value: customerEmail, onChange: (e) => setCustomerEmail(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Selected slot" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-md border border-input bg-card px-3 py-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedSlot ? `${formatSlot(selectedSlot.slotStart)} - ${formatSlot(selectedSlot.slotEnd)}` : "No available slot" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/offers/$offerId", params: {
                    offerId
                  }, className: "text-xs text-muted-foreground hover:text-foreground", children: "Change" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Number of people" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-3 rounded-md border border-input bg-card px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "grid h-6 w-6 place-items-center rounded-md hover:bg-muted", onClick: () => setPeopleCount((value) => Math.max(1, value - 1)), children: "-" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: peopleCount }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "grid h-6 w-6 place-items-center rounded-md hover:bg-muted", onClick: () => setPeopleCount((value) => Math.min(maxPeople, value + 1)), children: "+" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground", children: [
                    "Max ",
                    maxPeople
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                "Special note ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "optional" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Allergies, accessibility needs, special requests...", className: "bg-card", value: specialNote, onChange: (e) => setSpecialNote(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1 text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
                " Secure and private"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1", children: [
                "Your details are only shared with ",
                offer.business?.name ?? "the venue",
                " to manage your booking."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/offers/$offerId", params: {
                offerId: offer.id
              }, className: "text-sm text-muted-foreground hover:text-foreground", children: "Back" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "rounded-full", onClick: handleSubmit, disabled: submitting || !selectedSlot, children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                " Confirming..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "Confirm booking ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:sticky lg:top-24 lg:self-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Order summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square h-16 rounded-lg bg-gradient-to-br from-amber-200 via-rose-200 to-orange-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium leading-tight", children: offer.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                  offer.business?.name ?? "Venue",
                  " - ",
                  offer.business?.city ?? "City"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 border-t border-border pt-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Rs. ${offer.offerPrice.toLocaleString()} x ${peopleCount}`, value: `Rs. ${total.toLocaleString()}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Platform fee", value: "Rs. 0", muted: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Discount", value: `- Rs. ${discount.toLocaleString()}`, muted: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-baseline justify-between border-t border-border pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl", children: [
                "Rs. ",
                total.toLocaleString()
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
            " Booking confirmed instantly"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Row({
  label,
  value,
  muted
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: muted ? "text-muted-foreground" : "", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: muted ? "text-muted-foreground" : "", children: value })
  ] });
}
export {
  Book as component
};

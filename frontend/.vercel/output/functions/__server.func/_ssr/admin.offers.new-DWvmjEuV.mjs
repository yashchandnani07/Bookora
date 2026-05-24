import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { a as useBusinessProfile, A as AdminTopbar } from "./AdminTopbar-DS0sefyF.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { T as Textarea } from "./textarea-F69quoCd.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CUSP6kj8.mjs";
import { S as Switch } from "./switch-DkA5ZPe7.mjs";
import { c as createOffer } from "./offers-jEIiW0Gu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-switch.mjs";
function NewOffer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: business
  } = useBusinessProfile();
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("Draft");
  const [originalPrice, setOriginalPrice] = reactExports.useState("");
  const [offerPrice, setOfferPrice] = reactExports.useState("");
  const [totalSlots, setTotalSlots] = reactExports.useState("");
  const [maxBookingPerCustomer, setMaxBookingPerCustomer] = reactExports.useState("1");
  const [startDate, setStartDate] = reactExports.useState("");
  const [endDate, setEndDate] = reactExports.useState("");
  const [termsAndConditions, setTermsAndConditions] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [publishing, setPublishing] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  async function handleSubmit(publishStatus) {
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
        businessId: business.id
      });
      await Promise.all([queryClient.invalidateQueries({
        queryKey: ["offers", "my"]
      }), queryClient.invalidateQueries({
        queryKey: ["offers", "all"]
      })]);
      toast.success(publishStatus === "Active" ? "Offer published" : "Draft saved");
      navigate({
        to: "/admin/offers"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create offer.");
      toast.error("Failed to create offer");
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  }
  const discountPct = originalPrice && offerPrice && parseFloat(originalPrice) > 0 ? Math.round((1 - parseFloat(offerPrice) / parseFloat(originalPrice)) * 100) : 0;
  const bookedPreview = 0;
  const totalPreview = parseInt(totalSlots, 10) || 24;
  const pctPreview = totalPreview > 0 ? bookedPreview / totalPreview * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "New offer", subtitle: "Compose, preview, and publish in seconds", action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-full bg-card", onClick: () => handleSubmit("Draft"), disabled: saving || publishing, children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
        " Saving…"
      ] }) : "Save draft" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "rounded-full", onClick: () => handleSubmit("Active"), disabled: saving || publishing, children: publishing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
        " Publishing…"
      ] }) : "Publish offer" })
    ] }) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-6 mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive lg:mx-10", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 lg:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.4fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-8", onSubmit: (e) => e.preventDefault(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Basics", desc: "Name your offer and describe what's included.", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Offer title", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Peak Hour Training · 60 min", className: "bg-card", value: title, onChange: (e) => setTitle(e.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "A guided session…", rows: 4, className: "bg-card", value: description, onChange: (e) => setDescription(e.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Gym", "Salon", "Cafe", "Restaurant", "Clinic", "Coaching", "Turf", "Spa", "Other"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: status, onValueChange: setStatus, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Draft", "Active", "Paused", "Expired", "Cancelled"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Pricing", desc: "Set your original and offer pricing.", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Original price", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "₹1200", className: "bg-card", type: "number", min: "0", value: originalPrice, onChange: (e) => setOriginalPrice(e.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Offer price", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "₹599", className: "bg-card", type: "number", min: "0", value: offerPrice, onChange: (e) => setOfferPrice(e.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Discount %", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "bg-card", readOnly: true, value: discountPct > 0 ? `${discountPct}%` : "", placeholder: "Auto" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Schedule", desc: "When customers can book this offer.", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Start date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", className: "bg-card", value: startDate, onChange: (e) => setStartDate(e.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "End date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", className: "bg-card", value: endDate, onChange: (e) => setEndDate(e.target.value) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Capacity & rules", desc: "Manage availability and per-customer limits.", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Total capacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "24", className: "bg-card", type: "number", min: "1", value: totalSlots, onChange: (e) => setTotalSlots(e.target.value) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Max booking per customer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "4", className: "bg-card", type: "number", min: "1", value: maxBookingPerCustomer, onChange: (e) => setMaxBookingPerCustomer(e.target.value) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Enable waitlist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Auto-promote when seats free up." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Legal", desc: "Terms shown at checkout & on confirmation.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Terms & conditions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, placeholder: "Non-transferable. Cancellations within 2 hours are non-refundable…", className: "bg-card", value: termsAndConditions, onChange: (e) => setTermsAndConditions(e.target.value) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/offers", className: "text-sm text-muted-foreground hover:text-foreground", children: "← Back to offers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-full bg-card", onClick: () => handleSubmit("Draft"), disabled: saving || publishing, children: saving ? "Saving…" : "Save draft" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "rounded-full", onClick: () => handleSubmit("Active"), disabled: saving || publishing, children: publishing ? "Publishing…" : "Publish offer" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:sticky lg:top-24 lg:self-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Live preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 overflow-hidden rounded-2xl border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] bg-gradient-to-br from-amber-200 via-rose-200 to-orange-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              business?.name || "Your business",
              " · ",
              business?.city || "Your city"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-xl", children: title || "Offer title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl", children: [
                "₹",
                offerPrice ? parseFloat(offerPrice).toLocaleString() : "—"
              ] }),
              originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground line-through", children: [
                "₹",
                parseFloat(originalPrice).toLocaleString()
              ] }),
              discountPct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto rounded-full bg-lime px-2 py-0.5 text-[10px]", children: [
                "-",
                discountPct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-foreground", style: {
              width: `${pctPreview}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-[11px] text-muted-foreground", children: [
              bookedPreview,
              "/",
              totalPreview,
              " booked"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4 w-full rounded-full", children: "Book now" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs text-muted-foreground", children: "This preview updates as you edit the form." })
      ] })
    ] }) })
  ] });
}
function Section({
  title,
  desc,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 border-b border-border pb-8 md:grid-cols-[220px_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: desc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    children
  ] });
}
export {
  NewOffer as component
};

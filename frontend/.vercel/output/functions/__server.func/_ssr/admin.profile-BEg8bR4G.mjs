import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { A as AdminTopbar, g as getMyBusiness, u as updateBusiness } from "./AdminTopbar-DS0sefyF.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { T as Textarea } from "./textarea-F69quoCd.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { V as Upload } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./client-Bk_QgbDl.mjs";
import "./bookings-HTZk0Hqs.mjs";
import "./offers-jEIiW0Gu.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function Profile() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [saveError, setSaveError] = reactExports.useState(null);
  const [businessId, setBusinessId] = reactExports.useState(null);
  const [business, setBusiness] = reactExports.useState({
    name: "",
    businessType: "",
    ownerName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    description: ""
  });
  reactExports.useEffect(() => {
    async function loadBusiness() {
      try {
        const data = await getMyBusiness();
        setBusinessId(data?.id ?? null);
        setBusiness({
          name: data?.name || "",
          businessType: data?.businessType || "",
          ownerName: data?.ownerName || "",
          phone: data?.phone || "",
          email: data?.email || "",
          city: data?.city || "",
          address: data?.address || "",
          description: data?.description || ""
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadBusiness();
  }, []);
  async function handleSave() {
    if (!businessId) return;
    setSaving(true);
    setSaveError(null);
    try {
      await updateBusiness(businessId, business);
      await queryClient.invalidateQueries({
        queryKey: ["business", "me"]
      });
      toast.success("Business profile saved");
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save changes");
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 text-sm text-muted-foreground", children: "Loading business profile..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Business profile", subtitle: "How your venue shows up in the marketplace", action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "rounded-full", onClick: handleSave, disabled: saving || !businessId, children: saving ? "Saving..." : "Save changes" }) }),
    saveError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-6 mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive lg:mx-10", children: saveError }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 lg:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[260px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Logo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid place-items-center rounded-xl border border-dashed border-border bg-canvas p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-20 w-20 place-items-center rounded-full bg-foreground font-display text-3xl text-background", children: business.name?.[0] || "B" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-sm font-medium", children: business.name || "Business" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3" }),
            "Replace"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[11px] text-muted-foreground", children: "PNG / SVG · up to 2MB · square." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Business", desc: "Public info shown to customers.", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Business name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: business.name, className: "bg-card", onChange: (e) => setBusiness({
              ...business,
              name: e.target.value
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Business type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: business.businessType, className: "bg-card", onChange: (e) => setBusiness({
              ...business,
              businessType: e.target.value
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Owner name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: business.ownerName, className: "bg-card", onChange: (e) => setBusiness({
              ...business,
              ownerName: e.target.value
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: business.phone, className: "bg-card", onChange: (e) => setBusiness({
              ...business,
              phone: e.target.value
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: business.email, className: "bg-card", onChange: (e) => setBusiness({
              ...business,
              email: e.target.value
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "City", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: business.city, className: "bg-card", onChange: (e) => setBusiness({
              ...business,
              city: e.target.value
            }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Address", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: business.address, className: "bg-card", onChange: (e) => setBusiness({
            ...business,
            address: e.target.value
          }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Hours", desc: "Default opening hours", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Opening time", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", defaultValue: "06:00", className: "bg-card" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Closing time", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", defaultValue: "22:00", className: "bg-card" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "About", desc: "Business description", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, className: "bg-card", value: business.description, onChange: (e) => setBusiness({
          ...business,
          description: e.target.value
        }) }) })
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
function F({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    children
  ] });
}
export {
  Profile as component
};

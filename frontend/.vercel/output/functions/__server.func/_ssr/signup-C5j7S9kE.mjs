import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CUSP6kj8.mjs";
import { L as Logo } from "./Logo-9RWBOztj.mjs";
import { r as register } from "./auth-BPsLpmzJ.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { L as LoaderCircle, A as ArrowRight, C as Check } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "./client-Bk_QgbDl.mjs";
function SignUp() {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = reactExports.useState("");
  const [ownerName, setOwnerName] = reactExports.useState("");
  const [businessType, setBusinessType] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!businessName || !ownerName || !businessType || !email || !password) {
      setError("Please fill all required fields.");
      toast.error("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      const response = await register({
        fullName: ownerName,
        email,
        password,
        businessName,
        businessType
      });
      localStorage.setItem("token", response.token);
      toast.success("Workspace created");
      navigate({
        to: "/admin/dashboard"
      });
    } catch (err) {
      console.error(err);
      setError("Failed to create workspace.");
      toast.error("Failed to create workspace");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-screen lg:grid-cols-[1.05fr_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-6 py-8 lg:px-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signin", className: "text-sm text-muted-foreground hover:text-foreground", children: "Sign in" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex w-full max-w-md flex-1 flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Create workspace" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl leading-tight", children: "Let's set up your venue." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "A few details and you're live. We'll handle the rest." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-8 space-y-5", onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Business name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Northside Fitness", className: "bg-card", value: businessName, onChange: (e) => setBusinessName(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Owner name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Jordan Park", className: "bg-card", value: ownerName, onChange: (e) => setOwnerName(e.target.value) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Business type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: businessType, onValueChange: setBusinessType, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose category" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Gym", "Salon", "Cafe", "Restaurant", "Clinic", "Coaching", "Turf", "Spa", "Other"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Work email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", placeholder: "hello@yourbusiness.com", className: "bg-card", value: email, onChange: (e) => setEmail(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Create password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", placeholder: "At least 6 characters", className: "bg-card", value: password, onChange: (e) => setPassword(e.target.value) })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full rounded-full", disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            "Creating workspace..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Create workspace",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
            "By continuing you agree to our",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "underline", children: "Terms" }),
            " ",
            "and",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "underline", children: "Privacy" }),
            "."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "© 2026 Bookora Labs" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden border-l border-border bg-card p-12 lg:flex lg:flex-col lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Why operators choose Bookora" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-5", children: [["Live in 4 minutes", "Profile, first offer, first booking — same coffee."], ["Realtime, by default", "No double-bookings. No stale availability."], ["Designed for venues", "Built with gyms, cafes, salons and clinics."], ["Operator-first analytics", "Peak hours, revenue, conversion — at a glance."]].map(([t, d]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-lime", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: d })
          ] })
        ] }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-canvas p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Live revenue · this week" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-3xl", children: "₹4.2L" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex h-10 items-end gap-1", children: [30, 42, 28, 55, 40, 68, 72, 50, 80, 62, 90, 74, 82, 95].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 rounded-sm bg-foreground/80", style: {
          height: `${h}%`
        } }, i)) })
      ] })
    ] })
  ] });
}
export {
  SignUp as component
};

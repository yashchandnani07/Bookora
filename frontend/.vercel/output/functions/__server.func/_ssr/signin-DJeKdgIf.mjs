import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { L as Logo } from "./Logo-9RWBOztj.mjs";
import { l as login } from "./auth-BPsLpmzJ.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { G as Github, L as LoaderCircle, A as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "./client-Bk_QgbDl.mjs";
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const response = await login({
        email,
        password
      });
      localStorage.setItem("token", response.token);
      toast.success("Signed in");
      navigate({
        to: "/admin/dashboard"
      });
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-screen lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-6 py-8 lg:px-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-1 flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl tracking-tight", children: "Welcome back." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sign in to your operator console." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, {}),
            "Google"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-4 w-4" }),
            "GitHub"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" }),
          "or with email",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", placeholder: "hello@yourbusiness.com", className: "bg-card", value: email, onChange: (e) => setEmail(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "text-xs text-muted-foreground hover:text-foreground", children: "Forgot?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", placeholder: "••••••••", className: "bg-card", value: password, onChange: (e) => setPassword(e.target.value) })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full rounded-full", disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            "Signing in..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Sign in",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
          "New to Bookora?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "font-medium text-foreground", children: "Create workspace" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "© 2026 Bookora Labs" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden border-l border-border bg-card lg:block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full flex-col justify-between p-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "max-w-md font-display text-3xl leading-snug", children: '"We went from spreadsheet chaos to a 79% slot fill-rate. Bookora is the operations layer I always wanted."' }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-canvas p-4 shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Peak Hour Training · 6:30 PM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-success/10 px-2 py-0.5 text-[10px] text-success", children: "79% booked" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-foreground", style: {
              width: "79%"
            } }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "— Meera N., Studio Linea" })
        ] })
      ] })
    ] })
  ] });
}
function GoogleIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 48 48", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FFC107", d: "M43.6 20.5H42V20H24v8h11.3C33.6 32.4 29.2 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FF3D00", d: "M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4CAF50", d: "M24 43.5c5.1 0 9.7-1.9 13.2-5.1l-6.1-5c-2 1.5-4.5 2.4-7.1 2.4-5.2 0-9.6-3.1-11.3-7.5l-6.6 5.1C9.6 39 16.2 43.5 24 43.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#1976D2", d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l6.1 5C40.9 35.7 43.5 30.3 43.5 24c0-1.2-.1-2.3-.4-3.5z" })
  ] });
}
export {
  SignIn as component
};

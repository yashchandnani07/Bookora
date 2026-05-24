import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
function Logo({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: `inline-flex items-center gap-2 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg leading-none", children: "B" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-lime ring-2 ring-canvas" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl tracking-tight", children: "Bookora" })
  ] });
}
export {
  Logo as L
};

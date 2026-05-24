import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Logo } from "./Logo-9RWBOztj.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
function PublicNav() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-border/70 bg-canvas/80 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-7 text-sm text-muted-foreground md:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/offers", className: "hover:text-foreground transition-colors", children: "Offers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#features", className: "hover:text-foreground transition-colors", children: "Platform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#categories", className: "hover:text-foreground transition-colors", children: "For business" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#pricing", className: "hover:text-foreground transition-colors", children: "Pricing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#docs", className: "hover:text-foreground transition-colors", children: "Docs" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/signin",
          className: "hidden text-sm text-muted-foreground hover:text-foreground md:inline-flex px-3 py-2",
          children: "Sign in"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: "Start free" }) })
    ] })
  ] }) });
}
function Footer() {
  const groups = [
    { title: "Product", links: ["Platform", "Realtime engine", "Slots", "Analytics", "Pricing"] },
    { title: "Solutions", links: ["Gyms", "Salons", "Cafes", "Clinics", "Turfs"] },
    { title: "Company", links: ["About", "Customers", "Careers", "Press", "Contact"] },
    { title: "Resources", links: ["Docs", "Changelog", "Status", "Security", "API"] }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border bg-canvas", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 pt-20 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-muted-foreground", children: "Realtime booking infrastructure for modern businesses. From offer to occupied seat in seconds." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pulse-dot inline-flex h-2 w-2 rounded-full bg-success" }) }),
          "All systems operational"
        ] })
      ] }),
      groups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground", children: g.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 text-sm", children: g.links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-foreground/80 hover:text-foreground", children: l }) }, l)) })
      ] }, g.title))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "© 2026 Bookora Labs, Inc. Crafted for operators." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Privacy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Terms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Cookies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "DPA" })
      ] })
    ] })
  ] }) });
}
export {
  Footer as F,
  PublicNav as P
};

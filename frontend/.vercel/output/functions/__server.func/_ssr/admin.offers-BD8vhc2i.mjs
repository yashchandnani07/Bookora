import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useRouterState, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AdminTopbar } from "./AdminTopbar-DS0sefyF.mjs";
import { b as getMyOffers } from "./offers-jEIiW0Gu.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { c as badgeFor } from "./router-Dn9S88Ix.mjs";
import { s as subscribeToBookingUpdates } from "./bookings-CZ63f1Go.mjs";
import "../_libs/sonner.mjs";
import { S as Search, F as Funnel, P as Plus, Y as Ellipsis } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function ManageOffers() {
  const queryClient = useQueryClient();
  const pathname = useRouterState({
    select: (state) => state.location.pathname
  });
  const {
    data: offers = [],
    isLoading
  } = useQuery({
    queryKey: ["offers", "my"],
    queryFn: getMyOffers
  });
  reactExports.useEffect(() => {
    return subscribeToBookingUpdates({
      onSlotUpdated: () => {
        queryClient.invalidateQueries({
          queryKey: ["offers", "my"]
        });
      },
      onOfferCreated: () => {
        queryClient.invalidateQueries({
          queryKey: ["offers", "my"]
        });
      }
    });
  }, [queryClient]);
  if (pathname !== "/admin/offers") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Offers", subtitle: isLoading ? "Loading…" : `${offers.length} total` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6 lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search offers…", className: "h-10 border-0 bg-transparent shadow-none focus-visible:ring-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4" }),
            " Filters"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/offers/new", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " New offer"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["Offer", "Category", "Price", "Capacity", "Fill", "Status", ""].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 text-left font-medium", children: h }, i)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-5 py-10 text-center text-muted-foreground", children: "Loading offers…" }) }) : offers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 7, className: "px-5 py-10 text-center text-muted-foreground", children: [
          "No offers yet.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/offers/new", className: "underline hover:text-foreground", children: "Create your first one." })
        ] }) }) : offers.map((o) => {
          const booked = o.totalSlots - o.remainingSlots;
          const pct = o.totalSlots > 0 ? booked / o.totalSlots * 100 : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-md bg-gradient-to-br from-amber-200 via-rose-200 to-orange-300 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium leading-tight", children: o.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: o.id.slice(0, 8) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-muted-foreground", children: o.category || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                "₹",
                o.offerPrice.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground line-through", children: [
                "₹",
                o.originalPrice.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs", children: [
              booked,
              "/",
              o.totalSlots
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "w-40 px-5 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full ${pct === 100 ? "bg-foreground" : "bg-lime"}`, style: {
                width: `${pct}%`
              } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[10px] text-muted-foreground", children: [
                Math.round(pct),
                "% filled"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] ${badgeFor(o.status)}`, children: o.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-md p-1.5 hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) }) })
          ] }, o.id);
        }) })
      ] }) })
    ] })
  ] });
}
export {
  ManageOffers as component
};

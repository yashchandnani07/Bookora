import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { O as Outlet, d as useNavigate, e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { L as Logo } from "./Logo-9RWBOztj.mjs";
import { a as getMyBookings } from "./bookings-HTZk0Hqs.mjs";
import { u as useApiLatency } from "./use-api-latency-DMbNWxOh.mjs";
import { S as Search, f as LayoutDashboard, T as Tag, g as CalendarRange, h as ClipboardList, i as ChartColumn, B as Building2, j as Settings, k as CirclePlus, l as LifeBuoy, m as LogOut, X, n as Menu } from "../_libs/lucide-react.mjs";
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
const nav = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Offers", to: "/admin/offers", icon: Tag },
  { label: "Slots", to: "/admin/slots", icon: CalendarRange },
  { label: "Bookings", to: "/admin/bookings", icon: ClipboardList },
  { label: "Analytics", to: "/admin/analytics", icon: ChartColumn },
  { label: "Business", to: "/admin/profile", icon: Building2 },
  { label: "Settings", to: "/admin/settings", icon: Settings }
];
function AdminSidebar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { latency, online } = useApiLatency();
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", "my"],
    queryFn: getMyBookings,
    retry: false
  });
  function handleLogout() {
    localStorage.removeItem("token");
    queryClient.clear();
    toast.success("Signed out");
    navigate({ to: "/signin" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 items-center border-b border-border px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5" }),
      " Search",
      /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "ml-auto rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]", children: "Ctrl K" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 space-y-0.5 px-3 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground", children: "Workspace" }),
      nav.map((item) => {
        const active = pathname === item.to || item.to !== "/admin/dashboard" && pathname.startsWith(item.to);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: `group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${active ? "bg-foreground text-background" : "text-foreground/75 hover:bg-muted hover:text-foreground"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label }),
              item.label === "Bookings" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `ml-auto rounded-full px-1.5 py-0.5 text-[10px] ${active ? "bg-background/15 text-background" : "bg-lime text-lime-foreground"}`,
                  children: bookings.length > 99 ? "99+" : bookings.length
                }
              )
            ]
          },
          item.to
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pb-2 pt-6 text-[10px] font-medium uppercase tracking-wider text-muted-foreground", children: "Quick" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin/offers/new",
          className: "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground/75 hover:bg-muted hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4" }),
            " New offer"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin/help",
          className: "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground/75 hover:bg-muted hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LifeBuoy, { className: "h-4 w-4" }),
            " Help & status"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleLogout,
          className: "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-foreground/75 hover:bg-muted hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            " Logout"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "m-3 rounded-lg border border-border bg-muted/40 p-3 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-2 font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `pulse-dot inline-flex h-1.5 w-1.5 rounded-full ${online ? "bg-success" : "bg-destructive"}`
          }
        ),
        "Realtime engine"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        online ? `Latency ${latency ?? "..."}ms` : "API offline",
        " - 99.99% uptime"
      ] })
    ] })
  ] });
}
function MobileAdminNav() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { latency, online } = useApiLatency();
  const items = [
    ...nav,
    { label: "New", to: "/admin/offers/new", icon: CirclePlus },
    { label: "Help", to: "/admin/help", icon: LifeBuoy }
  ];
  function handleLogout() {
    localStorage.removeItem("token");
    queryClient.clear();
    toast.success("Signed out");
    navigate({ to: "/signin" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-40 border-b border-border bg-canvas/95 backdrop-blur lg:hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((value) => !value),
        className: "flex h-14 w-full items-center justify-between px-4 text-left",
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
            open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {})
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open ? "Close" : "Menu" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-3 pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "grid grid-cols-3 gap-2 py-3", children: [
        items.map((item) => {
          const active = pathname === item.to || item.to !== "/admin/dashboard" && pathname.startsWith(item.to);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              onClick: () => setOpen(false),
              className: `flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 text-center text-xs transition-colors ${active ? "border-foreground bg-foreground text-background" : "border-border bg-card text-foreground/75 hover:bg-muted hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
              ]
            },
            item.to
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setOpen(false);
              handleLogout();
            },
            className: "flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-card px-2 py-2 text-center text-xs text-foreground/75 hover:bg-muted hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Logout" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-2 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `pulse-dot inline-flex h-1.5 w-1.5 rounded-full ${online ? "bg-success" : "bg-destructive"}`
            }
          ),
          "Realtime engine"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          online ? `Latency ${latency ?? "..."}ms` : "API offline",
          " - 99.99% uptime"
        ] })
      ] })
    ] })
  ] });
}
function AdminShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-canvas lg:flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileAdminNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-screen min-w-0 flex-1 flex-col", children })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
export {
  SplitComponent as component
};

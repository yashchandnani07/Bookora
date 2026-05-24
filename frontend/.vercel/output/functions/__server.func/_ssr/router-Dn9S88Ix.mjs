import { c as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
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
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-Bn5GGiBf.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$h = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bookora — Realtime offer booking for modern businesses" },
      {
        name: "description",
        content: "Bookora is realtime booking infrastructure for gyms, salons, cafes, clinics and more. Launch offers, manage slots, accept bookings in seconds."
      },
      { property: "og:title", content: "Bookora — Realtime offer booking" },
      {
        property: "og:description",
        content: "Realtime booking infrastructure for modern businesses."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$h.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] });
}
const $$splitComponentImporter$g = () => import("./signup-C5j7S9kE.mjs");
const Route$g = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: "Create your workspace · Bookora"
    }, {
      name: "description",
      content: "Set up your Bookora workspace and accept your first realtime booking in minutes."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./signin-DJeKdgIf.mjs");
const Route$f = createFileRoute("/signin")({
  head: () => ({
    meta: [{
      title: "Sign in · Bookora"
    }, {
      name: "description",
      content: "Sign in to your Bookora operator workspace."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./offers-ZzY8tWjH.mjs");
const Route$e = createFileRoute("/offers")({
  head: () => ({
    meta: [{
      title: "Live offers - Bookora"
    }, {
      name: "description",
      content: "Discover live, limited-time offers from venues near you. Book in seconds."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./booking-confirmed-l4j0L36Q.mjs");
const Route$d = createFileRoute("/booking-confirmed")({
  validateSearch: (search) => ({
    bookingId: typeof search.bookingId === "string" ? search.bookingId : void 0
  }),
  head: () => ({
    meta: [{
      title: "Booking confirmed - Bookora"
    }, {
      name: "description",
      content: "Your Bookora reservation is confirmed."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./admin-VLISK1dS.mjs");
const Route$c = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./index-Ds9nkGoS.mjs");
const Route$b = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Bookora — Realtime offer booking for modern businesses"
    }, {
      name: "description",
      content: "Launch limited-time offers, manage live slots, and accept bookings in seconds. Bookora is the realtime booking infrastructure trusted by modern operators."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./offers._offerId-BW6nWZb7.mjs");
const Route$a = createFileRoute("/offers/$offerId")({
  head: () => ({
    meta: [{
      title: "Offer - Bookora"
    }, {
      name: "description",
      content: "Book a live slot powered by Bookora."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./book._offerId-D8OFtyc3.mjs");
const Route$9 = createFileRoute("/book/$offerId")({
  validateSearch: (search) => ({
    slotId: typeof search.slotId === "string" ? search.slotId : void 0
  }),
  head: () => ({
    meta: [{
      title: "Book - Bookora"
    }, {
      name: "description",
      content: "Complete your Bookora reservation."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.slots-CV_SQk3E.mjs");
const Route$8 = createFileRoute("/admin/slots")({
  head: () => ({
    meta: [{
      title: "Slots - Bookora"
    }, {
      name: "description",
      content: "Realtime slot inventory."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.settings-Dd77Enec.mjs");
const Route$7 = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [{
      title: "Settings - Bookora"
    }, {
      name: "description",
      content: "Workspace settings."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.profile-BEg8bR4G.mjs");
const Route$6 = createFileRoute("/admin/profile")({
  head: () => ({
    meta: [{
      title: "Business profile · Bookora"
    }, {
      name: "description",
      content: "Manage business profile."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.offers-BD8vhc2i.mjs");
const Route$5 = createFileRoute("/admin/offers")({
  head: () => ({
    meta: [{
      title: "Offers · Bookora"
    }, {
      name: "description",
      content: "Manage your offers."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.help-zliecQLe.mjs");
const Route$4 = createFileRoute("/admin/help")({
  head: () => ({
    meta: [{
      title: "Help & status - Bookora"
    }, {
      name: "description",
      content: "Mock support and system status."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.dashboard-CxQH57HR.mjs");
const Route$3 = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard - Bookora"
    }, {
      name: "description",
      content: "Realtime operator dashboard."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
function badgeFor(s) {
  switch (s) {
    case "Confirmed":
    case "Active":
    case "Available":
      return "bg-success/10 text-success";
    case "Pending":
    case "Draft":
      return "bg-warning/10 text-warning";
    case "Cancelled":
    case "Expired":
      return "bg-destructive/10 text-destructive";
    case "Completed":
      return "bg-info/10 text-info";
    case "Paused":
    case "Closed":
      return "bg-muted text-muted-foreground";
    case "No Show":
    case "Full":
      return "bg-foreground/10 text-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}
const $$splitComponentImporter$2 = () => import("./admin.bookings-D6tKV9HN.mjs");
const Route$2 = createFileRoute("/admin/bookings")({
  head: () => ({
    meta: [{
      title: "Bookings - Bookora"
    }, {
      name: "description",
      content: "Manage all customer bookings."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.analytics-CDOwwtmV.mjs");
const Route$1 = createFileRoute("/admin/analytics")({
  head: () => ({
    meta: [{
      title: "Analytics - Bookora"
    }, {
      name: "description",
      content: "Operator analytics."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.offers.new-DWvmjEuV.mjs");
const Route = createFileRoute("/admin/offers/new")({
  head: () => ({
    meta: [{
      title: "Create offer · Bookora"
    }, {
      name: "description",
      content: "Compose a new limited-time offer."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$g.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$h
});
const SigninRoute = Route$f.update({
  id: "/signin",
  path: "/signin",
  getParentRoute: () => Route$h
});
const OffersRoute = Route$e.update({
  id: "/offers",
  path: "/offers",
  getParentRoute: () => Route$h
});
const BookingConfirmedRoute = Route$d.update({
  id: "/booking-confirmed",
  path: "/booking-confirmed",
  getParentRoute: () => Route$h
});
const AdminRoute = Route$c.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$h
});
const IndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$h
});
const OffersOfferIdRoute = Route$a.update({
  id: "/$offerId",
  path: "/$offerId",
  getParentRoute: () => OffersRoute
});
const BookOfferIdRoute = Route$9.update({
  id: "/book/$offerId",
  path: "/book/$offerId",
  getParentRoute: () => Route$h
});
const AdminSlotsRoute = Route$8.update({
  id: "/slots",
  path: "/slots",
  getParentRoute: () => AdminRoute
});
const AdminSettingsRoute = Route$7.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AdminRoute
});
const AdminProfileRoute = Route$6.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => AdminRoute
});
const AdminOffersRoute = Route$5.update({
  id: "/offers",
  path: "/offers",
  getParentRoute: () => AdminRoute
});
const AdminHelpRoute = Route$4.update({
  id: "/help",
  path: "/help",
  getParentRoute: () => AdminRoute
});
const AdminDashboardRoute = Route$3.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AdminRoute
});
const AdminBookingsRoute = Route$2.update({
  id: "/bookings",
  path: "/bookings",
  getParentRoute: () => AdminRoute
});
const AdminAnalyticsRoute = Route$1.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => AdminRoute
});
const AdminOffersNewRoute = Route.update({
  id: "/new",
  path: "/new",
  getParentRoute: () => AdminOffersRoute
});
const AdminOffersRouteChildren = {
  AdminOffersNewRoute
};
const AdminOffersRouteWithChildren = AdminOffersRoute._addFileChildren(
  AdminOffersRouteChildren
);
const AdminRouteChildren = {
  AdminAnalyticsRoute,
  AdminBookingsRoute,
  AdminDashboardRoute,
  AdminHelpRoute,
  AdminOffersRoute: AdminOffersRouteWithChildren,
  AdminProfileRoute,
  AdminSettingsRoute,
  AdminSlotsRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const OffersRouteChildren = {
  OffersOfferIdRoute
};
const OffersRouteWithChildren = OffersRoute._addFileChildren(OffersRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  BookingConfirmedRoute,
  OffersRoute: OffersRouteWithChildren,
  SigninRoute,
  SignupRoute,
  BookOfferIdRoute
};
const routeTree = Route$h._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$d as R,
  Route$a as a,
  Route$9 as b,
  badgeFor as c,
  router as r
};

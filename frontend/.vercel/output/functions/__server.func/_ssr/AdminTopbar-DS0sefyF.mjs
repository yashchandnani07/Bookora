import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as api } from "./client-Bk_QgbDl.mjs";
import { a as getMyBookings } from "./bookings-HTZk0Hqs.mjs";
import { b as getMyOffers } from "./offers-jEIiW0Gu.mjs";
import { a3 as ChevronDown, P as Plus, a5 as CircleQuestionMark, N as Bell } from "../_libs/lucide-react.mjs";
function getMyBusiness() {
  return api("/Business/me");
}
function updateBusiness(id, data) {
  return api(`/Business/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}
function useBusinessProfile() {
  return useQuery({
    queryKey: ["business", "me"],
    queryFn: getMyBusiness,
    staleTime: 1e3 * 60 * 5,
    retry: false
  });
}
function AdminTopbar({
  title,
  subtitle,
  action
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { data: business, isLoading: businessLoading } = useBusinessProfile();
  const { data: offers = [] } = useQuery({
    queryKey: ["offers", "my"],
    queryFn: getMyOffers,
    retry: false
  });
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", "my"],
    queryFn: getMyBookings,
    retry: false
  });
  const ownerName = business?.ownerName ?? "";
  const businessName = business?.name ?? "";
  const pendingBookings = bookings.filter((booking) => booking.status === "Pending").length;
  const todaysBookings = bookings.filter((booking) => isToday(booking.createdAt)).length;
  const activeOffers = offers.filter((offer) => offer.status === "Active").length;
  const openSeats = offers.reduce((sum, offer) => sum + offer.remainingSlots, 0);
  const profileScore = getProfileScore(business);
  const dynamicContext = getRouteContext(pathname, {
    activeOffers,
    bookings: bookings.length,
    businessCity: business?.city,
    businessType: business?.businessType,
    openSeats,
    pendingBookings,
    profileScore,
    todaysBookings
  });
  const initials = ownerName.split(" ").filter(Boolean).slice(0, 2).map((word) => word[0].toUpperCase()).join("");
  const displayName = (() => {
    const parts = ownerName.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "Admin";
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  })();
  const workspaceLabel = businessLoading ? "Loading workspace" : businessName || "Complete business profile";
  const businessMeta = [business?.businessType, business?.city].filter(Boolean).join(" - ");
  const subtitleText = [subtitle, dynamicContext].filter(Boolean).join(" - ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 border-b border-border bg-canvas/80 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-16 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden flex-wrap items-center gap-2 text-xs text-muted-foreground sm:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[220px] truncate", children: workspaceLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden rounded-full bg-lime/40 px-2 py-0.5 text-[10px] font-medium text-foreground sm:inline", children: businessMeta || `${profileScore}% ready` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl leading-tight", children: title }),
      subtitleText && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 line-clamp-2 text-xs text-muted-foreground sm:truncate", children: subtitleText })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full shrink-0 items-center justify-start gap-2 overflow-x-auto sm:w-auto sm:justify-end", children: [
      action ?? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/offers/new", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
        " New offer"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-md p-2 text-muted-foreground hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin/bookings",
          className: "relative rounded-md p-2 text-muted-foreground hover:bg-muted",
          title: `${pendingBookings} pending bookings`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
            pendingBookings > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-lime px-1 text-[9px] font-medium text-foreground", children: pendingBookings > 9 ? "9+" : pendingBookings })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-1 flex items-center gap-2 rounded-full border border-border bg-card p-0.5 pr-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 place-items-center rounded-full bg-foreground text-xs text-background", children: initials || businessName[0]?.toUpperCase() || "B" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden text-xs font-medium md:inline", children: displayName })
      ] })
    ] })
  ] }) });
}
function isToday(value) {
  return new Date(value).toDateString() === (/* @__PURE__ */ new Date()).toDateString();
}
function getProfileScore(business) {
  if (!business) return 0;
  const fields = [
    business.name,
    business.businessType,
    business.ownerName,
    business.phone,
    business.email,
    business.city,
    business.address,
    business.description
  ];
  const filled = fields.filter((value) => Boolean(value?.trim())).length;
  return Math.round(filled / fields.length * 100);
}
function getRouteContext(pathname, data) {
  if (pathname.includes("/admin/offers/new")) {
    return `${data.businessType || "Offer"} in ${data.businessCity || "your city"}`;
  }
  if (pathname.includes("/admin/offers")) {
    return `${data.activeOffers} active - ${data.openSeats} seats open`;
  }
  if (pathname.includes("/admin/slots")) {
    return `${data.openSeats} seats open - realtime inventory`;
  }
  if (pathname.includes("/admin/bookings")) {
    return `${data.pendingBookings} pending - ${data.todaysBookings} today`;
  }
  if (pathname.includes("/admin/analytics")) {
    return `${data.bookings} bookings tracked - ${data.activeOffers} active offers`;
  }
  if (pathname.includes("/admin/profile")) {
    return `${data.profileScore}% profile complete`;
  }
  if (pathname.includes("/admin/settings")) {
    return `${data.businessCity || "Workspace"} settings`;
  }
  return `${data.todaysBookings} today - ${data.openSeats} seats open`;
}
export {
  AdminTopbar as A,
  useBusinessProfile as a,
  getMyBusiness as g,
  updateBusiness as u
};

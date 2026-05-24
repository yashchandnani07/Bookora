import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AdminTopbar } from "./AdminTopbar-DS0sefyF.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { a as getMyBookings } from "./bookings-HTZk0Hqs.mjs";
import { c as badgeFor } from "./router-Dn9S88Ix.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { D as Download, S as Search, F as Funnel, Y as Ellipsis } from "../_libs/lucide-react.mjs";
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
import "./offers-jEIiW0Gu.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function formatSlot(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return `${startDate.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit"
  })} - ${endDate.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit"
  })}`;
}
function formatBookedAt(value) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit"
  });
}
function BookingsPage() {
  const [search, setSearch] = reactExports.useState("");
  const {
    data: bookings = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["bookings", "my"],
    queryFn: getMyBookings
  });
  const filtered = reactExports.useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return bookings;
    return bookings.filter((booking) => {
      const haystack = [booking.bookingReference, booking.customerName, booking.customerPhone, booking.offer?.title].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(term);
    });
  }, [bookings, search]);
  const statusCounts = reactExports.useMemo(() => {
    return bookings.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] ?? 0) + 1;
      return acc;
    }, {});
  }, [bookings]);
  const tabs = [`All - ${bookings.length}`, `Confirmed - ${statusCounts.Confirmed ?? 0}`, `Pending - ${statusCounts.Pending ?? 0}`, `Completed - ${statusCounts.Completed ?? 0}`, `Cancelled - ${statusCounts.Cancelled ?? 0}`];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Bookings", subtitle: isLoading ? "Loading customer reservations" : `${bookings.length} reservations`, action: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full bg-card", onClick: () => {
      exportBookingsCsv(filtered);
      toast.success(`Exported ${filtered.length} bookings`);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
      " Export CSV"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6 lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by name, phone, ref, or offer", className: "h-10 border-0 bg-transparent shadow-none focus-visible:ring-0", value: search, onChange: (e) => setSearch(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4" }),
          " Filters"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-2 flex flex-wrap items-center gap-2 overflow-x-auto px-2 text-xs", children: tabs.map((tab, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `whitespace-nowrap rounded-full border px-3 py-1.5 ${i === 0 ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-foreground/30"}`, children: tab }, tab)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["", "Ref", "Customer", "Offer", "Slot", "People", "Status", "Booked", ""].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left font-medium first:pl-5", children: h }, i)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 9, className: "px-5 py-10 text-center text-muted-foreground", children: "Loading bookings..." }) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 9, className: "px-5 py-10 text-center text-destructive", children: "Failed to load bookings." }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 9, className: "px-5 py-10 text-center text-muted-foreground", children: "No bookings found." }) }) : filtered.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-4 pl-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "h-3.5 w-3.5 accent-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-4 font-mono text-xs", children: booking.bookingReference }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 place-items-center rounded-full bg-muted text-[10px]", children: booking.customerName.split(" ").map((n) => n[0]).join("").slice(0, 2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: booking.customerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: booking.customerPhone })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-4", children: booking.offer?.title ?? "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-4 text-muted-foreground", children: booking.slot ? formatSlot(booking.slot.slotStart, booking.slot.slotEnd) : "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-4", children: booking.peopleCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] ${badgeFor(booking.status)}`, children: booking.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-4 text-muted-foreground", children: formatBookedAt(booking.createdAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-md p-1.5 hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) }) })
        ] }, booking.id)) })
      ] }) })
    ] })
  ] });
}
function exportBookingsCsv(bookings) {
  const rows = [["Reference", "Customer", "Phone", "Email", "Offer", "Slot start", "Slot end", "People", "Status", "Booked at"], ...bookings.map((booking) => [booking.bookingReference, booking.customerName, booking.customerPhone, booking.customerEmail ?? "", booking.offer?.title ?? "", booking.slot?.slotStart ?? "", booking.slot?.slotEnd ?? "", String(booking.peopleCount), booking.status, booking.createdAt])];
  const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `bookora-bookings-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
export {
  BookingsPage as component
};

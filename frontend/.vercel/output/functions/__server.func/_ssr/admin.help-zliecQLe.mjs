import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AdminTopbar } from "./AdminTopbar-DS0sefyF.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { u as useApiLatency } from "./use-api-latency-DMbNWxOh.mjs";
import { l as LifeBuoy, _ as CircleCheck, $ as CircleAlert, a0 as FileText, a1 as Radio } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./client-Bk_QgbDl.mjs";
import "./bookings-HTZk0Hqs.mjs";
import "./offers-jEIiW0Gu.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const services = [["API", "Operational", "99.99%"], ["Realtime hub", "Operational", "99.98%"], ["Bookings", "Operational", "100%"], ["Notifications", "Degraded", "98.40%"], ["Analytics", "Operational", "99.95%"]];
const docs = ["Create your first offer", "How availability and slots work", "Booking confirmation flow", "Realtime dashboard guide"];
const tickets = [{
  id: "SUP-1042",
  title: "WhatsApp reminder delay",
  status: "Investigating"
}, {
  id: "SUP-1038",
  title: "CSV export formatting",
  status: "Resolved"
}, {
  id: "SUP-1031",
  title: "Offer image upload request",
  status: "Open"
}];
function HelpStatus() {
  const {
    latency,
    online
  } = useApiLatency(1e4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Help & status", subtitle: online ? `API latency ${latency ?? "..."}ms` : "API offline", action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-full", onClick: () => toast.success("Support ticket created"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LifeBuoy, { className: "h-4 w-4" }),
      " Contact support"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6 lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusCard, { label: "System status", value: online ? "Operational" : "Offline", sub: "Measured from your browser", good: online }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusCard, { label: "Realtime latency", value: online ? `${latency ?? "..."}ms` : "-", sub: "API round trip", good: online }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusCard, { label: "Open tickets", value: "2", sub: "Mock support queue", good: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[1.2fr_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-border p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Services" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mock uptime by platform area." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: services.map(([name, status, uptime]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              status === "Operational" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-warning" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                  uptime,
                  " uptime"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-xs ${status === "Operational" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`, children: status })
          ] }, name)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Quick help" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: docs.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center gap-2 rounded-md border border-border bg-canvas px-3 py-2 text-left text-sm hover:bg-muted", onClick: () => toast.info(`Opening: ${doc}`), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
            doc
          ] }, doc)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Recent incidents" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Incident, { title: "Notification queue delay", time: "Today, 4:10 PM", status: "Monitoring" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Incident, { title: "Realtime reconnect spike", time: "Yesterday, 8:35 PM", status: "Resolved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Incident, { title: "No active incidents", time: "Last 7 days", status: "Operational" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Support tickets" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 divide-y divide-border rounded-xl border border-border", children: tickets.map((ticket) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: ticket.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-muted-foreground", children: ticket.id })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "bg-card", onClick: () => toast.info(`${ticket.id}: ${ticket.status}`), children: ticket.status })
          ] }, ticket.id)) })
        ] })
      ] })
    ] })
  ] });
}
function StatusCard({
  label,
  value,
  sub,
  good
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
      label,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: `h-4 w-4 ${good ? "text-success" : "text-destructive"}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: sub })
  ] });
}
function Incident({
  title,
  time,
  status
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-canvas p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-2 py-0.5 text-xs", children: status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: time })
  ] });
}
export {
  HelpStatus as component
};

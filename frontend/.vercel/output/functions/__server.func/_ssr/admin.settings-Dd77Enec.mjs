import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminTopbar } from "./AdminTopbar-DS0sefyF.mjs";
import { S as Switch } from "./switch-DkA5ZPe7.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { r as Globe, N as Bell, U as Users, O as CreditCard, Z as Zap, W as Webhook, Q as Key, R as Shield, C as Check } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./client-Bk_QgbDl.mjs";
import "./bookings-HTZk0Hqs.mjs";
import "./offers-jEIiW0Gu.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const sections = [{
  label: "General",
  icon: Globe,
  active: true
}, {
  label: "Notifications",
  icon: Bell
}, {
  label: "Team",
  icon: Users
}, {
  label: "Billing",
  icon: CreditCard
}, {
  label: "Integrations",
  icon: Zap
}, {
  label: "Webhooks",
  icon: Webhook
}, {
  label: "API keys",
  icon: Key
}, {
  label: "Security",
  icon: Shield
}];
const team = [{
  name: "Moiz Shaikh",
  email: "owner@bookora.local",
  role: "Owner",
  status: "Active"
}, {
  name: "Aisha Khan",
  email: "ops@bookora.local",
  role: "Operations",
  status: "Invited"
}, {
  name: "Rohan Mehta",
  email: "frontdesk@bookora.local",
  role: "Staff",
  status: "Active"
}];
const integrations = [{
  name: "Google Calendar",
  desc: "Two-way slot sync",
  connected: true
}, {
  name: "WhatsApp Business",
  desc: "Confirmations and reminders",
  connected: true
}, {
  name: "Razorpay",
  desc: "Accept online payments",
  connected: false
}, {
  name: "Zapier",
  desc: "No-code automations",
  connected: false
}, {
  name: "Slack",
  desc: "Realtime alerts in ops channels",
  connected: false
}];
const apiKeys = [{
  name: "Production API",
  key: "bk_live_****_9K2Q",
  lastUsed: "2 hours ago"
}, {
  name: "Webhook signing",
  key: "whsec_****_Q8LM",
  lastUsed: "Today, 10:12 AM"
}];
function Settings() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Settings", subtitle: "Mock workspace controls", action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "rounded-full", onClick: () => toast.success("Settings saved"), children: "Save changes" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 p-6 lg:grid-cols-[220px_1fr] lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-1 text-sm", children: sections.map(({
        label,
        icon: Icon,
        active
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `#${label.toLowerCase().replace(/\s+/g, "-")}`, className: `flex items-center gap-2 rounded-md px-2.5 py-2 ${active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
        " ",
        label
      ] }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "general", title: "General", desc: "Workspace identity and booking defaults.", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Workspace name", desc: "Shown inside admin tools", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "w-64 bg-card", defaultValue: "Bookora Workspace" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Marketplace city", desc: "Default city for new offers", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "w-64 bg-card", defaultValue: "Pune" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Currency", desc: "Used across offers and analytics", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "INR" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Timezone", desc: "Auto-detected for slots and reports", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Asia/Kolkata" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "notifications", title: "Notifications", desc: "Mock alert preferences for operators.", children: [["New bookings", "Notify when a customer reserves a slot", true], ["Capacity thresholds", "Alert when an offer reaches 80% full", true], ["Daily digest", "Send booking summary every evening", false], ["API failures", "Alert when integrations fail repeatedly", true]].map(([label, desc, enabled]) => /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label, desc, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: enabled, onCheckedChange: () => toast.info(`${label} preference updated`) }) }, label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "team", title: "Team", desc: "Mock members and invitations.", children: team.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: member.name, desc: `${member.email} - ${member.role}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { status: member.status }) }, member.email)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "billing", title: "Billing", desc: "Mock plan and invoice state.", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Current plan", desc: "Realtime bookings, analytics, and admin tools", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-lime/40 px-3 py-1 text-xs font-medium", children: "Pro" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Next invoice", desc: "Renews on 01 Jun 2026", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Rs. 2,999" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Payment method", desc: "Visa ending 4242", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "bg-card", children: "Update" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "integrations", title: "Integrations", desc: "Mock connected services.", children: integrations.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: item.name, desc: item.desc, children: item.connected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "bg-card", onClick: () => toast.info(`${item.name} is already connected`), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
          " Connected"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => toast.success(`${item.name} connection started`), children: "Connect" }) }, item.name)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "webhooks", title: "Webhooks", desc: "Mock event delivery configuration.", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Endpoint URL", desc: "Receives booking.created and slot.updated events", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "w-80 bg-card", defaultValue: "https://example.com/bookora/webhooks" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Delivery status", desc: "Last successful delivery was 3 minutes ago", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { status: "Healthy" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "api-keys", title: "API keys", desc: "Mock keys for integrations.", children: apiKeys.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: item.name, desc: `Last used ${item.lastUsed}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded-md bg-muted px-2 py-1 text-xs", children: item.key }) }, item.key)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "security", title: "Security", desc: "Mock workspace access controls.", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Two-factor authentication", desc: "Require OTP for owners and operators", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Session timeout", desc: "Automatically sign out inactive users", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "8 hours" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Delete workspace", desc: "Permanently remove all mock and real workspace data", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "border-destructive text-destructive hover:bg-destructive/5", onClick: () => toast.error("Delete workspace is disabled in mock settings"), children: "Delete" }) })
        ] })
      ] })
    ] })
  ] });
}
function Section({
  id,
  title,
  desc,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: desc }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 divide-y divide-border rounded-2xl border border-border bg-card", children })
  ] });
}
function Row({
  label,
  desc,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: desc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full shrink-0 sm:w-auto", children })
  ] });
}
function StatusPill({
  status
}) {
  const positive = ["Active", "Healthy"].includes(status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-1 text-xs ${positive ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`, children: status });
}
export {
  Settings as component
};

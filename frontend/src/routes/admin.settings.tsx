import { createFileRoute } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Check,
  CreditCard,
  Globe,
  Key,
  Shield,
  Users,
  Webhook,
  Zap,
} from "lucide-react";
import { AdminTopbar } from "@/components/layout/AdminTopbar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Settings - Bookora" },
      { name: "description", content: "Workspace settings." },
    ],
  }),
  component: Settings,
});

const sections: Array<{ label: string; icon: LucideIcon; active?: boolean }> = [
  { label: "General", icon: Globe, active: true },
  { label: "Notifications", icon: Bell },
  { label: "Team", icon: Users },
  { label: "Billing", icon: CreditCard },
  { label: "Integrations", icon: Zap },
  { label: "Webhooks", icon: Webhook },
  { label: "API keys", icon: Key },
  { label: "Security", icon: Shield },
];

const team = [
  { name: "Moiz Shaikh", email: "owner@bookora.local", role: "Owner", status: "Active" },
  { name: "Aisha Khan", email: "ops@bookora.local", role: "Operations", status: "Invited" },
  { name: "Rohan Mehta", email: "frontdesk@bookora.local", role: "Staff", status: "Active" },
];

const integrations = [
  { name: "Google Calendar", desc: "Two-way slot sync", connected: true },
  { name: "WhatsApp Business", desc: "Confirmations and reminders", connected: true },
  { name: "Razorpay", desc: "Accept online payments", connected: false },
  { name: "Zapier", desc: "No-code automations", connected: false },
  { name: "Slack", desc: "Realtime alerts in ops channels", connected: false },
];

const apiKeys = [
  { name: "Production API", key: "bk_live_****_9K2Q", lastUsed: "2 hours ago" },
  { name: "Webhook signing", key: "whsec_****_Q8LM", lastUsed: "Today, 10:12 AM" },
];

function Settings() {
  return (
    <>
      <AdminTopbar
        title="Settings"
        subtitle="Mock workspace controls"
        action={
          <Button className="rounded-full" onClick={() => toast.success("Settings saved")}>
            Save changes
          </Button>
        }
      />

      <div className="grid gap-8 p-6 lg:grid-cols-[220px_1fr] lg:p-10">
        <aside className="space-y-1 text-sm">
          {sections.map(({ label, icon: Icon, active }) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`flex items-center gap-2 rounded-md px-2.5 py-2 ${
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </a>
          ))}
        </aside>

        <div className="space-y-8">
          <Section id="general" title="General" desc="Workspace identity and booking defaults.">
            <Row label="Workspace name" desc="Shown inside admin tools">
              <Input className="w-64 bg-card" defaultValue="Bookora Workspace" />
            </Row>
            <Row label="Marketplace city" desc="Default city for new offers">
              <Input className="w-64 bg-card" defaultValue="Pune" />
            </Row>
            <Row label="Currency" desc="Used across offers and analytics">
              <span className="text-sm">INR</span>
            </Row>
            <Row label="Timezone" desc="Auto-detected for slots and reports">
              <span className="text-sm">Asia/Kolkata</span>
            </Row>
          </Section>

          <Section id="notifications" title="Notifications" desc="Mock alert preferences for operators.">
            {[
              ["New bookings", "Notify when a customer reserves a slot", true],
              ["Capacity thresholds", "Alert when an offer reaches 80% full", true],
              ["Daily digest", "Send booking summary every evening", false],
              ["API failures", "Alert when integrations fail repeatedly", true],
            ].map(([label, desc, enabled]) => (
              <Row key={label as string} label={label as string} desc={desc as string}>
                <Switch
                  defaultChecked={enabled as boolean}
                  onCheckedChange={() => toast.info(`${label} preference updated`)}
                />
              </Row>
            ))}
          </Section>

          <Section id="team" title="Team" desc="Mock members and invitations.">
            {team.map((member) => (
              <Row key={member.email} label={member.name} desc={`${member.email} - ${member.role}`}>
                <StatusPill status={member.status} />
              </Row>
            ))}
          </Section>

          <Section id="billing" title="Billing" desc="Mock plan and invoice state.">
            <Row label="Current plan" desc="Realtime bookings, analytics, and admin tools">
              <span className="rounded-full bg-lime/40 px-3 py-1 text-xs font-medium">Pro</span>
            </Row>
            <Row label="Next invoice" desc="Renews on 01 Jun 2026">
              <span className="text-sm">Rs. 2,999</span>
            </Row>
            <Row label="Payment method" desc="Visa ending 4242">
              <Button variant="outline" className="bg-card">Update</Button>
            </Row>
          </Section>

          <Section id="integrations" title="Integrations" desc="Mock connected services.">
            {integrations.map((item) => (
              <Row key={item.name} label={item.name} desc={item.desc}>
                {item.connected ? (
                  <Button
                    variant="outline"
                    className="bg-card"
                    onClick={() => toast.info(`${item.name} is already connected`)}
                  >
                    <Check className="h-4 w-4" /> Connected
                  </Button>
                ) : (
                  <Button onClick={() => toast.success(`${item.name} connection started`)}>
                    Connect
                  </Button>
                )}
              </Row>
            ))}
          </Section>

          <Section id="webhooks" title="Webhooks" desc="Mock event delivery configuration.">
            <Row label="Endpoint URL" desc="Receives booking.created and slot.updated events">
              <Input className="w-80 bg-card" defaultValue="https://example.com/bookora/webhooks" />
            </Row>
            <Row label="Delivery status" desc="Last successful delivery was 3 minutes ago">
              <StatusPill status="Healthy" />
            </Row>
          </Section>

          <Section id="api-keys" title="API keys" desc="Mock keys for integrations.">
            {apiKeys.map((item) => (
              <Row key={item.key} label={item.name} desc={`Last used ${item.lastUsed}`}>
                <code className="rounded-md bg-muted px-2 py-1 text-xs">{item.key}</code>
              </Row>
            ))}
          </Section>

          <Section id="security" title="Security" desc="Mock workspace access controls.">
            <Row label="Two-factor authentication" desc="Require OTP for owners and operators">
              <Switch defaultChecked />
            </Row>
            <Row label="Session timeout" desc="Automatically sign out inactive users">
              <span className="text-sm">8 hours</span>
            </Row>
            <Row label="Delete workspace" desc="Permanently remove all mock and real workspace data">
              <Button
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/5"
                onClick={() => toast.error("Delete workspace is disabled in mock settings")}
              >
                Delete
              </Button>
            </Row>
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {children}
      </div>
    </section>
  );
}

function Row({
  label,
  desc,
  children,
}: {
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <div className="w-full shrink-0 sm:w-auto">{children}</div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const positive = ["Active", "Healthy"].includes(status);

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs ${
        positive ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
      }`}
    >
      {status}
    </span>
  );
}

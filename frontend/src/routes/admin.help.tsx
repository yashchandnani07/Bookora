import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminTopbar } from "@/components/layout/AdminTopbar";
import { Button } from "@/components/ui/button";
import { useApiLatency } from "@/hooks/use-api-latency";
import { AlertCircle, CheckCircle2, FileText, LifeBuoy, MessageCircle, Radio } from "lucide-react";

export const Route = createFileRoute("/admin/help")({
  head: () => ({
    meta: [
      { title: "Help & status - Bookora" },
      { name: "description", content: "Mock support and system status." },
    ],
  }),
  component: HelpStatus,
});

const services = [
  ["API", "Operational", "99.99%"],
  ["Realtime hub", "Operational", "99.98%"],
  ["Bookings", "Operational", "100%"],
  ["Notifications", "Degraded", "98.40%"],
  ["Analytics", "Operational", "99.95%"],
];

const docs = [
  "Create your first offer",
  "How availability and slots work",
  "Booking confirmation flow",
  "Realtime dashboard guide",
];

const tickets = [
  { id: "SUP-1042", title: "WhatsApp reminder delay", status: "Investigating" },
  { id: "SUP-1038", title: "CSV export formatting", status: "Resolved" },
  { id: "SUP-1031", title: "Offer image upload request", status: "Open" },
];

function HelpStatus() {
  const { latency, online } = useApiLatency(10000);

  return (
    <>
      <AdminTopbar
        title="Help & status"
        subtitle={online ? `API latency ${latency ?? "..."}ms` : "API offline"}
        action={
          <Button
            className="rounded-full"
            onClick={() => toast.success("Support ticket created")}
          >
            <LifeBuoy className="h-4 w-4" /> Contact support
          </Button>
        }
      />

      <div className="space-y-6 p-6 lg:p-10">
        <div className="grid gap-4 md:grid-cols-3">
          <StatusCard
            label="System status"
            value={online ? "Operational" : "Offline"}
            sub="Measured from your browser"
            good={online}
          />
          <StatusCard
            label="Realtime latency"
            value={online ? `${latency ?? "..."}ms` : "-"}
            sub="API round trip"
            good={online}
          />
          <StatusCard label="Open tickets" value="2" sub="Mock support queue" good />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <section className="rounded-2xl border border-border bg-card">
            <header className="border-b border-border p-5">
              <h2 className="font-display text-xl">Services</h2>
              <p className="text-xs text-muted-foreground">Mock uptime by platform area.</p>
            </header>
            <div className="divide-y divide-border">
              {services.map(([name, status, uptime]) => (
                <div key={name} className="flex items-center justify-between gap-4 p-4">
                  <div className="flex items-center gap-3">
                    {status === "Operational" ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-warning" />
                    )}
                    <div>
                      <div className="text-sm font-medium">{name}</div>
                      <div className="text-xs text-muted-foreground">{uptime} uptime</div>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      status === "Operational"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-xl">Quick help</h2>
            <div className="mt-4 space-y-2">
              {docs.map((doc) => (
                <button
                  key={doc}
                  className="flex w-full items-center gap-2 rounded-md border border-border bg-canvas px-3 py-2 text-left text-sm hover:bg-muted"
                  onClick={() => toast.info(`Opening: ${doc}`)}
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {doc}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-xl">Recent incidents</h2>
            <div className="mt-4 space-y-3">
              <Incident title="Notification queue delay" time="Today, 4:10 PM" status="Monitoring" />
              <Incident title="Realtime reconnect spike" time="Yesterday, 8:35 PM" status="Resolved" />
              <Incident title="No active incidents" time="Last 7 days" status="Operational" />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-xl">Support tickets</h2>
            <div className="mt-4 divide-y divide-border rounded-xl border border-border">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3">
                  <div>
                    <div className="text-sm font-medium">{ticket.title}</div>
                    <div className="font-mono text-xs text-muted-foreground">{ticket.id}</div>
                  </div>
                  <Button
                    variant="outline"
                    className="bg-card"
                    onClick={() => toast.info(`${ticket.id}: ${ticket.status}`)}
                  >
                    {ticket.status}
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function StatusCard({
  label,
  value,
  sub,
  good,
}: {
  label: string;
  value: string;
  sub: string;
  good: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        {label}
        <Radio className={`h-4 w-4 ${good ? "text-success" : "text-destructive"}`} />
      </div>
      <div className="mt-2 font-display text-3xl">{value}</div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function Incident({ title, time, status }: { title: string; time: string; status: string }) {
  return (
    <div className="rounded-xl border border-border bg-canvas p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium">{title}</div>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{status}</span>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{time}</div>
    </div>
  );
}

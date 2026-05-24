import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  LayoutDashboard,
  Tag,
  CalendarRange,
  ClipboardList,
  BarChart3,
  Building2,
  Settings,
  PlusCircle,
  LifeBuoy,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { getMyBookings } from "@/lib/api/bookings";
import { useApiLatency } from "@/hooks/use-api-latency";

const nav = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Offers", to: "/admin/offers", icon: Tag },
  { label: "Slots", to: "/admin/slots", icon: CalendarRange },
  { label: "Bookings", to: "/admin/bookings", icon: ClipboardList },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Business", to: "/admin/profile", icon: Building2 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
] as const;

export function AdminSidebar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { latency, online } = useApiLatency();
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", "my"],
    queryFn: getMyBookings,
    retry: false,
  });

  function handleLogout() {
    localStorage.removeItem("token");
    queryClient.clear();
    toast.success("Signed out");
    navigate({ to: "/signin" });
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Logo />
      </div>
      <div className="px-4 pt-4">
        <button className="flex w-full items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted">
          <Search className="h-3.5 w-3.5" /> Search
          <kbd className="ml-auto rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
            Ctrl K
          </kbd>
        </button>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <div className="px-2 pb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </div>
        {nav.map((item) => {
          const active =
            pathname === item.to ||
            (item.to !== "/admin/dashboard" && pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${
                active
                  ? "bg-foreground text-background"
                  : "text-foreground/75 hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              {item.label === "Bookings" && (
                <span
                  className={`ml-auto rounded-full px-1.5 py-0.5 text-[10px] ${
                    active ? "bg-background/15 text-background" : "bg-lime text-lime-foreground"
                  }`}
                >
                  {bookings.length > 99 ? "99+" : bookings.length}
                </span>
              )}
            </Link>
          );
        })}
        <div className="px-2 pb-2 pt-6 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Quick
        </div>
        <Link
          to="/admin/offers/new"
          className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground/75 hover:bg-muted hover:text-foreground"
        >
          <PlusCircle className="h-4 w-4" /> New offer
        </Link>
        <Link
          to="/admin/help"
          className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground/75 hover:bg-muted hover:text-foreground"
        >
          <LifeBuoy className="h-4 w-4" /> Help & status
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-foreground/75 hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </nav>
      <div className="m-3 rounded-lg border border-border bg-muted/40 p-3 text-xs">
        <div className="mb-1 flex items-center gap-2 font-medium">
          <span
            className={`pulse-dot inline-flex h-1.5 w-1.5 rounded-full ${
              online ? "bg-success" : "bg-destructive"
            }`}
          />
          Realtime engine
        </div>
        <p className="text-muted-foreground">
          {online ? `Latency ${latency ?? "..."}ms` : "API offline"} - 99.99% uptime
        </p>
      </div>
    </aside>
  );
}

export function MobileAdminNav() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { latency, online } = useApiLatency();
  const items = [
    ...nav,
    { label: "New", to: "/admin/offers/new", icon: PlusCircle },
    { label: "Help", to: "/admin/help", icon: LifeBuoy },
  ] as const;

  function handleLogout() {
    localStorage.removeItem("token");
    queryClient.clear();
    toast.success("Signed out");
    navigate({ to: "/signin" });
  }

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-canvas/95 backdrop-blur lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-14 w-full items-center justify-between px-4 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <Logo />
        </span>
        <span className="text-xs text-muted-foreground">{open ? "Close" : "Menu"}</span>
      </button>

      {open && (
        <div className="border-t border-border px-3 pb-3">
          <nav className="grid grid-cols-3 gap-2 py-3">
            {items.map((item) => {
              const active =
                pathname === item.to ||
                (item.to !== "/admin/dashboard" && pathname.startsWith(item.to));

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 text-center text-xs transition-colors ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-foreground/75 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-card px-2 py-2 text-center text-xs text-foreground/75 hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </nav>

          <div className="rounded-lg border border-border bg-card p-3 text-xs">
            <div className="mb-1 flex items-center gap-2 font-medium">
              <span
                className={`pulse-dot inline-flex h-1.5 w-1.5 rounded-full ${
                  online ? "bg-success" : "bg-destructive"
                }`}
              />
              Realtime engine
            </div>
            <p className="text-muted-foreground">
              {online ? `Latency ${latency ?? "..."}ms` : "API offline"} - 99.99% uptime
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

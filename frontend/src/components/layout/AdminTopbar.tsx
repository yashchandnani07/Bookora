import { Bell, ChevronDown, HelpCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useBusinessProfile } from "@/hooks/use-business";
import { getMyBookings } from "@/lib/api/bookings";
import { getMyOffers } from "@/lib/api/offers";

export function AdminTopbar({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { data: business, isLoading: businessLoading } = useBusinessProfile();
  const { data: offers = [] } = useQuery({
    queryKey: ["offers", "my"],
    queryFn: getMyOffers,
    retry: false,
  });
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", "my"],
    queryFn: getMyBookings,
    retry: false,
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
    todaysBookings,
  });

  const initials = ownerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  const displayName = (() => {
    const parts = ownerName.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "Admin";
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  })();

  const workspaceLabel = businessLoading
    ? "Loading workspace"
    : businessName || "Complete business profile";
  const businessMeta = [business?.businessType, business?.city].filter(Boolean).join(" - ");
  const subtitleText = [subtitle, dynamicContext].filter(Boolean).join(" - ");

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-canvas/80 backdrop-blur-xl">
      <div className="flex min-h-16 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <div className="min-w-0">
          <div className="hidden flex-wrap items-center gap-2 text-xs text-muted-foreground sm:flex">
            <span className="max-w-[220px] truncate">{workspaceLabel}</span>
            <ChevronDown className="h-3 w-3 shrink-0" />
            <span className="hidden rounded-full bg-lime/40 px-2 py-0.5 text-[10px] font-medium text-foreground sm:inline">
              {businessMeta || `${profileScore}% ready`}
            </span>
          </div>
          <h1 className="font-display text-2xl leading-tight">{title}</h1>
          {subtitleText && (
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground sm:truncate">{subtitleText}</p>
          )}
        </div>
        <div className="flex w-full shrink-0 items-center justify-start gap-2 overflow-x-auto sm:w-auto sm:justify-end">
          {action ?? (
            <Button asChild size="sm" className="rounded-full">
              <Link to="/admin/offers/new">
                <Plus className="h-3.5 w-3.5" /> New offer
              </Link>
            </Button>
          )}
          <button className="rounded-md p-2 text-muted-foreground hover:bg-muted">
            <HelpCircle className="h-4 w-4" />
          </button>
          <Link
            to="/admin/bookings"
            className="relative rounded-md p-2 text-muted-foreground hover:bg-muted"
            title={`${pendingBookings} pending bookings`}
          >
            <Bell className="h-4 w-4" />
            {pendingBookings > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-lime px-1 text-[9px] font-medium text-foreground">
                {pendingBookings > 9 ? "9+" : pendingBookings}
              </span>
            )}
          </Link>
          <div className="ml-1 flex items-center gap-2 rounded-full border border-border bg-card p-0.5 pr-3">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-foreground text-xs text-background">
              {initials || businessName[0]?.toUpperCase() || "B"}
            </span>
            <span className="hidden text-xs font-medium md:inline">{displayName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function isToday(value: string) {
  return new Date(value).toDateString() === new Date().toDateString();
}

function getProfileScore(
  business:
    | {
        name?: string;
        businessType?: string;
        ownerName?: string;
        phone?: string;
        email?: string;
        city?: string;
        address?: string;
        description?: string;
      }
    | undefined
) {
  if (!business) return 0;

  const fields = [
    business.name,
    business.businessType,
    business.ownerName,
    business.phone,
    business.email,
    business.city,
    business.address,
    business.description,
  ];
  const filled = fields.filter((value) => Boolean(value?.trim())).length;

  return Math.round((filled / fields.length) * 100);
}

function getRouteContext(
  pathname: string,
  data: {
    activeOffers: number;
    bookings: number;
    businessCity?: string;
    businessType?: string;
    openSeats: number;
    pendingBookings: number;
    profileScore: number;
    todaysBookings: number;
  }
) {
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

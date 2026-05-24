import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminTopbar } from "@/components/layout/AdminTopbar";
import { getMyOffers } from "@/lib/api/offers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { badgeFor } from "./admin.dashboard";
import { useEffect } from "react";
import { subscribeToBookingUpdates } from "@/lib/realtime/bookings";

export const Route = createFileRoute("/admin/offers")({
  head: () => ({
    meta: [{ title: "Offers · Bookora" }, { name: "description", content: "Manage your offers." }],
  }),
  component: ManageOffers,
});

function ManageOffers() {
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["offers", "my"],
    queryFn: getMyOffers,
  });

  useEffect(() => {
    return subscribeToBookingUpdates({
      onSlotUpdated: () => {
        queryClient.invalidateQueries({ queryKey: ["offers", "my"] });
      },
      onOfferCreated: () => {
        queryClient.invalidateQueries({ queryKey: ["offers", "my"] });
      },
    });
  }, [queryClient]);

  if (pathname !== "/admin/offers") {
    return <Outlet />;
  }

  return (
    <>
      <AdminTopbar
        title="Offers"
        subtitle={isLoading ? "Loading…" : `${offers.length} total`}
      />
      <div className="space-y-6 p-6 lg:p-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search offers…"
              className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-full bg-card">
              <Filter className="h-4 w-4" /> Filters
            </Button>
            <Button asChild className="rounded-full">
              <Link to="/admin/offers/new">
                <Plus className="h-4 w-4" /> New offer
              </Link>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                {["Offer", "Category", "Price", "Capacity", "Fill", "Status", ""].map(
                  (h, i) => (
                    <th key={i} className="px-5 py-3 text-left font-medium">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                    Loading offers…
                  </td>
                </tr>
              ) : offers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                    No offers yet.{" "}
                    <Link to="/admin/offers/new" className="underline hover:text-foreground">
                      Create your first one.
                    </Link>
                  </td>
                </tr>
              ) : (
                offers.map((o) => {
                  const booked = o.totalSlots - o.remainingSlots;
                  const pct = o.totalSlots > 0 ? (booked / o.totalSlots) * 100 : 0;
                  return (
                    <tr
                      key={o.id}
                      className="border-b border-border last:border-0 hover:bg-muted/40"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="h-9 w-9 rounded-md bg-gradient-to-br from-amber-200 via-rose-200 to-orange-300 shrink-0" />
                          <div>
                            <div className="font-medium leading-tight">{o.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {o.id.slice(0, 8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{o.category || "—"}</td>
                      <td className="px-5 py-4">
                        <div>₹{o.offerPrice.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground line-through">
                          ₹{o.originalPrice.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-mono text-xs">
                          {booked}/{o.totalSlots}
                        </div>
                      </td>
                      <td className="w-40 px-5 py-4">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full ${pct === 100 ? "bg-foreground" : "bg-lime"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="mt-1 text-[10px] text-muted-foreground">
                          {Math.round(pct)}% filled
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] ${badgeFor(o.status)}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="rounded-md p-1.5 hover:bg-muted">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

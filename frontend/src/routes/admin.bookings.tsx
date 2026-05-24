import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AdminTopbar } from "@/components/layout/AdminTopbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Filter, MoreHorizontal, Search } from "lucide-react";
import { getMyBookings } from "@/lib/api/bookings";
import type { Booking } from "@/lib/api/bookings";
import { badgeFor } from "./admin.dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/bookings")({
  head: () => ({
    meta: [
      { title: "Bookings - Bookora" },
      { name: "description", content: "Manage all customer bookings." },
    ],
  }),
  component: BookingsPage,
});

function formatSlot(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return `${startDate.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  })} - ${endDate.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

function formatBookedAt(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function BookingsPage() {
  const [search, setSearch] = useState("");

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ["bookings", "my"],
    queryFn: getMyBookings,
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return bookings;

    return bookings.filter((booking) => {
      const haystack = [
        booking.bookingReference,
        booking.customerName,
        booking.customerPhone,
        booking.offer?.title,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [bookings, search]);

  const statusCounts = useMemo(() => {
    return bookings.reduce<Record<string, number>>((acc, booking) => {
      acc[booking.status] = (acc[booking.status] ?? 0) + 1;
      return acc;
    }, {});
  }, [bookings]);

  const tabs = [
    `All - ${bookings.length}`,
    `Confirmed - ${statusCounts.Confirmed ?? 0}`,
    `Pending - ${statusCounts.Pending ?? 0}`,
    `Completed - ${statusCounts.Completed ?? 0}`,
    `Cancelled - ${statusCounts.Cancelled ?? 0}`,
  ];

  return (
    <>
      <AdminTopbar
        title="Bookings"
        subtitle={isLoading ? "Loading customer reservations" : `${bookings.length} reservations`}
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full bg-card"
              onClick={() => {
                exportBookingsCsv(filtered);
                toast.success(`Exported ${filtered.length} bookings`);
              }}
            >
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        }
      />
      <div className="space-y-6 p-6 lg:p-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, ref, or offer"
              className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="rounded-full bg-card">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>

        <div className="-mx-2 flex flex-wrap items-center gap-2 overflow-x-auto px-2 text-xs">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 ${
                i === 0
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card hover:border-foreground/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                {[
                  "",
                  "Ref",
                  "Customer",
                  "Offer",
                  "Slot",
                  "People",
                  "Status",
                  "Booked",
                  "",
                ].map((h, i) => (
                  <th key={i} className="px-3 py-3 text-left font-medium first:pl-5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-muted-foreground">
                    Loading bookings...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-destructive">
                    Failed to load bookings.
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-muted-foreground">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filtered.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-border last:border-0 hover:bg-muted/40"
                  >
                    <td className="px-3 py-4 pl-5">
                      <input type="checkbox" className="h-3.5 w-3.5 accent-foreground" />
                    </td>
                    <td className="px-3 py-4 font-mono text-xs">
                      {booking.bookingReference}
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-muted text-[10px]">
                          {booking.customerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                        <div>
                          <div className="font-medium">{booking.customerName}</div>
                          <div className="text-xs text-muted-foreground">
                            {booking.customerPhone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4">{booking.offer?.title ?? "-"}</td>
                    <td className="px-3 py-4 text-muted-foreground">
                      {booking.slot
                        ? formatSlot(booking.slot.slotStart, booking.slot.slotEnd)
                        : "-"}
                    </td>
                    <td className="px-3 py-4">{booking.peopleCount}</td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] ${badgeFor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-muted-foreground">
                      {formatBookedAt(booking.createdAt)}
                    </td>
                    <td className="px-3 py-4 text-right">
                      <button className="rounded-md p-1.5 hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function exportBookingsCsv(bookings: Booking[]) {
  const rows = [
    ["Reference", "Customer", "Phone", "Email", "Offer", "Slot start", "Slot end", "People", "Status", "Booked at"],
    ...bookings.map((booking) => [
      booking.bookingReference,
      booking.customerName,
      booking.customerPhone,
      booking.customerEmail ?? "",
      booking.offer?.title ?? "",
      booking.slot?.slotStart ?? "",
      booking.slot?.slotEnd ?? "",
      String(booking.peopleCount),
      booking.status,
      booking.createdAt,
    ]),
  ];
  const csv = rows
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `bookora-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

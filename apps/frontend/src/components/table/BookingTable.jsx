"use client";

import {
  TableShell,
  TableHead,
  TableBody,
  TableRow,
  TableEmpty,
  TableLoader,
} from "./core";

import ActionMenu from "../common/ActionMenu";
import { Eye, XCircle } from "lucide-react";
import { useState, useMemo } from "react";
import StatusBadge from "../common/StatusBadge";

export default function BookingTable({
  data = dummyBookings, // 🔥 fallback
  isLoading = false,
  onView,
  onCancel,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // 🔍 Search
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      [item.name, item.email, item.place?.name].some((val) =>
        val?.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [data, search]);

  const columns = [
    "Customer",
    "Phone",
    "Place",
    "Slot",
    "Tickets",
    "Seats",
    "Amount",
    "Booking Type",
    "Transaction ID",
    "Payment ID",
    "Status",
    "Created",
    "Action",
  ];

  return (
     <div className="w-full overflow-x-auto">
    <div className="min-w-350">
    <TableShell
      title="Bookings"
      subtitle={`${filteredData.length} total bookings`}
      searchProps={{
        value: search,
        onChange: (e) => setSearch(e.target.value),
        onClear: () => setSearch(""),
        placeholder: "Search name, email or place...",
      }}
      paginationProps={{
        page,
        totalPages: 1,
        onNext: () => setPage((p) => p + 1),
        onPrev: () => setPage((p) => p - 1),
      }}
    >
      <TableHead columns={columns} />

      <TableBody>
        {isLoading ? (
          <TableLoader rows={5} />
        ) : filteredData.length === 0 ? (
          <TableEmpty colSpan={6} message="No bookings found" />
        ) : (
          filteredData.map((booking) => (
            <TableRow
              key={booking.id}
              renderActions={() => (
                <ActionMenu
                  items={[
                    {
                      label: "View",
                      icon: Eye,
                      onClick: () => onView?.(booking),
                    },
                    {
                      label: "Cancel",
                      icon: XCircle,
                      danger: true,
                      onClick: () => onCancel?.(booking),
                    },
                  ]}
                />
              )}
            >
              {/* Customer */}
              <td className="px-6 py-4">
                <p className="font-semibold text-slate-900">{booking.name}</p>

                <p className="text-xs text-slate-500">{booking.email}</p>
              </td>

              {/* Phone */}
              <td className="px-6 py-4 text-slate-600">
                {booking.phone || "N/A"}
              </td>

              {/* Place */}
              <td className="px-6 py-4 text-slate-700">
                {booking.place?.name || "N/A"}
              </td>

              {/* Slot */}
              <td className="px-6 py-4 text-slate-500">
                <div className="flex flex-col whitespace-nowrap">
                  <span>{booking.slotDateTime?.split("T")[0]}</span>

                  <span className="text-xs text-slate-400">
                    {booking.slotDateTime
                      ?.split("T")[1]
                      ?.replace(".000Z", "")
                      ?.slice(0, 5)}
                  </span>
                </div>
              </td>

              {/* Tickets */}
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  {booking.tickets?.length ? (
                    booking.tickets.map((ticket) => (
                      <span
                        key={ticket.id}
                        className="text-xs bg-sky-50 text-sky-700 px-2 py-1 rounded-lg w-fit"
                      >
                        {ticket.type?.name || "Ticket"}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 text-xs">No Tickets</span>
                  )}
                </div>
              </td>

              {/* Seats */}
              <td className="px-6 py-4 text-slate-600">
                {booking.totalSeats || 0}
              </td>

              {/* Amount */}
              <td className="px-6 py-4 font-semibold text-slate-800">
                ₹{booking.totalAmount}
              </td>

              {/* Booking Type */}
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded-lg text-xs bg-violet-50 text-violet-700">
                  {booking.bookingType || "TICKET"}
                </span>
              </td>

              {/* Transaction ID */}
              <td className="px-6 py-4 text-xs text-slate-600 whitespace-nowrap">
                {booking.txnId || "N/A"}
              </td>

              {/* Payment ID */}
              <td className="px-6 py-4 text-xs text-slate-600 whitespace-nowrap">
                {booking.paymentId || "N/A"}
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <StatusBadge status={booking.status} />
              </td>

              {/* Created */}
              <td className="px-6 py-4 text-slate-500 text-sm">
                {new Date(booking.createdAt).toLocaleDateString("en-IN")}
              </td>
            </TableRow>
          ))
        )}
      </TableBody>
    </TableShell>
     </div>
      </div>
  );
}

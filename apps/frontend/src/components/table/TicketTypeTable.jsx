"use client";

import {
  TableHead,
  TableRow,
  TableEmpty,
  TableLoader,
  TableShell,
  TableBody,
} from "@/components/table/core";

import ActionMenu from "../common/ActionMenu";
import { Pencil, Trash, Eye } from "lucide-react";
import { useState, useMemo } from "react";


export default function TicketTypeTable({
  data = [], // 🔥 fallback to dummy
  loading = false,
  onEdit,
  onDelete,
  onView,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // 🔍 Search
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      [item.name, item.place?.name].some((val) =>
        val?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const columns = [
    "Ticket Name",
    "Place",
    "Price",
    "Max Per Booking",
    "Action",
  ];

  return (
    <TableShell
      title="Ticket Types"
      subtitle={`${filteredData.length} total ticket types`}
      searchProps={{
        value: search,
        onChange: (e) => setSearch(e.target.value),
        onClear: () => setSearch(""),
        placeholder: "Search ticket or place...",
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
        {loading ? (
          <TableLoader rows={5} />
        ) : filteredData.length === 0 ? (
          <TableEmpty colSpan={5} message="No ticket types found." />
        ) : (
          filteredData.map((ticket) => (
            <TableRow
              key={ticket.id}
              renderActions={() => (
                <ActionMenu
                  items={[
                    {
                      label: "View",
                      icon: Eye,
                      onClick: () => console.log("View", ticket),
                    },
                    {
                      label: "Edit",
                      icon: Pencil,
                      onClick: () => onEdit?.(ticket),
                    },
                    {
                      label: "Delete",
                      icon: Trash,
                      danger: true,
                      onClick: () => onDelete?.(ticket),
                    },
                  ]}
                />
              )}
            >
              {/* Name */}
              <td className="px-6 py-4 font-semibold text-slate-900">
                {ticket.name}
              </td>

              {/* Place */}
              <td className="px-6 py-4 text-slate-600">
                {ticket.place?.name || "N/A"}
              </td>

              {/* Price */}
              <td className="px-6 py-4 font-medium text-slate-800">
                ₹{ticket.price}
              </td>

              {/* Max */}
              <td className="px-6 py-4 text-slate-500">
                {ticket.maxPerBooking}
              </td>
            </TableRow>
          ))
        )}
      </TableBody>
    </TableShell>
  );
}
"use client";

import {
  TableShell,
  TableHead,
  TableBody,
  TableRow,
  TableEmpty,
  TableLoader,
} from "@/components/table/core";

import ActionMenu from "@/components/common/ActionMenu";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

// ✅ Dummy Data
const SLOT_OVERRIDES = [
  {
    id: "1",
    date: "2026-04-10",
    startTime: "09:00 AM",
    capacity: 20,
    isClosed: false,
  },
  {
    id: "2",
    date: "2026-04-10",
    startTime: "10:00 AM",
    capacity: null,
    isClosed: true,
  },
  {
    id: "3",
    date: "2026-04-11",
    startTime: "11:00 AM",
    capacity: 30,
    isClosed: false,
  },
];

export default function SlotOverrideTable() {
  const [search, setSearch] = useState("");
  const [loading] = useState(false);

  // ✅ Filter
  const filteredData = SLOT_OVERRIDES.filter((item) =>
    item.startTime.toLowerCase().includes(search.toLowerCase()) ||
    item.date.includes(search)
  );

  const handleEdit = (row) => console.log("Edit:", row);
  const handleDelete = (row) => console.log("Delete:", row);

  const columns = ["Date", "Start Time", "Capacity", "Status", "Actions"];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      
      <TableShell
        title="Slot Overrides "
        searchProps={{
          value: search,
          onChange: (e) => setSearch(e.target.value),
          onClear: () => setSearch(""),
          placeholder: "Search by date or time...",
        }}
      >
        <TableHead columns={columns} />

        <TableBody>
          {loading ? (
            <TableLoader />
          ) : filteredData.length === 0 ? (
            <TableEmpty message="No overrides found" />
          ) : (
            filteredData.map((item) => (
              <TableRow key={item.id}>
                
                {/* Date */}
                <td className="px-5 py-3 font-medium text-gray-800">
                  {new Date(item.date).toLocaleDateString()}
                </td>

                {/* Start Time */}
                <td className="px-5 py-3 text-gray-600">
                  {item.startTime}
                </td>

                {/* Capacity */}
                <td className="px-5 py-3 text-gray-500">
                  {item.capacity ?? "-"}
                </td>

                {/* Status */}
                <td className="px-5 py-3">
                  {item.isClosed ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                      Closed
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                      Open
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-5 py-3 text-right w-20">
                  <ActionMenu
                    items={[
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => handleEdit(item),
                      },
                      {
                        label: "Delete",
                        icon: Trash,
                        danger: true,
                        onClick: () => handleDelete(item),
                      },
                    ]}
                  />
                </td>

              </TableRow>
            ))
          )}
        </TableBody>
      </TableShell>
    </div>
  );
}
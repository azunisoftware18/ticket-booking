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

// ✅ Dummy Data (SlotTemplate based)
const SLOT_TEMPLATES = [
  {
    id: "1",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    capacity: 50,
  },
  {
    id: "2",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    capacity: 40,
  },
  {
    id: "3",
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    capacity: 60,
  },
];

export default function SlotTemplateTable() {
  const [search, setSearch] = useState("");
  const [loading] = useState(false);

  // ✅ Filter logic
  const filteredSlots = SLOT_TEMPLATES.filter((slot) =>
    slot.startTime.toLowerCase().includes(search.toLowerCase()) ||
    slot.endTime.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (slot) => console.log("Edit:", slot);
  const handleDelete = (slot) => console.log("Delete:", slot);

  const columns = ["Start Time", "End Time", "Capacity", "Actions"];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      
      <TableShell
        title="Slot Templates "
        searchProps={{
          value: search,
          onChange: (e) => setSearch(e.target.value),
          onClear: () => setSearch(""),
          placeholder: "Search slots...",
        }}
      >
        <TableHead columns={columns} />

        <TableBody>
          {loading ? (
            <TableLoader />
          ) : filteredSlots.length === 0 ? (
            <TableEmpty message="No slots found" />
          ) : (
            filteredSlots.map((slot) => (
              <TableRow key={slot.id}>
                
                {/* Start Time */}
                <td className="px-5 py-3 font-medium text-gray-800">
                  {slot.startTime}
                </td>

                {/* End Time */}
                <td className="px-5 py-3 text-gray-600">
                  {slot.endTime}
                </td>

                {/* Capacity */}
                <td className="px-5 py-3 text-gray-500">
                  {slot.capacity}
                </td>

                {/* Actions */}
                <td className="px-5 py-3 text-right w-20">
                  <ActionMenu
                    items={[
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => handleEdit(slot),
                      },
                      {
                        label: "Delete",
                        icon: Trash,
                        danger: true,
                        onClick: () => handleDelete(slot),
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
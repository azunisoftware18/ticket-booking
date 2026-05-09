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

export default function AddonTable({
  data = [],
  loading = false,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // ✅ Search Filter
  const filteredAddons = data.filter((addon) =>
    addon.name.toLowerCase().includes(search.toLowerCase()),
  );

  const columns = ["Addon Name", "Price", "Status", "Created At", "Actions"];

  return (
    <div className="p-6  ">
      <TableShell
        title="Place Addons"
        searchProps={{
          value: search,
          onChange: (e) => setSearch(e.target.value),
          onClear: () => setSearch(""),
          placeholder: "Search addons...",
        }}
        paginationProps={{
          page,
          totalPages: 3,
          onNext: () => setPage((p) => p + 1),
          onPrev: () => setPage((p) => p - 1),
        }}
      >
        <TableHead columns={columns} />

        <TableBody>
          {loading ? (
            <TableLoader />
          ) : filteredAddons.length === 0 ? (
            <TableEmpty message="No addons found" />
          ) : (
            filteredAddons.map((addon) => (
              <TableRow key={addon.id}>
                {/* Addon Name */}
                <td className="px-5 py-3 font-medium text-gray-800">
                  {addon.name}
                </td>

                {/* Price */}
                <td className="px-5 py-3 text-gray-600">₹ {addon.price}</td>

                {/* Status */}
                <td className="px-5 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      addon.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {addon.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Created At */}
                <td className="px-5 py-3 text-gray-500">{addon.createdAt}</td>

                {/* Actions */}
                <td className="px-5 py-3 text-right w-20">
                  <ActionMenu
                    items={[
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => onEdit?.(addon),
                      },
                      {
                        label: "Delete",
                        icon: Trash,
                        danger: true,
                        onClick: () => onDelete?.(addon),
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

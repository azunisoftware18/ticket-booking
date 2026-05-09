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
import { Pencil, Trash, MapPin } from "lucide-react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function PlaceTable({
  data = [],
  loading,
  onEdit,
  onDelete,
  onView,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
    const router = useRouter();
  const filteredPlaces = useMemo(() => {
    return data.filter((place) =>
      [place.name, place.location].some((val) =>
        val?.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [data, search]);

  // ✅ Columns array mein Latitude aur Longitude ko alag kiya
  const columns = [
    "Name",
    "Location",
    "Latitude",
    "Longitude",
    "Created At",
    "Action",
  ];

  return (
    <TableShell
      title="Tourist Places"
      subtitle={`${filteredPlaces.length} total places found`}
      searchProps={{
        value: search,
        onChange: (e) => setSearch(e.target.value),
        onClear: () => setSearch(""),
        placeholder: "Search by name or city...",
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
          <TableLoader rows={5} />
        ) : filteredPlaces.length === 0 ? (
          <TableEmpty message="No tourist places found matching your search." />
        ) : (
          filteredPlaces.map((place) => (
            <TableRow
              key={place.id}
              renderActions={() => (
                <ActionMenu
                  items={[
                    {
                      label: "View",
                      icon: MapPin,
                      onClick: () => router.push(`/dashboard/place/${place.id}`),
                    },
                    {
                      label: "Edit",
                      icon: Pencil,
                      onClick: () => onEdit?.(place), // 🔥 FIX
                    },
                    {
                      label: "Delete",
                      icon: Trash,
                      danger: true,
                      onClick: () => onDelete?.(place), // 🔥 FIX
                    },
                  ]}
                />
              )}
            >
              <td className="px-6 py-4 font-semibold text-slate-900">
                {place.name}
              </td>

              <td className="px-6 py-4 text-slate-600">
                <div className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  {place.location || "N/A"}
                </div>
              </td>

              {/* ✅ Latitude Column */}
              <td className="px-6 py-4 font-mono text-xs text-slate-500">
                {place.latitude?.toFixed(6) ?? "0.000000"}
              </td>

              {/* ✅ Longitude Column */}
              <td className="px-6 py-4 font-mono text-xs text-slate-500">
                {place.longitude?.toFixed(6) ?? "0.000000"}
              </td>

              <td className="px-6 py-4 text-slate-500">
                {new Date(place.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </TableRow>
          ))
        )}
      </TableBody>
    </TableShell>
  );
}

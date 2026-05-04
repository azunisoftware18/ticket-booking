"use client";

import {
  TableShell,
  TableHead,
  TableBody,
  TableRow,
  TableEmpty,
  TableLoader,
} from "@/components/table/core";

import ActionMenu from "../common/ActionMenu";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

const USERS = [
  {
    id: "1",
    fullName: "Sohail Ahmed",
    email: "sohail@gmail.com",
    role: "ADMIN",
    createdAt: "2026-04-01",
  },
  {
    id: "2",
    fullName: "Rahul Sharma",
    email: "rahul@gmail.com",
    role: "USER",
    createdAt: "2026-04-02",
  },
  {
    id: "3",
    fullName: "Aman Khan",
    email: "aman@gmail.com",
    role: "USER",
    createdAt: "2026-04-03",
  },
];

export default function UserTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading] = useState(false);

  const filteredUsers = USERS.filter((user) =>
    user.fullName.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user) => console.log("Edit:", user);
  const handleDelete = (user) => console.log("Delete:", user);

  const columns = ["Name", "Email", "Role", "Created At", "Actions"];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      
      <TableShell
        title="Users "
        searchProps={{
          value: search,
          onChange: (e) => setSearch(e.target.value),
          onClear: () => setSearch(""),
          placeholder: "Search users...",
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
          ) : filteredUsers.length === 0 ? (
            <TableEmpty message="No users found" />
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                
                <td className="px-5 py-3">{user.fullName}</td>
                <td className="px-5 py-3">{user.email}</td>

                <td className="px-5 py-3">
                  <span className="px-2 py-1 text-xs rounded bg-gray-100">
                    {user.role}
                  </span>
                </td>

                <td className="px-5 py-3">{user.createdAt}</td>

                <td className="px-5 py-3 text-right">
                  <ActionMenu
                    items={[
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => handleEdit(user),
                      },
                      {
                        label: "Delete",
                        icon: Trash,
                        danger: true,
                        onClick: () => handleDelete(user),
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
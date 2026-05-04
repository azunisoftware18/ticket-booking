"use client";

import React from "react";
import { User, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export default function DashboardNavbar() {
  const { user } = useSelector((state) => state.auth);
  const pathname = usePathname();

  const getPageTitle = (pathname) => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/dashboard/place") return "Place";
    if (pathname === "/dashboard/slots") return "Slots";
    return "Dashboard";
  };

  return (
    <nav 
      style={{ 
        backgroundColor: "var(--background)", 
        borderColor: "var(--border)" 
      }}
      className="h-20 px-8 flex items-center justify-between border-b sticky top-0 z-40"
    >
      {/* 🔥 LEFT SIDE - PAGE TITLE */}
      <h1 
        style={{ color: "var(--foreground)" }}
        className="text-xl font-bold tracking-tight"
      >
        {getPageTitle(pathname)}
      </h1>

      {/* 🔥 RIGHT SIDE - USER */}
      <div className="flex items-center gap-6">

        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{ 
            backgroundColor: "var(--secondary)", 
            borderColor: "var(--border)" 
          }}
          className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-2xl border cursor-pointer hover:opacity-90 transition-all shadow-sm"
        >
          <div 
            style={{ backgroundColor: "var(--primary)" }}
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shadow-black/5"
          >
            <User style={{ color: "var(--primary-foreground)" }} size={20} />
          </div>

          <div className="hidden lg:block text-left">
            <p 
              style={{ color: "var(--foreground)" }}
              className="text-sm font-bold leading-none tracking-tight"
            >
              {user?.fullName || "Loading..."}
            </p>

            <p 
              style={{ color: "var(--muted-foreground)" }}
              className="text-[10px] font-bold uppercase mt-1 tracking-wider"
            >
              {user?.role || ""}
            </p>
          </div>

          <ChevronDown size={14} style={{ color: "var(--muted-foreground)" }} />
        </motion.div>

      </div>
    </nav>
  );
}
"use client";

import React from "react";
import {
  Search,
  Bell,
  User,
  Settings,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardNavbar() {
  // Aaj ki date format karne ke liye
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <nav className="h-20 px-8 flex items-center justify-end bg-[#050505] backdrop-blur-md border-b border-white/5 sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-2xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <User className="text-black" size={20} />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-black text-white leading-none tracking-tight">
              Sohail Khan
            </p>
            <p className="text-[10px] text-white/40 font-bold uppercase mt-1">
              Super Admin
            </p>
          </div>
          <ChevronDown size={14} className="text-white/40" />
        </motion.div>
      </div>
    </nav>
  );
}

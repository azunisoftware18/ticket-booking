"use client";

import React from "react";
import { User, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardNavbar() {
  return (
    <nav 
      style={{ 
        backgroundColor: "var(--background)", 
        borderColor: "var(--border)" 
      }}
      className="h-20 px-8 flex items-center justify-end border-b sticky top-0 z-40"
    >
      <div className="flex items-center gap-6">
        
        {/* User Profile Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{ 
            backgroundColor: "var(--secondary)", 
            borderColor: "var(--border)" 
          }}
          className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-2xl border cursor-pointer hover:opacity-90 transition-all shadow-sm"
        >
          {/* Avatar Icon Container: Using Primary Color */}
          <div 
            style={{ backgroundColor: "var(--primary)" }}
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shadow-black/5"
          >
            <User style={{ color: "var(--primary-foreground)" }} size={20} />
          </div>

          <div className="hidden lg:block text-left">
            {/* Name: Using Foreground Color */}
            <p 
              style={{ color: "var(--foreground)" }}
              className="text-sm font-bold leading-none tracking-tight"
            >
              Sohail Khan
            </p>
            {/* Role: Using Muted Foreground */}
            <p 
              style={{ color: "var(--muted-foreground)" }}
              className="text-[10px] font-bold uppercase mt-1 tracking-wider"
            >
              Super Admin
            </p>
          </div>

          <ChevronDown size={14} style={{ color: "var(--muted-foreground)" }} />
        </motion.div>

      </div>
    </nav>
  );
}
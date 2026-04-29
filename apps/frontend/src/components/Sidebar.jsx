"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  Home, Ticket, Map, History, Settings, 
  ChevronRight, LogOut, Menu, X, Star 
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Ticket, label: "My Tickets", href: "/tickets" },
  { icon: Map, label: "Destinations", href: "/explore" },
  { icon: History, label: "Booking History", href: "/history" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Performance Optimization: Spring transition constants
  const springConfig = { type: "spring", stiffness: 350, damping: 35 };

  if (!mounted) return null;

  return (
    <LayoutGroup>
      <motion.aside
        layout
        initial={false}
        animate={{ width: isOpen ? "280px" : "88px" }}
        transition={springConfig}
        className="relative flex flex-col h-screen bg-[#050505] text-white border-r border-white/5 z-50 overflow-hidden shadow-2xl shrink-0"
      >
        {/* --- HEADER --- */}
        <div className="flex items-center h-24 px-6 shrink-0">
          <div className="flex items-center justify-between w-full">
            <AnimatePresence mode="popLayout" initial={false}>
              {isOpen && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 origin-left"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-white/5">
                    <Ticket className="text-black" size={22} />
                  </div>
                  <span className="font-black text-xl tracking-tighter italic">
                    GO<span className="text-white/40">TICKET</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              layout
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-xl border border-white/10 hover:bg-white hover:text-black transition-colors duration-200 ${!isOpen ? "mx-auto" : ""}`}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>

        {/* --- NAVIGATION --- */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} prefetch={true}>
                <motion.div
                  layout
                  className={`relative flex items-center gap-4 px-4 py-4 rounded-2xl cursor-pointer group transition-all duration-300 ${
                    isActive ? "bg-white text-black shadow-lg shadow-white/10" : "hover:bg-white/5 text-white/60"
                  }`}
                >
                  <item.icon size={22} className={`shrink-0 ${isActive ? "scale-110" : "group-hover:scale-110"} transition-transform`} />
                  
                  <AnimatePresence mode="popLayout" initial={false}>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-bold text-sm whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {isActive && isOpen && (
                    <motion.div layoutId="activeIndicator" className="ml-auto">
                      <ChevronRight size={14} />
                    </motion.div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* --- FOOTER --- */}
        <div className="p-4 mt-auto">
          <motion.div 
            layout
            className="bg-white/5 rounded-[2.5rem] p-2 border border-white/5 overflow-hidden"
          >
            <button className="flex items-center gap-4 w-full px-4 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-colors duration-200 group">
              <LogOut size={22} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
              {isOpen && <span className="font-bold text-sm">Sign Out</span>}
            </button>

            <AnimatePresence mode="popLayout" initial={false}>
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-2 p-4 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
                     <Star className="text-black" size={14} fill="currentColor" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="font-black text-[10px] uppercase text-white truncate">Royal Admin</p>
                    <p className="text-[8px] text-white/40 truncate">Premium Access</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.aside>
    </LayoutGroup>
  );
}
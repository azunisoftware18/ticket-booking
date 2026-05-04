"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { isAuthChecked, isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // 🔥 auth check complete hone ke baad hi redirect
    if (isAuthChecked && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isAuthChecked, isLoggedIn]);

  // 🔥 jab tak auth check ho raha hai
  if (!isAuthChecked) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <div className="shrink-0">
          <DashboardNavbar />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
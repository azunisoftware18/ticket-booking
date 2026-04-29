"use client";

import DashboardNavbar from '@/components/DashboardNavbar'
import Sidebar from '@/components/Sidebar';
import React from 'react'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* Sidebar (already fixed width with animation) */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="shrink-0">
          <DashboardNavbar />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>

    </div>
  )
}
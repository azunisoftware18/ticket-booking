"use client";

import React from "react";

import BookingTable from "@/components/table/BookingTable";
import { useBookings } from "@/lib/queries/useBooking";
import StatCard from "@/components/common/StatCard";

export default function Page() {
  const {
    data: bookings,
    isLoading,
  } = useBookings();

  // =====================
  // STATS
  // =====================

  const totalBookings = bookings?.length || 0;

  const today = new Date().toISOString().split("T")[0];

  const todayBookings =
    bookings?.filter((booking) => {
      const bookingDate = new Date(booking.createdAt)
        .toISOString()
        .split("T")[0];

      return bookingDate === today;
    }).length || 0;

  const totalTicketsGenerated =
    bookings?.reduce((sum, booking) => {
      return sum + Number(booking.totalTickets || 0);
    }, 0) || 0;

  const successfulBookings =
  bookings?.filter(
    (booking) =>
      booking.status === "PAID" ||
      booking.paymentStatus === "PAID"
  ).length || 0;

  return (
    <div className=" bg-slate-50 min-h-screen">

      <div className="W-full mx-auto mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Booking Management
        </h1>

        <p className="text-slate-500 font-medium">
          Manage all bookings and ticket activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

        <StatCard
          title="Total Bookings"
          value={totalBookings}
          percentage={12}
          isUp={true}
          trendingText="All booking records"
          subText="Total bookings received"
        />

        <StatCard
          title="Today's Bookings"
          value={todayBookings}
          percentage={8}
          isUp={true}
          trendingText="Today's activity"
          subText="Bookings created today"
        />

        

        <StatCard
          title="Successful Bookings"
          value={successfulBookings}
          percentage={5}
          isUp={true}
          trendingText="Completed bookings"
          subText="Successfully paid bookings"
        />
      </div>

      <div >
        <BookingTable
          data={bookings || []}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
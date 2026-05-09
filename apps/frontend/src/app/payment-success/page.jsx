"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Download, CheckCheck } from "lucide-react";

import { useBookingById } from "@/lib/queries/useBooking";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bookingId = searchParams.get("bookingId");

  // 🔥 GET BOOKING DATA
  const { data: booking, isLoading } = useBookingById(bookingId);

  const handleDownload = () => {
    window.open(
      `http://localhost:8000/api/ticket/download/${bookingId}`,
      "_blank"
    );
  };

  // 🔥 LOADING
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        backgroundColor: "#f6f1e7",
        backgroundImage:
          "radial-gradient(#e8dcc7 0.7px, transparent 0.7px)",
        backgroundSize: "12px 12px",
      }}
    >
      <div className="w-full max-w-2xl text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-green-700 flex items-center justify-center shadow-lg">
            <CheckCheck size={50} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">
          Booking Summary
        </h1>

        <p className="mt-5 text-slate-700 text-lg leading-relaxed">
          Your booking has been successfully completed!
          A confirmation has been sent to your email.
        </p>

        {/* Ticket Card */}
        <div className="relative mt-12 mx-auto max-w-xl">

          <div className="bg-[#8B0000] rounded-t-2xl px-10 py-10 text-white shadow-2xl">

            <div className="space-y-7">

              {/* Visit Date */}
              <Row
                label="Visit Date"
                value={new Date(
                  booking?.slotDateTime
                ).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              />

              {/* Time */}
              <Row
  label="Time Slot"
  value={new Date(
    `1970-01-01T${booking?.slotDateTime
      ?.split("T")[1]
      ?.slice(0, 5)}`
  ).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}
/>

              {/* Visitors */}
              <Row
                label="Total Visitors"
                value={booking?.totalSeats}
              />

              {/* Payment */}
              <Row
                label="Payment Method"
                value="Easebuzz"
              />

              {/* Amount */}
              <Row
                label="Total Amount"
                value={`₹${booking?.totalAmount}`}
              />
            </div>
          </div>

          {/* Zig Zag */}
          <div className="flex overflow-hidden">
            {Array.from({ length: 26 }).map((_, i) => (
              <div
                key={i}
                className="w-0 h-0 border-l-14 border-r-14 border-t-18
                border-l-transparent border-r-transparent border-t-[#8B0000]"
              />
            ))}
          </div>
        </div>

        {/* Download */}
        <button
          onClick={handleDownload}
          className="mt-16 inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300
          text-black text-xl font-bold px-10 py-5 rounded-xl border-[3px]
          border-black shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all"
        >
          Download Ticket
          <Download size={26} />
        </button>

        {/* Home */}
        <button
          onClick={() => router.push("/")}
          className="block mx-auto mt-7 text-2xl font-semibold text-slate-900 hover:underline"
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}

/* Row */
function Row({ label, value }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 text-left">

      <span className="text-2xl font-medium">
        {label}
      </span>

      <span className="text-2xl font-bold">
        :
      </span>

      <span className="text-2xl font-semibold text-right">
        {value}
      </span>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ArrowLeft,
  Calendar,
  Users,
  Info,
  CheckCircle2,
  Ticket,
  Globe,
  CreditCard,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { useSlots } from "@/lib/queries/useSlot";
import { useTicketTypes } from "@/lib/queries/useTicketType";
import { useCreateBooking } from "@/lib/mutations/useBooking";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const placeId = "505c043f-3fb5-481f-b712-93637c688447";
  const { mutateAsync: createBooking } = useCreateBooking();
  const [formData, setFormData] = useState({
    date: "2026-05-07",
    time: "14:00",
    tickets: {},
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    agreed: false,
  });
  const { data: slots, isLoading } = useSlots({
    placeId,
    date: formData.date,
  });
  const { data: ticketTypes = [] } = useTicketTypes(placeId);
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);
  const handleBooking = async () => {
    try {
      // 🔥 SLOT DATETIME
      const slotDateTime = `${formData.date}T${formData.time}:00.000Z`;

      // 🔥 TICKETS ARRAY
      const tickets = Object.entries(formData.tickets)
        .filter(([_, qty]) => qty > 0)
        .map(([typeId, quantity]) => ({
          typeId,
          quantity,
        }));

      // 🔥 VALIDATION
      if (!tickets.length) {
        alert("Please select at least 1 ticket");
        return;
      }

      // 🔥 PAYLOAD
      const payload = {
        placeId,

        slotDateTime,

        name: `${formData.firstName} ${formData.lastName}`,

        email: formData.email,

        phone: formData.phone,

        tickets,
      };

      console.log("BOOKING PAYLOAD:", payload);

      // 🔥 API CALL
      const response = await createBooking(payload);

      console.log("BOOKING RESPONSE:", response);

      const payment = response.payment;

      // 🔥 PAYMENT FORM
      const form = document.createElement("form");

      form.method = "POST";

      form.action = payment.url;

      Object.entries(payment).forEach(([key, value]) => {
        if (key === "url") return;

        const input = document.createElement("input");

        input.type = "hidden";

        input.name = key;

        input.value = value;

        form.appendChild(input);
      });

      document.body.appendChild(form);

      form.submit();
    } catch (err) {
      console.error("BOOKING ERROR:", err);
    }
  };
  // Helper for Stepper
  const StepIndicator = ({ current }) => (
    <div className="flex items-center justify-center gap-3 mb-10">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${current >= i ? "w-8 bg-[#ec003f]" : "w-2 bg-slate-200"}`}
          />
        </div>
      ))}
    </div>
  );

  const formatTime12Hour = (time) => {
    const [hour, minute] = time.split(":");

    const date = new Date();

    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const Step1 = () => (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Visit Date & <span className="text-[#ec003f]">Time</span>
        </h2>
        <p className="text-slate-500 font-medium">
          Select when you'd like to explore the heritage site.
        </p>
      </header>

      <div className="grid gap-6">
        <div className="relative group">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">
            Select Date
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ec003f]"
              size={20}
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              className="w-full bg-slate-50 border-2 border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-[#ec003f] transition-all font-bold text-slate-700"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">
            Available Slots
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {slots?.map((slot) => (
              <button
                type="button"
                key={slot.time}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    time: slot.time.slice(0, 5),
                  }))
                }
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${
                  formData.time === slot.time.slice(0, 5)
                    ? "border-[#ec003f] bg-rose-50/50 shadow-md shadow-rose-100"
                    : "border-slate-100 bg-white hover:border-slate-200"
                }`}
              >
                <Clock
                  size={16}
                  className={
                    formData.time === slot.time.slice(0, 5)
                      ? "text-[#ec003f]"
                      : "text-slate-300"
                  }
                />

                <span className="font-bold text-slate-800">
                  {formatTime12Hour(slot.time)}
                </span>

                <span className="text-xs text-slate-400">
                  {slot.available} seats left
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Visitor <span className="text-[#ec003f]">Tickets</span>
        </h2>

        <p className="text-slate-500 font-medium">
          Add members joining you for this experience.
        </p>
      </header>

      <div className="space-y-4">
        {ticketTypes.map((type) => {
          const qty = formData.tickets?.[type.id] || 0;

          return (
            <div
              key={type.id}
              className="flex justify-between items-center p-6 bg-white border-2 border-slate-100 rounded-[2rem]"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-[#ec003f]">
                  <Ticket size={24} />
                </div>

                <div>
                  <p className="font-black text-slate-800">{type.name}</p>

                  <p className="text-sm font-bold text-slate-400">
                    ₹{type.price} per head
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-1.5 border border-slate-100">
                {/* MINUS */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      tickets: {
                        ...formData.tickets,
                        [type.id]: Math.max(0, qty - 1),
                      },
                    })
                  }
                  className="w-10 h-10 flex items-center justify-center bg-white shadow-sm rounded-xl"
                >
                  -
                </button>

                {/* QTY */}
                <span className="font-black w-6 text-center text-slate-700">
                  {qty}
                </span>

                {/* PLUS */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      tickets: {
                        ...formData.tickets,
                        [type.id]: qty + 1,
                      },
                    })
                  }
                  className="w-10 h-10 flex items-center justify-center bg-[#ec003f] text-white rounded-xl"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Contact <span className="text-[#ec003f]">Details</span>
        </h2>
        <p className="text-slate-500 font-medium">
          We'll send your digital ticket here.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            First Name
          </label>
          <input
            type="text"
            placeholder="Sohail"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-[#ec003f] outline-none transition-all font-bold"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Ahmed"
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-[#ec003f] outline-none transition-all font-bold"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="hello@azzunique.com"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-[#ec003f] outline-none transition-all font-bold"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="9999999999"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-[#ec003f] outline-none transition-all font-bold"
          />
        </div>
      </div>
    </div>
  );

  const Step4 = () => (
    <div className="space-y-8">
      <header className="text-center">
        <div className="h-16 w-16 bg-rose-50 text-[#ec003f] rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Final Summary
        </h2>
      </header>

      <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
        {/* Decorative Circle */}
        <div className="absolute -right-10 -top-10 h-40 w-40 bg-[#ec003f] rounded-full blur-3xl opacity-20" />

        <div className="relative space-y-6">
          <div className="flex justify-between items-start border-b border-white/10 pb-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Guest
              </p>
              <h3 className="text-xl font-black">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-sm text-slate-400">{formData.email}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Schedule
              </p>
              <p className="font-bold text-rose-400">{formData.date}</p>
              <p className="text-sm font-bold">{formData.time}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              {ticketTypes.map((type) => {
                const qty = formData.tickets?.[type.id] || 0;

                if (qty === 0) return null;

                return (
                  <div key={type.id} className="flex justify-between text-sm">
                    <span className="text-slate-400">
                      {type.name} (x{qty})
                    </span>

                    <span className="font-bold">₹{qty * type.price}</span>
                  </div>
                );
              })}
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
              <span className="text-lg font-bold">Total Amount</span>
              <span className="text-3xl font-black text-[#ec003f]">
                ₹
                {ticketTypes.reduce((total, type) => {
                  const qty = formData.tickets?.[type.id] || 0;

                  return total + qty * type.price;
                }, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <label className="flex items-start gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer">
        <input
          type="checkbox"
          className="mt-1 w-5 h-5 accent-[#ec003f]"
          checked={formData.agreed}
          onChange={(e) =>
            setFormData({ ...formData, agreed: e.target.checked })
          }
        />
        <p className="text-sm font-medium text-slate-600">
          I confirm that all provided details are correct and I agree to the{" "}
          <span className="text-[#ec003f] font-bold border-b border-[#ec003f]/30">
            Terms of Service
          </span>
          .
        </p>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcf9ed] p-4 md:p-12 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 flex flex-col">
        <StepIndicator current={step} />

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
              {step === 4 && <Step4 />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="p-5 rounded-2xl border-2 border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <button
            type="button"
            onClick={step === 4 ? handleBooking : nextStep}
            disabled={step === 4 && !formData.agreed}
            className={`flex-1 p-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all ${
              step === 4
                ? "bg-[#ec003f] text-white shadow-lg shadow-rose-200 hover:scale-[1.02]"
                : "bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-200"
            } disabled:opacity-30 disabled:pointer-events-none`}
          >
            {step === 4 ? (
              <>
                Book Ticket <CreditCard size={20} />
              </>
            ) : (
              <>
                Continue <ChevronRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

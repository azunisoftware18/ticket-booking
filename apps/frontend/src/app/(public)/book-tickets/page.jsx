"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, ArrowLeft, Calendar, 
  Users, Info, CheckCircle2, Ticket, Globe 
} from "lucide-react";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "2026-04-29",
    time: "5:00 PM",
    indianTourist: 1,
    foreignTourist: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    agreed: false
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  // Components for each step
  const Step1 = () => (
    <div className="space-y-6">
      <div className="bg-[#415a31] text-white px-4 py-1 rounded-full w-fit text-sm font-bold">Step: 01</div>
      <h2 className="text-2xl font-bold text-gray-800">Select your Date and Time</h2>
      
      <div className="relative">
        <input type="date" value={formData.date} className="w-full md:w-1/2 bg-[#415a31] text-white p-4 rounded-xl outline-none" />
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-600">Evening slots</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["6:00 PM", "7:00 PM", "8:00 PM"].map((t) => (
            <button 
              key={t}
              onClick={() => setFormData({...formData, time: t})}
              className={`p-4 rounded-xl border-2 transition-all ${formData.time === t ? 'border-[#415a31] bg-white' : 'border-gray-200'}`}
            >
              <div className="font-bold text-gray-800">{t}</div>
              <div className="text-green-600 text-xs font-bold">Available</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6">
      <div className="bg-[#415a31] text-white px-4 py-1 rounded-full w-fit text-sm font-bold">Step: 02</div>
      <h2 className="text-2xl font-bold text-gray-800">Select your Tickets</h2>
      
      <div className="divide-y divide-gray-200 border-y border-gray-200 py-4">
        <div className="flex justify-between items-center py-4">
          <span className="font-bold">Indian Tourist (₹25)</span>
          <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-1">
            <button onClick={() => setFormData({...formData, indianTourist: Math.max(0, formData.indianTourist - 1)})} className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded">-</button>
            <span className="font-bold w-4 text-center">{formData.indianTourist}</span>
            <button onClick={() => setFormData({...formData, indianTourist: formData.indianTourist + 1})} className="w-8 h-8 flex items-center justify-center bg-[#415a31] text-white rounded">+</button>
          </div>
        </div>
        <div className="flex justify-between items-center py-4">
          <span className="font-bold">Foreign Tourist (₹100)</span>
          <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-1">
            <button onClick={() => setFormData({...formData, foreignTourist: Math.max(0, formData.foreignTourist - 1)})} className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded">-</button>
            <span className="font-bold w-4 text-center">{formData.foreignTourist}</span>
            <button onClick={() => setFormData({...formData, foreignTourist: formData.foreignTourist + 1})} className="w-8 h-8 flex items-center justify-center bg-[#415a31] text-white rounded">+</button>
          </div>
        </div>
      </div>
      <p className="text-red-500 italic text-sm">* Only up to 6 visitors allowed per booking.</p>
    </div>
  );

  const Step3 = () => (
    <div className="space-y-6">
      <div className="bg-[#415a31] text-white px-4 py-1 rounded-full w-fit text-sm font-bold">Step: 03</div>
      <h2 className="text-2xl font-bold text-gray-800">Enter your Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2">First Name *</label>
          <input type="text" placeholder="Enter First Name" className="w-full p-4 rounded-xl border border-gray-300 outline-[#415a31]" 
            onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Last Name *</label>
          <input type="text" placeholder="Enter Last Name" className="w-full p-4 rounded-xl border border-gray-300 outline-[#415a31]" 
            onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-bold mb-2">Email ID *</label>
          <input type="email" placeholder="Enter Email ID" className="w-full p-4 rounded-xl border border-gray-300 outline-[#415a31]" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
      </div>
    </div>
  );

  const Step4 = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-center text-gray-800">Booking Summary</h2>
      <p className="text-center font-bold text-gray-500">{formData.date} | {formData.time}</p>
      
      <div className="bg-[#053d26] text-white p-6 rounded-2xl space-y-4">
        <div className="grid gap-2 border-b border-white/20 pb-4">
          <p>Name - <span className="font-bold">{formData.firstName} {formData.lastName}</span></p>
          <p>Email - <span className="font-bold">{formData.email}</span></p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs opacity-70 uppercase font-bold">
            <span>Visitor</span>
            <span>Count</span>
            <span>Price</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Indian Tourist</span>
            <span>{formData.indianTourist}</span>
            <span>INR {formData.indianTourist * 25}</span>
          </div>
          <div className="pt-4 border-t border-white/20 text-right">
            <span className="text-2xl font-black">Total: {formData.indianTourist * 25 + formData.foreignTourist * 100}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-start gap-2">
        <input type="checkbox" className="mt-1 w-5 h-5" checked={formData.agreed} onChange={(e) => setFormData({...formData, agreed: e.target.checked})} />
        <p className="text-sm">I have read all the <span className="underline font-bold">rules and regulations</span></p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcf9ed] p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-sm rounded-3xl p-6 md:p-12 shadow-sm flex flex-col justify-between">
        
        {/* Main Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
              {step === 4 && <Step4 />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Buttons */}
        <div className="mt-12 flex gap-4">
          {step > 1 && (
            <button 
              onClick={prevStep}
              className="p-4 rounded-xl border-2 border-black hover:bg-black hover:text-white transition-all"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <button 
            onClick={step === 4 ? () => alert("Payment Initiated") : nextStep}
            disabled={step === 4 && !formData.agreed}
            className="flex-1 bg-[#cbd5e1] hover:bg-[#415a31] hover:text-white text-gray-700 p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {step === 4 ? "Pay Now" : "Next"} <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}
"use client";

import { X, MapPin } from "lucide-react";
import AddPlaceForm from "../form/AddPlaceForm";

export default function AddPlaceModal({
  open,
  onClose,
  onSubmit,
  defaultValues,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Background Overlay with heavy blur */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card - Redesigned Corners & Shadow */}
      <div className="relative bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header - Modern Gradient & Soft Borders */}
        <div className="bg-linear-to-r from-sky-500 to-sky-600 px-10 py-8 text-white relative">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-lg p-3 rounded-2xl shadow-inner">
              <MapPin size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {defaultValues?.id ? "Edit Destination" : "New Destination"}
              </h2>
              <p className="text-sky-100/80 text-sm">Create a memorable spot</p>
            </div>
          </div>

          {/* Elegant Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Content Area - Spacious Padding */}
        <div className="p-10">
          <AddPlaceForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
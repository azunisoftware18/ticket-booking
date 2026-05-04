"use client";

import { useState } from "react";
import { Calendar, Layers, Plus, Clock } from "lucide-react";
import SlotTemplateTable from "@/components/table/SlotTemplateTable";
import SlotOverrideTable from "@/components/table/SlotOverrideTable";
import SlotTemplateModal from "@/components/modals/SlotTemplateModal";
import SlotOverrideModal from "@/components/modals/SlotOverrideModal";

export default function SlotPage() {
  const [activeTab, setActiveTab] = useState("template");
  const [isOpen, setIsOpen] = useState(false);
  const [isOverrideOpen, setIsOverrideOpen] = useState(false);

  const handleFormSubmit = async (data) => {
    console.log("Slot Template Data:", data);
    setIsOpen(false);
  };

  const handleOverrideSubmit = async (data) => {
    console.log("Override Data:", data);
    setIsOverrideOpen(false);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* --- Simple Title Section --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Slot Management
        </h1>
        <p className="text-slate-500 font-medium">Manage your weekly schedules and exceptions.</p>
      </div>

      {/* --- Main Container --- */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        
        {/* --- Tab Bar Header (Button Included Here) --- */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/40 gap-4">
          
          {/* Tabs Group */}
          <div className="flex gap-2 p-1.5 bg-slate-200/60 rounded-3xl">
            <TabButton
              active={activeTab === "template"}
              onClick={() => setActiveTab("template")}
              icon={<Layers size={18} />}
              label="Templates"
            />
            <TabButton
              active={activeTab === "override"}
              onClick={() => setActiveTab("override")}
              icon={<Calendar size={18} />}
              label="Overrides"
            />
          </div>

          {/* Action Button Integrated in Tab Bar */}
          <button
            onClick={() =>
              activeTab === "template" ? setIsOpen(true) : setIsOverrideOpen(true)
            }
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-sky-100 active:scale-95 text-sm"
          >
            <Plus size={18} />
            <span>
              {activeTab === "template" ? "Create Template" : "Add Override"}
            </span>
          </button>
        </div>

        {/* --- Content Area --- */}
        <div className="p-4">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {activeTab === "template" ? (
              <div className="space-y-6">
                <SlotTemplateTable />
              </div>
            ) : (
              <div className="space-y-6">
                <SlotOverrideTable />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      <SlotTemplateModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleFormSubmit}
      />
      <SlotOverrideModal
        open={isOverrideOpen}
        onClose={() => setIsOverrideOpen(false)}
        onSubmit={handleOverrideSubmit}
      />
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
        active
          ? "bg-white text-sky-600 shadow-sm"
          : "text-slate-500 hover:text-slate-700 hover:bg-white/40"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
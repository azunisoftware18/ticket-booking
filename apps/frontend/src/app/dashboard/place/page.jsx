"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, CheckCircle2, AlertCircle } from "lucide-react";
import PlaceTable from "@/components/table/PlaceTable";
import AddPlaceModal from "@/components/modals/AddPlaceModal";
import { usePlaces } from "@/lib/queries/usePlace";
import {
  useCreatePlace,
  useDeletePlace,
  useUpdatePlace,
} from "@/lib/mutations/usePlace";
import Button from "@/components/ui/Button";

export default function PlacePage() {
  const { data: places, isLoading } = usePlaces();
  const { mutateAsync: createPlace } = useCreatePlace();
  const { mutateAsync: deletePlace } = useDeletePlace();
  const { mutateAsync: updatePlace } = useUpdatePlace();
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => setAlert({ ...alert, show: false }), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

const handleFormSubmit = async (formData) => {
  try {
    const payload = {
      name: formData.name,
      location: formData.location,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      shortDescription: formData.shortDescription,
      description: formData.description,
    };

    // 🔥 DUPLICATE CHECK
    const isDuplicate = places?.some(
      (p) =>
        p.name === payload.name &&
        p.location === payload.location &&
        p.id !== editData?.id // ignore current item
    );

    if (isDuplicate) {
      setAlert({
        show: true,
        message: "Same name & location already exists",
        type: "error",
      });
      return;
    }

    if (editData) {
      await updatePlace({
        id: editData.id,
        payload,
      });
    } else {
      await createPlace(payload);
    }

    setEditData(null);
    setIsModalOpen(false);

    setAlert({
      show: true,
      message: editData
        ? "Place updated successfully!"
        : "Place created successfully!",
      type: "success",
    });

  } catch (err) {
    setAlert({
      show: true,
      message: "Something went wrong",
      type: "error",
    });
  }
};  
  const handleDelete = async (place) => {
    if (!confirm("Delete this place?")) return;

    try {
      await deletePlace(place.id);

      setAlert({
        show: true,
        message: "Place deleted successfully!",
        type: "success",
      });
    } catch {
      setAlert({
        show: true,
        message: "Delete failed!",
        type: "error",
      });
    }
  };

  const handleEdit = (place) => {
    setEditData(place);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      {/* --- INLINE ALERT MESSAGE --- */}
      {alert.show && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-10000 flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-top duration-300 ${
            alert.type === "success"
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {alert.type === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="font-bold text-sm">{alert.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Tourist Destinations
          </h1>
          <p className="text-slate-500 font-medium">Manage your locations</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} text="Add New Place" />
      </div>

      <div>
        <PlaceTable
          data={places}
          loading={isLoading}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      <AddPlaceModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null); // 🔥 reset
        }}
        onSubmit={handleFormSubmit}
        defaultValues={editData}
      />
    </div>
  );
}

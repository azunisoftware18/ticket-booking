"use client";

import { useState } from "react";
import { Plus, Package, ShoppingCart } from "lucide-react";
import AddonTable from "@/components/table/AddonTable";
import BookingAddonTable from "@/components/table/BookingAddonTable";
import Button from "@/components/ui/Button";
import AddonModal from "@/components/modals/AddonModal";
import { useAddons } from "@/lib/queries/useAddon";
import { useHandleAddon } from "@/lib/mutations/useAddon";
import { useSelector } from "react-redux";
import StatCard from "@/components/common/StatCard";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";

export default function AddonPage() {
  const [activeTab, setActiveTab] = useState("master");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

const [dialogConfig, setDialogConfig] = useState({
  open: false,
  title: "",
  description: "",
  variant: "success",
});

  const currentPlace = useSelector((state) => state.place.currentPlace);

  const placeId = currentPlace?.id;
  const { mutateAsync: handleAddon } = useHandleAddon();

  const { data: addons, isLoading } = useAddons(placeId);

  const totalAddons = addons?.length || 0;

  const activeAddons =
    addons?.filter((addon) => addon.isActive === true).length || 0;

  const totalAddonBooking =
    addons?.reduce((sum, addon) => {
      return sum + Number(addon.totalBookings || 0);
    }, 0) || 0;
  const handleFormSubmit = async (data) => {

  try {

    const payload = {
      action: editData ? "update" : "create",

      data: {
        ...(editData?.id && {
          id: editData.id,
        }),

        name: data.name,
        price: Number(data.price),
        isActive: data.isActive,

        placeId,
      },
    };

    await handleAddon(payload);

    setDialogConfig({
      open: true,

      title: editData
        ? "Updated Successfully"
        : "Created Successfully",

      description: editData
        ? "Addon updated successfully."
        : "New addon created successfully.",

      variant: "success",
    });

    setIsModalOpen(false);
    setEditData(null);

  } catch (err) {

    console.error(err);

    setDialogConfig({
      open: true,

      title: "Operation Failed",

      description:
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong.",

      variant: "danger",
    });
  }
};

  const handleEdit = (addon) => {
    setEditData(addon);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {

  if (!deleteItem) return;

  try {

    await handleAddon({
      action: "delete",

      data: {
        id: deleteItem.id,
        placeId,
      },
    });

    setDeleteItem(null);

    setDialogConfig({
      open: true,
      title: "Deleted Successfully",
      description:
        "Addon deleted successfully.",
      variant: "success",
    });

  } catch (err) {

    console.error(err);

    setDialogConfig({
      open: true,

      title: "Delete Failed",

      description:
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong.",

      variant: "danger",
    });
  }
};

  return (
    <div className=" bg-slate-50 min-h-screen">
      {/* --- Header Section --- */}
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Add-ons Management
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage additional services, rentals, and their booking associations.
          </p>
        </div>

        {/* Dynamic Action Button - Sirf Master Tab mein dikhega */}
        {activeTab === "master" && (
          <Button
            text="Create New Add-on"
            // Button click par state true karein
            onClick={() => {
              setEditData(null);
              setIsModalOpen(true);
            }}
            icon={Plus}
            iconPosition="left"
            className="px-6 py-3.5 rounded-2xl shadow-lg shadow-sky-100"
          />
        )}
      </div>

      {/* ===================== */}
      {/* STAT CARDS */}
      {/* ===================== */}

      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Add-ons"
          value={totalAddons}
          percentage={12}
          isUp={true}
          trendingText="All available add-ons"
          subText="Total configured add-ons"
        />

        <StatCard
          title="Active Add-ons"
          value={activeAddons}
          percentage={8}
          isUp={true}
          trendingText="Currently active"
          subText="Enabled add-ons for booking"
        />

        <StatCard
          title="Addon Bookings"
          value={totalAddonBooking}
          percentage={5}
          isUp={false}
          trendingText="Addon booking usage"
          subText="Total add-on booking count"
        />
      </div>

      {/* --- Main Container with Tabs --- */}
      <div className="w-full mx-auto bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        {/* Tabs Switcher Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-slate-50/30">
          <div className="flex gap-2 p-1.5 bg-slate-200/60 rounded-[1.5rem]">
            <TabButton
              active={activeTab === "master"}
              onClick={() => setActiveTab("master")}
              icon={<Package size={18} />}
              label="Add-on Master List"
            />
            <TabButton
              active={activeTab === "booking"}
              onClick={() => setActiveTab("booking")}
              icon={<ShoppingCart size={18} />}
              label="Booking Associations"
            />
          </div>
        </div>

        {/* --- Content Area --- */}
        <div className="p-4">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {activeTab === "master" ? (
              <AddonTable
                data={addons || []}
                loading={isLoading}
                onEdit={handleEdit}
                onDelete={(addon) => setDeleteItem(addon)}
              />
            ) : (
              <BookingAddonTable />
            )}
          </div>
        </div>
      </div>

      {/* 3. 👉 MODAL COMPONENT KO YAHAN RAKHEIN AUR PROPS PASS KAREIN */}
      <AddonModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleFormSubmit}
        defaultValues={editData}
      />

      <ConfirmationDialog
  open={!!deleteItem}
  title="Delete Addon?"
  description="This action cannot be undone. The selected addon will be permanently deleted."
  confirmText="Delete Addon"
  cancelText="Cancel"
  variant="danger"
  onCancel={() => setDeleteItem(null)}
  onConfirm={handleDelete}
/>

<ConfirmationDialog
  open={dialogConfig.open}
  title={dialogConfig.title}
  description={dialogConfig.description}
  confirmText="Okay"
  variant={dialogConfig.variant}
  onCancel={() =>
    setDialogConfig((prev) => ({
      ...prev,
      open: false,
    }))
  }
  onConfirm={() =>
    setDialogConfig((prev) => ({
      ...prev,
      open: false,
    }))
  }
  showCancelButton={false}
/>
    </div>
  );
}

// Reusable Tab Component for cleaner code
function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
        active
          ? "bg-white text-gray-600 shadow-sm"
          : "text-slate-500 hover:text-slate-700 hover:bg-white/40"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

"use client";

import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function SlotOverrideForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const isClosed = watch("isClosed");

  const submitHandler = async (data) => {
    await onSubmit?.(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

      {/* Date */}
      <InputField
        label="Date"
        type="date"
        error={errors.date?.message}
        {...register("date", { required: "Date required" })}
      />

      {/* Start Time */}
      <InputField
        label="Start Time"
        type="time"
        error={errors.startTime?.message}
        {...register("startTime", { required: "Start time required" })}
      />

      {/* Capacity (optional) */}
      {!isClosed && (
        <InputField
          label="Override Capacity"
          type="number"
          error={errors.capacity?.message}
          {...register("capacity", {
            valueAsNumber: true,
          })}
        />
      )}

      {/* Close Toggle */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isClosed")} />
        <label className="text-sm text-gray-700">
          Mark slot as Closed
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="submit"
          text={isSubmitting ? "Saving..." : "Save Override"}
        />
      </div>

    </form>
  );
}
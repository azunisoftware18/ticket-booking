"use client";

import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

export default function SlotTemplateForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const submitHandler = async (data) => {
    await onSubmit?.(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

      {/* Start Time */}
      <InputField
        label="Start Time"
        type="time"
        error={errors.startTime?.message}
        {...register("startTime", { required: "Start time required" })}
      />

      {/* End Time */}
      <InputField
        label="End Time"
        type="time"
        error={errors.endTime?.message}
        {...register("endTime", { required: "End time required" })}
      />

      {/* Capacity */}
      <InputField
        label="Capacity"
        type="number"
        error={errors.capacity?.message}
        {...register("capacity", {
          required: "Capacity required",
          valueAsNumber: true,
        })}
      />

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" text={isSubmitting ? "Saving..." : "Save Template"} />
      </div>

    </form>
  );
}
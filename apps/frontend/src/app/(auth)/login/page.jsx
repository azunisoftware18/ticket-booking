"use client";

import { useLogin } from "@/lib/mutations/useLogin";
import { useState } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const { mutate, isPending } = useLogin();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        
        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-gray-500">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <InputField
            label="Email or Phone"
            placeholder="Enter your email or phone"
            icon={Mail}
            value={form.identifier}
            onChange={(e) =>
              setForm({ ...form, identifier: e.target.value })
            }
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={Lock}
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-xs text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            text={isPending ? "Logging in..." : "Login"}
            className="w-full mt-2"
          />

        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}
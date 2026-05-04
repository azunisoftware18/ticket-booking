"use client";

import React, { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Button from "./ui/Button"; // Make sure path is correct
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    // "absolute" use kiya hai taaki ye Hero image ke upar float kare
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* LEFT: Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="bg-white p-2 rounded-full shadow-md">
              <img
                src="/logo.jpg"
                alt="Logo"
                className="h-10 w-10 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight text-white uppercase tracking-wider">
                Elevated
              </span>
              <span className="text-lg font-medium leading-tight text-white/90">
                Nature Trail
              </span>
            </div>
          </div>

          {/* RIGHT: Language & Action Button */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              {/* Yellow Button like screenshot */}
              <button
                onClick={() => router.push("/book-tickets")}
                className="flex items-center gap-2 bg-[#F2D64B] hover:bg-[#e2c53d] text-black font-bold py-3 px-6 rounded-lg transition-all shadow-lg"
              >
                Book Now
                <div className="bg-black rounded-full p-1">
                  <ArrowRight size={16} className="text-[#F2D64B]" />
                </div>
              </button>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2"
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

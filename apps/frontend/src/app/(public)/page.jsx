"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { Search, MapPin, Calendar, Users, Landmark, Tag } from "lucide-react";
import InfiniteMenu from "@/components/common/InfiniteMenu";

export default function Home() {
  // Jaipur-centric images representing different experiences
  const culturalExperiences = [
    {
      name: "Hawa Mahal Tour",
      img: "https://images.unsplash.com/photo-1627409240401-cc3a854972c2?q=80&w=800",
      price: "$25",
    },
    {
      name: "Amer Fort Exploration",
      img: "https://images.unsplash.com/photo-1590716209211-ea74d5f63573?q=80&w=800",
      price: "$30",
    },
    {
      name: "City Palace Visit",
      img: "https://images.unsplash.com/photo-1603215286278-f460492bf22b?q=80&w=800",
      price: "$20",
    },
    {
      name: "Vibrant Bazaars",
      img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800",
      price: "$15",
    },
    {
      name: "Heritage Walk",
      img: "https://images.unsplash.com/photo-1599824419022-790100418471?q=80&w=800",
      price: "$18",
    },
    {
      name: "Royal Dining",
      img: "https://images.unsplash.com/photo-1610444317133-72ffb029738c?q=80&w=800",
      price: "$50",
    },
  ];

  const items = [
    {
      image: "/AmerFort.jpg",
      link: "https://google.com/",
      title: "Item 1",
      description: "This is pretty cool, right?",
    },
    {
      image: "/AmerFort.jpg",
      link: "https://google.com/",
      title: "Item 2",
      description: "This is pretty cool, right?",
    },
    {
      image: "/AmerFort.jpg",
      link: "https://google.com/",
      title: "Item 3",
      description: "This is pretty cool, right?",
    },
    {
     image: "/AmerFort.jpg",
      link: "https://google.com/",
      title: "Item 4",
      description: "This is pretty cool, right?",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FFF5F8]">
      {" "}
      {/* Very light terracotta pink bg */}
      {/* --- JAIPUR HERO SECTION --- */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        {/* Background Image: A grand view of Jaipur architecture */}
        <div className="absolute inset-0">
          <img
            src="/AmerFort.jpg"
            alt="Amer Fort Jaipur"
            className="h-full w-full object-cover"
          />
          {/* Subtle overlay with Jaipur pink hue */}
          <div className="absolute inset-0 bg-[#3a1a2e]/60 backdrop-blur-[1px]"></div>
        </div>

        {/* Hero Content - Kept for overall page context */}
        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center text-white">
          <div className="mb-4 flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm border border-white/20">
            <Landmark size={18} className="text-[#FF70BF]" />
            <span className="text-sm font-medium tracking-wide uppercase text-white/90">
              Royal Heritage
            </span>
          </div>

          <h1 className="mb-6 text-6xl font-extrabold tracking-tighter md:text-8xl">
            Go<span className="text-[#FF70BF]">Ticket</span> Jaipur
          </h1>
          <p className="mb-12 max-w-2xl text-lg text-gray-100/90 md:text-xl font-medium antialiased">
            Your instant portal to the majestic wonders of the Pink City. Book
            now for an unforgettable journey.
          </p>

          {/* --- JAIPUR SEARCH BAR (Floating Card) --- */}
          {/* Internal labels kept for usability */}
          <div className="w-full max-w-5xl rounded-3xl bg-white p-5 shadow-[0_15px_50px_-15px_rgba(213,82,163,0.3)] md:p-8 border border-gray-100">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {/* Location (Palace Search) */}
              <div className="flex flex-col items-start px-4 md:border-r border-gray-100 hover:bg-pink-50/50 rounded-xl transition">
                <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase text-gray-400">
                  <MapPin size={15} className="text-[#FF70BF]" /> Destination
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amer Fort"
                  className="w-full text-gray-900 outline-none placeholder:text-gray-400 font-semibold text-lg bg-transparent"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col items-start px-4 md:border-r border-gray-100 hover:bg-pink-50/50 rounded-xl transition">
                <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase text-gray-400">
                  <Calendar size={15} className="text-[#FF70BF]" /> Select Date
                </label>
                <input
                  type="date"
                  className="w-full text-gray-900 outline-none font-semibold text-lg bg-transparent cursor-pointer"
                />
              </div>

              {/* Tickets */}
              <div className="flex flex-col items-start px-4 hover:bg-pink-50/50 rounded-xl transition">
                <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase text-gray-400">
                  <Users size={15} className="text-[#FF70BF]" /> Guests
                </label>
                <select className="w-full text-gray-900 outline-none font-semibold text-lg bg-transparent cursor-pointer">
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>Family (2A+2C)</option>
                </select>
              </div>

              {/* Jaipur Styled Search Button */}
              <div className="flex items-center justify-center">
                <Button
                  text="Book Tour"
                  icon={Search}
                  className="w-full py-4 text-base rounded-2xl shadow-lg shadow-[#FF70BF]/30 hover:shadow-xl hover:shadow-[#FF70BF]/40"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- IMAGE-ONLY EXPERIENCE GRID --- */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* All introductory section text removed, only the grid remains */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 sm:gap-6 md:gap-8">
          {culturalExperiences.map((spot, index) => (
            <div
              key={index}
              className="group relative aspect-10/12 cursor-pointer overflow-hidden rounded-3xl shadow-lg shadow-[#D552A3]/5 transition-all hover:shadow-2xl hover:shadow-[#D552A3]/15 hover:-translate-y-1"
            >
              {/* Main Image */}
              <img
                src={spot.img}
                alt={spot.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Subtle Gradient Overlay on Hover for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-[#3a1a2e]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Price Tag Overlay - Only text element inside the grid */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-sm font-extrabold text-[#D552A3] shadow-lg border border-gray-100">
                <Tag size={14} className="text-[#FF70BF]" /> {spot.price}
              </div>

              {/* Experience name appears subtly on hover at the bottom */}
              <div className="absolute bottom-5 left-5 right-5 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-xl font-bold antialiased leading-tight">
                  {spot.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="relative" style={{ height: "600px", position: "relative" }}>
          <InfiniteMenu items={items} scale={1} />
        </div>
        </div>
      </section>
    </main>
  );
}

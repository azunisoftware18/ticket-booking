'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

// Reusable WorkButton Component
export default function Button({ 
  text = "Button", 
  icon: Icon = ArrowRight, 
  onClick, 
  type = "button",
  className = "" 
}) {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`group/work relative overflow-hidden rounded-full bg-[#FF70BF] px-6 py-2.5 text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#ff4d94]/40 active:scale-95 ${className}`}
    >
      {/* Background Hover Effect - Color kept exactly as requested (#D552A3) */}
      <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-[#D552A3] transition duration-300 ease-out group-hover/work:translate-y-14"></span>
      
      {/* Content Layer */}
      <div className="relative flex items-center justify-center gap-2">
        <span className="font-semibold text-white">{text}</span>
        
        {/* Dynamic Icon with Hover Animation */}
        {Icon && (
          <Icon 
            size={18} 
            className="text-white transition-transform duration-300 ease-in-out group-hover/work:translate-x-1" 
          />
        )}
      </div>
    </button>
  );
}
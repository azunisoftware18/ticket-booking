'use client';

import React, { useState } from 'react';
import { Menu, X, MapPin, Search, Globe } from 'lucide-react';
import Button from './ui/Button';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // const navLinks = [
  //   { name: 'Destinations', href: '#' },
  //   { name: 'Hotels', href: '#' },
  //   { name: 'Packages', href: '#' },
  //   { name: 'Contact', href: '#' },
  // ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* LEFT SIDE: Logo */}
          <div className="flex items-center group cursor-pointer">
            <MapPin className="text-[#FF70BF] group-hover:scale-110 transition-transform mr-1.5" size={24} />
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              Go<span className="text-[#FF70BF]">Ticket</span>
            </span>
          </div>

          {/* CENTER: Navigation Links */}
          {/* <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-sm font-semibold text-gray-600 hover:text-[#D552A3] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav> */}

          {/* RIGHT SIDE: Utility Icons & Book Now Button */}
          <div className="flex items-center gap-6">
            {/* Search & Globe Icons */}
            {/* <div className="hidden sm:flex items-center gap-4 text-gray-400">
              <Search size={20} className="hover:text-[#FF70BF] cursor-pointer transition-colors" />
              <Globe size={20} className="hover:text-[#FF70BF] cursor-pointer transition-colors" />
            </div> */}

            {/* Book Now Button (Ab ye end mein hai) */}
            <div className="hidden lg:block">
              <Button text="Book Now" onClick={() => router.push('/book-tickets')}/>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden text-gray-600 hover:text-[#FF70BF] transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute inset-x-0 top-20 bg-white p-6 shadow-2xl md:hidden border-t border-gray-50">
          <div className="flex flex-col gap-5">
            {/* Mobile mein button top par rakha hai for quick action */}
            <Button text="Book Now" className="w-full" onClick={() => router.push('/book-tickets')} />
            
            <div className="flex flex-col gap-4 mt-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-gray-800 border-b border-gray-50 pb-2 hover:text-[#FF70BF]"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
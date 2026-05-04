"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import DecayCard from '@/components/DecayCard';

// --- CONFIGURATION ---
const IMAGES = {
  HAWA_MAHAL: '/hawa_mahal.jpg',
  PATTERN_TEAL: '/pattern_teal.jpg',
  PATTERN_RED: '/pattern_red.jpg',
  PATTERN_GOLD: '/pattern_gold.jpg',
  PATTERN_PURPLE: '/pattern_purple.jpg',
  SHUTTER_LAYER_BG: '/main_shutter_bg.jpg',
  MAIN_BG: '/hawa_mahal.jpg' 
};

// --- CARDS DATA ---
const CARD_DATA = [
  { id: 1, title: "Royal Jaipur", img: "https://picsum.photos/400/600?random=1" },
  { id: 2, title: "Heritage Walk", img: "https://picsum.photos/400/600?random=2" },
  { id: 3, title: "Desert Safari", img: "https://picsum.photos/400/600?random=3" },
  { id: 4, title: "Local Craft", img: "https://picsum.photos/400/600?random=4" },
];

const MOSAIC_PANELS = [
  { x: 0, y: 0, w: 32, h: 22, img: IMAGES.PATTERN_GOLD, radius: '0 0 80px 0', shiftX: -100, shiftY: -100, delay: 0.1 },
  { x: 65, y: 0, w: 35, h: 30, img: IMAGES.PATTERN_TEAL, radius: '0 0 0 100px', shiftX: 100, shiftY: -100, delay: 0.2 },
  { x: 15, y: 12, w: 70, h: 35, img: IMAGES.HAWA_MAHAL, radius: '100px 100px 0 0', shiftX: 0, shiftY: -120, delay: 0, zIndex: 10 },
  { x: 0, y: 25, w: 25, h: 35, img: IMAGES.PATTERN_RED, radius: '0 50px 50px 0', shiftX: -120, shiftY: 0, delay: 0.3 },
  { x: 30, y: 35, w: 40, h: 55, img: IMAGES.HAWA_MAHAL, radius: '100px', shiftX: 0, shiftY: 120, delay: 0.05, zIndex: 11 },
  { x: 78, y: 35, w: 22, h: 40, img: IMAGES.PATTERN_PURPLE, radius: '40px 0 0 40px', shiftX: 120, shiftY: 0, delay: 0.15 },
  { x: 0, y: 65, w: 30, h: 35, img: IMAGES.PATTERN_RED, radius: '0 80px 0 0', shiftX: -100, shiftY: 100, delay: 0.4 },
  { x: 55, y: 70, w: 45, h: 40, img: IMAGES.PATTERN_TEAL, radius: '120px 0 0 0', shiftX: 100, shiftY: 100, delay: 0.3 },
  { x: 25, y: 85, w: 40, h: 15, img: IMAGES.PATTERN_PURPLE, radius: '50px 50px 0 0', shiftX: 0, shiftY: 150, delay: 0.5 },
];

const SHUTTER_SPEED = 1.8;

const JaipurMosaicShutter = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppReady(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#03281e] overflow-x-hidden overflow-y-auto">
      <AnimatePresence>
        {!isAppReady && (
          <motion.div 
            key="shutter-container"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ backgroundImage: `url(${IMAGES.SHUTTER_LAYER_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            <div className="relative w-full h-full">
              {MOSAIC_PANELS.map((panel, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  exit={{ 
                    x: `${panel.shiftX}%`, 
                    y: `${panel.shiftY}%`, 
                    opacity: 0,
                    transition: { duration: SHUTTER_SPEED, delay: panel.delay, ease: [0.4, 0, 0.2, 1] } 
                  }}
                  style={{
                    position: 'absolute', left: `${panel.x}%`, top: `${panel.y}%`, width: `${panel.w}%`, height: `${panel.h}%`,
                    backgroundImage: `url(${panel.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
                    borderRadius: panel.radius, zIndex: panel.zIndex || 1,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.3)'
                  }}
                />
              ))}
              <motion.div exit={{ opacity: 0, scale: 0.5 }} className="absolute inset-0 flex items-center justify-center z-100">
                <div className="bg-[#1A365D] px-10 py-5 rounded-full border-2 border-white shadow-2xl">
                   <span className="text-white font-black tracking-[0.4em] text-2xl">GOTICKET</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT AREA --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isAppReady ? { opacity: 1 } : {}}
        className="relative w-full flex flex-col items-center"
      >
        {/* Hero Section */}
        <div className="relative h-screen w-full flex items-center justify-center p-8 lg:p-16">
          <div className="absolute inset-0 m-4 lg:m-12 rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.MAIN_BG})` }} />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-4xl md:text-6xl font-serif text-white max-w-3xl leading-tight">
                      Discover Mumbai's <br /> 
                      <span className="font-light italic">Hidden Natural Treasure</span>
                  </h1>
              </div>
              {/* Info Bar */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-[#f5d94d] rounded-md p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="flex gap-8 md:gap-12 text-sm md:text-base text-gray-900 font-medium">
                      <div><p className="font-bold">Location <MapPin className="inline" size={14}/></p><p>Malabar Hill, Mumbai</p></div>
                      <div><p className="font-bold">Timings</p><p>5:00 AM - 8:00 PM</p></div>
                      <div><p className="font-bold">Entry Fee</p><p>₹25 - ₹100</p></div>
                  </div>
                  <button className="bg-white text-black px-8 py-3 rounded-md font-bold flex items-center gap-2 hover:bg-black hover:text-white transition-all group">
                      Book Now <ArrowRight size={16} />
                  </button>
              </div>
          </div>
        </div>

        {/* --- MULTIPLE DECAY CARDS SECTION --- */}
        <div className="w-full max-w-7xl px-8 py-20">
          <h2 className="text-white text-4xl font-serif mb-12 text-center">Explore More <span className="italic opacity-70">Experiences</span></h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {CARD_DATA.map((card) => (
              <div key={card.id} className="flex justify-center">
                <DecayCard 
                  width={280} 
                  height={400} 
                  image={card.img}
                  baseFrequency={0.015}
                  numOctaves={5}
                  seed={card.id}
                  maxDisplacement={150}
                  movementBound={20}
                >
                  <div className="p-4">
                    <h3 className="text-white text-xl font-bold">{card.title}</h3>
                    <p className="text-white/60 text-sm mt-1">Discover the beauty</p>
                  </div>
                </DecayCard>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JaipurMosaicShutter;
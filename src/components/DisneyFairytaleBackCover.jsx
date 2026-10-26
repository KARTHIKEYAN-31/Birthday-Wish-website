import React from 'react';
import { Sparkles, Crown, RotateCcw } from 'lucide-react';
import { BOOK_DATA } from '../config/data';

/*
 * DisneyFairytaleBackCover:
 * Matches the authentic Disney Princess Storybook aesthetic of the front cover:
 * - Deep, smooth antique lilac leather texture with subtle warm grain & vignette.
 * - Continuous gold-thread scalloped/wavy stitch border around the perimeter.
 * - Inner thin gold border frame with notched corners.
 * - Four ornate Disney fairytale baroque corner scrollwork brackets.
 * - Symmetrical top & bottom royal palmette / fleur-de-lis crest ornaments.
 * - Back hardware plate of the antique bronze metal clasp on the left edge.
 * - Center: Royal Disney golden gilded frame holding the friend's polaroid photo,
 *   topped with a sparkling Princess Tiara, fairytale wishes, and imperial seal.
 * - Regal "Replay Fairytale" button.
 */

export default function DisneyFairytaleBackCover({ onReplay }) {
  const { finale } = BOOK_DATA;

  return (
    <div className="w-full h-full relative overflow-hidden select-none fantasy-cover-relief flex flex-col justify-between items-center p-6 text-center">
      {/* ── Background: Deep Textured Antique Lilac / Amethyst Leather ── */}
      <div className="absolute inset-0 fantasy-leather-base pointer-events-none" />
      
      {/* Subtle Warm Leather Grain & Sheen */}
      <div 
        className="absolute inset-0 opacity-[0.16] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 40%, rgba(254, 240, 138, 0.15) 0%, transparent 65%), repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 4px)`,
        }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_65px_rgba(20,2,35,0.92)] pointer-events-none" />

      {/* ── Outer Continuous Gold-Thread Scalloped / Wavy Stitched Border (SVG) ── */}
      <div className="absolute inset-3 pointer-events-none z-10">
        <svg viewBox="0 0 366 506" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="disneyGoldBack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="25%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="75%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>

            <linearGradient id="disneyBronzeBack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="40%" stopColor="#78350f" />
              <stop offset="70%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1e0b04" />
            </linearGradient>
          </defs>

          {/* Outer Scalloped / Wavy Gold Stitching Perimeter */}
          <rect
            x="4"
            y="4"
            width="358"
            height="498"
            rx="12"
            stroke="url(#disneyGoldBack)"
            strokeWidth="1.8"
            strokeDasharray="4 3"
            opacity="0.95"
            className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          />

          {/* Inner Thin Gold Framing Box */}
          <rect
            x="14"
            y="14"
            width="338"
            height="478"
            rx="8"
            stroke="url(#disneyGoldBack)"
            strokeWidth="1.2"
            opacity="0.85"
          />

          {/* Inner Stitched Accent Line */}
          <rect
            x="18"
            y="18"
            width="330"
            height="470"
            rx="6"
            stroke="url(#disneyGoldBack)"
            strokeWidth="0.7"
            strokeDasharray="2 2"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* ── Four Disney Fairytale Rococo / Baroque Corner Flourishes (SVG) ── */}
      {/* Top Left */}
      <div className="absolute top-4 left-4 w-20 h-20 pointer-events-none z-20">
        <svg viewBox="0 0 95 95" fill="none" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <path
            d="M8 88 C8 45 45 8 88 8 C68 18 52 35 48 56 C44 42 32 30 18 26 C26 40 28 58 24 74 C20 62 14 54 8 88Z"
            fill="url(#disneyGoldBack)"
          />
          <circle cx="20" cy="20" r="3" fill="#fde047" stroke="#854d0e" strokeWidth="1" />
        </svg>
      </div>

      {/* Top Right */}
      <div className="absolute top-4 right-4 w-20 h-20 pointer-events-none z-20 scale-x-[-1]">
        <svg viewBox="0 0 95 95" fill="none" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <path
            d="M8 88 C8 45 45 8 88 8 C68 18 52 35 48 56 C44 42 32 30 18 26 C26 40 28 58 24 74 C20 62 14 54 8 88Z"
            fill="url(#disneyGoldBack)"
          />
          <circle cx="20" cy="20" r="3" fill="#fde047" stroke="#854d0e" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-4 left-4 w-20 h-20 pointer-events-none z-20 scale-y-[-1]">
        <svg viewBox="0 0 95 95" fill="none" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <path
            d="M8 88 C8 45 45 8 88 8 C68 18 52 35 48 56 C44 42 32 30 18 26 C26 40 28 58 24 74 C20 62 14 54 8 88Z"
            fill="url(#disneyGoldBack)"
          />
          <circle cx="20" cy="20" r="3" fill="#fde047" stroke="#854d0e" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-4 right-4 w-20 h-20 pointer-events-none z-20 scale-x-[-1] scale-y-[-1]">
        <svg viewBox="0 0 95 95" fill="none" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <path
            d="M8 88 C8 45 45 8 88 8 C68 18 52 35 48 56 C44 42 32 30 18 26 C26 40 28 58 24 74 C20 62 14 54 8 88Z"
            fill="url(#disneyGoldBack)"
          />
          <circle cx="20" cy="20" r="3" fill="#fde047" stroke="#854d0e" strokeWidth="1" />
        </svg>
      </div>

      {/* ── Top Center Symmetrical Palmette Crest ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-9 pointer-events-none z-20">
        <svg viewBox="0 0 110 40" fill="none" className="w-full h-full filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)]">
          <path
            d="M55 4 C50 14 42 22 35 24 C45 26 50 32 55 38 C60 32 65 26 75 24 C68 22 60 14 55 4Z"
            fill="url(#disneyGoldBack)"
          />
          <circle cx="55" cy="24" r="2.5" fill="#fef08a" stroke="#854d0e" strokeWidth="0.8" />
        </svg>
      </div>

      {/* ── Antique Bronze Clasp Back Hinge Plate on Left Edge ── */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 pointer-events-none filter drop-shadow-[4px_3px_8px_rgba(0,0,0,0.85)]">
        <svg width="24" height="60" viewBox="0 0 24 60" fill="none">
          <path d="M0 8 Q16 12 18 22 Q24 30 18 38 Q16 48 0 52 Z" fill="url(#disneyBronzeBack)" stroke="#ca8a04" strokeWidth="1.2" />
          <circle cx="8" cy="18" r="2.2" fill="#fde047" stroke="#451a03" strokeWidth="0.8" />
          <circle cx="8" cy="42" r="2.2" fill="#fde047" stroke="#451a03" strokeWidth="0.8" />
        </svg>
      </div>

      {/* ── Top Header Text ── */}
      <div className="relative z-20 pt-6 space-y-0.5">
        <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-purple-950/80 border border-amber-300/50 shadow-xs">
          <Crown className="w-3 h-3 text-amber-300 fill-amber-300" />
          <span className="text-[9px] font-cinzel tracking-[.25em] text-amber-200 uppercase font-black">
            The Royal Finale
          </span>
          <Crown className="w-3 h-3 text-amber-300 fill-amber-300" />
        </div>
        <h2 className="text-xl sm:text-2xl font-cinzel font-black tracking-wider text-amber-100 gold-foil-fantasy leading-tight">
          {finale.title}
        </h2>
      </div>

      {/* ── Centerpiece: Disney Princess Royal Polaroid Frame ── */}
      <div className="my-auto relative z-20 flex flex-col items-center">
        {/* Ornate Princess Polaroid Card */}
        <div className="relative bg-gradient-to-b from-stone-50 to-purple-50/40 p-3 pb-5 rounded-xs shadow-2xl border-2 border-amber-300/80 transform -rotate-1 hover:rotate-0 transition-transform duration-300 max-w-[230px] filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)]">
          {/* Princess Tiara at Top of Polaroid */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 filter drop-shadow-md">
            <svg width="40" height="20" viewBox="0 0 60 30" fill="none">
              <path d="M10 24 Q20 12 30 2 Q40 12 50 24 Z" fill="url(#disneyGoldBack)" stroke="#78350f" strokeWidth="1" />
              <circle cx="30" cy="4" r="2.5" fill="#fde047" />
              <circle cx="20" cy="14" r="1.8" fill="#ef4444" />
              <circle cx="40" cy="14" r="1.8" fill="#3b82f6" />
            </svg>
          </div>

          {/* Photo */}
          <div className="w-full aspect-[4/3] rounded-xs bg-purple-100 overflow-hidden shadow-inner border border-purple-200">
            <img
              src={finale.polaroidImage}
              alt="Treasured Friends"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Handwritten Caption */}
          <p className="text-center font-script text-base text-purple-950 mt-2 font-bold leading-tight">
            {finale.polaroidCaption}
          </p>
        </div>

        {/* Fairytale Birthday Wishes */}
        <div className="mt-2.5 space-y-0.5 text-[10.5px] font-cormorant text-amber-200/95 font-bold italic leading-tight max-w-[240px]">
          {finale.wishes.map((wish, i) => (
            <p key={i}>✨ {wish}</p>
          ))}
        </div>

        {/* Royal Disney Golden Seal */}
        <div className="mt-2 inline-flex items-center space-x-1 px-3 py-0.5 rounded-full bg-amber-950/70 border border-amber-300/40 text-[9px] font-cinzel text-amber-200 font-bold tracking-widest uppercase">
          <span>✦ HAPPILY EVER AFTER ✦</span>
        </div>
      </div>

      {/* ── Bottom: Replay Fairytale Button ── */}
      <div className="relative z-20 pb-4">
        <button
          onClick={onReplay}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 text-purple-950 font-cinzel font-black text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(234,179,8,0.85)] hover:scale-105 active:scale-95 transition-transform flex items-center space-x-2 border-2 border-amber-200 cursor-pointer mx-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay Fairytale</span>
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

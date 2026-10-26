import React from 'react';
import { Sparkles, Crown } from 'lucide-react';

/*
 * FantasyFrontCover:
 * Authentic Disney Princess Storybook Tome in rich Lilac and Antique Gold.
 * Faithfully matches the user's reference image (Disney storybook leather binding):
 * - Deep, smooth antique lilac leather texture with subtle warm grain & vignette.
 * - Continuous gold-thread scalloped/wavy stitch border around the perimeter.
 * - Inner thin gold border frame with notched corners.
 * - Four ornate Disney fairytale baroque corner scrollwork brackets with royal fleur-de-lis.
 * - Symmetrical top & bottom royal palmette / fleur-de-lis crest ornaments.
 * - Left edge margin filigree fleurons.
 * - Authentic 3D sculpted antique bronze/brass 5-petal filigree clasp latch on the right edge.
 * - Center: Royal Disney Princess Tiara & Recipient's Name in glowing fairytale gold calligraphy.
 * - Subtle, enchanting "Click to Open Fairytale" bottom seal with golden pulse.
 */

export default function FantasyFrontCover({ friendName }) {
  return (
    <div className="w-full h-full relative overflow-hidden select-none fantasy-cover-relief flex flex-col justify-between items-center p-6 text-center">
      {/* ── Background: Deep Textured Antique Lilac / Amethyst Leather ── */}
      <div className="absolute inset-0 fantasy-leather-base pointer-events-none" />
      
      {/* Subtle Warm Leather Grain & Radial Sheen */}
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
            <linearGradient id="disneyGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="25%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="75%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>

            <linearGradient id="disneyBronze" x1="0%" y1="0%" x2="100%" y2="100%">
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
            stroke="url(#disneyGold)"
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
            stroke="url(#disneyGold)"
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
            stroke="url(#disneyGold)"
            strokeWidth="0.7"
            strokeDasharray="2 2"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* ── Four Disney Fairytale Rococo / Baroque Corner Flourishes (SVG) ── */}
      {/* Top Left */}
      <div className="absolute top-4 left-4 w-24 h-24 pointer-events-none z-20">
        <svg viewBox="0 0 95 95" fill="none" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          {/* Main Corner Acanthus Swirl */}
          <path
            d="M8 88 C8 45 45 8 88 8 C68 18 52 35 48 56 C44 42 32 30 18 26 C26 40 28 58 24 74 C20 62 14 54 8 88Z"
            fill="url(#disneyGold)"
          />
          {/* Inner Fleur-de-lis Curl */}
          <path
            d="M18 18 Q35 12 50 20 Q35 28 26 45 Q22 30 18 18Z"
            fill="url(#disneyGold)"
          />
          {/* Corner Rosette Pearl */}
          <circle cx="20" cy="20" r="3" fill="#fde047" stroke="#854d0e" strokeWidth="1" />
          <circle cx="36" cy="14" r="2" fill="#fef08a" />
          <circle cx="14" cy="36" r="2" fill="#fef08a" />
        </svg>
      </div>

      {/* Top Right */}
      <div className="absolute top-4 right-4 w-24 h-24 pointer-events-none z-20 scale-x-[-1]">
        <svg viewBox="0 0 95 95" fill="none" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <path
            d="M8 88 C8 45 45 8 88 8 C68 18 52 35 48 56 C44 42 32 30 18 26 C26 40 28 58 24 74 C20 62 14 54 8 88Z"
            fill="url(#disneyGold)"
          />
          <path
            d="M18 18 Q35 12 50 20 Q35 28 26 45 Q22 30 18 18Z"
            fill="url(#disneyGold)"
          />
          <circle cx="20" cy="20" r="3" fill="#fde047" stroke="#854d0e" strokeWidth="1" />
          <circle cx="36" cy="14" r="2" fill="#fef08a" />
          <circle cx="14" cy="36" r="2" fill="#fef08a" />
        </svg>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-4 left-4 w-24 h-24 pointer-events-none z-20 scale-y-[-1]">
        <svg viewBox="0 0 95 95" fill="none" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <path
            d="M8 88 C8 45 45 8 88 8 C68 18 52 35 48 56 C44 42 32 30 18 26 C26 40 28 58 24 74 C20 62 14 54 8 88Z"
            fill="url(#disneyGold)"
          />
          <path
            d="M18 18 Q35 12 50 20 Q35 28 26 45 Q22 30 18 18Z"
            fill="url(#disneyGold)"
          />
          <circle cx="20" cy="20" r="3" fill="#fde047" stroke="#854d0e" strokeWidth="1" />
          <circle cx="36" cy="14" r="2" fill="#fef08a" />
          <circle cx="14" cy="36" r="2" fill="#fef08a" />
        </svg>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-4 right-4 w-24 h-24 pointer-events-none z-20 scale-x-[-1] scale-y-[-1]">
        <svg viewBox="0 0 95 95" fill="none" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <path
            d="M8 88 C8 45 45 8 88 8 C68 18 52 35 48 56 C44 42 32 30 18 26 C26 40 28 58 24 74 C20 62 14 54 8 88Z"
            fill="url(#disneyGold)"
          />
          <path
            d="M18 18 Q35 12 50 20 Q35 28 26 45 Q22 30 18 18Z"
            fill="url(#disneyGold)"
          />
          <circle cx="20" cy="20" r="3" fill="#fde047" stroke="#854d0e" strokeWidth="1" />
          <circle cx="36" cy="14" r="2" fill="#fef08a" />
          <circle cx="14" cy="36" r="2" fill="#fef08a" />
        </svg>
      </div>

      {/* ── Top Center Symmetrical Palmette / Fleur-de-lis Crest (SVG) ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-10 pointer-events-none z-20">
        <svg viewBox="0 0 110 40" fill="none" className="w-full h-full filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)]">
          {/* Central Fleur-de-lis Palmette */}
          <path
            d="M55 4 C50 14 42 22 35 24 C45 26 50 32 55 38 C60 32 65 26 75 24 C68 22 60 14 55 4Z"
            fill="url(#disneyGold)"
          />
          {/* Left Wing Flourish */}
          <path
            d="M48 22 C38 16 25 18 12 24 C22 28 32 28 42 26Z"
            fill="url(#disneyGold)"
          />
          {/* Right Wing Flourish */}
          <path
            d="M62 22 C72 16 85 18 98 24 C88 28 78 28 68 26Z"
            fill="url(#disneyGold)"
          />
          <circle cx="55" cy="24" r="2.5" fill="#fef08a" stroke="#854d0e" strokeWidth="0.8" />
        </svg>
      </div>

      {/* ── Bottom Center Symmetrical Palmette Crest (SVG) ── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-10 pointer-events-none z-20 scale-y-[-1]">
        <svg viewBox="0 0 110 40" fill="none" className="w-full h-full filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)]">
          <path
            d="M55 4 C50 14 42 22 35 24 C45 26 50 32 55 38 C60 32 65 26 75 24 C68 22 60 14 55 4Z"
            fill="url(#disneyGold)"
          />
          <path
            d="M48 22 C38 16 25 18 12 24 C22 28 32 28 42 26Z"
            fill="url(#disneyGold)"
          />
          <path
            d="M62 22 C72 16 85 18 98 24 C88 28 78 28 68 26Z"
            fill="url(#disneyGold)"
          />
          <circle cx="55" cy="24" r="2.5" fill="#fef08a" stroke="#854d0e" strokeWidth="0.8" />
        </svg>
      </div>

      {/* ── Left Edge Margin Filigree Fleurons ── */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col space-y-4 pointer-events-none z-20 opacity-80">
        <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
          <path d="M2 12 Q7 4 12 12 Q7 20 2 12Z" fill="url(#disneyGold)" />
        </svg>
        <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
          <path d="M2 12 Q7 4 12 12 Q7 20 2 12Z" fill="url(#disneyGold)" />
        </svg>
      </div>

      {/* ── Authentic Disney Antique Bronze 5-Petal Clasp Latch on Right Edge (Matching Reference Image) ── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 pointer-events-none filter drop-shadow-[-6px_3px_10px_rgba(0,0,0,0.85)]">
        <svg width="56" height="78" viewBox="0 0 56 78" fill="none">
          {/* Back Hinge Base Mounted to Book Edge */}
          <rect x="42" y="16" width="14" height="46" rx="3" fill="url(#disneyBronze)" stroke="#ca8a04" strokeWidth="1.2" />
          <circle cx="48" cy="24" r="2.5" fill="#fde047" stroke="#451a03" strokeWidth="0.8" />
          <circle cx="48" cy="54" r="2.5" fill="#fde047" stroke="#451a03" strokeWidth="0.8" />

          {/* 5-Petal Sculpted Filigree Bronze Flower Lobe (Exactly like user photo) */}
          {/* Top Petals */}
          <path
            d="M44 26 C36 12 24 16 20 25 C26 28 34 30 42 32 Z"
            fill="url(#disneyGold)"
            stroke="#451a03"
            strokeWidth="1.2"
          />
          <path
            d="M44 32 C30 24 16 28 10 36 C18 39 30 40 42 40 Z"
            fill="url(#disneyGold)"
            stroke="#451a03"
            strokeWidth="1.2"
          />
          {/* Center Pointed Locking Latch Tongue */}
          <path
            d="M42 36 L4 39 L42 42 Z"
            fill="url(#disneyGold)"
            stroke="#451a03"
            strokeWidth="1.5"
          />
          <circle cx="10" cy="39" r="2" fill="#ef4444" />

          {/* Bottom Petals */}
          <path
            d="M44 46 C30 54 16 50 10 42 C18 39 30 38 42 38 Z"
            fill="url(#disneyGold)"
            stroke="#451a03"
            strokeWidth="1.2"
          />
          <path
            d="M44 52 C36 66 24 62 20 53 C26 50 34 48 42 46 Z"
            fill="url(#disneyGold)"
            stroke="#451a03"
            strokeWidth="1.2"
          />

          {/* Center Raised Floral Medallion */}
          <circle cx="36" cy="39" r="7" fill="url(#disneyBronze)" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="36" cy="39" r="3.5" fill="url(#disneyGold)" />
        </svg>
      </div>

      {/* ── Top Header Text ── */}
      <div className="relative z-20 pt-7">
        <p className="text-[10px] font-cinzel tracking-[.3em] text-amber-200/95 uppercase font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          ✦ A DISNEY PRINCESS FAIRYTALE ✦
        </p>
      </div>

      {/* ── Centerpiece: Disney Fairytale Calligraphy & Princess Emblem ── */}
      <div className="relative z-20 my-auto flex flex-col items-center max-w-[280px]">
        {/* Sculpted Golden Princess Tiara Crown */}
        <div className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)] mb-2">
          <svg width="74" height="42" viewBox="0 0 80 46" fill="none">
            {/* Crown Base */}
            <path d="M12 36 Q40 40 68 36 L66 42 Q40 46 14 42 Z" fill="url(#disneyGold)" stroke="#78350f" strokeWidth="1" />
            <circle cx="24" cy="39" r="1.8" fill="#ef4444" />
            <circle cx="40" cy="41" r="2.2" fill="#3b82f6" />
            <circle cx="56" cy="39" r="1.8" fill="#ef4444" />

            {/* Tiara Arches */}
            <path
              d="M12 36 Q22 20 28 34 Q34 10 40 2 Q46 10 52 34 Q58 20 68 36 Z"
              fill="url(#disneyGold)"
              stroke="#78350f"
              strokeWidth="1.4"
            />
            {/* Crown Jewels */}
            <circle cx="40" cy="4" r="3.2" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="28" cy="18" r="2.2" fill="#fde047" stroke="#ca8a04" strokeWidth="0.8" />
            <circle cx="52" cy="18" r="2.2" fill="#fde047" stroke="#ca8a04" strokeWidth="0.8" />
            <circle cx="16" cy="24" r="1.8" fill="#fde047" />
            <circle cx="64" cy="24" r="1.8" fill="#fde047" />
          </svg>
        </div>

        {/* Fairytale Title Inscription */}
        <span className="text-[11px] font-script tracking-widest text-amber-200/90 text-center font-bold">
          Once upon a time...
        </span>

        {/* Disney-style Grand Inscription */}
        <h1 className="text-2xl sm:text-3xl font-cinzel font-black tracking-wider text-amber-100 gold-foil-fantasy mt-0.5 leading-tight text-center">
          A MAGICAL<br/>STORYBOOK
        </h1>

        {/* Recipient's Name Featured in Royal Gilded Cartouche */}
        <div className="mt-3 px-6 py-1.5 rounded-full bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 border-2 border-amber-300 shadow-[0_0_20px_rgba(234,179,8,0.7)] flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="text-xl sm:text-2xl font-cinzel font-black text-amber-200 tracking-widest gold-foil-fantasy">
            {friendName}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        </div>

        <p className="mt-3 text-[11px] font-cormorant italic text-amber-200/90 font-bold max-w-[210px] leading-snug drop-shadow-sm text-center">
          "Where true friendship and fairytale magic live happily ever after."
        </p>
      </div>

      {/* ── Bottom: Regal Golden Ribbon Seal "Click to Open Book" ── */}
      <div className="relative z-20 pb-4 flex flex-col items-center">
        <div className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 text-purple-950 font-cinzel font-black text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(234,179,8,0.9)] animate-pulse flex items-center space-x-2 border-2 border-amber-200 cursor-pointer hover:scale-105 active:scale-95 transition-transform">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Click to Open Book</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <p className="text-[9.5px] text-amber-200/80 font-sans mt-1.5 font-semibold drop-shadow-sm">
          Watch the tome slide right and unfold in 3D
        </p>
      </div>
    </div>
  );
}

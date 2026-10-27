import React from 'react';
import tiaraImg from '../assets/princess-tiara.png';

/*
 * PrincessCrown:
 * Faithful reproduction of the user's reference image:
 * - Double curved arched headband studded with glistening diamonds and dual ear pins.
 * - Centerpiece: Grand glowing faceted amber/citrine teardrop gemstone encased in a diamond-encrusted bezel.
 * - Top apex rococo fleur-de-lis finial with crest diamond.
 * - Symmetrical baroque acanthus scrolls and sweeping C-scrolls with bezel-set round diamonds.
 * - Delicate outward-flaring laurel feather sprays on both extremities.
 * - Subtle enchanted fairytale sparkle glints.
 */
export default function PrincessCrown({ className = 'w-44 sm:w-52 h-auto' }) {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Warm Ambient Amber Gem Glow behind Center Jewel */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 rounded-full bg-amber-400/25 blur-lg pointer-events-none animate-pulse" 
      />

      {/* Main Transparent High-Resolution Tiara Artwork from Reference */}
      <img
        src={tiaraImg}
        alt="Royal Princess Tiara"
        className="w-full h-auto object-contain filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)] drop-shadow-[0_0_10px_rgba(234,179,8,0.35)]"
        draggable={false}
      />

      {/* ── Enchanted Diamond Glint Sparkles ── */}
      {/* 1. Center Amber Gem Facet Glint */}
      <div 
        className="absolute top-[28%] left-[49.5%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ animation: 'sparkleGlint 3.2s ease-in-out infinite' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#ffffff" />
          <circle cx="12" cy="12" r="3" fill="#fef08a" />
        </svg>
      </div>

      {/* 2. Top Apex Diamond Glint */}
      <div 
        className="absolute top-[8%] left-[49.8%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ animation: 'sparkleGlint 3.6s ease-in-out 1.2s infinite' }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* 3. Left Scroll Diamond Glint */}
      <div 
        className="absolute top-[38%] left-[24%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ animation: 'sparkleGlint 4.1s ease-in-out 0.8s infinite' }}
      >
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* 4. Right Scroll Diamond Glint */}
      <div 
        className="absolute top-[38%] left-[75.5%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ animation: 'sparkleGlint 3.9s ease-in-out 2.1s infinite' }}
      >
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* 5. Center Base Diamond Glint */}
      <div 
        className="absolute top-[62%] left-[49.7%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ animation: 'sparkleGlint 4.4s ease-in-out 1.6s infinite' }}
      >
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}

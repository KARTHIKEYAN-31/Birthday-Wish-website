import React from 'react';

/*
 * PrincessCrown:
 * 100% Pure CSS & Vector SVG Royal Disney Princess Tiara.
 * Completely reproduces the user's reference image without any raster images:
 * - Symmetrical double-rail arched headband with dual ear pins.
 * - Continuous channel-set diamond ribbon along the brow band.
 * - Centerpiece: Grand glowing faceted amber/citrine teardrop gemstone.
 * - Surrounding diamond halo bezel with gold prong settings.
 * - Majestic rococo lyre crest & finial spire topped with apex diamond.
 * - High sweeping baroque C-scrolls with inset brilliant-cut diamonds.
 * - Graceful secondary S-scrolls and outward-flaring laurel feather wings.
 * - Multi-stop metallic gold & amber gradients with dynamic CSS sparkle glints.
 */
export default function PrincessCrown({ className = 'w-48 sm:w-56 h-auto' }) {
  // Diamond positions along the front brow curve (x, y, radius)
  const bandDiamonds = [
    { x: 46, y: 104, r: 1.8 },
    { x: 57, y: 100, r: 2.0 },
    { x: 69, y: 96, r: 2.1 },
    { x: 82, y: 92, r: 2.2 },
    { x: 96, y: 88, r: 2.3 },
    { x: 110, y: 85, r: 2.4 },
    { x: 124, y: 83, r: 2.5 },
    // 140 is the center rosette
    { x: 156, y: 83, r: 2.5 },
    { x: 170, y: 85, r: 2.4 },
    { x: 184, y: 88, r: 2.3 },
    { x: 198, y: 92, r: 2.2 },
    { x: 211, y: 96, r: 2.1 },
    { x: 223, y: 100, r: 2.0 },
    { x: 234, y: 104, r: 1.8 },
  ];

  // Diamonds along the centerpiece teardrop bezel
  const haloDiamonds = [
    { x: 140, y: 22, r: 2.5 },
    { x: 147, y: 27, r: 2.2 },
    { x: 133, y: 27, r: 2.2 },
    { x: 153, y: 35, r: 2.2 },
    { x: 127, y: 35, r: 2.2 },
    { x: 156, y: 46, r: 2.2 },
    { x: 124, y: 46, r: 2.2 },
    { x: 155, y: 58, r: 2.2 },
    { x: 125, y: 58, r: 2.2 },
    { x: 150, y: 69, r: 2.1 },
    { x: 130, y: 69, r: 2.1 },
    { x: 144, y: 76, r: 2.0 },
    { x: 136, y: 76, r: 2.0 },
  ];

  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Warm Ambient Amber Gem Glow behind Center Jewel */}
      <div 
        className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 rounded-full bg-amber-400/30 blur-lg pointer-events-none animate-pulse" 
      />

      {/* ── Main Pure Vector SVG Royal Tiara ── */}
      <svg
        viewBox="0 0 280 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.88)] drop-shadow-[0_0_12px_rgba(234,179,8,0.45)]"
      >
        <defs>
          {/* Main Royal Gold Gradient */}
          <linearGradient id="tiaraGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="12%" stopColor="#fef08a" />
            <stop offset="28%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="88%" stopColor="#854d0e" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Reverse Gold for Complementary Contrast */}
          <linearGradient id="tiaraGoldReverse" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="15%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="75%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Light Shimmering Gold for Edges */}
          <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fef9c3" />
            <stop offset="70%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Antique Bronze Shadow Gradient */}
          <linearGradient id="goldShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ca8a04" />
            <stop offset="40%" stopColor="#854d0e" />
            <stop offset="80%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#1c0701" />
          </linearGradient>

          {/* Centerpiece Amber Gemstone Radial Gradient */}
          <radialGradient id="amberGemBody" cx="42%" cy="36%" r="58%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="18%" stopColor="#fef08a" />
            <stop offset="38%" stopColor="#fbbf24" />
            <stop offset="65%" stopColor="#d97706" />
            <stop offset="85%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>

          {/* Inner Table Facet Gradient */}
          <linearGradient id="facetHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#fef08a" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.6" />
          </linearGradient>

          {/* Brilliant Cut Diamond Radial Gradient */}
          <radialGradient id="diamondCut" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#f8fafc" />
            <stop offset="75%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </radialGradient>

          {/* Solitaire Diamond Gradient */}
          <radialGradient id="solitaireCut" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#f1f5f9" />
            <stop offset="85%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </radialGradient>
        </defs>

        {/* ================================================================= */}
        {/* 1. REAR HAIR CIRCLET BAND & VERTICAL EAR PINS                     */}
        {/* ================================================================= */}
        {/* Left ear curve & pin */}
        <path
          d="M 38 106 C 36 116 48 126 58 132"
          stroke="url(#tiaraGold)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="58" y1="128" x2="58" y2="137"
          stroke="url(#tiaraGold)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="58" cy="137" r="1.5" fill="#fde047" />

        {/* Right ear curve & pin */}
        <path
          d="M 242 106 C 244 116 232 126 222 132"
          stroke="url(#tiaraGold)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="222" y1="128" x2="222" y2="137"
          stroke="url(#tiaraGold)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="222" cy="137" r="1.5" fill="#fde047" />

        {/* ================================================================= */}
        {/* 2. MAIN FRONT BROW ARCHED DOUBLE-RAIL BAND                        */}
        {/* ================================================================= */}
        {/* Lower Arch Rail */}
        <path
          d="M 36 107 Q 140 82 244 107"
          stroke="url(#goldShadow)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 36 106 Q 140 81 244 106"
          stroke="url(#tiaraGold)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Diamond Channel Filler Band */}
        <path
          d="M 38 101 Q 140 77 242 101"
          stroke="url(#goldShadow)"
          strokeWidth="5.5"
          opacity="0.75"
        />

        {/* Upper Arch Rail */}
        <path
          d="M 36 96 Q 140 73 244 96"
          stroke="url(#goldShadow)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M 36 95.5 Q 140 72.5 244 95.5"
          stroke="url(#goldHighlight)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* ================================================================= */}
        {/* 3. ROW OF DIAMONDS ALONG THE FRONT HEADBAND                       */}
        {/* ================================================================= */}
        {bandDiamonds.map((d, i) => (
          <g key={`band-diamond-${i}`}>
            {/* Gold Bezel Prong Ring */}
            <circle cx={d.x} cy={d.y} r={d.r + 0.8} fill="url(#goldShadow)" />
            <circle cx={d.x} cy={d.y} r={d.r + 0.5} stroke="url(#tiaraGold)" strokeWidth="0.7" fill="#ffffff" />
            {/* Diamond Body */}
            <circle cx={d.x} cy={d.y} r={d.r} fill="url(#diamondCut)" />
            {/* Diamond Glint */}
            <circle cx={d.x - d.r * 0.35} cy={d.y - d.r * 0.35} r={d.r * 0.35} fill="#ffffff" />
          </g>
        ))}

        {/* ================================================================= */}
        {/* 4. LAUREL FEATHER / WING SPRAYS AT EXTREMITIES                   */}
        {/* ================================================================= */}
        {/* Left Wing Leaves */}
        <path
          d="M 38 98 C 24 86 16 80 18 70 C 26 74 34 86 40 93 Z"
          fill="url(#tiaraGold)"
          stroke="#78350f"
          strokeWidth="0.8"
        />
        <path
          d="M 36 102 C 18 96 12 88 15 78 C 23 83 31 93 38 99 Z"
          fill="url(#goldHighlight)"
          stroke="#78350f"
          strokeWidth="0.8"
        />
        <path
          d="M 38 106 C 22 106 15 100 17 90 C 25 95 32 101 37 104 Z"
          fill="url(#tiaraGold)"
          stroke="#78350f"
          strokeWidth="0.8"
        />

        {/* Right Wing Leaves */}
        <path
          d="M 242 98 C 256 86 264 80 262 70 C 254 74 246 86 240 93 Z"
          fill="url(#tiaraGold)"
          stroke="#78350f"
          strokeWidth="0.8"
        />
        <path
          d="M 244 102 C 262 96 268 88 265 78 C 257 83 249 93 242 99 Z"
          fill="url(#goldHighlight)"
          stroke="#78350f"
          strokeWidth="0.8"
        />
        <path
          d="M 242 106 C 258 106 265 100 263 90 C 255 95 248 101 243 104 Z"
          fill="url(#tiaraGold)"
          stroke="#78350f"
          strokeWidth="0.8"
        />

        {/* ================================================================= */}
        {/* 5. SECONDARY OUTER S-SCROLLS WITH INSET DIAMONDS                  */}
        {/* ================================================================= */}
        {/* Left S-Scroll */}
        <path
          d="M 68 96 C 54 90 44 76 50 62 C 55 52 68 54 70 64 C 72 72 64 78 57 74 C 52 70 55 64 61 63 C 65 63 67 67 65 70"
          stroke="url(#tiaraGold)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 68 96 C 54 90 44 76 50 62 C 55 52 68 54 70 64 C 72 72 64 78 57 74"
          stroke="url(#goldHighlight)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Left S-Scroll Diamond */}
        <circle cx="61" cy="67" r="3.4" fill="url(#goldShadow)" />
        <circle cx="61" cy="67" r="2.8" fill="url(#diamondCut)" stroke="url(#tiaraGold)" strokeWidth="0.8" />
        <circle cx="60" cy="66" r="0.9" fill="#ffffff" />

        {/* Right S-Scroll */}
        <path
          d="M 212 96 C 226 90 236 76 230 62 C 225 52 212 54 210 64 C 208 72 216 78 223 74 C 228 70 225 64 219 63 C 215 63 213 67 215 70"
          stroke="url(#tiaraGold)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 212 96 C 226 90 236 76 230 62 C 225 52 212 54 210 64 C 208 72 216 78 223 74"
          stroke="url(#goldHighlight)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Right S-Scroll Diamond */}
        <circle cx="219" cy="67" r="3.4" fill="url(#goldShadow)" />
        <circle cx="219" cy="67" r="2.8" fill="url(#diamondCut)" stroke="url(#tiaraGold)" strokeWidth="0.8" />
        <circle cx="218" cy="66" r="0.9" fill="#ffffff" />

        {/* ================================================================= */}
        {/* 6. GRAND BAROQUE C-SCROLLS (SIGNATURE PEAKS)                      */}
        {/* ================================================================= */}
        {/* Left Grand C-Scroll */}
        {/* Acanthus leaf spurs on outer shoulder */}
        <path
          d="M 78 48 C 66 43 68 34 78 37 Z"
          fill="url(#tiaraGold)"
          stroke="#78350f"
          strokeWidth="0.8"
        />
        <path
          d="M 84 62 C 72 58 74 48 84 51 Z"
          fill="url(#tiaraGold)"
          stroke="#78350f"
          strokeWidth="0.8"
        />
        {/* Main Ribbon Arch */}
        <path
          d="M 106 88 C 94 74 76 56 80 36 C 83 23 98 23 105 32 C 111 40 106 48 97 48 C 90 48 87 42 92 37 C 96 33 101 36 99 41"
          stroke="url(#tiaraGold)"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 106 88 C 94 74 76 56 80 36 C 83 23 98 23 105 32 C 111 40 106 48 97 48"
          stroke="url(#goldHighlight)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Left Scroll Eye Diamond */}
        <circle cx="97" cy="40" r="4.2" fill="url(#goldShadow)" />
        <circle cx="97" cy="40" r="3.4" fill="url(#diamondCut)" stroke="url(#tiaraGold)" strokeWidth="0.9" />
        <circle cx="95.5" cy="38.5" r="1.2" fill="#ffffff" />

        {/* Left Lower Shoulder Diamond */}
        <circle cx="102" cy="68" r="3.6" fill="url(#goldShadow)" />
        <circle cx="102" cy="68" r="2.8" fill="url(#diamondCut)" stroke="url(#tiaraGold)" strokeWidth="0.8" />
        <circle cx="101" cy="67" r="0.9" fill="#ffffff" />

        {/* Right Grand C-Scroll */}
        {/* Acanthus leaf spurs on outer shoulder */}
        <path
          d="M 202 48 C 214 43 212 34 202 37 Z"
          fill="url(#tiaraGold)"
          stroke="#78350f"
          strokeWidth="0.8"
        />
        <path
          d="M 196 62 C 208 58 206 48 196 51 Z"
          fill="url(#tiaraGold)"
          stroke="#78350f"
          strokeWidth="0.8"
        />
        {/* Main Ribbon Arch */}
        <path
          d="M 174 88 C 186 74 204 56 200 36 C 197 23 182 23 175 32 C 169 40 174 48 183 48 C 190 48 193 42 188 37 C 184 33 179 36 181 41"
          stroke="url(#tiaraGold)"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 174 88 C 186 74 204 56 200 36 C 197 23 182 23 175 32 C 169 40 174 48 183 48"
          stroke="url(#goldHighlight)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Right Scroll Eye Diamond */}
        <circle cx="183" cy="40" r="4.2" fill="url(#goldShadow)" />
        <circle cx="183" cy="40" r="3.4" fill="url(#diamondCut)" stroke="url(#tiaraGold)" strokeWidth="0.9" />
        <circle cx="181.5" cy="38.5" r="1.2" fill="#ffffff" />

        {/* Right Lower Shoulder Diamond */}
        <circle cx="178" cy="68" r="3.6" fill="url(#goldShadow)" />
        <circle cx="178" cy="68" r="2.8" fill="url(#diamondCut)" stroke="url(#tiaraGold)" strokeWidth="0.8" />
        <circle cx="177" cy="67" r="0.9" fill="#ffffff" />

        {/* ================================================================= */}
        {/* 7. INNER SCROLL FLOURISHES HUGGING THE CENTER GEM                 */}
        {/* ================================================================= */}
        {/* Left Inner Branch */}
        <path
          d="M 132 80 C 118 72 112 56 120 44 C 124 38 131 42 127 48 C 123 54 125 64 133 72"
          stroke="url(#tiaraGold)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M 122 58 C 114 52 116 45 123 48 Z"
          fill="url(#tiaraGold)"
          stroke="#78350f"
          strokeWidth="0.7"
        />

        {/* Right Inner Branch */}
        <path
          d="M 148 80 C 162 72 168 56 160 44 C 156 38 149 42 153 48 C 157 54 155 64 147 72"
          stroke="url(#tiaraGold)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M 158 58 C 166 52 164 45 157 48 Z"
          fill="url(#tiaraGold)"
          stroke="#78350f"
          strokeWidth="0.7"
        />

        {/* ================================================================= */}
        {/* 8. DIAMOND BEZEL HALO AROUND CENTER GEM                           */}
        {/* ================================================================= */}
        {/* Gold Halo Channel Base */}
        <path
          d="M 140 21 C 164 36 164 68 140 82 C 116 68 116 36 140 21 Z"
          fill="url(#goldShadow)"
          stroke="url(#tiaraGold)"
          strokeWidth="2.2"
        />

        {/* Diamonds on the Halo Ring */}
        {haloDiamonds.map((d, i) => (
          <g key={`halo-diamond-${i}`}>
            <circle cx={d.x} cy={d.y} r={d.r + 0.6} fill="url(#goldShadow)" />
            <circle cx={d.x} cy={d.y} r={d.r} fill="url(#diamondCut)" stroke="url(#tiaraGold)" strokeWidth="0.6" />
            <circle cx={d.x - d.r * 0.35} cy={d.y - d.r * 0.35} r={d.r * 0.35} fill="#ffffff" />
          </g>
        ))}

        {/* ================================================================= */}
        {/* 9. THE GRAND FACETED AMBER/CITRINE GEMSTONE                       */}
        {/* ================================================================= */}
        {/* Bezel Interior Wall Shadow */}
        <path
          d="M 140 27 C 158 40 158 66 140 76 C 122 66 122 40 140 27 Z"
          fill="#451a03"
        />

        {/* Main Amber Gemstone Body */}
        <path
          d="M 140 28 C 156 41 156 65 140 75 C 124 65 124 41 140 28 Z"
          fill="url(#amberGemBody)"
          stroke="#b45309"
          strokeWidth="0.8"
        />

        {/* Gemstone Facet Cuts (Geometric Brilliant Luster) */}
        {/* Center Table Facet */}
        <path
          d="M 140 37 C 148 45 148 59 140 67 C 132 59 132 45 140 37 Z"
          fill="url(#facetHighlight)"
          stroke="#fde047"
          strokeWidth="0.6"
        />

        {/* Facet Star Lines */}
        <line x1="140" y1="28" x2="140" y2="37" stroke="#fef08a" strokeWidth="0.9" opacity="0.9" />
        <line x1="140" y1="67" x2="140" y2="75" stroke="#78350f" strokeWidth="0.9" opacity="0.8" />
        <line x1="125" y1="51.5" x2="132" y2="52" stroke="#fef08a" strokeWidth="0.8" opacity="0.85" />
        <line x1="155" y1="51.5" x2="148" y2="52" stroke="#92400e" strokeWidth="0.8" opacity="0.8" />

        <line x1="140" y1="37" x2="128" y2="44" stroke="#fef9c3" strokeWidth="0.7" opacity="0.85" />
        <line x1="140" y1="37" x2="152" y2="44" stroke="#fef08a" strokeWidth="0.7" opacity="0.8" />
        <line x1="140" y1="67" x2="128" y2="60" stroke="#78350f" strokeWidth="0.7" opacity="0.75" />
        <line x1="140" y1="67" x2="152" y2="60" stroke="#92400e" strokeWidth="0.7" opacity="0.75" />

        {/* Bright Specular Reflection Flare along Upper Left */}
        <path
          d="M 137 32 C 133 42 133 54 136 62"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 139 30 C 136 38 136 46 138 52"
          stroke="#fef08a"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* ================================================================= */}
        {/* 10. TOP ROCOCO APEX CREST & FINIAL SPIRE                          */}
        {/* ================================================================= */}
        {/* Lyre Scrolls */}
        <path
          d="M 138 20 C 130 14 125 10 131 5 C 135 2 139 7 138 11"
          stroke="url(#tiaraGold)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M 142 20 C 150 14 155 10 149 5 C 145 2 141 7 142 11"
          stroke="url(#tiaraGold)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M 138 20 C 130 14 125 10 131 5 C 135 2 139 7 138 11"
          stroke="url(#goldHighlight)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M 142 20 C 150 14 155 10 149 5 C 145 2 141 7 142 11"
          stroke="url(#goldHighlight)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Center Spire Spear */}
        <polygon
          points="138,15 140,5 142,15 140,17"
          fill="url(#goldHighlight)"
          stroke="#78350f"
          strokeWidth="0.8"
        />

        {/* Apex Crest Diamond */}
        <circle cx="140" cy="15" r="3.2" fill="url(#goldShadow)" />
        <circle cx="140" cy="15" r="2.5" fill="url(#diamondCut)" stroke="url(#tiaraGold)" strokeWidth="0.7" />
        <circle cx="139" cy="14" r="0.9" fill="#ffffff" />

        {/* Top Tip Diamond */}
        <circle cx="140" cy="5" r="2.4" fill="url(#goldShadow)" />
        <circle cx="140" cy="5" r="1.8" fill="url(#diamondCut)" stroke="url(#tiaraGold)" strokeWidth="0.6" />
        <circle cx="139.3" cy="4.3" r="0.7" fill="#ffffff" />

        {/* ================================================================= */}
        {/* 11. CENTER BASE ROSETTE & SOLITAIRE DIAMOND                       */}
        {/* ================================================================= */}
        {/* 6-Prong Rosette Setting */}
        <circle cx="140" cy="80" r="6.2" fill="url(#goldShadow)" />
        <circle cx="140" cy="80" r="5.6" fill="url(#tiaraGold)" stroke="#451a03" strokeWidth="0.8" />

        {/* Solitaire Diamond Body */}
        <circle cx="140" cy="80" r="4.4" fill="url(#solitaireCut)" stroke="url(#goldHighlight)" strokeWidth="0.8" />
        <circle cx="138.4" cy="78.4" r="1.6" fill="#ffffff" />

        {/* Rosette Prongs */}
        <circle cx="140" cy="74.5" r="1" fill="#fef08a" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="145" cy="77" r="1" fill="#fef08a" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="145" cy="83" r="1" fill="#fef08a" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="140" cy="85.5" r="1" fill="#fef08a" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="135" cy="83" r="1" fill="#fef08a" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="135" cy="77" r="1" fill="#fef08a" stroke="#78350f" strokeWidth="0.5" />
      </svg>

      {/* ── Enchanted Diamond Glint Sparkles (CSS Animated) ── */}
      {/* 1. Center Amber Gem Facet Glint */}
      <div 
        className="absolute top-[35%] left-[48.5%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ animation: 'sparkleGlint 3.2s ease-in-out infinite' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#ffffff" />
          <circle cx="12" cy="12" r="3" fill="#fef08a" />
        </svg>
      </div>

      {/* 2. Top Apex Diamond Glint */}
      <div 
        className="absolute top-[8%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ animation: 'sparkleGlint 3.6s ease-in-out 1.2s infinite' }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* 3. Left Grand Scroll Diamond Glint */}
      <div 
        className="absolute top-[28%] left-[34.6%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ animation: 'sparkleGlint 4.1s ease-in-out 0.8s infinite' }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* 4. Right Grand Scroll Diamond Glint */}
      <div 
        className="absolute top-[28%] left-[65.4%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ animation: 'sparkleGlint 3.9s ease-in-out 2.1s infinite' }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* 5. Center Base Solitaire Diamond Glint */}
      <div 
        className="absolute top-[57%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ animation: 'sparkleGlint 4.4s ease-in-out 1.6s infinite' }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}

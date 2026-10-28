import React from 'react';
import { motion } from 'framer-motion';

/*
 * PopUpElement:
 * Realistic mechanical 3D pop-up origami book physics.
 * Compact & scaled down to sit elegantly along the center crease / spine gutter,
 * completely clear of the left and right page reading areas, video frames, and quote cards.
 *
 * 5 Unique Disney Princess Fairytale Origami Pop-Up Scenes:
 * - Spread 1: Disney Fairytale Castle & Winged Pegasus (The Royal Citadel)
 * - Spread 2: Enchanted Cinderella Pumpkin Carriage & White Steeds
 * - Spread 3: Celestial Lilac Hot Air Balloon & Crescent Moon
 * - Spread 4: Princess Swan Lake & Baroque Gilded Fountain
 * - Spread 5: Royal Crown Gazebo, Floating Lanterns & Songbirds
 */

const getFoldTransition = (folded, delay = 0) => {
  if (folded) {
    return {
      duration: 0.26,
      ease: [0.4, 0.0, 0.2, 1],
    };
  }
  return {
    type: 'spring',
    stiffness: 75,
    damping: 14,
    delay: delay + 0.08,
  };
};

/* ─── SCENE 1: Disney Fairytale Castle, Galloping Stallions & Pegasus ─────── */
export function CastleScene({ folded }) {
  const rx = folded ? -90 : 0;
  const op = folded ? 0 : 1;

  return (
    <div
      className={`absolute inset-0 pointer-events-none flex items-end justify-center overflow-visible z-20 transition-opacity duration-300 ${
        folded ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ perspective: 1600, transformStyle: 'preserve-3d' }}
    >
      {/* Crease Ground Shadow */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-52 h-5 rounded-full bg-purple-950/25 blur-md pointer-events-none"
        animate={{ scaleX: folded ? 0.1 : 1, opacity: folded ? 0 : 0.7 }}
        transition={{ duration: folded ? 0.22 : 0.5 }}
      />

      {/* Layer 1 (Back Z: 15px): Celestial Gold Spires */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 15 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.04)}
        className="absolute bottom-8 flex justify-center pointer-events-none"
      >
        <svg width="145" height="105" viewBox="0 0 280 200" fill="none" className="filter drop-shadow-sm">
          <defs>
            <linearGradient id="goldSpireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="wallBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#faf5ff" />
              <stop offset="60%" stopColor="#e9d5ff" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>

          {/* Left Spire */}
          <polygon points="60,150 80,30 100,150" fill="url(#goldSpireGrad)" stroke="#ca8a04" strokeWidth="1.5" />
          <path d="M80 30 V16 L68 22Z" fill="#ec4899" />
          <circle cx="80" cy="16" r="3" fill="#facc15" />

          {/* Right Spire */}
          <polygon points="180,150 200,30 220,150" fill="url(#goldSpireGrad)" stroke="#ca8a04" strokeWidth="1.5" />
          <path d="M200 30 V16 L212 22Z" fill="#ec4899" />
          <circle cx="200" cy="16" r="3" fill="#facc15" />

          {/* Center Tallest Keep */}
          <rect x="122" y="60" width="36" height="90" fill="url(#wallBackGrad)" />
          <polygon points="116,60 140,5 164,60" fill="url(#goldSpireGrad)" stroke="#ca8a04" strokeWidth="2" />
          <circle cx="140" cy="5" r="4" fill="#facc15" />
          <path d="M140 5 V-8 L154 -2Z" fill="#f43f5e" />
          <path d="M132 80 C132 72 148 72 148 80 V95 H132Z" fill="#fde047" className="animate-pulse" />
        </svg>
      </motion.div>

      {/* Layer 2 (Middle Z: 40px): Disney Fairytale Castle Main Keep */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 40 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.12)}
        className="relative mb-2 drop-shadow-[0_15px_22px_rgba(59,7,100,0.4)] pointer-events-none"
      >
        <svg width="150" height="115" viewBox="0 0 290 220" fill="none" className="drop-shadow-lg">
          <defs>
            <linearGradient id="castleKeepWall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#faf5ff" />
              <stop offset="100%" stopColor="#e9d5ff" />
            </linearGradient>
            <linearGradient id="castleLilacRoof" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>
          </defs>

          {/* White Paper Cutout Outline */}
          <path
            d="M25 215 L25 120 L50 80 L75 120 L80 120 L80 95 L110 50 L145 15 L180 50 L210 95 L210 120 L215 120 L240 80 L265 120 L265 215Z"
            fill="#ffffff"
            stroke="#e9d5ff"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* Main Central Keep */}
          <rect x="78" y="110" width="134" height="105" fill="url(#castleKeepWall)" rx="2" />
          
          {/* Crenellations */}
          {[82, 104, 126, 148, 170, 192].map((x, i) => (
            <rect key={i} x={x} y="100" width="14" height="12" fill="url(#castleKeepWall)" stroke="#d8b4fe" strokeWidth="1" rx="1" />
          ))}

          {/* Left Wing Tower */}
          <rect x="28" y="120" width="48" height="95" fill="url(#castleKeepWall)" />
          <polygon points="24,120 52,72 80,120" fill="url(#castleLilacRoof)" stroke="#581c87" strokeWidth="1.5" />
          <circle cx="52" cy="70" r="3.5" fill="#facc15" />
          <path d="M52 70 V55 L40 62Z" fill="#ec4899" />
          <path d="M44 145 C44 138 60 138 60 145 V160 H44Z" fill="#fde047" className="animate-pulse" />

          {/* Right Wing Tower */}
          <rect x="214" y="120" width="48" height="95" fill="url(#castleKeepWall)" />
          <polygon points="210,120 238,72 266,120" fill="url(#castleLilacRoof)" stroke="#581c87" strokeWidth="1.5" />
          <circle cx="238" cy="70" r="3.5" fill="#facc15" />
          <path d="M238 70 V55 L250 62Z" fill="#ec4899" />
          <path d="M230 145 C230 138 246 138 246 145 V160 H230Z" fill="#fde047" className="animate-pulse" />

          {/* Central Castle Grand Gate */}
          <path d="M120 215 V175 C120 156 170 156 170 175 V215Z" fill="#2e0854" />
          <line x1="135" y1="160" x2="135" y2="215" stroke="#ca8a04" strokeWidth="2" />
          <line x1="145" y1="158" x2="145" y2="215" stroke="#ca8a04" strokeWidth="2" />
          <line x1="155" y1="160" x2="155" y2="215" stroke="#ca8a04" strokeWidth="2" />
          <line x1="121" y1="185" x2="169" y2="185" stroke="#ca8a04" strokeWidth="1.8" />

          {/* Blooming Lilac Vines */}
          <path d="M80 215 Q68 175 84 150 Q96 125 88 105" stroke="#16a34a" strokeWidth="2.5" fill="none" />
          <circle cx="78" cy="178" r="4" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.2" />
          <circle cx="86" cy="154" r="3.5" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.2" />
          <path d="M210 215 Q222 175 206 150" stroke="#16a34a" strokeWidth="2.5" fill="none" />
          <circle cx="212" cy="178" r="4" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.2" />
        </svg>
      </motion.div>

      {/* Layer 3 (Foreground Z: 65px): Rearing Stallion & Winged Pegasus */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 65 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.18)}
        className="absolute bottom-1 w-56 flex items-end justify-between pointer-events-none"
      >
        <motion.div
          className="filter drop-shadow-[0_8px_10px_rgba(40,5,50,0.4)]"
          animate={folded ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="65" height="55" viewBox="0 0 130 115" fill="none">
            <defs>
              <linearGradient id="horseWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#faf5ff" />
                <stop offset="100%" stopColor="#e9d5ff" />
              </linearGradient>
              <linearGradient id="horseManeLilac" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fdf4ff" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
            </defs>
            <path
              d="M40 80 C32 65 35 45 48 32 C58 22 72 23 82 30 C95 38 102 50 97 68 C90 80 78 82 65 80 C52 80 44 85 40 80Z"
              fill="url(#horseWhiteGrad)"
              stroke="#d8b4fe"
              strokeWidth="2.5"
            />
            <path d="M50 40 C44 30 42 18 48 12 C53 8 60 10 63 16 C68 25 74 32 72 40Z" fill="url(#horseWhiteGrad)" />
            <circle cx="50" cy="16" r="1.5" fill="#3b0764" />
            <path d="M45 22 L55 14" stroke="#ca8a04" strokeWidth="1.5" />
            <path d="M58 10 C66 8 72 16 70 24 C75 22 80 30 76 38" stroke="url(#horseManeLilac)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M40 50 L28 68 L30 80" stroke="url(#horseWhiteGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="30" cy="80" r="3" fill="#ca8a04" />
            <path d="M84 68 L87 90 L85 105" stroke="url(#horseWhiteGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <rect x="80" y="103" width="9" height="4" rx="2" fill="#ca8a04" />
            <path d="M97 62 Q115 68 110 90 Q106 100 100 108" stroke="url(#horseManeLilac)" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
        </motion.div>

        <motion.div
          className="filter drop-shadow-[0_8px_10px_rgba(40,5,50,0.4)]"
          animate={folded ? {} : { y: [-3, 3, -3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="70" height="55" viewBox="0 0 140 115" fill="none">
            <path
              d="M95 80 C103 65 100 45 88 32 C78 22 62 23 52 30 C40 38 32 50 38 68 C45 80 57 82 70 80 C82 80 90 85 95 80Z"
              fill="url(#horseWhiteGrad)"
              stroke="#d8b4fe"
              strokeWidth="2.5"
            />
            <path d="M85 40 C90 30 93 18 88 12 C82 8 76 10 73 16 C68 25 62 32 64 40Z" fill="url(#horseWhiteGrad)" />
            <circle cx="85" cy="16" r="1.5" fill="#3b0764" />
            <path d="M90 22 L80 14" stroke="#ca8a04" strokeWidth="1.5" />
            <path
              d="M62 42 C52 18 30 8 12 10 C8 22 20 36 38 40 C48 42 58 42 62 42Z"
              fill="#ffffff"
              stroke="#d8b4fe"
              strokeWidth="1.8"
            />
            <path d="M78 10 C70 8 64 16 66 24 C60 22 55 30 58 38" stroke="url(#horseManeLilac)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M95 50 L108 68 L112 80" stroke="url(#horseWhiteGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="112" cy="80" r="3" fill="#ca8a04" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── SCENE 2: Enchanted Royal Cinderella Carriage & Golden Steeds ───────── */
export function CarriageScene({ folded }) {
  const rx = folded ? -90 : 0;
  const op = folded ? 0 : 1;

  return (
    <div
      className={`absolute inset-0 pointer-events-none flex items-end justify-center overflow-visible z-20 transition-opacity duration-300 ${
        folded ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ perspective: 1600, transformStyle: 'preserve-3d' }}
    >
      {/* Crease Ground Shadow */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-52 h-5 rounded-full bg-purple-950/25 blur-md pointer-events-none"
        animate={{ scaleX: folded ? 0.1 : 1, opacity: folded ? 0 : 0.7 }}
        transition={{ duration: folded ? 0.22 : 0.5 }}
      />

      {/* Layer 1 (Back Z: 14px): Twinkling Star Canopy & Crescent Moon */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 14 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.04)}
        className="absolute bottom-10 w-48 flex justify-center pointer-events-none"
      >
        <div className="absolute -top-16 -left-4 filter drop-shadow-sm">
          <svg width="30" height="30" viewBox="0 0 60 60" fill="none">
            <path d="M30 4 C14 4 4 17 4 30 C4 43 14 56 30 56 C18 48 14 39 14 30 C14 21 18 12 30 4Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          </svg>
        </div>
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.2, repeat: Infinity }} className="absolute -top-14 right-8 text-amber-300 text-sm font-bold">✦</motion.div>
        <motion.div animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }} className="absolute -top-10 left-12 text-purple-300 text-xs">★</motion.div>
        <motion.div animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-8 right-1 text-pink-300 text-[10px]">✨</motion.div>
      </motion.div>

      {/* Layer 2 (Middle Z: 38px): Ornate Gilded Cinderella Pumpkin Carriage */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 38 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.12)}
        className="relative mb-2 drop-shadow-[0_15px_22px_rgba(59,7,100,0.38)] pointer-events-none"
      >
        <motion.div
          animate={folded ? {} : { y: [0, -3.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="150" height="118" viewBox="0 0 280 220" fill="none" className="drop-shadow-lg">
            <defs>
              <linearGradient id="carriageBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#fdf4ff" />
                <stop offset="80%" stopColor="#e9d5ff" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
              <linearGradient id="carriageGoldFiligree" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#a16207" />
              </linearGradient>
            </defs>

            {/* Die-cut cardstock base outline */}
            <circle cx="140" cy="100" r="72" fill="#ffffff" stroke="#e9d5ff" strokeWidth="4" />
            <circle cx="80" cy="165" r="32" fill="#ffffff" stroke="#e9d5ff" strokeWidth="3.5" />
            <circle cx="200" cy="165" r="32" fill="#ffffff" stroke="#e9d5ff" strokeWidth="3.5" />

            {/* Pumpkin Carriage Main Cabin */}
            <circle cx="140" cy="100" r="68" fill="url(#carriageBodyGrad)" />
            
            {/* Pumpkin Lobes */}
            <path d="M140 32 C108 32 90 62 90 100 C90 138 108 168 140 168" stroke="#d8b4fe" strokeWidth="2.5" fill="none" />
            <path d="M140 32 C172 32 190 62 190 100 C190 138 172 168 140 168" stroke="#d8b4fe" strokeWidth="2.5" fill="none" />
            <line x1="140" y1="32" x2="140" y2="168" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Crown Topper */}
            <path d="M125 32 L132 16 L140 24 L148 16 L155 32Z" fill="url(#carriageGoldFiligree)" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="140" cy="12" r="3" fill="#ec4899" />
            <circle cx="132" cy="14" r="2" fill="#facc15" />
            <circle cx="148" cy="14" r="2" fill="#facc15" />

            {/* Heart-Shaped Royal Window */}
            <path d="M140 115 C130 95 112 90 112 76 C112 66 122 60 132 66 C136 68 140 74 140 74 C140 74 144 68 148 66 C158 60 168 66 168 76 C168 90 150 95 140 115Z" fill="#faf5ff" stroke="url(#carriageGoldFiligree)" strokeWidth="2.5" />
            <path d="M140 112 C132 95 118 90 118 78 C118 70 126 65 133 70 C136 72 140 77 140 77 C140 77 144 72 147 70 C154 65 162 70 162 78 C162 90 148 95 140 112Z" fill="#3b0764" />
            <circle cx="140" cy="92" r="3" fill="#facc15" className="animate-pulse" />

            {/* Gilded Lanterns */}
            <g>
              <rect x="74" y="80" width="10" height="16" rx="2" fill="url(#carriageGoldFiligree)" stroke="#ca8a04" strokeWidth="1" />
              <circle cx="79" cy="88" r="3" fill="#fef08a" className="animate-pulse" />
              <line x1="79" y1="74" x2="79" y2="80" stroke="#ca8a04" strokeWidth="1.5" />
            </g>
            <g>
              <rect x="196" y="80" width="10" height="16" rx="2" fill="url(#carriageGoldFiligree)" stroke="#ca8a04" strokeWidth="1" />
              <circle cx="201" cy="88" r="3" fill="#fef08a" className="animate-pulse" />
              <line x1="201" y1="74" x2="201" y2="80" stroke="#ca8a04" strokeWidth="1.5" />
            </g>

            {/* Spoke Wheels (Gold Baroque) */}
            <g>
              <circle cx="80" cy="165" r="28" stroke="url(#carriageGoldFiligree)" strokeWidth="4" fill="none" />
              <circle cx="80" cy="165" r="6" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
              {[0, 45, 90, 135].map((deg) => (
                <line key={deg} x1="80" y1="137" x2="80" y2="193" stroke="url(#carriageGoldFiligree)" strokeWidth="2" transform={`rotate(${deg} 80 165)`} />
              ))}
            </g>
            <g>
              <circle cx="200" cy="165" r="28" stroke="url(#carriageGoldFiligree)" strokeWidth="4" fill="none" />
              <circle cx="200" cy="165" r="6" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
              {[0, 45, 90, 135].map((deg) => (
                <line key={deg} x1="200" y1="137" x2="200" y2="193" stroke="url(#carriageGoldFiligree)" strokeWidth="2" transform={`rotate(${deg} 200 165)`} />
              ))}
            </g>

            {/* Chassis Connection */}
            <path d="M80 165 C110 185 170 185 200 165" stroke="url(#carriageGoldFiligree)" strokeWidth="3" fill="none" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Layer 3 (Foreground Z: 62px): Crystal Slipper on Velvet Pillow & Butterfly */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 62 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.2)}
        className="absolute bottom-0 w-48 flex items-end justify-between pointer-events-none"
      >
        <div className="relative filter drop-shadow-sm">
          {/* Velvet Cushion */}
          <svg width="48" height="30" viewBox="0 0 90 55" fill="none">
            <ellipse cx="45" cy="38" rx="38" ry="14" fill="#a855f7" stroke="#ca8a04" strokeWidth="2" />
            <ellipse cx="45" cy="36" rx="32" ry="10" fill="#c084fc" />
            {/* Crystal Glass Slipper */}
            <path d="M28 32 C38 32 46 25 54 25 C60 25 64 28 66 32 C58 35 44 35 30 35 L28 32Z" fill="#ffffff" stroke="#9333ea" strokeWidth="1.5" />
            <path d="M54 25 L58 15 C58 15 54 18 52 25Z" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1" />
            <circle cx="48" cy="27" r="2" fill="#facc15" />
          </svg>
        </div>

        <div className="relative filter drop-shadow-xs">
          <motion.div animate={folded ? {} : { y: [-2, 2, -2] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}>
            <span className="text-sm">✨</span>
            <span className="text-xs ml-1">🦋</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── SCENE 3: Lilac Hot Air Balloon, Celestial Clouds & Golden Stars ─────── */
export function BalloonScene({ folded }) {
  const rx = folded ? -90 : 0;
  const op = folded ? 0 : 1;

  return (
    <div
      className={`absolute inset-0 pointer-events-none flex items-end justify-center overflow-visible z-20 transition-opacity duration-300 ${
        folded ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ perspective: 1600, transformStyle: 'preserve-3d' }}
    >
      {/* Paper Hinge Crease Shadow */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-5 rounded-full bg-purple-950/25 blur-md pointer-events-none"
        animate={{ scaleX: folded ? 0.1 : 1, opacity: folded ? 0 : 0.65 }}
        transition={{ duration: folded ? 0.22 : 0.5 }}
      />

      {/* Layer 1 (Back Z: 12px): Crescent Moon, Tiny Star Clusters */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 12 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.04)}
        className="absolute bottom-10 w-44 flex justify-center pointer-events-none"
      >
        <div className="absolute -top-20 -left-6 filter drop-shadow-sm">
          <svg width="34" height="34" viewBox="0 0 80 80" fill="none">
            <path
              d="M40 5 C18 5 5 22 5 40 C5 58 18 75 40 75 C25 65 18 53 18 40 C18 27 25 15 40 5Z"
              fill="#fff"
              stroke="#eab308"
              strokeWidth="2.5"
            />
            <path
              d="M38 8 C20 10 10 25 10 40 C10 55 20 68 38 72 C26 63 20 52 20 40 C20 28 26 17 38 8Z"
              fill="#fef08a"
            />
          </svg>
        </div>

        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-16 right-5 text-amber-300 text-sm font-bold">✦</motion.div>
        <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          className="absolute -top-12 left-10 text-purple-300 text-xs">★</motion.div>
      </motion.div>

      {/* Layer 2 (Middle Z: 35px): 3D Lilac Hot Air Balloon */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 35 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.12)}
        className="relative mb-3 drop-shadow-[0_12px_20px_rgba(59,7,100,0.35)] pointer-events-none"
      >
        <motion.div
          animate={folded ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="105" height="135" viewBox="0 0 200 260" fill="none" className="drop-shadow-lg">
            <defs>
              <linearGradient id="balLilacGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#faf5ff" />
                <stop offset="45%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
              <linearGradient id="balLilacGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fdf4ff" />
                <stop offset="50%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#be185d" />
              </linearGradient>
              <linearGradient id="balGoldBunting" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>

            {/* Paper Cutout White Rim Base */}
            <path
              d="M100 12 C40 12 15 60 42 130 C56 162 82 180 88 190 L112 190 C118 180 144 162 158 130 C185 60 160 12 100 12Z"
              fill="#ffffff"
              stroke="#e9d5ff"
              strokeWidth="4"
            />

            {/* Envelope Panels */}
            <g clipPath="url(#bClipPanel)">
              <clipPath id="bClipPanel">
                <path d="M100 14 C44 14 18 60 44 128 C58 160 84 178 90 188 L110 188 C116 178 142 160 156 128 C182 60 156 14 100 14Z" />
              </clipPath>
              <path d="M100 14 Q35 75 44 130 Q60 165 90 188 L100 188Z" fill="url(#balLilacGrad1)" />
              <path d="M100 14 Q165 75 156 130 Q140 165 110 188 L100 188Z" fill="url(#balLilacGrad1)" />
              <path d="M100 14 Q72 80 85 188 L115 188 Q128 80 100 14Z" fill="url(#balLilacGrad2)" />
              <line x1="100" y1="14" x2="100" y2="188" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="4 2" />
              <path d="M35 95 Q100 135 165 95" stroke="url(#balGoldBunting)" strokeWidth="3" fill="none" />
              <path d="M48 128 Q100 160 152 128" stroke="url(#balGoldBunting)" strokeWidth="2.5" fill="none" />
              <polygon points="72,110 82,111 77,122" fill="#facc15" />
              <polygon points="98,116 108,116 103,128" fill="#f472b6" />
              <polygon points="123,111 133,110 128,122" fill="#c084fc" />
            </g>

            {/* Wicker Ropes */}
            <line x1="92" y1="190" x2="88" y2="218" stroke="#ca8a04" strokeWidth="2" />
            <line x1="108" y1="190" x2="112" y2="218" stroke="#ca8a04" strokeWidth="2" />

            {/* Basket */}
            <rect x="82" y="216" width="36" height="24" rx="4" fill="#fff" stroke="#ca8a04" strokeWidth="2" />
            <rect x="84" y="218" width="32" height="20" rx="3" fill="#f5e6c8" />
            <circle cx="100" cy="228" r="3" fill="#ec4899" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Layer 3 (Foreground Z: 55px): Fluffy Clouds & Mini Dove */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 55 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.18)}
        className="absolute bottom-1 w-52 flex items-end justify-between pointer-events-none"
      >
        <motion.div animate={folded ? {} : { x: [-1.5, 1.5, -1.5] }} transition={{ duration: 4.5, repeat: Infinity }} className="filter drop-shadow-sm">
          <svg width="65" height="32" viewBox="0 0 140 65" fill="none">
            <path d="M15 55 Q0 55 8 38 Q15 18 35 22 Q50 4 75 15 Q100 10 110 32 Q125 55 90 55Z" fill="#ffffff" stroke="#d8b4fe" strokeWidth="2.5" />
            <path d="M18 53 Q5 53 11 40 Q17 22 35 25 Q48 10 72 20 Q95 15 105 34 Q118 53 88 53Z" fill="#faf5ff" />
          </svg>
        </motion.div>

        <div className="relative">
          <motion.div animate={folded ? {} : { x: [1.5, -1.5, 1.5] }} transition={{ duration: 5, repeat: Infinity }} className="filter drop-shadow-sm">
            <svg width="65" height="32" viewBox="0 0 140 65" fill="none">
              <path d="M15 55 Q0 55 8 38 Q15 18 35 22 Q50 4 75 15 Q100 10 110 32 Q125 55 90 55Z" fill="#ffffff" stroke="#d8b4fe" strokeWidth="2.5" />
              <path d="M18 53 Q5 53 11 40 Q17 22 35 25 Q48 10 72 20 Q95 15 105 34 Q118 53 88 53Z" fill="#fdf4ff" />
            </svg>
          </motion.div>
          <motion.div
            animate={folded ? {} : { y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 right-2 filter drop-shadow-xs"
          >
            <svg width="24" height="16" viewBox="0 0 50 35" fill="none">
              <path d="M8 22 Q14 12 24 12 Q32 4 42 8 Q38 18 28 20 Q23 25 8 22Z" fill="#fff" stroke="#c084fc" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── SCENE 4: Princess Swan Lake, Floral Fountain & Heart Arch ─────────── */
export function SwanLakeScene({ folded }) {
  const rx = folded ? -90 : 0;
  const op = folded ? 0 : 1;

  return (
    <div
      className={`absolute inset-0 pointer-events-none flex items-end justify-center overflow-visible z-20 transition-opacity duration-300 ${
        folded ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ perspective: 1600, transformStyle: 'preserve-3d' }}
    >
      {/* Crease Ground Shadow */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-52 h-5 rounded-full bg-purple-950/25 blur-md pointer-events-none"
        animate={{ scaleX: folded ? 0.1 : 1, opacity: folded ? 0 : 0.7 }}
        transition={{ duration: folded ? 0.22 : 0.5 }}
      />

      {/* Layer 1 (Back Z: 14px): Weeping Willow Arch & Starry Fireflies */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 14 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.04)}
        className="absolute bottom-10 w-52 flex justify-center pointer-events-none"
      >
        <svg width="150" height="90" viewBox="0 0 280 160" fill="none" className="filter drop-shadow-sm">
          <path d="M40 160 C30 80 80 20 140 20 C200 20 250 80 240 160" stroke="#a855f7" strokeWidth="2.5" fill="none" opacity="0.6" />
          {/* Hanging Wisteria Vines */}
          <path d="M80 50 Q75 90 70 120" stroke="#c084fc" strokeWidth="3" strokeDasharray="4 3" fill="none" />
          <path d="M110 32 Q105 80 100 115" stroke="#f472b6" strokeWidth="3" strokeDasharray="4 3" fill="none" />
          <path d="M170 32 Q175 80 180 115" stroke="#f472b6" strokeWidth="3" strokeDasharray="4 3" fill="none" />
          <path d="M200 50 Q205 90 210 120" stroke="#c084fc" strokeWidth="3" strokeDasharray="4 3" fill="none" />
          {/* Golden Fireflies */}
          <circle cx="95" cy="70" r="2.5" fill="#fde047" className="animate-pulse" />
          <circle cx="140" cy="45" r="3" fill="#fde047" className="animate-pulse" />
          <circle cx="185" cy="70" r="2.5" fill="#fde047" className="animate-pulse" />
        </svg>
      </motion.div>

      {/* Layer 2 (Middle Z: 38px): 3-Tiered Gilded Marble Royal Fountain */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 38 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.12)}
        className="relative mb-2 drop-shadow-[0_15px_22px_rgba(59,7,100,0.38)] pointer-events-none"
      >
        <motion.div
          animate={folded ? {} : { y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="140" height="115" viewBox="0 0 260 210" fill="none" className="drop-shadow-lg">
            <defs>
              <linearGradient id="fountainGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
              <linearGradient id="waterLilac" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#faf5ff" />
                <stop offset="50%" stopColor="#d8b4fe" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>

            {/* White Paper Cutout Rim */}
            <path
              d="M45 200 C45 160 85 160 90 140 C80 135 70 120 85 110 C90 100 100 90 110 80 L115 50 C110 40 120 30 130 20 L130 10 L135 5 L140 10 L140 20 C150 30 160 40 155 50 L160 80 C170 90 180 100 185 110 C200 120 190 135 180 140 C185 160 225 160 225 200Z"
              fill="#ffffff"
              stroke="#e9d5ff"
              strokeWidth="4"
            />

            {/* Bottom Basin */}
            <ellipse cx="130" cy="180" rx="85" ry="24" fill="url(#fountainGold)" stroke="#ca8a04" strokeWidth="2" />
            <ellipse cx="130" cy="178" rx="78" ry="19" fill="url(#waterLilac)" />
            
            {/* Middle Pedestal & Basin */}
            <rect x="122" y="125" width="16" height="40" fill="url(#fountainGold)" />
            <ellipse cx="130" cy="125" rx="55" ry="16" fill="url(#fountainGold)" stroke="#ca8a04" strokeWidth="1.8" />
            <ellipse cx="130" cy="123" rx="49" ry="12" fill="url(#waterLilac)" />

            {/* Top Pedestal & Basin */}
            <rect x="124" y="80" width="12" height="35" fill="url(#fountainGold)" />
            <ellipse cx="130" cy="80" rx="32" ry="10" fill="url(#fountainGold)" stroke="#ca8a04" strokeWidth="1.5" />
            <ellipse cx="130" cy="78" rx="27" ry="7" fill="url(#waterLilac)" />

            {/* Spouting Water Jets & Cherub Crown */}
            <path d="M130 70 C125 45 115 40 95 65" stroke="#faf5ff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
            <path d="M130 70 C135 45 145 40 165 65" stroke="#faf5ff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
            <path d="M130 65 V28" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
            <circle cx="130" cy="24" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <path d="M125 18 L130 10 L135 18Z" fill="#ec4899" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Layer 3 (Foreground Z: 62px): Graceful Twin Swans Forming Heart */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 62 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.2)}
        className="absolute bottom-0 w-52 flex items-end justify-between pointer-events-none"
      >
        {/* Left Princess Swan */}
        <motion.div
          animate={folded ? {} : { y: [0, -3, 0], x: [0, 1.5, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          className="filter drop-shadow-sm"
        >
          <svg width="55" height="42" viewBox="0 0 100 80" fill="none">
            <path d="M70 70 C45 70 30 60 25 48 C20 38 28 25 35 30 C45 38 55 52 70 52 C85 52 92 60 88 68 C84 72 78 70 70 70Z" fill="#ffffff" stroke="#d8b4fe" strokeWidth="2" />
            {/* Curved Neck forming left half of heart */}
            <path d="M30 35 C25 25 30 10 42 10 C50 10 52 18 48 24 C44 30 38 42 42 55" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M30 35 C25 25 30 10 42 10 C50 10 52 18 48 24 C44 30 38 42 42 55" stroke="#d8b4fe" strokeWidth="1.5" fill="none" />
            <circle cx="48" cy="14" r="1.5" fill="#3b0764" />
            <polygon points="52,14 58,16 52,18" fill="#f97316" />
            {/* Mini Tiara */}
            <path d="M42 8 L44 4 L46 7 L48 4 L50 8Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Right Princess Swan */}
        <motion.div
          animate={folded ? {} : { y: [0, -3, 0], x: [0, -1.5, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          className="filter drop-shadow-sm"
        >
          <svg width="55" height="42" viewBox="0 0 100 80" fill="none">
            <path d="M30 70 C55 70 70 60 75 48 C80 38 72 25 65 30 C55 38 45 52 30 52 C15 52 8 60 12 68 C16 72 22 70 30 70Z" fill="#ffffff" stroke="#d8b4fe" strokeWidth="2" />
            {/* Curved Neck forming right half of heart */}
            <path d="M70 35 C75 25 70 10 58 10 C50 10 48 18 52 24 C56 30 62 42 58 55" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M70 35 C75 25 70 10 58 10 C50 10 48 18 52 24 C56 30 62 42 58 55" stroke="#d8b4fe" strokeWidth="1.5" fill="none" />
            <circle cx="52" cy="14" r="1.5" fill="#3b0764" />
            <polygon points="48,14 42,16 48,18" fill="#f97316" />
            {/* Mini Tiara */}
            <path d="M50 8 L52 4 L54 7 L56 4 L58 8Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── SCENE 5: Royal Crown Gazebo, Floating Lanterns & Songbirds ─────────── */
export function CrownGazeboScene({ folded }) {
  const rx = folded ? -90 : 0;
  const op = folded ? 0 : 1;

  return (
    <div
      className={`absolute inset-0 pointer-events-none flex items-end justify-center overflow-visible z-20 transition-opacity duration-300 ${
        folded ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ perspective: 1600, transformStyle: 'preserve-3d' }}
    >
      {/* Crease Ground Shadow */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-52 h-5 rounded-full bg-purple-950/25 blur-md pointer-events-none"
        animate={{ scaleX: folded ? 0.1 : 1, opacity: folded ? 0 : 0.7 }}
        transition={{ duration: folded ? 0.22 : 0.5 }}
      />

      {/* Layer 1 (Back Z: 14px): Glowing Sky Lanterns Ascending to Stars */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 14 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.04)}
        className="absolute bottom-10 w-52 flex justify-center pointer-events-none"
      >
        <motion.div
          animate={folded ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-16 -left-2"
        >
          {/* Amber Floating Lantern */}
          <div className="w-5 h-7 rounded-t-sm bg-gradient-to-b from-amber-200 to-amber-500 shadow-[0_0_12px_rgba(251,191,36,0.8)] border border-amber-300 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>
        </motion.div>

        <motion.div
          animate={folded ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 0.8, ease: 'easeInOut' }}
          className="absolute -top-20 right-2"
        >
          <div className="w-6 h-8 rounded-t-sm bg-gradient-to-b from-pink-200 via-amber-300 to-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.9)] border border-amber-300 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
        </motion.div>
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-16 right-16 text-amber-300 text-sm font-bold">✦</motion.div>
      </motion.div>

      {/* Layer 2 (Middle Z: 40px): Royal Princess Crown Gazebo Rotunda */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 40 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.12)}
        className="relative mb-2 drop-shadow-[0_15px_22px_rgba(59,7,100,0.4)] pointer-events-none"
      >
        <motion.div
          animate={folded ? {} : { y: [0, -3.5, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="150" height="125" viewBox="0 0 280 230" fill="none" className="drop-shadow-lg">
            <defs>
              <linearGradient id="gazeboGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
              <linearGradient id="gazeboDomeLilac" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#fdf4ff" />
                <stop offset="100%" stopColor="#d8b4fe" />
              </linearGradient>
            </defs>

            {/* White Paper Cutout Rim */}
            <path
              d="M30 220 L30 130 L60 80 L140 20 L220 80 L250 130 L250 220Z"
              fill="#ffffff"
              stroke="#e9d5ff"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Domed Trellis Roof */}
            <path d="M45 100 C45 40 235 40 235 100Z" fill="url(#gazeboDomeLilac)" stroke="url(#gazeboGold)" strokeWidth="2.5" />
            <path d="M140 40 V100" stroke="url(#gazeboGold)" strokeWidth="1.8" />
            <path d="M90 55 C95 80 105 95 110 100" stroke="url(#gazeboGold)" strokeWidth="1.5" fill="none" />
            <path d="M190 55 C185 80 175 95 170 100" stroke="url(#gazeboGold)" strokeWidth="1.5" fill="none" />

            {/* Majestic 5-Point Princess Tiara on Top */}
            <g transform="translate(100, 5)">
              <polygon points="40,2 48,15 56,8 64,22 72,12 80,30 0,30 8,12 16,22 24,8 32,15" fill="url(#gazeboGold)" stroke="#a16207" strokeWidth="1.5" />
              <circle cx="40" cy="5" r="3.5" fill="#ec4899" />
              <circle cx="16" cy="14" r="2.5" fill="#9333ea" />
              <circle cx="64" cy="14" r="2.5" fill="#9333ea" />
              <circle cx="0" cy="22" r="2" fill="#facc15" />
              <circle cx="80" cy="22" r="2" fill="#facc15" />
            </g>

            {/* Elegant Fluted Columns */}
            {[55, 95, 140, 185, 225].map((colX, idx) => (
              <g key={idx}>
                {/* Capital */}
                <rect x={colX - 7} y="100" width="14" height="6" rx="1" fill="url(#gazeboGold)" />
                {/* Shaft */}
                <rect x={colX - 4} y="106" width="8" height="98" fill="#ffffff" stroke="#d8b4fe" strokeWidth="1" />
                {/* Base */}
                <rect x={colX - 7} y="204" width="14" height="6" rx="1" fill="url(#gazeboGold)" />
              </g>
            ))}

            {/* Chandelier in Center */}
            <g transform="translate(132, 106)">
              <line x1="8" y1="0" x2="8" y2="18" stroke="#ca8a04" strokeWidth="1.5" />
              <circle cx="8" cy="22" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" className="animate-pulse" />
              <circle cx="2" cy="24" r="2.5" fill="#fde047" />
              <circle cx="14" cy="24" r="2.5" fill="#fde047" />
            </g>

            {/* Rose & Wisteria Garland on Eaves */}
            <path d="M45 100 Q140 120 235 100" stroke="#16a34a" strokeWidth="3" fill="none" />
            {[65, 95, 125, 155, 185, 215].map((gx, i) => (
              <circle key={i} cx={gx} cy="106 + Math.sin(i) * 2" r="3.5" fill={i % 2 === 0 ? "#f472b6" : "#c084fc"} />
            ))}

            {/* Floor Plinth */}
            <rect x="35" y="210" width="210" height="12" rx="3" fill="url(#gazeboDomeLilac)" stroke="url(#gazeboGold)" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Layer 3 (Foreground Z: 65px): Two Songbirds with Golden Garland */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 65 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.2)}
        className="absolute bottom-1 w-52 flex items-end justify-between pointer-events-none"
      >
        {/* Left Fairy Bluebird */}
        <motion.div
          animate={folded ? {} : { y: [-2, 2, -2] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="filter drop-shadow-sm"
        >
          <svg width="38" height="28" viewBox="0 0 60 45" fill="none">
            <path d="M12 28 C18 18 30 18 38 22 C46 16 52 14 55 18 C52 26 42 32 32 32 C22 32 15 35 12 28Z" fill="#60a5fa" stroke="#2563eb" strokeWidth="1.5" />
            <circle cx="48" cy="20" r="1.5" fill="#1e3a8a" />
            <polygon points="53,20 58,22 53,24" fill="#f97316" />
            <path d="M25 24 Q35 15 38 26" stroke="#93c5fd" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>

        {/* Right Princess Songbird (Pink Finch) */}
        <motion.div
          animate={folded ? {} : { y: [2, -2, 2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="filter drop-shadow-sm"
        >
          <svg width="38" height="28" viewBox="0 0 60 45" fill="none">
            <path d="M48 28 C42 18 30 18 22 22 C14 16 8 14 5 18 C8 26 18 32 28 32 C38 32 45 35 48 28Z" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
            <circle cx="12" cy="20" r="1.5" fill="#831843" />
            <polygon points="7,20 2,22 7,24" fill="#f97316" />
            <path d="M35 24 Q25 15 22 26" stroke="#fbcfe8" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function PopUpElement({ type, spreadIndex, folded }) {
  // If spreadIndex is provided, dynamically cycle through all 5 unique scenes:
  // Spread 1 (Pages 1-2): castle (The Fairytale Royal Palace - for Appa & Amma)
  // Spread 2 (Pages 3-4): carriage (The Enchanted Princess Carriage & Steeds)
  // Spread 3 (Pages 5-6): balloon (The Celestial Hot Air Balloon & Starry Skies)
  // Spread 4 (Pages 7-8): swan (The Princess Swan Lake & Gilded Fountain - for Girls Trio & The Boys)
  // Spread 5 (Pages 9-10): gazebo (The Royal Crown Gazebo & Sky Lanterns - grand finale spread)
  let activeScene = type;

  if (!activeScene && typeof spreadIndex === 'number') {
    const sceneOrder = ['castle', 'carriage', 'balloon', 'swan', 'gazebo'];
    const idx = (spreadIndex - 1 + sceneOrder.length) % sceneOrder.length;
    activeScene = sceneOrder[idx];
  }

  switch (activeScene) {
    case 'castle':
      return <CastleScene folded={folded} />;
    case 'carriage':
      return <CarriageScene folded={folded} />;
    case 'balloon':
      return <BalloonScene folded={folded} />;
    case 'swan':
      return <SwanLakeScene folded={folded} />;
    case 'gazebo':
      return <CrownGazeboScene folded={folded} />;
    default:
      return <CastleScene folded={folded} />;
  }
}

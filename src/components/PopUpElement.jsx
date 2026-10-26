import React from 'react';
import { motion } from 'framer-motion';

/*
 * PopUpElement:
 * Realistic mechanical 3D pop-up origami book physics.
 * Compact & scaled down to sit elegantly along the center crease / spine gutter,
 * completely clear of the left and right page reading areas, video frames, and message cards.
 *
 * Fold mechanics:
 * When folding DOWN: fast transition (0.28s) so it tucks flat into the crease
 * BEFORE the physical page leaf flips over it!
 * When unfolding UP: smooth spring animation (0.6s) with slight delay
 * after the page lands flat!
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

/* ─── SCENE 1: Lilac Hot Air Balloon, Celestial Clouds & Golden Stars ─────── */
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
      {/* Paper Hinge Crease Shadow (Compact) */}
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
        {/* Crescent Moon */}
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

        {/* Small Golden Twinkling Constellations */}
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-16 right-5 text-amber-300 text-sm font-bold">✦</motion.div>
        <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          className="absolute -top-12 left-10 text-purple-300 text-xs">★</motion.div>
      </motion.div>

      {/* Layer 2 (Middle Z: 35px): Compact 3D Lilac Hot Air Balloon */}
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
          {/* Scaled down to ~105px wide by ~135px tall */}
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
            <line x1="84" y1="225" x2="116" y2="225" stroke="#a16207" strokeWidth="1" opacity="0.6" />
            <line x1="84" y1="232" x2="116" y2="232" stroke="#a16207" strokeWidth="1" opacity="0.6" />
            <circle cx="100" cy="228" r="3" fill="#ec4899" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Layer 3 (Foreground Z: 55px): Compact Fluffy Clouds & Dove */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 55 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.18)}
        className="absolute bottom-1 w-52 flex items-end justify-between pointer-events-none"
      >
        {/* Left Cloud */}
        <motion.div animate={folded ? {} : { x: [-1.5, 1.5, -1.5] }} transition={{ duration: 4.5, repeat: Infinity }} className="filter drop-shadow-sm">
          <svg width="65" height="32" viewBox="0 0 140 65" fill="none">
            <path
              d="M15 55 Q0 55 8 38 Q15 18 35 22 Q50 4 75 15 Q100 10 110 32 Q125 55 90 55Z"
              fill="#ffffff"
              stroke="#d8b4fe"
              strokeWidth="2.5"
            />
            <path
              d="M18 53 Q5 53 11 40 Q17 22 35 25 Q48 10 72 20 Q95 15 105 34 Q118 53 88 53Z"
              fill="#faf5ff"
            />
          </svg>
        </motion.div>

        {/* Right Cloud with Mini Dove */}
        <div className="relative">
          <motion.div animate={folded ? {} : { x: [1.5, -1.5, 1.5] }} transition={{ duration: 5, repeat: Infinity }} className="filter drop-shadow-sm">
            <svg width="65" height="32" viewBox="0 0 140 65" fill="none">
              <path
                d="M15 55 Q0 55 8 38 Q15 18 35 22 Q50 4 75 15 Q100 10 110 32 Q125 55 90 55Z"
                fill="#ffffff"
                stroke="#d8b4fe"
                strokeWidth="2.5"
              />
              <path
                d="M18 53 Q5 53 11 40 Q17 22 35 25 Q48 10 72 20 Q95 15 105 34 Q118 53 88 53Z"
                fill="#fdf4ff"
              />
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

/* ─── SCENE 2: Disney Fairytale Castle, Galloping Horses & Blooming Lilies ─── */
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
      {/* Crease Ground Shadow (Compact) */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-52 h-5 rounded-full bg-purple-950/25 blur-md pointer-events-none"
        animate={{ scaleX: folded ? 0.1 : 1, opacity: folded ? 0 : 0.7 }}
        transition={{ duration: folded ? 0.22 : 0.5 }}
      />

      {/* Layer 1 (Back Z: 15px): Compact Celestial Gold Spires */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 15 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.04)}
        className="absolute bottom-8 flex justify-center pointer-events-none"
      >
        {/* Scaled down to ~145px wide */}
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

      {/* Layer 2 (Middle Z: 40px): Compact Disney Fairytale Castle Main Keep */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 40 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.12)}
        className="relative mb-2 drop-shadow-[0_15px_22px_rgba(59,7,100,0.4)] pointer-events-none"
      >
        {/* Scaled down to ~150px wide by ~115px tall */}
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

      {/* Layer 3 (Foreground Action Z: 65px): Compact Stallion & Pegasus Nestled by Gate */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 65 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.18)}
        className="absolute bottom-1 w-56 flex items-end justify-between pointer-events-none"
      >
        {/* Left Mini Rearing Stallion */}
        <motion.div
          className="filter drop-shadow-[0_8px_10px_rgba(40,5,50,0.4)]"
          animate={folded ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Scaled down to ~65px wide by ~55px tall */}
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
            <path d="M50 52 L40 64 L36 75" stroke="url(#horseWhiteGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="36" cy="75" r="2.5" fill="#ca8a04" />
            <path d="M84 68 L87 90 L85 105" stroke="url(#horseWhiteGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <rect x="80" y="103" width="9" height="4" rx="2" fill="#ca8a04" />
            <path d="M97 62 Q115 68 110 90 Q106 100 100 108" stroke="url(#horseManeLilac)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M62 42 Q75 40 85 47 L82 57 Q75 55 64 55Z" fill="#9333ea" stroke="#ca8a04" strokeWidth="1.2" />
          </svg>
        </motion.div>

        {/* Right Mini Winged Pegasus */}
        <motion.div
          className="filter drop-shadow-[0_8px_10px_rgba(40,5,50,0.4)]"
          animate={folded ? {} : { y: [-3, 3, -3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Scaled down to ~70px wide by ~55px tall */}
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
            <g className="filter drop-shadow-xs">
              <path
                d="M62 42 C52 18 30 8 12 10 C8 22 20 36 38 40 C48 42 58 42 62 42Z"
                fill="#ffffff"
                stroke="#d8b4fe"
                strokeWidth="1.8"
              />
              <path d="M22 18 Q42 28 58 40" stroke="#c084fc" strokeWidth="1.2" fill="none" />
            </g>
            <path d="M78 10 C70 8 64 16 66 24 C60 22 55 30 58 38" stroke="url(#horseManeLilac)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M95 50 L108 68 L112 80" stroke="url(#horseWhiteGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="112" cy="80" r="3" fill="#ca8a04" />
            <path d="M52 68 L48 90 L50 105" stroke="url(#horseWhiteGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <rect x="45" y="103" width="9" height="4" rx="2" fill="#ca8a04" />
            <path d="M38 62 Q20 68 25 90 Q28 100 35 108" stroke="url(#horseManeLilac)" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Layer 4 (Foreground Fold Z: 80px): Compact Blooming Lilies & Butterfly */}
      <motion.div
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', translateZ: 80 }}
        animate={{ rotateX: rx, opacity: op }}
        transition={getFoldTransition(folded, 0.24)}
        className="absolute bottom-0 w-44 flex items-end justify-between pointer-events-none"
      >
        <div className="relative filter drop-shadow-xs">
          <svg width="45" height="28" viewBox="0 0 90 55" fill="none">
            <path d="M15 55 Q5 30 25 18 Q40 5 50 25 Q60 8 75 18 Q85 30 75 55Z" fill="#fff" stroke="#a855f7" strokeWidth="1.8" />
            <circle cx="50" cy="30" r="3.5" fill="#facc15" />
          </svg>
          <span className="absolute -top-3 left-4 text-xs">🦋</span>
        </div>

        <div className="relative filter drop-shadow-xs">
          <svg width="45" height="28" viewBox="0 0 90 55" fill="none">
            <path d="M15 55 Q5 30 25 18 Q40 5 50 25 Q60 8 75 18 Q85 30 75 55Z" fill="#fff" stroke="#f472b6" strokeWidth="1.8" />
            <circle cx="50" cy="32" r="6" fill="#f472b6" />
          </svg>
          <span className="absolute -top-3 right-4 text-xs">🌸</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function PopUpElement({ type, folded }) {
  if (type === 'balloon') return <BalloonScene folded={folded} />;
  if (type === 'castle') return <CastleScene folded={folded} />;
  return null;
}

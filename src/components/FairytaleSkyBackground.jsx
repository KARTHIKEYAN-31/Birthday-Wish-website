import React from 'react';
import { motion } from 'framer-motion';

/*
 * FairytaleSkyBackground:
 * Enchanting Disney Princess Fairytale Night Sky:
 * - Glowing celestial crescent moon with golden aura and soft starlight.
 * - Multi-layered shimmering stars, constellations, and diamond sparkles.
 * - Asymmetrical, randomly distributed storybook clouds of varying sizes and heights.
 * - Subtle shooting star gliding across the twilight sky.
 */

// Randomly and naturally distributed stars across the sky
const STARS = [
  // Upper sky left
  { id: 1, top: '5%', left: '7%', size: 16, type: 'sparkle', dur: 2.8, delay: 0.2, color: '#fef08a' },
  { id: 2, top: '14%', left: '18%', size: 10, type: 'diamond', dur: 3.4, delay: 0.8, color: '#e9d5ff' },
  { id: 3, top: '19%', left: '5%', size: 8, type: 'dot', dur: 2.2, delay: 1.5, color: '#fff' },
  { id: 4, top: '7%', left: '27%', size: 14, type: 'star', dur: 4.0, delay: 0.5, color: '#fde047' },
  { id: 5, top: '23%', left: '21%', size: 9, type: 'diamond', dur: 2.6, delay: 1.2, color: '#fbcfe8' },

  // Center upper sky
  { id: 6, top: '6%', left: '39%', size: 12, type: 'dot', dur: 3.1, delay: 0.4, color: '#fff' },
  { id: 7, top: '12%', left: '54%', size: 15, type: 'sparkle', dur: 3.6, delay: 1.1, color: '#fef08a' },
  { id: 8, top: '8%', left: '62%', size: 8, type: 'dot', dur: 2.5, delay: 0.9, color: '#e9d5ff' },

  // Upper sky right (around moon)
  { id: 9, top: '15%', left: '71%', size: 18, type: 'sparkle', dur: 2.9, delay: 0.3, color: '#fef08a' },
  { id: 10, top: '5%', left: '85%', size: 11, type: 'star', dur: 3.8, delay: 1.4, color: '#fef08a' },
  { id: 11, top: '21%', left: '93%', size: 14, type: 'diamond', dur: 2.4, delay: 0.7, color: '#e9d5ff' },
  { id: 12, top: '32%', left: '81%', size: 9, type: 'dot', dur: 3.3, delay: 1.8, color: '#fff' },

  // Mid sky left flank
  { id: 13, top: '37%', left: '4%', size: 15, type: 'sparkle', dur: 3.2, delay: 0.6, color: '#fef08a' },
  { id: 14, top: '49%', left: '11%', size: 10, type: 'diamond', dur: 2.7, delay: 1.3, color: '#fbcfe8' },
  { id: 15, top: '58%', left: '6%', size: 12, type: 'dot', dur: 3.5, delay: 0.2, color: '#fff' },
  { id: 16, top: '69%', left: '13%', size: 14, type: 'star', dur: 4.2, delay: 1.0, color: '#fde047' },

  // Mid sky right flank
  { id: 17, top: '41%', left: '89%', size: 16, type: 'sparkle', dur: 3.0, delay: 0.5, color: '#fef08a' },
  { id: 18, top: '53%', left: '83%', size: 10, type: 'diamond', dur: 2.8, delay: 1.6, color: '#e9d5ff' },
  { id: 19, top: '64%', left: '94%', size: 8, type: 'dot', dur: 3.6, delay: 0.8, color: '#fff' },
  { id: 20, top: '74%', left: '85%', size: 13, type: 'sparkle', dur: 3.1, delay: 1.2, color: '#fef08a' },

  // Lower sky corners
  { id: 21, top: '83%', left: '9%', size: 12, type: 'diamond', dur: 2.9, delay: 0.4, color: '#e9d5ff' },
  { id: 22, top: '91%', left: '17%', size: 9, type: 'dot', dur: 3.7, delay: 1.5, color: '#fff' },
  { id: 23, top: '85%', left: '78%', size: 14, type: 'sparkle', dur: 3.3, delay: 0.9, color: '#fef08a' },
  { id: 24, top: '93%', left: '91%', size: 10, type: 'dot', dur: 2.6, delay: 1.7, color: '#fbcfe8' },
];

export default function FairytaleSkyBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">

      {/* ── 1. The Glowing Celestial Crescent Moon (Top-Right) ─────── */}
      <div className="absolute top-10 right-10 sm:right-20 md:right-28 pointer-events-none z-10">
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            opacity: [0.95, 1, 0.95],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center"
        >
          {/* Luminous Golden-Lilac Moon Aura Glow */}
          <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-amber-300/35 via-purple-300/25 to-pink-300/15 blur-2xl pointer-events-none" />
          <div className="absolute -inset-4 rounded-full bg-amber-200/40 blur-xl pointer-events-none" />

          {/* Crescent Moon SVG */}
          <svg width="84" height="84" viewBox="0 0 100 100" fill="none" className="relative filter drop-shadow-[0_0_15px_rgba(254,240,138,0.8)]">
            <defs>
              <linearGradient id="moonGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#fffbeb" />
                <stop offset="65%" stopColor="#fef08a" />
                <stop offset="90%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>

            {/* Main Crescent Body */}
            <path
              d="M50 8 C25 8 8 28 8 52 C8 76 25 96 50 96 C30 84 22 68 22 52 C22 36 30 20 50 8 Z"
              fill="url(#moonGoldGrad)"
              stroke="#ca8a04"
              strokeWidth="2"
            />

            {/* Inner Highlight */}
            <path
              d="M46 14 C28 24 24 38 24 52 C24 66 28 80 46 90 C32 78 26 66 26 52 C26 38 32 26 46 14 Z"
              fill="#ffffff"
              opacity="0.65"
            />

            {/* Subtle Craters */}
            <circle cx="26" cy="42" r="3.5" fill="#ca8a04" opacity="0.3" />
            <circle cx="22" cy="56" r="2.5" fill="#ca8a04" opacity="0.35" />
            <circle cx="29" cy="68" r="3" fill="#ca8a04" opacity="0.25" />
          </svg>

          {/* Golden Starburst Resting Near the Horn of the Moon */}
          <motion.div
            animate={{
              rotate: [0, 90, 180, 270, 360],
              scale: [0.85, 1.15, 0.85],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute -top-3 -right-2 text-amber-200 text-xl font-bold filter drop-shadow-[0_0_8px_rgba(254,240,138,0.9)]"
          >
            ✦
          </motion.div>
        </motion.div>
      </div>

      {/* ── 2. Randomly & Asymmetrically Arranged Storybook Clouds ─── */}

      {/* Cloud 1: Large Majestic Storybook Cloud (Upper-Left Corner, 270x110) */}
      <motion.div
        animate={{
          x: [-18, 14, -18],
          y: [-4, 3, -4],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[3%] left-[1%] sm:left-[3%] opacity-50 filter drop-shadow-[0_12px_24px_rgba(59,7,100,0.4)] pointer-events-none"
      >
        <svg width="270" height="110" viewBox="0 0 270 110" fill="none">
          <path
            d="M25 92 Q0 92 12 70 Q5 38 40 44 Q62 12 108 22 Q148 6 182 34 Q222 28 238 62 Q266 78 248 95 Q215 106 135 100 Q68 106 25 92Z"
            fill="url(#cloudGradLilac)"
          />
        </svg>
      </motion.div>

      {/* Cloud 2: Delicate Wispy Cloud Nestled Under the Moon (Upper-Right, 155x65) */}
      <motion.div
        animate={{
          x: [8, -12, 8],
          y: [2, -3, 2],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[25%] right-[5%] sm:right-[7%] opacity-45 filter drop-shadow-[0_8px_16px_rgba(59,7,100,0.35)] pointer-events-none"
      >
        <svg width="155" height="65" viewBox="0 0 160 70" fill="none">
          <path
            d="M15 58 Q0 58 10 42 Q6 24 30 28 Q48 10 75 16 Q100 7 120 22 Q144 17 154 37 Q170 48 158 58 Q138 64 88 62 Q44 64 15 58Z"
            fill="url(#cloudGradLilac)"
          />
        </svg>
      </motion.div>

      {/* Cloud 3: Long Storybook Stratus Drifting High Center (Top 10%, Left 43%, 195x65) */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 29,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[10%] left-[38%] sm:left-[43%] opacity-35 filter drop-shadow-[0_8px_18px_rgba(59,7,100,0.3)] pointer-events-none hidden sm:block"
      >
        <svg width="195" height="65" viewBox="0 0 200 70" fill="none">
          <path
            d="M18 55 Q0 55 12 40 Q8 22 34 26 Q54 8 82 14 Q110 6 130 20 Q158 16 172 36 Q190 46 178 56 Q156 62 100 60 Q50 62 18 55Z"
            fill="url(#cloudGradLilac)"
          />
        </svg>
      </motion.div>

      {/* Cloud 4: Cute Fluffy Puff in Mid-Upper Left (Top 30%, Left 14%, 115x50) */}
      <motion.div
        animate={{
          x: [6, -10, 6],
          y: [-2, 2, -2],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[30%] left-[10%] sm:left-[14%] opacity-40 filter drop-shadow-[0_6px_12px_rgba(59,7,100,0.3)] pointer-events-none"
      >
        <svg width="115" height="50" viewBox="0 0 120 55" fill="none">
          <path
            d="M12 44 Q0 44 8 32 Q4 18 24 22 Q38 8 60 12 Q80 6 94 18 Q110 14 116 30 Q128 38 118 45 Q104 50 64 48 Q32 50 12 44Z"
            fill="url(#cloudGradLilac)"
          />
        </svg>
      </motion.div>

      {/* Cloud 5: Whimsical Mid-Lower Flank Cloud on Right (Top 61%, Right 9%, 215x85) */}
      <motion.div
        animate={{
          x: [-14, 12, -14],
          y: [3, -3, 3],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[61%] right-[5%] sm:right-[9%] opacity-38 filter drop-shadow-[0_10px_22px_rgba(59,7,100,0.35)] pointer-events-none"
      >
        <svg width="215" height="85" viewBox="0 0 220 90" fill="none">
          <path
            d="M18 72 Q0 72 10 52 Q6 28 34 32 Q54 10 88 18 Q120 8 142 26 Q174 20 188 46 Q206 58 192 72 Q168 80 110 76 Q54 80 18 72Z"
            fill="url(#cloudGradLilac)"
          />
        </svg>
      </motion.div>

      {/* Cloud 6: Small Low Floating Puff on Left Flank (Top 73%, Left 5%, 140x60) */}
      <motion.div
        animate={{
          x: [10, -8, 10],
          y: [-2, 2, -2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[73%] left-[3%] sm:left-[6%] opacity-35 filter drop-shadow-[0_8px_16px_rgba(59,7,100,0.3)] pointer-events-none"
      >
        <svg width="140" height="60" viewBox="0 0 150 65" fill="none">
          <path
            d="M14 52 Q0 52 10 38 Q6 22 28 25 Q44 9 70 14 Q94 7 110 21 Q130 16 140 34 Q154 44 142 53 Q124 59 78 57 Q38 59 14 52Z"
            fill="url(#cloudGradLilac)"
          />
        </svg>
      </motion.div>

      {/* Cloud 7: Asymmetrical Horizon Mist Layer (Bottom-Right Corner Only, 340x95) */}
      <div className="absolute bottom-0 right-[-3%] sm:right-0 w-[300px] sm:w-[350px] opacity-30 pointer-events-none">
        <svg viewBox="0 0 350 100" fill="none" className="w-full h-auto">
          <path
            d="M0 100 Q40 40 100 55 Q160 25 220 45 Q280 30 320 65 Q345 78 350 100 Z"
            fill="url(#cloudGradLilac)"
          />
        </svg>
      </div>

      {/* ── 3. Shooting Star (Ethereal Fairytale Meteor) ──────────── */}
      <div className="absolute top-9 left-[22%] w-44 pointer-events-none opacity-85 shooting-star-path" />

      {/* ── 4. Twinkling Fairytale Stars & Constellations ──────────── */}
      {STARS.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            color: s.color,
          }}
          animate={{
            scale: [0.75, 1.25, 0.75],
            opacity: [0.35, 1, 0.35],
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
          className="pointer-events-none flex items-center justify-center filter drop-shadow-[0_0_6px_rgba(254,240,138,0.7)]"
        >
          {s.type === 'sparkle' && (
            <span style={{ fontSize: `${s.size}px` }} className="font-bold">✦</span>
          )}
          {s.type === 'diamond' && (
            <span style={{ fontSize: `${s.size}px` }} className="font-bold">✧</span>
          )}
          {s.type === 'star' && (
            <span style={{ fontSize: `${s.size}px` }}>★</span>
          )}
          {s.type === 'dot' && (
            <div 
              style={{
                width: `${s.size * 0.45}px`,
                height: `${s.size * 0.45}px`,
                backgroundColor: s.color,
              }}
              className="rounded-full shadow-[0_0_6px_rgba(255,255,255,0.9)]"
            />
          )}
        </motion.div>
      ))}

      {/* ── SVG Gradients Definition ──────────────────────────────── */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="cloudGradLilac" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
            <stop offset="40%" stopColor="#faf5ff" stopOpacity="0.7" />
            <stop offset="75%" stopColor="#e9d5ff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

    </div>
  );
}

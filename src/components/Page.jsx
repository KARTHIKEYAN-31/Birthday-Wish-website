import React from 'react';
import MagicalVideoFrame from './MagicalVideoFrame';
import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Page({
  pageNumber,
  position = 'left',
  friendData,
  contentVisible = true,
}) {
  if (!friendData) return null;
  const isSingle = position === 'single';
  const isLeft = position === 'left';

  return (
    <div 
      style={{ transformStyle: 'flat' }} 
      className={`relative w-full h-full flex flex-col justify-between parchment-lilac overflow-hidden ${
        isSingle
          ? 'px-5 sm:px-7 border border-purple-200/50 rounded-lg'
          : isLeft 
            ? 'pr-5 pl-7 md:pl-9 border-r border-purple-200/50' 
            : 'pl-5 pr-7 md:pr-9 border-l border-purple-200/50'
      } py-4 md:py-6 select-none`}
    >
      {/* Crease Gutter Shadows */}
      {!isSingle && (
        <div className={`absolute top-0 bottom-0 w-16 pointer-events-none z-10 ${
          isLeft ? 'right-0 gutter-shadow-right' : 'left-0 gutter-shadow-left'
        }`} />
      )}
      {isSingle && (
        <div className="absolute top-0 bottom-0 left-0 w-3 gutter-shadow-left pointer-events-none z-10 opacity-20" />
      )}

      {/* Ornate Lilac & Gold Floral Corners */}
      {/* Top Left */}
      {(isSingle || isLeft) && (
        <div className="absolute top-2 left-2 text-purple-400/50 pointer-events-none">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <path d="M4 36 V12 C4 7 7 4 12 4 H36" stroke="currentColor" strokeWidth="1.8" />
            <path d="M9 32 V15 C9 11 11 9 15 9 H32" stroke="currentColor" strokeWidth="1" />
            <circle cx="16" cy="16" r="2.5" fill="#c084fc" />
          </svg>
        </div>
      )}

      {/* Top Right */}
      {(isSingle || !isLeft) && (
        <div className="absolute top-2 right-2 text-purple-400/50 pointer-events-none scale-x-[-1]">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <path d="M4 36 V12 C4 7 7 4 12 4 H36" stroke="currentColor" strokeWidth="1.8" />
            <path d="M9 32 V15 C9 11 11 9 15 9 H32" stroke="currentColor" strokeWidth="1" />
            <circle cx="16" cy="16" r="2.5" fill="#c084fc" />
          </svg>
        </div>
      )}

      {/* Bottom Left */}
      {(isSingle || isLeft) && (
        <div className="absolute bottom-2 left-2 text-purple-400/50 pointer-events-none scale-y-[-1]">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <path d="M4 36 V12 C4 7 7 4 12 4 H36" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="16" cy="16" r="2.5" fill="#c084fc" />
          </svg>
        </div>
      )}

      {/* Bottom Right */}
      {(isSingle || !isLeft) && (
        <div className="absolute bottom-2 right-2 text-purple-400/50 pointer-events-none scale-x-[-1] scale-y-[-1]">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <path d="M4 36 V12 C4 7 7 4 12 4 H36" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="16" cy="16" r="2.5" fill="#c084fc" />
          </svg>
        </div>
      )}

      {/* ── Inner Content (Disappears before close, appears after open) ── */}
      <motion.div
        style={{ transformStyle: 'flat' }}
        className="relative z-20 w-full h-full flex flex-col justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
      >
        {/* Top Header */}
        <div className="text-center mb-1">
          <div className="inline-flex items-center space-x-1 px-3 py-0.5 rounded-full bg-purple-100/90 border border-purple-300/60 shadow-xs mb-0.5">
            <Sparkles className="w-2.5 h-2.5 text-purple-600" />
            <span className="text-[9px] font-cinzel font-bold tracking-[.18em] text-purple-900 uppercase">
              {friendData.badge}
            </span>
            <Sparkles className="w-2.5 h-2.5 text-purple-600" />
          </div>

          <h2 className="text-xl md:text-2xl font-serif font-black text-purple-950 tracking-wide mt-0.5">
            {friendData.name}
          </h2>
          <p className="text-[10px] font-sans uppercase tracking-[.16em] text-purple-700 font-semibold">
            {friendData.title}
          </p>

          {/* Small Lilac Divider */}
          <div className="flex items-center justify-center space-x-2 my-1 opacity-70">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-600 text-xs">❦</span>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-purple-400" />
          </div>
        </div>

        {/* Center Content: Magical Video + Birthday Message / Quote */}
        <div className="flex-1 flex flex-col justify-center space-y-2 max-w-xs mx-auto w-full">
          <MagicalVideoFrame
            driveFileId={friendData.driveFileId}
            fallbackVideo={friendData.fallbackVideo}
            friendName={friendData.name}
            role={friendData.role}
            orientation={friendData.orientation}
          />

          {(friendData.message || friendData.quote) && (
            <div className="space-y-1.5">
              {/* Friend's Letter (only rendered if provided) */}
              {friendData.message && (
                <div className="p-2.5 rounded-xl bg-purple-50/80 border border-purple-200/80 shadow-xs">
                  <p className="text-xs md:text-sm font-serif text-purple-950 leading-relaxed text-center italic font-medium">
                    "{friendData.message}"
                  </p>
                </div>
              )}

              {/* Fairytale Quote Card */}
              {friendData.quote && (
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-100/70 via-pink-50 to-purple-100/70 border-l-3 border-purple-500 text-center shadow-2xs">
                  <p className="text-[10px] md:text-[11px] font-cormorant text-purple-950 font-bold italic">
                    {friendData.quote}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer: Page Number & Direction */}
        <div className="flex items-center justify-between pt-1 border-t border-purple-300/40 text-[9px] text-purple-800/80 font-cinzel font-semibold">
          <div className="flex items-center space-x-1">
            <Heart className="w-2.5 h-2.5 text-pink-500 fill-pink-500" />
            <span>Fairytale Chronicle</span>
          </div>
          <span className="font-bold tracking-widest">
            {isSingle ? '✦' : (isLeft ? '✦' : '')} Page {pageNumber} {isSingle ? '✦' : (!isLeft ? '✦' : '')}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

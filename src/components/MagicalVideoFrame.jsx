import React, { useState } from 'react';
import { Sparkles, Crown, Maximize2, X, ExternalLink } from 'lucide-react';

export default function MagicalVideoFrame({
  driveFileId,
  fallbackVideo,
  friendName,
  role,
  orientation = 'horizontal',
}) {
  const [isTheaterOpen, setIsTheaterOpen] = useState(false);

  const hasValidDriveId = Boolean(driveFileId && driveFileId.trim() && !driveFileId.includes('example'));
  const isPlaceholder = !hasValidDriveId;

  // Official Google Drive embed preview URL (proven, works reliably across all browsers)
  const driveEmbedUrl = hasValidDriveId 
    ? `https://drive.google.com/file/d/${driveFileId}/preview` 
    : '';
  const driveDirectUrl = hasValidDriveId 
    ? `https://drive.google.com/file/d/${driveFileId}/view?usp=sharing` 
    : '';

  return (
    <>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative group mx-auto my-1.5 w-full touch-manipulation"
      >
        {/* Fairytale Baroque Lilac & Gold Frame */}
        <div 
          className="relative p-2 rounded-xl shadow-[0_10px_25px_rgba(50,10,70,0.35)] border border-amber-300/70"
          style={{
            background: 'linear-gradient(145deg, #fef08a 0%, #eab308 30%, #c084fc 60%, #ca8a04 100%)',
          }}
        >
          {/* Crown Accent Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <div className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-300 via-purple-200 to-amber-300 border border-amber-400 shadow-sm flex items-center space-x-1">
              <Crown className="w-2.5 h-2.5 text-purple-900 fill-purple-900" />
              <span className="text-[8px] font-cinzel font-bold text-purple-950 uppercase tracking-wider whitespace-nowrap">
                {orientation === 'vertical' ? 'Royal Portrait' : 'Enchanted Message'}
              </span>
            </div>
          </div>

          {/* Lilac Velvet Inner Mat */}
          <div 
            className="p-1.5 rounded-lg"
            style={{ background: 'linear-gradient(145deg, #3b0764, #260542)' }}
          >
            {/* Inner Golden Border */}
            <div 
              className="p-[1.5px] rounded"
              style={{ background: 'linear-gradient(90deg, #fde047, #d8b4fe, #eab308)' }}
            >
              {/* Video Container (Centered 16:9 aspect ratio prevents mobile GPU drops & center-aligns all orientations) */}
              <div 
                className="relative w-full aspect-video rounded-sm overflow-hidden bg-black flex items-center justify-center"
                style={{
                  transformStyle: 'flat',
                  WebkitTransformStyle: 'flat',
                  isolation: 'isolate',
                  backfaceVisibility: 'visible',
                  WebkitBackfaceVisibility: 'visible',
                }}
              >
                {/* 1. RELIABLE GOOGLE DRIVE IFRAME (Direct 100% width/height without nested scale matrix) */}
                {!isPlaceholder && (
                  <iframe
                    src={driveEmbedUrl}
                    title={`${friendName}'s birthday video message`}
                    className="w-full h-full border-0 block rounded-sm bg-black"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                )}

                {/* 2. PLACEHOLDER / COMING SOON CARD (For Amma or pending entries) */}
                {isPlaceholder && (
                  <div className="w-full h-full bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 flex flex-col items-center justify-center p-3 text-center">
                    <div className="flex flex-col items-center justify-center space-y-1.5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300/30 via-purple-300/30 to-amber-400/30 border border-amber-300/50 flex items-center justify-center shadow-[0_0_15px_rgba(216,180,254,0.4)]">
                        <Sparkles className="w-4 h-4 text-amber-200" />
                      </div>
                      <div>
                        <p className="text-xs font-cinzel font-bold text-amber-200 tracking-wide">
                          {friendName}'s Wish
                        </p>
                        <p className="text-[9px] text-purple-200/80 font-sans mt-0.5">
                          Video Arriving Soon ✨
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Subtle Edge Vignette */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] rounded-sm" />
              </div>
            </div>
          </div>

          {/* Bottom Filigree Bar: Friend Tag, Theater Button & Drive Link */}
          <div className="mt-1 flex items-center justify-between px-1 gap-1 text-[10px]">
            <span className="text-purple-950 font-cinzel font-bold tracking-wide flex items-center space-x-1 min-w-0">
              <Sparkles className="w-2.5 h-2.5 text-amber-700 shrink-0" />
              <span className="truncate">
                {friendName} • <span className="font-sans text-[9px] font-semibold text-purple-900">{role}</span>
              </span>
            </span>

            <div className="flex items-center space-x-1.5 shrink-0">
              {hasValidDriveId && (
                <>
                  {/* Theater Modal Button (Offers full-screen playback free from mobile 3D constraints) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTheaterOpen(true);
                    }}
                    className="text-purple-950 hover:text-purple-700 bg-gradient-to-r from-amber-200 to-amber-300 hover:from-amber-300 hover:to-amber-400 px-2 py-0.5 rounded text-[9px] font-cinzel font-bold flex items-center space-x-1 shadow-xs transition-transform active:scale-95 cursor-pointer"
                    title="Open in Fairytale Theater view"
                  >
                    <Maximize2 className="w-2.5 h-2.5 text-purple-900" />
                    <span>Theater</span>
                  </button>

                  {/* Direct Google Drive Link */}
                  <a 
                    href={driveDirectUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-950 hover:text-purple-700 bg-amber-200/90 hover:bg-amber-300 px-1.5 py-0.5 rounded text-[9px] font-cinzel font-bold flex items-center space-x-0.5 shadow-xs transition-colors shrink-0"
                    title="Open directly in Google Drive"
                  >
                    <span>Drive ↗</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── ENCHANTED THEATER MODAL (Full-viewport playback for mobile & desktop) ── */}
      {isTheaterOpen && (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setIsTheaterOpen(false);
          }}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 md:p-6 animate-fadeIn"
        >
          {/* Modal Content Box */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl p-2.5 sm:p-3 border-2 border-amber-300/80 shadow-[0_0_50px_rgba(216,180,254,0.4)] flex flex-col"
            style={{
              background: 'linear-gradient(145deg, #2b0b45 0%, #170327 100%)',
            }}
          >
            {/* Header: Title & Close Button */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-300/30 px-1">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span className="font-cinzel font-bold text-amber-200 text-sm md:text-base tracking-wide">
                  {friendName}'s Royal Wish
                </span>
                <span className="text-xs text-purple-300/70 font-sans hidden sm:inline">
                  • {role}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsTheaterOpen(false)}
                className="w-8 h-8 rounded-full bg-purple-900/80 hover:bg-purple-800 border border-amber-300/50 flex items-center justify-center text-amber-200 transition-colors cursor-pointer"
                title="Close Theater"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player in Theater View (Spacious 16:9 frame, unconstrained by book transforms) */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-2xl border border-amber-300/40">
              <iframe
                src={`${driveEmbedUrl}?autoplay=1`}
                title={`${friendName}'s birthday video message`}
                className="w-full h-full border-0 block"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Theater Footer: Instructions & Open in Drive */}
            <div className="mt-2.5 flex items-center justify-between px-1 text-xs text-purple-200/80">
              <span className="font-cinzel text-[11px] text-amber-300/90 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Tap the video play button to begin</span>
              </span>

              <a
                href={driveDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-200 hover:text-white font-cinzel text-[11px] font-semibold underline flex items-center space-x-1"
              >
                <span>Open in Drive</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

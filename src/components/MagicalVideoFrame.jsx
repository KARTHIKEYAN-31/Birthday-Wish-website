import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Play, Sparkles, Crown, Maximize2, X, ExternalLink } from 'lucide-react';

export default function MagicalVideoFrame({
  driveFileId,
  fallbackVideo,
  friendName,
  role,
  orientation = 'horizontal',
}) {
  const containerRef = useRef(null);
  const isVertical = orientation === 'vertical';

  // Calibrated initial scale factors (horizontal ~0.45, vertical ~0.71)
  const [scale, setScale] = useState(isVertical ? 0.708 : 0.4515);
  const [isPlayingFallback, setIsPlayingFallback] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isTheaterOpen, setIsTheaterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const hasValidDriveId = Boolean(driveFileId && driveFileId.trim() && !driveFileId.includes('example'));
  const isPlaceholder = !hasValidDriveId;

  const driveEmbedUrl = hasValidDriveId ? `https://drive.google.com/file/d/${driveFileId}/preview` : '';
  const driveDirectUrl = hasValidDriveId ? `https://drive.google.com/file/d/${driveFileId}/view?usp=sharing` : '';

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close theater modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isTheaterOpen) {
        setIsTheaterOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTheaterOpen]);

  // Dynamically compute the exact scale factor:
  // - For Horizontal (16:9): scale = width / 640. The 640x360 iframe fills the 16:9 container.
  // - For Vertical (9:16): scale = height / 360. In Google Drive's 640x360 player, a 9:16 vertical
  //   video is 360px tall and 202.5px wide centered at x=320. By scaling to height / 360 and centering at 50%,
  //   the vertical video fills the 9:16 portrait container 100%, cropping out the black side pillarboxes!
  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        if (isVertical) {
          if (h > 0) {
            setScale(h / 360);
          }
        } else {
          if (w > 0) {
            setScale(w / 640);
          }
        }
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [isVertical]);

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className={`relative group mx-auto my-1 transition-all duration-300 ${
        isVertical ? 'w-full max-w-[190px]' : 'w-full my-2'
      }`}
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
              {isVertical ? 'Royal Portrait' : 'Enchanted Message'}
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
            {/* Video Container (16:9 for landscape, 9:16 for portrait) */}
            <div 
              ref={containerRef}
              className={`relative w-full rounded-sm overflow-hidden bg-black flex items-center justify-center ${
                isVertical ? 'aspect-[9/16] max-h-[255px]' : 'aspect-video'
              }`}
              style={{
                isolation: 'isolate',
                transformStyle: 'flat',
                WebkitBackfaceVisibility: 'visible',
                backfaceVisibility: 'visible',
              }}
            >
              {!isPlaceholder && !hasError ? (
                /* On mobile horizontal videos, render direct 100% iframe to bypass nested transform matrices.
                   On desktop or vertical videos, use scaled 640x360 canvas centered to crop side pillarboxes. */
                isMobile && !isVertical ? (
                  <iframe
                    src={driveEmbedUrl}
                    title={`${friendName}'s birthday video`}
                    className="w-full h-full border-0 block"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write; accelerometer; gyroscope"
                    allowFullScreen
                    style={{
                      border: 'none',
                      transformStyle: 'flat',
                      WebkitBackfaceVisibility: 'visible',
                      backfaceVisibility: 'visible',
                    }}
                    onError={() => setHasError(true)}
                  />
                ) : (
                  <div
                    style={{
                      width: '640px',
                      height: '360px',
                      transform: `translate(-50%, -50%) scale(${scale}) translateZ(0)`,
                      WebkitTransform: `translate(-50%, -50%) scale(${scale}) translateZ(0)`,
                      transformOrigin: 'center center',
                      left: '50%',
                      top: '50%',
                      transformStyle: 'flat',
                      WebkitBackfaceVisibility: 'visible',
                      backfaceVisibility: 'visible',
                      willChange: 'transform',
                    }}
                    className="absolute pointer-events-auto"
                  >
                    <iframe
                      src={driveEmbedUrl}
                      title={`${friendName}'s birthday video`}
                      className="w-full h-full border-0 block"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write; accelerometer; gyroscope"
                      allowFullScreen
                      style={{
                        border: 'none',
                        transformStyle: 'flat',
                        WebkitBackfaceVisibility: 'visible',
                        backfaceVisibility: 'visible',
                      }}
                      onError={() => setHasError(true)}
                    />
                  </div>
                )
              ) : (
                /* Fallback / Interactive Demo Player */
                <div className="w-full h-full bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 flex flex-col items-center justify-center p-2 text-center">
                  {fallbackVideo && isPlayingFallback ? (
                    <video 
                      src={fallbackVideo} 
                      controls 
                      autoPlay 
                      className="w-full h-full object-cover rounded-sm" 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-1.5">
                      {fallbackVideo ? (
                        <button
                          onClick={() => setIsPlayingFallback(true)}
                          className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300 via-purple-300 to-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(216,180,254,0.8)] hover:scale-110 transition-transform cursor-pointer"
                          title="Click to play sample video"
                        >
                          <Play className="w-4 h-4 ml-0.5 fill-purple-950 text-purple-950" />
                        </button>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300/30 via-purple-300/30 to-amber-400/30 border border-amber-300/50 flex items-center justify-center shadow-[0_0_15px_rgba(216,180,254,0.4)]">
                          <Sparkles className="w-4 h-4 text-amber-200" />
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-cinzel font-bold text-amber-200 tracking-wide">
                          {friendName}'s Wish
                        </p>
                        <p className="text-[9px] text-purple-200/80 font-sans">
                          {hasValidDriveId
                            ? "Click to view video"
                            : fallbackVideo
                              ? "Sample Video Ready • Click Play"
                              : "Video Arriving Soon ✨"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Shimmer Vignette (hidden on mobile to prevent hardware video surface clipping) */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.65)] rounded-sm hidden md:block" />
            </div>
          </div>
        </div>

        {/* Bottom Filigree Label, Full View & Drive Links */}
        <div className="mt-1 flex items-center justify-between px-1 gap-1 text-[10px]">
          <span className="text-purple-950 font-cinzel font-bold tracking-wide flex items-center space-x-1 min-w-0">
            <Sparkles className="w-2.5 h-2.5 text-amber-700 shrink-0" />
            <span className="truncate">{friendName} • <span className="font-sans text-[9px] font-semibold text-purple-900">{role}</span></span>
          </span>

          <div className="flex items-center space-x-1 shrink-0">
            {hasValidDriveId && (
              <>
                <button
                  type="button"
                  onClick={() => setIsTheaterOpen(true)}
                  className="text-purple-950 hover:text-purple-900 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 hover:from-amber-300 hover:to-amber-400 px-1.5 py-0.5 rounded text-[9px] font-cinzel font-bold flex items-center space-x-0.5 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                  title="Watch in Royal Theater Full View"
                >
                  <Maximize2 className="w-2.5 h-2.5 text-purple-950 shrink-0" />
                  <span>Full View</span>
                </button>

                <a 
                  href={driveDirectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-950 hover:text-purple-700 bg-purple-200/90 hover:bg-purple-300 px-1.5 py-0.5 rounded text-[9px] font-cinzel font-bold flex items-center space-x-0.5 shadow-xs transition-colors shrink-0"
                  title="Open in Google Drive"
                >
                  <span>Drive ↗</span>
                </a>
              </>
            )}

            {isPlaceholder && fallbackVideo && (
              <button
                onClick={() => setIsPlayingFallback(!isPlayingFallback)}
                className="text-purple-950 font-sans font-bold text-[9px] underline hover:text-purple-800 shrink-0 cursor-pointer"
              >
                {isPlayingFallback ? 'Reset' : 'Play Sample'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Enchanted Royal Theater Modal (Full Resolution, Zero Transforms) ── */}
      {isTheaterOpen && hasValidDriveId && typeof document !== 'undefined' && createPortal(
        <div 
          onClick={() => setIsTheaterOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-purple-950/90 backdrop-blur-md animate-in fade-in duration-200"
          style={{ transformStyle: 'flat' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl p-2.5 sm:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-2 border-amber-300/80 animate-in zoom-in-95 duration-200"
            style={{
              background: 'linear-gradient(145deg, #fef08a 0%, #eab308 25%, #a855f7 60%, #ca8a04 100%)',
            }}
          >
            {/* Header: Royal Crown, Friend Name, and Close Button */}
            <div className="flex items-center justify-between px-2 py-1.5 mb-1.5 text-purple-950">
              <div className="flex items-center space-x-2 min-w-0">
                <div className="p-1.5 rounded-full bg-purple-950 text-amber-300 shadow-sm shrink-0">
                  <Crown className="w-3.5 h-3.5 fill-amber-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-cinzel font-black text-sm sm:text-base tracking-wide text-purple-950 truncate">
                    {friendName}'s Birthday Wish
                  </h3>
                  <p className="text-[10px] sm:text-xs font-sans font-semibold text-purple-900 tracking-wider uppercase truncate">
                    {role} • Royal Fairytale Theater
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsTheaterOpen(false)}
                className="p-1.5 rounded-full bg-purple-950/20 hover:bg-purple-950/40 text-purple-950 transition-colors cursor-pointer shrink-0 ml-2"
                aria-label="Close Theater"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Inner Velvet Stage Frame */}
            <div 
              className="p-1.5 sm:p-2 rounded-xl"
              style={{ background: 'linear-gradient(145deg, #2e054f, #150226)' }}
            >
              <div 
                className={`relative mx-auto rounded-lg overflow-hidden bg-black flex items-center justify-center ${
                  isVertical 
                    ? 'w-full max-w-[340px] aspect-[9/16] max-h-[70vh]' 
                    : 'w-full aspect-video max-h-[70vh]'
                }`}
                style={{ isolation: 'isolate' }}
              >
                <iframe
                  src={driveEmbedUrl}
                  title={`${friendName}'s birthday video (Royal Theater)`}
                  className="w-full h-full border-0 block"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write; accelerometer; gyroscope"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="mt-2 flex items-center justify-between px-2 text-xs">
              <span className="text-[11px] font-cinzel font-bold text-purple-950 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-800" />
                <span>The Princess Chronicles</span>
              </span>

              <div className="flex items-center space-x-2">
                <a
                  href={driveDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-md bg-purple-950 text-amber-300 hover:bg-purple-900 font-cinzel font-bold text-[10px] flex items-center space-x-1 shadow-sm transition-colors"
                >
                  <span>Open in Drive</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <button
                  onClick={() => setIsTheaterOpen(false)}
                  className="px-2.5 py-1 rounded-md bg-amber-200/90 hover:bg-amber-300 text-purple-950 font-cinzel font-bold text-[10px] shadow-sm transition-colors cursor-pointer"
                >
                  Return to Book
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

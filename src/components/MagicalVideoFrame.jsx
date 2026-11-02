import React, { useState, useEffect } from 'react';
import { Sparkles, Crown, Minimize2, Maximize2, ExternalLink } from 'lucide-react';

/*
 * MagicalVideoFrame — Responsive Google Drive video embedding:
 *
 * DESKTOP (>= 768px) — inline playback:
 *   The iframe renders at a fixed large size (IFRAME_W × IFRAME_H) so Google Drive
 *   shows its compact desktop player UI. CSS transform: scale() shrinks it to fit
 *   the book page frame. Pointer-events are ENABLED so the user can play inline.
 *
 * MOBILE (< 768px) — inline playback (same as desktop):
 *   The video plays directly inside the same frame space on the page.
 *   A "Full View" button expands the video to fill the page area in-place
 *   (no separate popup/modal). Tap again to shrink back.
 */

const IFRAME_W = 1200; // Inline preview: force desktop UI, no touch controls
const IFRAME_H = 675;  // 16:9 ratio

export default function MagicalVideoFrame({
  driveFileId,
  friendName,
  role,
  fallbackVideo,
  orientation = 'horizontal',
  contentVisible = true,
}) {
  const isVertical = orientation === 'vertical';
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(contentVisible);
  useEffect(() => { if (contentVisible) setShouldLoadIframe(true); }, [contentVisible]);

  // ── Responsive: mobile vs desktop ─────────────────────────────────
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── Inline frame sizing ────────────────────────────────────────────
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const containerRef = React.useRef(null);

  const hasValidDriveId = Boolean(
    driveFileId && driveFileId.trim() && !driveFileId.includes('example')
  );

  const driveEmbedUrl = hasValidDriveId
    ? `https://drive.google.com/file/d/${driveFileId}/preview`
    : '';
  const driveDirectUrl = hasValidDriveId
    ? `https://drive.google.com/file/d/${driveFileId}/view?usp=sharing`
    : '';

  // Measure the visual container so we can compute the CSS scale
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setContainerSize({ w: width, h: height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Scale so the IFRAME_W×IFRAME_H box fits inside the visible container.
  // For vertical videos the iframe is still landscape (IFRAME_W×IFRAME_H)
  // but we want its visible portion to fit a portrait box.
  const scaleX = containerSize.w > 0 ? containerSize.w / IFRAME_W : 1;
  const scaleY = containerSize.h > 0 ? containerSize.h / IFRAME_H : 1;
  // Use the smaller scale so nothing is clipped (fit, not fill).
  // For vertical we want fill (bigger scale) so the video fills the portrait box.
  const scale = isVertical ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative mx-auto my-1 ${isVertical ? 'w-full max-w-[190px]' : 'w-full my-2'} ${isExpanded ? 'z-50' : ''}`}
      style={isExpanded ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        maxWidth: '100%',
        width: '100%',
        height: '100%',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.92)',
        borderRadius: 12,
        padding: 8,
        zIndex: 50,
      } : {}}
    >
      {/* ── Expanded mode header (mobile in-place full view) ─── */}
      {isExpanded && (
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '6px 10px', marginBottom: 4, flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
            <Crown style={{ width: 14, height: 14, color: '#fbbf24', fill: '#fbbf24', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Cinzel, serif', fontWeight: 900, fontSize: 12, color: '#fde68a',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {friendName}'s Birthday Wish
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            style={{
              padding: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.12)',
              border: 'none', cursor: 'pointer', color: '#fde68a', flexShrink: 0,
              display: 'flex', alignItems: 'center',
            }}
            aria-label="Minimize"
          >
            <Minimize2 style={{ width: 16, height: 16 }} />
          </button>
        </div>
      )}

      {/* ── Fairytale Gold & Lilac Frame ─────────────────────── */}
      <div
        className="relative p-2 rounded-xl shadow-[0_10px_25px_rgba(50,10,70,0.35)] border border-amber-300/70"
        style={{
          background: 'linear-gradient(145deg,#fef08a,#eab308 30%,#c084fc 60%,#ca8a04)',
          ...(isExpanded ? { flex: '1 1 auto', width: '100%', minHeight: 0, display: 'flex', flexDirection: 'column' } : {}),
        }}
      >
        {/* Crown Badge */}
        {!isExpanded && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <div className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-300 via-purple-200 to-amber-300 border border-amber-400 shadow-sm flex items-center gap-1">
              <Crown className="w-2.5 h-2.5 text-purple-900 fill-purple-900" />
              <span className="text-[8px] font-cinzel font-bold text-purple-950 uppercase tracking-wider whitespace-nowrap">
                {isVertical ? 'Royal Portrait' : 'Enchanted Message'}
              </span>
            </div>
          </div>
        )}

        {/* Velvet Mat */}
        <div
          className="p-1.5 rounded-lg"
          style={{
            background: 'linear-gradient(145deg,#3b0764,#260542)',
            ...(isExpanded ? { flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' } : {}),
          }}
        >
          {/* Golden Border */}
          <div
            className="p-[1.5px] rounded"
            style={{
              background: 'linear-gradient(90deg,#fde047,#d8b4fe,#eab308)',
              ...(isExpanded ? { flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' } : {}),
            }}
          >

            {/* ── Outer Clip Box — sets the VISIBLE size ────────── */}
            <div
              ref={containerRef}
              className={`relative rounded-sm overflow-hidden bg-black ${
                isExpanded
                  ? ''
                  : isVertical ? 'aspect-[9/16] max-h-[255px] w-full' : 'aspect-video w-full'
              }`}
              style={isExpanded ? { flex: '1 1 auto', width: '100%', minHeight: 0 } : {}}
            >
              {hasValidDriveId ? (
                <>
                  {/* ── The scaled iframe (desktop-size, shrunk to fit) ── */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: IFRAME_W,
                      height: IFRAME_H,
                      transform: `translate(-50%, -50%) scale(${scale})`,
                      transformOrigin: 'center center',
                      // Always allow pointer events — play inline on both mobile and desktop
                      pointerEvents: 'auto',
                    }}
                  >
                    {shouldLoadIframe && (
                      <iframe
                        src={driveEmbedUrl}
                        title={`${friendName}'s birthday video`}
                        width={IFRAME_W}
                        height={IFRAME_H}
                        loading="lazy"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                        allowFullScreen
                        style={{ border: 'none', display: 'block', width: '100%', height: '100%' }}
                      />
                    )}
                  </div>
                </>
              ) : (
                /* Placeholder / fallback */
                <div className="w-full h-full bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 flex flex-col items-center justify-center p-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300/30 via-purple-300/30 to-amber-400/30 border border-amber-300/50 flex items-center justify-center mb-2">
                    <Sparkles className="w-4 h-4 text-amber-200" />
                  </div>
                  <p className="text-xs font-cinzel font-bold text-amber-200 tracking-wide">{friendName}'s Wish</p>
                  <p className="text-[9px] text-purple-200/80 mt-0.5">Video Arriving Soon ✨</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom label & actions */}
        <div className={`mt-1 flex items-center justify-between px-1 gap-1 text-[10px] ${isExpanded ? 'pb-0.5' : ''}`}>
          <span className="text-purple-950 font-cinzel font-bold tracking-wide flex items-center gap-1 min-w-0">
            <Sparkles className="w-2.5 h-2.5 text-amber-700 shrink-0" />
            <span className="truncate">{friendName} • <span className="font-sans text-[9px] font-semibold text-purple-900">{role}</span></span>
          </span>
          <div className="flex items-center gap-1 shrink-0">
            {hasValidDriveId && (
              <>
                {isMobile && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 hover:from-amber-300 hover:to-amber-400 text-purple-950 px-1.5 py-0.5 rounded text-[9px] font-cinzel font-bold flex items-center gap-0.5 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                    title={isExpanded ? "Shrink to normal" : "Expand to full view"}
                  >
                    {isExpanded ? (
                      <>
                        <Minimize2 className="w-2.5 h-2.5" />
                        <span>Normal</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-2.5 h-2.5" />
                        <span>Full View</span>
                      </>
                    )}
                  </button>
                )}
                <a
                  href={driveDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-200/90 hover:bg-purple-300 text-purple-950 hover:text-purple-700 px-1.5 py-0.5 rounded text-[9px] font-cinzel font-bold flex items-center gap-0.5 shadow-xs transition-colors shrink-0"
                >
                  Drive ↗
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

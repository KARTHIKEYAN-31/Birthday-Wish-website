import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Play, Sparkles, Crown, Maximize2, X, ExternalLink } from 'lucide-react';

/*
 * MagicalVideoFrame — Dual-strategy Google Drive video embedding:
 *
 * INLINE (small frame inside page):
 *   Uses the "Desktop Override" technique:
 *   - The iframe is rendered at a fixed LARGE size (e.g. 1200×675px) so that
 *     Google Drive's player thinks it is on a desktop browser with a wide viewport.
 *   - At narrow/wide viewport, Google Drive renders its DESKTOP player
 *     (small, auto-hiding controls — no giant touch buttons).
 *   - The outer container has `overflow: hidden` and uses CSS `transform: scale()`
 *     to shrink the visually large iframe into the small visible frame.
 *   - A transparent pointer-events overlay on top BLOCKS touch input to the iframe
 *     so tapping on the inline frame never shows the Drive player controls.
 *   - A prominent "▶ Tap to Watch" button sits over the inline frame; tapping
 *     opens the Royal Theater modal instead.
 *
 * ROYAL THEATER MODAL (full-screen portal):
 *   - Portalled to document.body (completely outside all 3D-transform contexts).
 *   - Full-screen black backdrop, edge-to-edge.
 *   - The iframe is rendered at natural 100%×100% with no CSS transforms.
 *   - User can interact fully with the Drive player in this context.
 */

const IFRAME_W = 1200; // Force desktop width — prevents mobile touch UI
const IFRAME_H = 675;  // 16:9 ratio

export default function MagicalVideoFrame({
  driveFileId,
  friendName,
  role,
  fallbackVideo,
  orientation = 'horizontal',
}) {
  const isVertical = orientation === 'vertical';
  const [isTheaterOpen, setIsTheaterOpen] = useState(false);
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

  // Close theater modal on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsTheaterOpen(false); };
    if (isTheaterOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isTheaterOpen]);

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
      className={`relative mx-auto my-1 ${isVertical ? 'w-full max-w-[190px]' : 'w-full my-2'}`}
    >
      {/* ── Fairytale Gold & Lilac Frame ─────────────────────── */}
      <div
        className="relative p-2 rounded-xl shadow-[0_10px_25px_rgba(50,10,70,0.35)] border border-amber-300/70"
        style={{ background: 'linear-gradient(145deg,#fef08a,#eab308 30%,#c084fc 60%,#ca8a04)' }}
      >
        {/* Crown Badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <div className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-300 via-purple-200 to-amber-300 border border-amber-400 shadow-sm flex items-center gap-1">
            <Crown className="w-2.5 h-2.5 text-purple-900 fill-purple-900" />
            <span className="text-[8px] font-cinzel font-bold text-purple-950 uppercase tracking-wider whitespace-nowrap">
              {isVertical ? 'Royal Portrait' : 'Enchanted Message'}
            </span>
          </div>
        </div>

        {/* Velvet Mat */}
        <div className="p-1.5 rounded-lg" style={{ background: 'linear-gradient(145deg,#3b0764,#260542)' }}>
          {/* Golden Border */}
          <div className="p-[1.5px] rounded" style={{ background: 'linear-gradient(90deg,#fde047,#d8b4fe,#eab308)' }}>

            {/* ── Outer Clip Box — sets the VISIBLE size ────────── */}
            <div
              ref={containerRef}
              className={`relative rounded-sm overflow-hidden bg-black ${
                isVertical ? 'aspect-[9/16] max-h-[255px] w-full' : 'aspect-video w-full'
              }`}
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
                      pointerEvents: 'none', // Block all touch — user must use the tap overlay
                    }}
                  >
                    <iframe
                      src={driveEmbedUrl}
                      title={`${friendName}'s birthday video`}
                      width={IFRAME_W}
                      height={IFRAME_H}
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      style={{ border: 'none', display: 'block', width: '100%', height: '100%' }}
                    />
                  </div>

                  {/* ── Tap-to-Watch Overlay ── */}
                  <button
                    type="button"
                    onClick={() => setIsTheaterOpen(true)}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/30 hover:bg-black/40 active:bg-black/50 transition-colors group/play cursor-pointer"
                    aria-label="Open full view"
                  >
                    {/* Animated play ring */}
                    <div className="w-14 h-14 rounded-full bg-white/15 border-2 border-amber-300/70 flex items-center justify-center shadow-[0_0_20px_rgba(253,224,71,0.5)] group-hover/play:scale-110 group-hover/play:border-amber-300 transition-all duration-200">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-purple-300 to-amber-400 flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 ml-0.5 fill-purple-950 text-purple-950" />
                      </div>
                    </div>
                    <span className="text-[10px] font-cinzel font-bold text-amber-200 tracking-widest uppercase drop-shadow-md">
                      Tap to Watch
                    </span>
                  </button>
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
        <div className="mt-1 flex items-center justify-between px-1 gap-1 text-[10px]">
          <span className="text-purple-950 font-cinzel font-bold tracking-wide flex items-center gap-1 min-w-0">
            <Sparkles className="w-2.5 h-2.5 text-amber-700 shrink-0" />
            <span className="truncate">{friendName} • <span className="font-sans text-[9px] font-semibold text-purple-900">{role}</span></span>
          </span>
          <div className="flex items-center gap-1 shrink-0">
            {hasValidDriveId && (
              <>
                <button
                  type="button"
                  onClick={() => setIsTheaterOpen(true)}
                  className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 hover:from-amber-300 hover:to-amber-400 text-purple-950 px-1.5 py-0.5 rounded text-[9px] font-cinzel font-bold flex items-center gap-0.5 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                >
                  <Maximize2 className="w-2.5 h-2.5" />
                  <span>Full View</span>
                </button>
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

      {/* ── Royal Theater Modal ─────────────────────────────────── */}
      {isTheaterOpen && hasValidDriveId && typeof document !== 'undefined' && createPortal(
        /* Full-screen black stage, portalled to body — zero CSS transforms */
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.97)', display: 'flex', flexDirection: 'column' }}
          onClick={() => setIsTheaterOpen(false)}
        >
          {/* Header */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 16px', borderBottom: '1px solid rgba(253,224,71,0.2)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <div style={{ padding: 8, borderRadius: '50%', background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.4)', flexShrink: 0 }}>
                <Crown style={{ width: 18, height: 18, color: '#fbbf24', fill: '#fbbf24' }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 900, fontSize: 15, color: '#fde68a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {friendName}'s Birthday Wish
                </div>
                <div style={{ fontSize: 11, color: '#c4b5fd', textTransform: 'uppercase', letterSpacing: '0.08em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {role} · Royal Theater
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsTheaterOpen(false)}
              style={{ padding: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', color: '#fde68a', flexShrink: 0, marginLeft: 8, display: 'flex', alignItems: 'center' }}
              aria-label="Close"
            >
              <X style={{ width: 22, height: 22 }} />
            </button>
          </div>

          {/* Video stage — takes all remaining height */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px', minHeight: 0 }}
          >
            <div
              style={{
                width: isVertical ? 'min(85vw, 340px)' : '100%',
                maxWidth: isVertical ? 340 : 900,
                aspectRatio: isVertical ? '9/16' : '16/9',
                maxHeight: isVertical ? '78vh' : '75vh',
                position: 'relative',
                borderRadius: 12,
                overflow: 'hidden',
                background: '#000',
                boxShadow: '0 0 60px rgba(168,85,247,0.4)',
                border: '1px solid rgba(251,191,36,0.35)',
              }}
            >
              {/* 
                In the modal, we render the iframe at FULL natural size.
                NO scale transforms. NO pointer-events blocking.
                Google Drive's player works perfectly here.
              */}
              <iframe
                src={driveEmbedUrl}
                title={`${friendName}'s Birthday Wish – Full Screen`}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
              />
            </div>
          </div>

          {/* Footer */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
              padding: '10px 16px', gap: 8, borderTop: '1px solid rgba(253,224,71,0.2)', flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 11, fontFamily: 'Cinzel, serif', fontWeight: 700, color: 'rgba(253,224,71,0.8)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles style={{ width: 13, height: 13, color: '#fbbf24' }} />
              The Princess Chronicles
            </span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <a
                href={driveDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '6px 14px', borderRadius: 999,
                  background: 'linear-gradient(to right,#fde68a,#fbbf24)', color: '#1e0a3c',
                  fontFamily: 'Cinzel,serif', fontWeight: 700, fontSize: 11,
                  display: 'flex', alignItems: 'center', gap: 4,
                  textDecoration: 'none', flexShrink: 0,
                }}
              >
                Open in Drive App
                <ExternalLink style={{ width: 12, height: 12 }} />
              </a>
              <button
                onClick={() => setIsTheaterOpen(false)}
                style={{
                  padding: '6px 14px', borderRadius: 999,
                  background: 'rgba(109,40,217,0.7)', color: '#ede9fe',
                  border: '1px solid rgba(109,40,217,0.5)', cursor: 'pointer',
                  fontFamily: 'Cinzel,serif', fontWeight: 700, fontSize: 11, flexShrink: 0,
                }}
              >
                Back to Book
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

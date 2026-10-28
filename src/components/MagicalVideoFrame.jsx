import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Sparkles, Crown } from 'lucide-react';

export default function MagicalVideoFrame({
  driveFileId,
  fallbackVideo,
  friendName,
  role,
  orientation = 'horizontal',
}) {
  const videoRef = useRef(null);
  const isVertical = orientation === 'vertical';

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [progress, setProgress] = useState(0);

  const hasValidDriveId = Boolean(driveFileId && driveFileId.trim() && !driveFileId.includes('example'));
  const isPlaceholder = !hasValidDriveId;

  // Direct MP4 stream URL from Google Drive with CORS & Range header support
  const directStreamUrl = hasValidDriveId
    ? `https://drive.usercontent.google.com/download?id=${driveFileId}&export=download&confirm=t`
    : (fallbackVideo || '');

  const driveDirectUrl = hasValidDriveId ? `https://drive.google.com/file/d/${driveFileId}/view?usp=sharing` : '';

  // Reset playback state if the video changes
  useEffect(() => {
    setIsPlaying(false);
    setHasStarted(false);
    setProgress(0);
    setIsBuffering(false);
  }, [directStreamUrl]);

  // Clean up audio/video immediately when navigating away or unmounting
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.removeAttribute('src');
          videoRef.current.load();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  // Toggle Play / Resume / Pause cleanly without any third-party UI overlays, menus or mobile blackouts
  const togglePlay = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasStarted(true);
          })
          .catch((err) => {
            console.warn('HTML5 direct playback catch:', err);
          });
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className={`relative group mx-auto my-1 transition-all duration-300 touch-manipulation ${
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
              onClick={hasValidDriveId ? togglePlay : undefined}
              className={`relative w-full rounded-sm overflow-hidden bg-black flex items-center justify-center cursor-pointer select-none touch-manipulation ${
                isVertical ? 'aspect-[9/16] max-h-[255px]' : 'aspect-video'
              }`}
            >
              {/* 1. NATIVE HTML5 VIDEO STREAM: No mobile blackout, pure Play & Resume controls */}
              {!isPlaceholder && (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <video
                    ref={videoRef}
                    playsInline
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    preload="metadata"
                    controls={false}
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    onTimeUpdate={() => {
                      if (videoRef.current && videoRef.current.duration) {
                        setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
                      }
                    }}
                    onWaiting={() => setIsBuffering(true)}
                    onPlaying={() => {
                      setIsBuffering(false);
                      setIsPlaying(true);
                      setHasStarted(true);
                    }}
                    onPlay={() => {
                      setIsPlaying(true);
                      setHasStarted(true);
                    }}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => {
                      setIsPlaying(false);
                      setHasStarted(false);
                      setProgress(0);
                    }}
                    className={`w-full h-full ${isVertical ? 'object-cover' : 'object-contain'} bg-black pointer-events-none`}
                  >
                    <source src={directStreamUrl} type="video/mp4" />
                  </video>

                  {/* Buffering Sparkle Spinner */}
                  {isBuffering && isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15 bg-black/25">
                      <div className="w-8 h-8 border-2 border-amber-300/30 border-t-amber-300 rounded-full animate-spin" />
                    </div>
                  )}

                  {/* Clean Fairytale Play & Resume Overlay (Appears ONLY when paused or not started) */}
                  {!isPlaying && (
                    <div 
                      onClick={togglePlay}
                      className="absolute inset-0 bg-black/45 backdrop-blur-[1px] flex flex-col items-center justify-center transition-all z-20 cursor-pointer"
                    >
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="w-13 h-13 rounded-full bg-gradient-to-tr from-amber-300 via-pink-300 to-amber-400 flex items-center justify-center shadow-[0_0_24px_rgba(251,191,36,0.95)] hover:scale-110 active:scale-95 transition-transform cursor-pointer border-2 border-amber-100"
                        title={hasStarted ? 'Resume Video' : 'Play Video'}
                      >
                        <Play className="w-5 h-5 ml-0.5 fill-purple-950 text-purple-950" />
                      </button>
                      <div className="mt-2.5 px-3 py-1 rounded-full bg-purple-950/85 border border-amber-300/40 shadow-sm flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span className="text-[11px] font-cinzel font-bold text-amber-200 tracking-wider">
                          {hasStarted ? 'Resume' : 'Play'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Discreet Floating Pause Button (Only when playing) */}
                  {isPlaying && (
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="absolute bottom-2.5 right-2.5 z-20 px-2 py-1 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-sm border border-amber-300/60 shadow-md flex items-center space-x-1 text-amber-200 hover:text-white transition-all cursor-pointer"
                      title="Pause Video"
                    >
                      <Pause className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span className="text-[9px] font-cinzel font-semibold tracking-wide">Pause</span>
                    </button>
                  )}

                  {/* Slim Golden Progress Indicator */}
                  {hasStarted && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50 pointer-events-none z-10">
                      <div 
                        style={{ width: `${progress}%` }} 
                        className="h-full bg-gradient-to-r from-amber-300 via-pink-400 to-amber-300 transition-all duration-150"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 2. PLACEHOLDER / COMING SOON CARD (For Amma or pending entries) */}
              {isPlaceholder && (
                <div className="w-full h-full bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 flex flex-col items-center justify-center p-2 text-center">
                  <div className="flex flex-col items-center justify-center space-y-1.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300/30 via-purple-300/30 to-amber-400/30 border border-amber-300/50 flex items-center justify-center shadow-[0_0_15px_rgba(216,180,254,0.4)]">
                      <Sparkles className="w-4 h-4 text-amber-200" />
                    </div>
                    <div>
                      <p className="text-xs font-cinzel font-bold text-amber-200 tracking-wide">
                        {friendName}'s Wish
                      </p>
                      <p className="text-[9px] text-purple-200/80 font-sans">
                        Video Arriving Soon ✨
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Shimmer Vignette */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.65)] rounded-sm" />
            </div>
          </div>
        </div>

        {/* Bottom Filigree Label & External Drive Link */}
        <div className="mt-1 flex items-center justify-between px-1 gap-1 text-[10px]">
          <span className="text-purple-950 font-cinzel font-bold tracking-wide flex items-center space-x-1 min-w-0">
            <Sparkles className="w-2.5 h-2.5 text-amber-700 shrink-0" />
            <span className="truncate">{friendName} • <span className="font-sans text-[9px] font-semibold text-purple-900">{role}</span></span>
          </span>

          <div className="flex items-center space-x-1.5 shrink-0">
            {hasValidDriveId && (
              <a 
                href={driveDirectUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-950 hover:text-purple-700 bg-amber-200/90 hover:bg-amber-300 px-1.5 py-0.5 rounded text-[9px] font-cinzel font-bold flex items-center space-x-0.5 shadow-xs transition-colors shrink-0"
                title="Open in Google Drive"
              >
                <span>Drive ↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

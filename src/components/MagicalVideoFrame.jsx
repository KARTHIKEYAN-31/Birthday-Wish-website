import React, { useState } from 'react';
import { Play, ExternalLink, Sparkles, Film, Crown } from 'lucide-react';

export default function MagicalVideoFrame({
  driveFileId,
  fallbackVideo,
  friendName,
  role,
}) {
  const [isPlayingFallback, setIsPlayingFallback] = useState(false);
  const [hasError, setHasError] = useState(false);

  const driveEmbedUrl = `https://drive.google.com/file/d/${driveFileId}/preview`;
  const driveDirectUrl = `https://drive.google.com/file/d/${driveFileId}/view?usp=sharing`;
  const isPlaceholder = !driveFileId || driveFileId.includes('example');

  return (
    <div className="relative group w-full my-2">
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
            <span className="text-[8px] font-cinzel font-bold text-purple-950 uppercase tracking-wider">
              Enchanted Message
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
            {/* Video Container (16:9 Aspect Ratio) */}
            <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-black flex items-center justify-center">
              {!isPlaceholder && !hasError ? (
                <iframe
                  src={driveEmbedUrl}
                  title={`${friendName}'s birthday video`}
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  onError={() => setHasError(true)}
                />
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
                      <button
                        onClick={() => setIsPlayingFallback(true)}
                        className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300 via-purple-300 to-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(216,180,254,0.8)] hover:scale-110 transition-transform cursor-pointer"
                        title="Click to play birthday message"
                      >
                        <Play className="w-4 h-4 ml-0.5 fill-purple-950 text-purple-950" />
                      </button>
                      <div>
                        <p className="text-xs font-cinzel font-bold text-amber-200 tracking-wide">
                          {friendName}'s Message
                        </p>
                        <p className="text-[9px] text-purple-200/80 font-sans">
                          {isPlaceholder ? "Sample Video Ready • Click Play" : "Click to view video"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Shimmer Vignette */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.65)] rounded-sm" />
            </div>
          </div>
        </div>

        {/* Bottom Filigree Label & External Drive Link */}
        <div className="mt-1 flex items-center justify-between px-1 text-[10px]">
          <span className="text-purple-950 font-cinzel font-bold tracking-wide flex items-center space-x-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-700" />
            <span>{friendName} • <span className="font-sans text-[9px] font-semibold text-purple-900">{role}</span></span>
          </span>

          <div className="flex items-center space-x-1.5">
            {!isPlaceholder && (
              <a 
                href={driveDirectUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-950 hover:text-purple-700 bg-amber-200/90 hover:bg-amber-300 px-1.5 py-0.5 rounded text-[9px] font-cinzel font-bold flex items-center space-x-0.5 shadow-xs transition-colors"
                title="Open in Google Drive"
              >
                <span>Drive ↗</span>
              </a>
            )}

            {isPlaceholder && fallbackVideo && (
              <button
                onClick={() => setIsPlayingFallback(!isPlayingFallback)}
                className="text-purple-950 font-sans font-bold text-[9px] underline hover:text-purple-800"
              >
                {isPlayingFallback ? 'Reset' : 'Play Sample'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

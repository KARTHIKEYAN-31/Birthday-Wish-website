import React, { useState, useMemo } from 'react';
import Book from './components/Book';
import FairytaleSkyBackground from './components/FairytaleSkyBackground';
import { BOOK_DATA } from './config/data';
import { sound } from './utils/audio';
import {
  Volume2, VolumeX, Music, Info, X,
  Sparkles, Maximize2, Minimize2,
} from 'lucide-react';

export default function App() {
  const friendName = BOOK_DATA.friendName;
  const [isMuted, setIsMuted] = useState(false);
  const [isAmbient, setIsAmbient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Floating magical fairytale dust motes (memoized to avoid regenerating on state toggles)
  const dust = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    dur: Math.random() * 12 + 10,
    delay: Math.random() * 8,
    size: Math.random() * 3 + 2,
    opacity: Math.random() * 0.45 + 0.25,
  })), []);

  const toggleMute = () => { 
    setIsMuted(sound.toggleMute()); 
    if (isMuted) setIsAmbient(false); 
  };

  const toggleMusic = () => {
    if (isAmbient) { 
      sound.stopAmbientMusic(); 
      setIsAmbient(false); 
    } else { 
      sound.startAmbientMusic(); 
      setIsAmbient(true); 
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col justify-between lilac-fantasy-bg select-none">
      
      {/* ── Enchanting Fairytale Night Sky Background: Moon, Stars, Constellations & Clouds ── */}
      <FairytaleSkyBackground />

      {/* Floating Fairytale Dust Particles */}
      {dust.map((d) => (
        <div 
          key={d.id} 
          className="dust-mote"
          style={{
            left: d.left,
            width: d.size, 
            height: d.size,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
            opacity: d.opacity,
          }} 
        />
      ))}

      {/* ── Top Bar ──────────────────────────────────────── */}
      <header className="relative z-50 flex items-center justify-between px-3 sm:px-5 py-1.5 sm:py-2 bg-purple-950/60 backdrop-blur-md border-b border-purple-500/20 shadow-xs shrink-0">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-purple-300 via-pink-300 to-amber-300 flex items-center justify-center shadow-xs">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-950" />
          </div>
          <div>
            <span className="font-cinzel font-bold text-xs sm:text-base text-amber-200 tracking-wider">
              The Princess Chronicles
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-1.5">
          <ToolBtn onClick={toggleMusic} active={isAmbient} title={isAmbient ? 'Pause Fairy Music' : 'Play Fairy Music'}>
            <Music className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </ToolBtn>
          <ToolBtn onClick={toggleMute} title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}>
            {isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />}
          </ToolBtn>
          <ToolBtn onClick={() => setShowInfo(true)} title="Google Drive Video Setup">
            <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </ToolBtn>
          <ToolBtn onClick={toggleFullscreen} title="Toggle Fullscreen">
            {isFullscreen ? <Minimize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          </ToolBtn>
        </div>
      </header>

      {/* ── Main Book Stage Container (Zero Scroll, Pure Centered View) ─────────────────── */}
      <main className="relative z-10 flex-1 flex items-center justify-center overflow-hidden px-1 sm:px-2 py-0.5 sm:py-1">
        <Book friendName={friendName} />
      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="relative z-10 py-1 text-center text-[8.5px] sm:text-[10px] text-purple-300/70 font-sans border-t border-purple-900/40 backdrop-blur-xs shrink-0">
        Handcrafted with ♥ for {friendName}
      </footer>

      {/* ── Information Modal ───────────────────────────────────────── */}
      {showInfo && (
        <Modal onClose={() => setShowInfo(false)} title="Google Drive Video Setup Guide">
          <div className="text-xs text-purple-200/90 space-y-2.5 leading-relaxed font-sans">
            <div className="p-2.5 rounded-lg bg-purple-900/60 border border-purple-500/40">
              <p className="font-semibold text-amber-300 mb-0.5 font-cinzel">1. Google Drive Sharing Link:</p>
              <p>Upload your friends' birthday videos to Google Drive, right-click → <strong>Share</strong> → set access to <strong>"Anyone with the link can view"</strong>.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-purple-900/60 border border-purple-500/40">
              <p className="font-semibold text-amber-300 mb-0.5 font-cinzel">2. Insert File IDs in <code className="text-amber-300">src/config/data.js</code>:</p>
              <p>Replace the <code className="text-amber-200">driveFileId</code> values for Adhavan, John Sam, PK, and Karthikeyan. The friend's name can also be changed in <code className="text-amber-200">src/config/data.js</code>.</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-400/40 text-amber-200 text-[11px]">
              <p>✨ <strong>Note:</strong> When testing or if the Google Drive ID is a placeholder, you can click "Play Sample" to watch working demo videos right inside the frame!</p>
            </div>
          </div>
          <button 
            onClick={() => setShowInfo(false)}
            className="mt-3 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-300 via-purple-300 to-amber-300 text-purple-950 font-cinzel font-bold text-xs uppercase w-full shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
          >
            Got It
          </button>
        </Modal>
      )}

    </div>
  );
}

function ToolBtn({ children, onClick, active, title }) {
  return (
    <button 
      onClick={onClick} 
      title={title}
      className={`p-1.5 rounded-full border transition-all cursor-pointer ${
        active
          ? 'bg-gradient-to-r from-amber-300 to-purple-300 text-purple-950 border-amber-300 shadow-[0_0_10px_rgba(216,180,254,0.8)] scale-105'
          : 'bg-purple-900/60 hover:bg-purple-800 text-purple-200 border-purple-600/50 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-purple-950 border-2 border-purple-400/60 shadow-[0_0_40px_rgba(168,85,247,0.4)] text-purple-100">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-purple-300 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-cinzel font-bold text-amber-200 mb-3 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{title}</span>
        </h3>
        {children}
      </div>
    </div>
  );
}

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Page from './Page';
import PopUpElement from './PopUpElement';
import FantasyFrontCover from './FantasyFrontCover';
import DisneyFairytaleBackCover from './DisneyFairytaleBackCover';
import { BOOK_DATA } from '../config/data';
import { sound } from '../utils/audio';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Crown
} from 'lucide-react';

/*
 * High-End 3D Disney Princess Storybook Engine:
 * - Mobile & Tablet Responsive:
 *   - Auto-scales dynamically based on viewport dimensions (portrait, landscape, mobile, tablet, desktop).
 *   - Fits 100% inside screen width with zero horizontal scrollbars or page cuts.
 *   - Touch swipe gestures: Swipe left to turn forward, swipe right to turn back.
 * - Supports any number of friends (4, 10, 30, 50+ friends!) dynamically from BOOK_DATA.pages!
 * - Dual-page spreads: 2 friends per spread.
 * - Smooth Animation Choreography:
 *   - Opening from Cover/Finale: Tome slides to spine -> cover swings open over clean parchment -> page content & 3D pop-up appear!
 *   - Closing to Cover/Finale: Page content disappears FIRST -> cover swings shut over clean paper -> tome glides to center!
 *   - Between dual-page spreads: Pop-up folds down, page leaf flips 3D, new pop-up & content appear.
 *   - Direct Cover <-> Finale: 3D book turnover flip!
 */

const W = 390; // Canonical single page width
const H = 530; // Canonical page height

const SLIDE_TIME = 460;     // ms for closed book to slide right/left
const SWING_TIME = 850;     // ms for front/back cover 3D swing
const FADE_OUT_TIME = 240;  // ms for page content to disappear before book closes
const FLIP_TIME = 800;      // ms for intermediate dual page turns
const SPIN_TIME = 750;      // ms for direct 3D closed book flip (Cover <-> Finale)

export default function Book({ friendName }) {
  // Support dynamic list of friends from data.js
  const pages = BOOK_DATA.pages || [
    BOOK_DATA.page1,
    BOOK_DATA.page2,
    BOOK_DATA.page3,
    BOOK_DATA.page4,
  ];
  
  // Total dual-page spreads needed for all friends (e.g. 30 friends = 15 spreads)
  const totalPageSpreads = Math.max(1, Math.ceil(pages.length / 2));
  const finaleSpreadIndex = totalPageSpreads + 1;

  const [currentSpread, setCurrentSpread] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pageContentVisible, setPageContentVisible] = useState(false);
  const [popupFolded, setPopupFolded] = useState(false);
  const [turningLeaf, setTurningLeaf] = useState(null); // { from, to, dir }
  const [mobileScale, setMobileScale] = useState(1);
  
  // Transition state machine:
  // 'idle'
  // | 'sliding-right' | 'swinging-open'
  // | 'swinging-closed' | 'sliding-center'
  // | 'closing-to-finale' | 'sliding-finale-center'
  // | 'sliding-finale-spine' | 'opening-from-finale'
  // | 'spinning-to-finale' | 'spinning-to-cover'
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const [targetOpenSpread, setTargetOpenSpread] = useState(1);
  
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const bookContainerRef = useRef(null);

  // Touch swipe coordinates for mobile
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // ── Responsive Mobile Scale Calculation ──────────────────────
  useEffect(() => {
    const updateScale = () => {
      if (typeof window === 'undefined') return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Available vertical space reserving header and bottom navigation
      const reservedH = vw < 640 ? 95 : 120;
      const availableH = Math.max(260, vh - reservedH);
      const availableW = Math.max(280, vw - (vw < 640 ? 12 : 28));

      const isClosed = currentSpread === 0 || currentSpread === finaleSpreadIndex;

      let targetScale = 1;
      if (isClosed) {
        // Closed single tome (width = 390px)
        const scaleW = availableW / (W + 24);
        const scaleH = availableH / (H + 20);
        targetScale = Math.min(scaleW, scaleH, 1);
      } else {
        // Open dual-page spread (width = 780px)
        const scaleW = availableW / (W * 2 + 16);
        const scaleH = availableH / (H + 20);
        targetScale = Math.min(scaleW, scaleH, 1);
      }

      setMobileScale(Math.max(0.38, targetScale));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    window.addEventListener('orientationchange', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('orientationchange', updateScale);
    };
  }, [currentSpread, finaleSpreadIndex]);

  // Subtle 3D mouse parallax tilt (desktop only)
  const handleMouseMove = (e) => {
    if (!bookContainerRef.current || window.innerWidth < 768) return;
    const rect = bookContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -(y * 5),
      y: x * 7,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const canGoNext = currentSpread < finaleSpreadIndex && !isAnimating;
  const canGoPrev = currentSpread > 0 && !isAnimating;

  // Helper to get friend data for any spread and side
  const getSpreadPages = (spreadIdx) => {
    const leftIdx = (spreadIdx - 1) * 2;
    const rightIdx = leftIdx + 1;
    return {
      leftPageNumber: leftIdx + 1,
      leftFriend: pages[leftIdx],
      rightPageNumber: rightIdx + 1,
      rightFriend: pages[rightIdx] || {
        name: "Cherished Friend",
        title: "Fairytale Companion",
        role: "Friend",
        message: "Wishing you a magical journey filled with endless laughter and memories!",
        quote: "“Fairytales are real when shared with friends.”",
        badge: "Royal Keepsake",
      },
    };
  };

  // ── Open from Front Cover (Spread 0 -> Spread 1..N) ───────────
  const handleOpenBook = useCallback((target = 1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTargetOpenSpread(target);
    setPageContentVisible(false); // Pages start blank until opened
    
    // Step 1: Slide closed book right to center spine
    setTransitionPhase('sliding-right');
    
    setTimeout(() => {
      // Step 2: Swing cover open over clean parchment
      sound.playBookOpen();
      setTransitionPhase('swinging-open');
      
      setTimeout(() => {
        // Step 3: Land on target spread, then reveal page content
        setCurrentSpread(target);
        setTransitionPhase('idle');
        setIsAnimating(false);
        setTimeout(() => setPageContentVisible(true), 60);
      }, SWING_TIME);
      
    }, SLIDE_TIME);
  }, [isAnimating]);

  // ── Close from Open Spread to Front Cover (Spread 1..N -> 0) ──
  // Rule: Page content disappears FIRST, then the animation of close happens!
  const handleCloseToCover = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Step 1: The page content & pop-up disappear FIRST!
    setPageContentVisible(false);
    setPopupFolded(true);

    setTimeout(() => {
      // Step 2: THEN the cover swings closed 3D over clean parchment!
      sound.playPageTurn();
      setTransitionPhase('swinging-closed');

      setTimeout(() => {
        // Step 3: THEN the closed book glides to center!
        setTransitionPhase('sliding-center');

        setTimeout(() => {
          setCurrentSpread(0);
          setTransitionPhase('idle');
          setPopupFolded(false);
          setIsAnimating(false);
        }, SLIDE_TIME);

      }, SWING_TIME);

    }, FADE_OUT_TIME);
  }, [isAnimating]);

  // ── Close from Open Spread to Finale (Spread 1..N -> Finale) ──
  // Rule: Page content disappears FIRST, then the animation of close happens!
  const handleCloseToFinale = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Step 1: The page content & pop-up disappear FIRST!
    setPageContentVisible(false);
    setPopupFolded(true);

    setTimeout(() => {
      // Step 2: THEN the right leaf swings closed to the left onto the back cover!
      sound.playPageTurn();
      setTransitionPhase('closing-to-finale');

      setTimeout(() => {
        // Step 3: THEN the closed back cover slides to center!
        setTransitionPhase('sliding-finale-center');

        setTimeout(() => {
          setCurrentSpread(finaleSpreadIndex);
          setTransitionPhase('idle');
          setPopupFolded(false);
          setIsAnimating(false);
        }, SLIDE_TIME);

      }, SWING_TIME);

    }, FADE_OUT_TIME);
  }, [isAnimating, finaleSpreadIndex]);

  // ── Open from Finale to a Spread (Finale -> Spread 1..N) ───────
  const handleOpenFromFinale = useCallback((target = totalPageSpreads) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTargetOpenSpread(target);
    setPageContentVisible(false); // Pages start blank until opened

    // Step 1: Slide back cover to spine position
    setTransitionPhase('sliding-finale-spine');

    setTimeout(() => {
      // Step 2: Swing back leaf open over blank parchment
      sound.playBookOpen();
      setTransitionPhase('opening-from-finale');

      setTimeout(() => {
        // Step 3: Land on target spread, then reveal page content
        setCurrentSpread(target);
        setTransitionPhase('idle');
        setIsAnimating(false);
        setTimeout(() => setPageContentVisible(true), 60);
      }, SWING_TIME);

    }, SLIDE_TIME);
  }, [isAnimating, totalPageSpreads]);

  // ── Direct 3D Spin between Front Cover & Back Cover (0 <-> Finale) ──
  const handleSpinCoverToFinale = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPageContentVisible(false);
    sound.playPageTurn();
    setTransitionPhase('spinning-to-finale');

    setTimeout(() => {
      setCurrentSpread(finaleSpreadIndex);
      setTransitionPhase('idle');
      setIsAnimating(false);
    }, SPIN_TIME);
  }, [isAnimating, finaleSpreadIndex]);

  const handleSpinFinaleToCover = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPageContentVisible(false);
    sound.playPageTurn();
    setTransitionPhase('spinning-to-cover');

    setTimeout(() => {
      setCurrentSpread(0);
      setTransitionPhase('idle');
      setIsAnimating(false);
    }, SPIN_TIME);
  }, [isAnimating]);

  // ── Turn between Dual Pages (Spread S <-> S + 1) ───────────────
  const executeSpreadTransition = useCallback((nextSpread, dir) => {
    setIsAnimating(true);
    setPopupFolded(true); // Pop-up folds flat into crease

    setTimeout(() => {
      sound.playPageTurn();
      setTurningLeaf({ from: currentSpread, to: nextSpread, dir });

      // Mid-flip: Swap underlying page data as the leaf crosses 90 degrees
      setTimeout(() => {
        setCurrentSpread(nextSpread);
      }, FLIP_TIME * 0.48);

      // Finish flip: End leaf animation & unfold new popup
      setTimeout(() => {
        setTurningLeaf(null);
        setPopupFolded(false);
        setIsAnimating(false);
      }, FLIP_TIME);

    }, 200);
  }, [currentSpread]);

  // ── Navigation Triggers ───────────────────────────────────────
  const goToNext = useCallback(() => {
    if (!canGoNext) return;
    if (currentSpread === 0) {
      handleOpenBook(1);
    } else if (currentSpread < totalPageSpreads) {
      executeSpreadTransition(currentSpread + 1, 'forward');
    } else if (currentSpread === totalPageSpreads) {
      handleCloseToFinale();
    }
  }, [canGoNext, currentSpread, totalPageSpreads, handleOpenBook, executeSpreadTransition, handleCloseToFinale]);

  const goToPrev = useCallback(() => {
    if (!canGoPrev) return;
    if (currentSpread === 1) {
      handleCloseToCover();
    } else if (currentSpread > 1 && currentSpread <= totalPageSpreads) {
      executeSpreadTransition(currentSpread - 1, 'backward');
    } else if (currentSpread === finaleSpreadIndex) {
      handleOpenFromFinale(totalPageSpreads);
    }
  }, [canGoPrev, currentSpread, totalPageSpreads, finaleSpreadIndex, handleCloseToCover, executeSpreadTransition, handleOpenFromFinale]);

  const jumpToSpread = (targetSpread) => {
    if (isAnimating || targetSpread === currentSpread) return;

    // Direct Cover <-> Finale flip
    if (currentSpread === 0 && targetSpread === finaleSpreadIndex) {
      handleSpinCoverToFinale();
      return;
    }
    if (currentSpread === finaleSpreadIndex && targetSpread === 0) {
      handleSpinFinaleToCover();
      return;
    }

    // Cover -> Open Spread
    if (currentSpread === 0 && targetSpread > 0) {
      handleOpenBook(targetSpread);
      return;
    }

    // Finale -> Open Spread
    if (currentSpread === finaleSpreadIndex && targetSpread < finaleSpreadIndex) {
      handleOpenFromFinale(targetSpread);
      return;
    }

    // Open Spread -> Cover (0): Page content disappears FIRST, then close animation happens
    if (targetSpread === 0) {
      handleCloseToCover();
      return;
    }

    // Open Spread -> Finale: Page content disappears FIRST, then close animation happens
    if (targetSpread === finaleSpreadIndex) {
      handleCloseToFinale();
      return;
    }

    // Between Spreads
    const dir = targetSpread > currentSpread ? 'forward' : 'backward';
    executeSpreadTransition(targetSpread, dir);
  };

  // ── Touch Swipe Gesture Handlers for Mobile ──────────────────
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe threshold of 45px, predominantly horizontal
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        goToNext(); // Swiped left -> Next page
      } else {
        goToPrev(); // Swiped right -> Previous page
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goToNext, goToPrev]);

  // Confetti burst on finale
  useEffect(() => {
    if (currentSpread === finaleSpreadIndex) {
      sound.playSparkle();
      const end = Date.now() + 3500;
      const colors = ['#c084fc', '#d4af37', '#f472b6', '#e9d5ff', '#fbbf24', '#ffffff', '#a855f7'];
      const frame = () => {
        confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors });
        confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [currentSpread, finaleSpreadIndex]);

  // Current active spread page data
  const activeSpreadData = currentSpread >= 1 && currentSpread <= totalPageSpreads
    ? getSpreadPages(currentSpread)
    : getSpreadPages(1);

  // Target spread page data for opening transitions
  const targetSpreadData = getSpreadPages(targetOpenSpread);
  const lastSpreadData = getSpreadPages(totalPageSpreads);

  return (
    <div 
      ref={bookContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-1 select-none"
    >
      {/* ── 3D Stage Container with Dynamic Responsive Mobile Scaling ── */}
      {/* ── Outside-the-Book Side Navigation Arrows (Floating Chevrons) ── */}
      <div className="absolute left-0 sm:left-2 md:-left-12 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={goToPrev}
          disabled={!canGoPrev}
          aria-label="Previous Page"
          className={`p-2.5 sm:p-3 rounded-full bg-purple-950/85 hover:bg-purple-900 border border-amber-300/70 shadow-lg text-amber-200 hover:scale-110 active:scale-95 transition-all backdrop-blur-md cursor-pointer ${
            canGoPrev ? "opacity-90 hover:opacity-100" : "opacity-0 pointer-events-none"
          }`}
          title="Previous Page"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="absolute right-0 sm:right-2 md:-right-12 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={goToNext}
          disabled={!canGoNext}
          aria-label="Next Page"
          className={`p-2.5 sm:p-3 rounded-full bg-purple-950/85 hover:bg-purple-900 border border-amber-300/70 shadow-lg text-amber-200 hover:scale-110 active:scale-95 transition-all backdrop-blur-md cursor-pointer ${
            canGoNext ? "opacity-90 hover:opacity-100" : "opacity-0 pointer-events-none"
          }`}
          title="Next Page"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <motion.div 
        className="book-stage flex items-center justify-center relative origin-center"
        style={{ minHeight: H + 20 }}
        animate={{ 
          scale: mobileScale,
          rotateX: tilt.x, 
          rotateY: tilt.y 
        }}
        transition={{ 
          scale: { duration: 0.35, ease: 'easeOut' },
          rotateX: { type: 'spring', stiffness: 90, damping: 20 },
          rotateY: { type: 'spring', stiffness: 90, damping: 20 }
        }}
      >

        {/* ========================================================================= */}
        {/* CASE 0: DIRECT 3D BOOK TURNOVER FLIP (Cover <-> Finale)                   */}
        {/* ========================================================================= */}
        {(transitionPhase === 'spinning-to-finale' || transitionPhase === 'spinning-to-cover') && (
          <motion.div
            key="direct-spin-flipper"
            className="relative preserve-3d book-ambient-shadow rounded-2xl border-4 border-amber-300"
            style={{ width: W, height: H }}
            initial={{ rotateY: transitionPhase === 'spinning-to-finale' ? 0 : 180, scale: 0.96 }}
            animate={{ rotateY: transitionPhase === 'spinning-to-finale' ? 180 : 0, scale: 1 }}
            transition={{ duration: SPIN_TIME / 1000, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Front Face: Disney Princess Front Cover */}
            <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl">
              <FantasyFrontCover friendName={friendName || BOOK_DATA.friendName} />
            </div>

            {/* Back Face: Disney Princess Back Cover */}
            <div 
              className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <DisneyFairytaleBackCover onReplay={() => jumpToSpread(0)} />
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* CASE 1: CLOSED FRONT COVER (Idle centered or sliding right / left)        */}
        {/* ========================================================================= */}
        {((currentSpread === 0 && transitionPhase === 'idle') ||
          transitionPhase === 'sliding-right' ||
          transitionPhase === 'sliding-center') && (
          <motion.div
            key="closed-front-cover"
            onClick={transitionPhase === 'idle' ? () => handleOpenBook(1) : undefined}
            initial={transitionPhase === 'sliding-center' ? { x: W / 2 } : { x: 0, scale: 0.96, opacity: 0 }}
            animate={{
              x: transitionPhase === 'sliding-right' ? W / 2 : 0,
              scale: 1,
              opacity: 1,
            }}
            transition={{
              x: { duration: SLIDE_TIME / 1000, ease: [0.32, 0, 0.2, 1] },
              scale: { duration: 0.4 },
              opacity: { duration: 0.4 },
            }}
            className="relative cursor-pointer group rounded-r-2xl rounded-l-md border-4 border-amber-300 shadow-2xl book-ambient-shadow transform hover:scale-[1.015] transition-transform duration-300 preserve-3d"
            style={{ width: W, height: H }}
          >
            {/* 3D Spine on Left */}
            <div className="absolute -left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-purple-950 via-purple-900 to-transparent rounded-l-md flex flex-col justify-around py-10 pointer-events-none z-30">
              <div className="spine-rib-band h-2 w-full" />
              <div className="spine-rib-band h-2 w-full" />
              <div className="spine-rib-band h-2 w-full" />
              <div className="spine-rib-band h-2 w-full" />
            </div>

            {/* Gilded Page Edges Stack on Right & Bottom */}
            <div className="absolute -right-3.5 top-3 bottom-3 w-3.5 page-edges-gilded-right rounded-r-sm pointer-events-none z-20" />
            <div className="absolute -bottom-3.5 left-5 right-2 h-3.5 page-edges-gilded-bottom rounded-b-sm pointer-events-none z-20" />

            {/* Disney Fairytale Front Cover Component */}
            <FantasyFrontCover friendName={friendName || BOOK_DATA.friendName} />

            {/* Silk Bookmark Ribbon Hanging from Cover */}
            <div 
              className="absolute -bottom-7 left-16 w-5 h-14 shadow-lg pointer-events-none z-30"
              style={{
                background: 'linear-gradient(to bottom, #a855f7, #ec4899, #eab308)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
              }}
            />
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* CASE 2: COVER SWINGING OPEN (Phase 2 of open: 0deg -> -180deg)            */}
        {/* ========================================================================= */}
        {transitionPhase === 'swinging-open' && (
          <div 
            className="relative book-ambient-shadow rounded-xl flex items-center justify-center border-4 border-amber-300/80"
            style={{ width: W * 2, height: H, transformStyle: 'flat' }}
          >
            <div className="absolute inset-0 leather-lilac rounded-xl pointer-events-none -m-2 z-0" />
            <div className="absolute left-1/2 top-0 bottom-0 w-14 -translate-x-1/2 spine-center-shadow z-20 pointer-events-none" />

            {/* Silk Bookmark Ribbon */}
            <div 
              className="absolute left-1/2 top-0 w-5 h-16 -translate-x-1/2 shadow-xl z-30 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, #d8b4fe, #ec4899, #eab308)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)',
              }}
            />

            {/* Left Page (Blank parchment during swing open) */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 rounded-l-lg overflow-hidden z-10">
              <Page 
                pageNumber={targetSpreadData.leftPageNumber} 
                position="left" 
                friendData={targetSpreadData.leftFriend}
                contentVisible={false}
              />
            </div>

            {/* Right Page (Blank parchment during swing open) */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 rounded-r-lg overflow-hidden z-10">
              <Page 
                pageNumber={targetSpreadData.rightPageNumber} 
                position="right" 
                friendData={targetSpreadData.rightFriend}
                contentVisible={false}
              />
            </div>

            {/* The Front Cover Leaf Swinging Open from right (0deg) to left (-180deg) */}
            <motion.div
              className="absolute top-0 bottom-0 w-1/2 preserve-3d z-40 rounded-r-lg"
              style={{
                left: '50%',
                transformOrigin: 'left center',
              }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: -180 }}
              transition={{ duration: SWING_TIME / 1000, ease: [0.45, 0.05, 0.2, 1] }}
            >
              {/* Front Face: Disney Princess Cover */}
              <div className="absolute inset-0 backface-hidden rounded-r-lg overflow-hidden shadow-2xl">
                <FantasyFrontCover friendName={friendName || BOOK_DATA.friendName} />
              </div>

              {/* Back Face: Inside Endpaper on Left */}
              <div 
                className="absolute inset-0 backface-hidden parchment-lilac rounded-l-lg overflow-hidden shadow-2xl border-r border-purple-300 p-6 flex flex-col justify-center items-center text-center"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <Sparkles className="w-8 h-8 text-purple-400/50 mb-2 animate-pulse" />
                <p className="text-xs font-cinzel font-bold text-purple-900 tracking-widest">
                  THE FAIRYTALE OPENS
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 3: COVER SWINGING CLOSED (Phase 2 of close: -180deg -> 0deg)         */}
        {/* ========================================================================= */}
        {transitionPhase === 'swinging-closed' && (
          <div 
            className="relative book-ambient-shadow rounded-xl flex items-center justify-center border-4 border-amber-300/80"
            style={{ width: W * 2, height: H, transformStyle: 'flat' }}
          >
            <div className="absolute inset-0 leather-lilac rounded-xl pointer-events-none -m-2 z-0" />
            <div className="absolute left-1/2 top-0 bottom-0 w-14 -translate-x-1/2 spine-center-shadow z-20 pointer-events-none" />

            {/* Left Page (Blank parchment during swing closed) */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 rounded-l-lg overflow-hidden z-10">
              <Page pageNumber={1} position="left" friendData={pages[0]} contentVisible={false} />
            </div>

            {/* Right Page (Blank parchment during swing closed) */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 rounded-r-lg overflow-hidden z-10">
              <Page pageNumber={2} position="right" friendData={pages[1]} contentVisible={false} />
            </div>

            {/* The Front Cover Leaf Swinging Closed from left (-180deg) to right (0deg) */}
            <motion.div
              className="absolute top-0 bottom-0 w-1/2 preserve-3d z-40 rounded-r-lg"
              style={{
                left: '50%',
                transformOrigin: 'left center',
              }}
              initial={{ rotateY: -180 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: SWING_TIME / 1000, ease: [0.45, 0.05, 0.2, 1] }}
            >
              <div className="absolute inset-0 backface-hidden rounded-r-lg overflow-hidden shadow-2xl">
                <FantasyFrontCover friendName={friendName || BOOK_DATA.friendName} />
              </div>

              <div 
                className="absolute inset-0 backface-hidden parchment-lilac rounded-l-lg overflow-hidden shadow-2xl border-r border-purple-300 p-6 flex flex-col justify-center items-center text-center"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <Sparkles className="w-8 h-8 text-purple-400/50 mb-2 animate-pulse" />
              </div>
            </motion.div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 4: CLOSING TO FINALE (Last Spread -> Back Cover)                     */}
        {/* ========================================================================= */}
        {transitionPhase === 'closing-to-finale' && (
          <div 
            className="relative book-ambient-shadow rounded-xl flex items-center justify-center border-4 border-amber-300/80"
            style={{ width: W * 2, height: H, transformStyle: 'flat' }}
          >
            <div className="absolute inset-0 leather-lilac rounded-xl pointer-events-none -m-2 z-0" />
            <div className="absolute left-1/2 top-0 bottom-0 w-14 -translate-x-1/2 spine-center-shadow z-20 pointer-events-none" />

            {/* Left Page (Blank parchment during close) */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 rounded-l-lg overflow-hidden z-10">
              <Page pageNumber={lastSpreadData.leftPageNumber} position="left" friendData={lastSpreadData.leftFriend} contentVisible={false} />
            </div>

            {/* Right Page (Blank parchment during close) */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 rounded-r-lg overflow-hidden z-10">
              <Page pageNumber={lastSpreadData.rightPageNumber} position="right" friendData={lastSpreadData.rightFriend} contentVisible={false} />
            </div>

            {/* The Right Leaf Swinging Closed to the left (0deg -> -180deg) */}
            <motion.div
              className="absolute top-0 bottom-0 w-1/2 preserve-3d z-40 rounded-r-lg"
              style={{
                left: '50%',
                transformOrigin: 'left center',
              }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: -180 }}
              transition={{ duration: SWING_TIME / 1000, ease: [0.45, 0.05, 0.2, 1] }}
            >
              <div className="absolute inset-0 backface-hidden rounded-r-lg overflow-hidden shadow-2xl">
                <Page pageNumber={lastSpreadData.rightPageNumber} position="right" friendData={lastSpreadData.rightFriend} contentVisible={false} />
              </div>

              <div 
                className="absolute inset-0 backface-hidden rounded-l-lg overflow-hidden shadow-2xl"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <DisneyFairytaleBackCover onReplay={() => jumpToSpread(0)} />
              </div>
            </motion.div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 5: OPENING FROM FINALE (Back Cover -> Last Spread)                   */}
        {/* ========================================================================= */}
        {transitionPhase === 'opening-from-finale' && (
          <div 
            className="relative book-ambient-shadow rounded-xl flex items-center justify-center border-4 border-amber-300/80"
            style={{ width: W * 2, height: H, transformStyle: 'flat' }}
          >
            <div className="absolute inset-0 leather-lilac rounded-xl pointer-events-none -m-2 z-0" />
            <div className="absolute left-1/2 top-0 bottom-0 w-14 -translate-x-1/2 spine-center-shadow z-20 pointer-events-none" />

            {/* Left Page (Blank parchment during open) */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 rounded-l-lg overflow-hidden z-10">
              <Page pageNumber={targetSpreadData.leftPageNumber} position="left" friendData={targetSpreadData.leftFriend} contentVisible={false} />
            </div>

            {/* Right Page (Blank parchment during open) */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 rounded-r-lg overflow-hidden z-10">
              <Page pageNumber={targetSpreadData.rightPageNumber} position="right" friendData={targetSpreadData.rightFriend} contentVisible={false} />
            </div>

            {/* The Back Leaf Swinging Open from left to right (-180deg -> 0deg) */}
            <motion.div
              className="absolute top-0 bottom-0 w-1/2 preserve-3d z-40 rounded-r-lg"
              style={{
                left: '50%',
                transformOrigin: 'left center',
              }}
              initial={{ rotateY: -180 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: SWING_TIME / 1000, ease: [0.45, 0.05, 0.2, 1] }}
            >
              <div className="absolute inset-0 backface-hidden rounded-r-lg overflow-hidden shadow-2xl">
                <Page pageNumber={targetSpreadData.rightPageNumber} position="right" friendData={targetSpreadData.rightFriend} contentVisible={false} />
              </div>

              <div 
                className="absolute inset-0 backface-hidden rounded-l-lg overflow-hidden shadow-2xl"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <DisneyFairytaleBackCover onReplay={() => jumpToSpread(0)} />
              </div>
            </motion.div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 6: OPEN DUAL-PAGE SPREADS (Spreads 1 to totalPageSpreads)            */}
        {/* ========================================================================= */}
        {currentSpread >= 1 && currentSpread <= totalPageSpreads && 
          transitionPhase === 'idle' && (
          <div
            className="relative book-ambient-shadow rounded-xl flex items-center justify-center border-4 border-amber-300/80"
            style={{ width: W * 2, height: H, transformStyle: 'flat' }}
          >
            {/* Hardcover Outer Leather Lip */}
            <div className="absolute inset-0 leather-lilac rounded-xl pointer-events-none -m-2 z-0" />

            {/* Gilded Edge Stacks on Left, Right & Bottom */}
            <div className="absolute -left-1.5 top-2 bottom-2 w-2 page-edges-gilded-right rounded-l-xs pointer-events-none z-10" />
            <div className="absolute -right-1.5 top-2 bottom-2 w-2 page-edges-gilded-right rounded-r-xs pointer-events-none z-10" />
            <div className="absolute bottom-0 left-2 right-2 h-2 page-edges-gilded-bottom pointer-events-none z-10" />

            {/* Center Spine Crease Shadow */}
            <div className="absolute left-1/2 top-0 bottom-0 w-14 -translate-x-1/2 spine-center-shadow z-20 pointer-events-none" />

            {/* Silk Bookmark Ribbon */}
            <div 
              className="absolute left-1/2 top-0 w-5 h-16 -translate-x-1/2 shadow-xl z-40 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, #d8b4fe, #ec4899, #eab308)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)',
              }}
            />

            {/* LEFT PAGE */}
            <div 
              className="relative w-1/2 h-full z-10 overflow-hidden rounded-l-lg" style={{ transformStyle: 'flat' }}
            >
              <Page 
                pageNumber={activeSpreadData.leftPageNumber} 
                position="left" 
                friendData={activeSpreadData.leftFriend} 
                contentVisible={pageContentVisible} 
              />
            </div>

            {/* RIGHT PAGE */}
            <div 
              className="relative w-1/2 h-full z-10 overflow-hidden rounded-r-lg" style={{ transformStyle: 'flat' }}
            >
              <Page 
                pageNumber={activeSpreadData.rightPageNumber} 
                position="right" 
                friendData={activeSpreadData.rightFriend} 
                contentVisible={pageContentVisible} 
              />
            </div>

            {/* ── 3D POP-UP ORIGAMI SCENES (Alternates between Balloon & Castle across spreads) ── */}
            <PopUpElement 
              spreadIndex={currentSpread} 
              folded={!pageContentVisible || popupFolded} 
            />

            {/* ── 3D TURNING LEAF SIMULATION (Turns over folded popups) ── */}
            {turningLeaf && (
              <motion.div
                key={`flip-leaf-${turningLeaf.from}-${turningLeaf.to}`}
                className="absolute top-0 bottom-0 w-1/2 preserve-3d z-50 pointer-events-none rounded-r-lg"
                style={{
                  left: '50%',
                  transformOrigin: 'left center',
                }}
                initial={{ rotateY: turningLeaf.dir === 'forward' ? 0 : -180 }}
                animate={{ rotateY: turningLeaf.dir === 'forward' ? -180 : 0 }}
                transition={{ duration: FLIP_TIME / 1000, ease: [0.4, 0.0, 0.2, 1] }}
              >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden parchment-lilac shadow-2xl rounded-r-lg border-l border-purple-300 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-purple-400/40 animate-pulse" />
                </div>

                {/* Back Face */}
                <div 
                  className="absolute inset-0 backface-hidden parchment-lilac shadow-2xl rounded-l-lg border-r border-purple-300 flex items-center justify-center"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <Sparkles className="w-8 h-8 text-purple-400/40 animate-pulse" />
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 7: FINALE / DISNEY BACK COVER (Spread finaleSpreadIndex)             */}
        {/* ========================================================================= */}
        {((currentSpread === finaleSpreadIndex && transitionPhase === 'idle') ||
          transitionPhase === 'sliding-finale-center' ||
          transitionPhase === 'sliding-finale-spine') && (
          <motion.div
            key="finale-back-cover"
            initial={transitionPhase === 'sliding-finale-center' ? { x: -W / 2 } : { x: 0, scale: 0.96 }}
            animate={{
              x: transitionPhase === 'sliding-finale-spine' ? -W / 2 : 0,
              scale: 1,
            }}
            transition={{
              x: { duration: SLIDE_TIME / 1000, ease: [0.32, 0, 0.2, 1] },
              scale: { duration: 0.4 },
            }}
            className="relative rounded-l-2xl rounded-r-md border-4 border-amber-300 shadow-2xl book-ambient-shadow preserve-3d"
            style={{ width: W, height: H }}
          >
            {/* 3D Spine on Right */}
            <div className="absolute -right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-purple-950 via-purple-900 to-transparent rounded-r-md flex flex-col justify-around py-10 pointer-events-none z-30">
              <div className="spine-rib-band h-2 w-full" />
              <div className="spine-rib-band h-2 w-full" />
              <div className="spine-rib-band h-2 w-full" />
              <div className="spine-rib-band h-2 w-full" />
            </div>

            {/* Gilded Page Edges Stack on Left & Bottom */}
            <div className="absolute -left-3.5 top-3 bottom-3 w-3.5 page-edges-gilded-right rounded-l-sm pointer-events-none z-20" />
            <div className="absolute -bottom-3.5 left-2 right-5 h-3.5 page-edges-gilded-bottom rounded-b-sm pointer-events-none z-20" />

            {/* The Disney Fairytale Back Cover Component */}
            <DisneyFairytaleBackCover onReplay={() => jumpToSpread(0)} />
          </motion.div>
        )}

      </motion.div>

      {/* ── Bottom Navigation Controls (Touch-Optimized for Mobile) ──────── */}
      <div className="mt-1 sm:mt-2.5 flex items-center space-x-1.5 sm:space-x-2 z-40 max-w-full px-1">
        <button 
          onClick={goToPrev} 
          disabled={!canGoPrev}
          className={`flex items-center space-x-0.5 sm:space-x-1 px-2.5 sm:px-3.5 py-1.5 rounded-full font-cinzel text-[11px] sm:text-xs font-bold transition-all border shrink-0 ${
            canGoPrev
              ? 'bg-purple-900/80 hover:bg-purple-800 text-amber-200 border-amber-300/70 shadow-md hover:scale-105 active:scale-95 cursor-pointer'
              : 'opacity-30 cursor-not-allowed bg-purple-950/40 border-purple-800/40 text-purple-400'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Spread Navigation Indicators (Touch-Scrollable Pill Bar) */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 bg-purple-950/85 px-2.5 sm:px-3 py-1 rounded-full border border-purple-600/60 shadow-md backdrop-blur-md overflow-x-auto max-w-[210px] sm:max-w-md md:max-w-xl no-scrollbar">
          {/* Cover Pill */}
          <button
            onClick={() => jumpToSpread(0)}
            className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-cinzel font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              currentSpread === 0
                ? 'bg-gradient-to-r from-amber-300 to-purple-300 text-purple-950 shadow-[0_0_10px_rgba(216,180,254,0.8)] scale-105'
                : 'text-purple-300 hover:text-amber-200'
            }`}
          >
            Cover
          </button>

          {/* Dynamic Dual-Page Spread Pills */}
          {Array.from({ length: totalPageSpreads }, (_, i) => {
            const spreadId = i + 1;
            const pStart = i * 2 + 1;
            const pEnd = i * 2 + 2;
            return (
              <button
                key={spreadId}
                onClick={() => jumpToSpread(spreadId)}
                className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-cinzel font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  currentSpread === spreadId
                    ? 'bg-gradient-to-r from-amber-300 to-purple-300 text-purple-950 shadow-[0_0_10px_rgba(216,180,254,0.8)] scale-105'
                    : 'text-purple-300 hover:text-amber-200'
                }`}
              >
                {`${pStart}-${pEnd}`}
              </button>
            );
          })}

          {/* Finale Pill */}
          <button
            onClick={() => jumpToSpread(finaleSpreadIndex)}
            className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-cinzel font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              currentSpread === finaleSpreadIndex
                ? 'bg-gradient-to-r from-amber-300 to-purple-300 text-purple-950 shadow-[0_0_10px_rgba(216,180,254,0.8)] scale-105'
                : 'text-purple-300 hover:text-amber-200'
            }`}
          >
            Finale
          </button>
        </div>

        <button 
          onClick={goToNext} 
          disabled={!canGoNext}
          className={`flex items-center space-x-0.5 sm:space-x-1 px-2.5 sm:px-3.5 py-1.5 rounded-full font-cinzel text-[11px] sm:text-xs font-bold transition-all border shrink-0 ${
            canGoNext
              ? 'bg-purple-900/80 hover:bg-purple-800 text-amber-200 border-amber-300/70 shadow-md hover:scale-105 active:scale-95 cursor-pointer'
              : 'opacity-30 cursor-not-allowed bg-purple-950/40 border-purple-800/40 text-purple-400'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

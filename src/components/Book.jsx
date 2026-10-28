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
  Sparkles,
} from 'lucide-react';

/*
 * High-End 3D Disney Princess Storybook Engine:
 * - Responsive Layout:
 *   - Desktop / Tablet (>= 768px): Grand 3D dual-page spreads (2 pages side-by-side) with
 *     center spine origami pop-up scenes and mechanical turning leaves.
 *   - Mobile (< 768px): Dedicated Single-Page Storybook view!
 *     Shows exactly ONE page at a time with full width, generous padding, crystal-clear
 *     video playback, and clean, fluid page-to-page navigation.
 * - Dynamic data from BOOK_DATA.pages.
 */

const W = 390; // Canonical single page width
const H = 530; // Canonical page height

const SLIDE_TIME = 460;     // ms for closed book to slide right/left
const SWING_TIME = 850;     // ms for front/back cover 3D swing
const FADE_OUT_TIME = 240;  // ms for page content to disappear before book closes
const FLIP_TIME = 800;      // ms for intermediate dual page turns
const SPIN_TIME = 750;      // ms for direct 3D closed book flip (Cover <-> Finale)

export default function Book({ friendName }) {
  const pages = BOOK_DATA.pages || [
    BOOK_DATA.page1,
    BOOK_DATA.page2,
    BOOK_DATA.page3,
    BOOK_DATA.page4,
  ];
  
  const totalPages = pages.length;
  // Total dual-page spreads needed for desktop (e.g. 10 friends = 5 spreads)
  const totalPageSpreads = Math.max(1, Math.ceil(totalPages / 2));
  const finaleSpreadIndex = totalPageSpreads + 1;

  // Desktop spread state (0: Cover, 1..totalPageSpreads: dual spreads, finaleSpreadIndex: Finale)
  const [currentSpread, setCurrentSpread] = useState(0);

  // Mobile single-page state (0: Cover, 1..totalPages: single pages, totalPages + 1: Finale)
  const [currentMobilePage, setCurrentMobilePage] = useState(0);
  const [mobileDirection, setMobileDirection] = useState(1); // 1 = forward, -1 = backward
  const [isMobile, setIsMobile] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);
  const [pageContentVisible, setPageContentVisible] = useState(false);
  const [popupFolded, setPopupFolded] = useState(false);
  const [turningLeaf, setTurningLeaf] = useState(null); // { from, to, dir }
  const [mobileScale, setMobileScale] = useState(1);
  
  // Transition state machine for desktop
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const [targetOpenSpread, setTargetOpenSpread] = useState(1);
  
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const bookContainerRef = useRef(null);

  // ── Mobile Breakpoint & Scale Detection ──────────────────────
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window === 'undefined') return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < 768;
      setIsMobile(mobile);

      // Available vertical space reserving header and bottom navigation
      const reservedH = vw < 640 ? 95 : 120;
      const availableH = Math.max(260, vh - reservedH);
      const availableW = Math.max(280, vw - (vw < 640 ? 12 : 28));

      let targetScale = 1;
      if (mobile) {
        // Mobile single page or cover (single width W + 20)
        const scaleW = availableW / (W + 20);
        const scaleH = availableH / (H + 20);
        targetScale = Math.min(scaleW, scaleH, 1.05);
      } else {
        const isClosed = currentSpread === 0 || currentSpread === finaleSpreadIndex;
        if (isClosed) {
          const scaleW = availableW / (W + 24);
          const scaleH = availableH / (H + 20);
          targetScale = Math.min(scaleW, scaleH, 1);
        } else {
          // Open dual-page spread (width = 780px)
          const scaleW = availableW / (W * 2 + 16);
          const scaleH = availableH / (H + 20);
          targetScale = Math.min(scaleW, scaleH, 1);
        }
      }

      setMobileScale(Math.max(0.45, targetScale));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('orientationchange', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
    };
  }, [currentSpread, currentMobilePage, finaleSpreadIndex]);

  // Sync mobile page with desktop spread when switching modes
  useEffect(() => {
    if (isMobile) {
      if (currentSpread === 0) {
        setCurrentMobilePage(0);
      } else if (currentSpread === finaleSpreadIndex) {
        setCurrentMobilePage(totalPages + 1);
      } else {
        // Map spread to its first page if mobile page doesn't belong to this spread
        const spreadLeftPage = (currentSpread - 1) * 2 + 1;
        const spreadRightPage = spreadLeftPage + 1;
        if (currentMobilePage !== spreadLeftPage && currentMobilePage !== spreadRightPage) {
          setCurrentMobilePage(spreadLeftPage);
        }
      }
    } else {
      if (currentMobilePage === 0) {
        setCurrentSpread(0);
      } else if (currentMobilePage === totalPages + 1) {
        setCurrentSpread(finaleSpreadIndex);
      } else {
        setCurrentSpread(Math.ceil(currentMobilePage / 2));
      }
    }
  }, [isMobile]); // eslint-disable-line react-hooks/exhaustive-deps

  // Subtle 3D mouse parallax tilt (desktop only)
  const handleMouseMove = (e) => {
    if (!bookContainerRef.current || isMobile || window.innerWidth < 768) return;
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

  const canGoNext = isMobile
    ? currentMobilePage < totalPages + 1 && !isAnimating
    : currentSpread < finaleSpreadIndex && !isAnimating;

  const canGoPrev = isMobile
    ? currentMobilePage > 0 && !isAnimating
    : currentSpread > 0 && !isAnimating;

  // Helper to get friend data for any desktop spread
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

  // ── Desktop: Open from Front Cover (Spread 0 -> Spread 1..N) ───────────
  const handleOpenBook = useCallback((target = 1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTargetOpenSpread(target);
    setPageContentVisible(false);
    
    setTransitionPhase('sliding-right');
    setTimeout(() => {
      sound.playBookOpen();
      setTransitionPhase('swinging-open');
      setTimeout(() => {
        setCurrentSpread(target);
        setCurrentMobilePage((target - 1) * 2 + 1);
        setTransitionPhase('idle');
        setIsAnimating(false);
        setTimeout(() => setPageContentVisible(true), 60);
      }, SWING_TIME);
    }, SLIDE_TIME);
  }, [isAnimating]);

  // ── Desktop: Close from Open Spread to Front Cover (Spread 1..N -> 0) ──
  const handleCloseToCover = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPageContentVisible(false);
    setPopupFolded(true);

    setTimeout(() => {
      sound.playPageTurn();
      setTransitionPhase('swinging-closed');
      setTimeout(() => {
        setTransitionPhase('sliding-center');
        setTimeout(() => {
          setCurrentSpread(0);
          setCurrentMobilePage(0);
          setTransitionPhase('idle');
          setPopupFolded(false);
          setIsAnimating(false);
        }, SLIDE_TIME);
      }, SWING_TIME);
    }, FADE_OUT_TIME);
  }, [isAnimating]);

  // ── Desktop: Close from Open Spread to Finale (Spread 1..N -> Finale) ──
  const handleCloseToFinale = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPageContentVisible(false);
    setPopupFolded(true);

    setTimeout(() => {
      sound.playPageTurn();
      setTransitionPhase('closing-to-finale');
      setTimeout(() => {
        setTransitionPhase('sliding-finale-center');
        setTimeout(() => {
          setCurrentSpread(finaleSpreadIndex);
          setCurrentMobilePage(totalPages + 1);
          setTransitionPhase('idle');
          setPopupFolded(false);
          setIsAnimating(false);
        }, SLIDE_TIME);
      }, SWING_TIME);
    }, FADE_OUT_TIME);
  }, [isAnimating, finaleSpreadIndex, totalPages]);

  // ── Desktop: Open from Finale to a Spread (Finale -> Spread 1..N) ───────
  const handleOpenFromFinale = useCallback((target = totalPageSpreads) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTargetOpenSpread(target);
    setPageContentVisible(false);

    setTransitionPhase('sliding-finale-spine');
    setTimeout(() => {
      sound.playBookOpen();
      setTransitionPhase('opening-from-finale');
      setTimeout(() => {
        setCurrentSpread(target);
        setCurrentMobilePage((target - 1) * 2 + 1);
        setTransitionPhase('idle');
        setIsAnimating(false);
        setTimeout(() => setPageContentVisible(true), 60);
      }, SWING_TIME);
    }, SLIDE_TIME);
  }, [isAnimating, totalPageSpreads]);

  // ── Desktop: Direct 3D Spin between Front Cover & Back Cover (0 <-> Finale) ──
  const handleSpinCoverToFinale = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPageContentVisible(false);
    sound.playPageTurn();
    setTransitionPhase('spinning-to-finale');
    setTimeout(() => {
      setCurrentSpread(finaleSpreadIndex);
      setCurrentMobilePage(totalPages + 1);
      setTransitionPhase('idle');
      setIsAnimating(false);
    }, SPIN_TIME);
  }, [isAnimating, finaleSpreadIndex, totalPages]);

  const handleSpinFinaleToCover = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPageContentVisible(false);
    sound.playPageTurn();
    setTransitionPhase('spinning-to-cover');
    setTimeout(() => {
      setCurrentSpread(0);
      setCurrentMobilePage(0);
      setTransitionPhase('idle');
      setIsAnimating(false);
    }, SPIN_TIME);
  }, [isAnimating]);

  // ── Desktop: Turn between Dual Pages (Spread S <-> S + 1) ───────────────
  const executeSpreadTransition = useCallback((nextSpread, dir) => {
    setIsAnimating(true);
    setPopupFolded(true);

    setTimeout(() => {
      sound.playPageTurn();
      setTurningLeaf({ from: currentSpread, to: nextSpread, dir });

      setTimeout(() => {
        setCurrentSpread(nextSpread);
        setCurrentMobilePage((nextSpread - 1) * 2 + 1);
      }, FLIP_TIME * 0.48);

      setTimeout(() => {
        setTurningLeaf(null);
        setPopupFolded(false);
        setIsAnimating(false);
      }, FLIP_TIME);
    }, 200);
  }, [currentSpread]);

  // ── Unified Navigation Triggers (Next / Prev) ─────────────────────────
  const goToNext = useCallback(() => {
    if (!canGoNext) return;

    if (isMobile) {
      if (currentMobilePage === 0) {
        sound.playBookOpen();
        setMobileDirection(1);
        setCurrentMobilePage(1);
        setCurrentSpread(1);
        setPageContentVisible(true);
      } else if (currentMobilePage < totalPages) {
        sound.playPageTurn();
        setMobileDirection(1);
        const next = currentMobilePage + 1;
        setCurrentMobilePage(next);
        setCurrentSpread(Math.ceil(next / 2));
      } else if (currentMobilePage === totalPages) {
        sound.playPageTurn();
        setMobileDirection(1);
        const finale = totalPages + 1;
        setCurrentMobilePage(finale);
        setCurrentSpread(finaleSpreadIndex);
      }
      return;
    }

    // Desktop
    if (currentSpread === 0) {
      handleOpenBook(1);
    } else if (currentSpread < totalPageSpreads) {
      executeSpreadTransition(currentSpread + 1, 'forward');
    } else if (currentSpread === totalPageSpreads) {
      handleCloseToFinale();
    }
  }, [canGoNext, isMobile, currentMobilePage, totalPages, currentSpread, totalPageSpreads, finaleSpreadIndex, handleOpenBook, executeSpreadTransition, handleCloseToFinale]);

  const goToPrev = useCallback(() => {
    if (!canGoPrev) return;

    if (isMobile) {
      if (currentMobilePage === 1) {
        sound.playPageTurn();
        setMobileDirection(-1);
        setCurrentMobilePage(0);
        setCurrentSpread(0);
      } else if (currentMobilePage > 1 && currentMobilePage <= totalPages) {
        sound.playPageTurn();
        setMobileDirection(-1);
        const prev = currentMobilePage - 1;
        setCurrentMobilePage(prev);
        setCurrentSpread(Math.ceil(prev / 2));
      } else if (currentMobilePage === totalPages + 1) {
        sound.playBookOpen();
        setMobileDirection(-1);
        setCurrentMobilePage(totalPages);
        setCurrentSpread(totalPageSpreads);
      }
      return;
    }

    // Desktop
    if (currentSpread === 1) {
      handleCloseToCover();
    } else if (currentSpread > 1 && currentSpread <= totalPageSpreads) {
      executeSpreadTransition(currentSpread - 1, 'backward');
    } else if (currentSpread === finaleSpreadIndex) {
      handleOpenFromFinale(totalPageSpreads);
    }
  }, [canGoPrev, isMobile, currentMobilePage, totalPages, currentSpread, totalPageSpreads, finaleSpreadIndex, handleCloseToCover, executeSpreadTransition, handleOpenFromFinale]);

  // Direct Jump for Mobile Single Page
  const jumpToMobilePage = (targetPage) => {
    if (isAnimating || targetPage === currentMobilePage) return;
    setMobileDirection(targetPage > currentMobilePage ? 1 : -1);
    sound.playPageTurn();
    setCurrentMobilePage(targetPage);
    if (targetPage === 0) {
      setCurrentSpread(0);
    } else if (targetPage === totalPages + 1) {
      setCurrentSpread(finaleSpreadIndex);
    } else {
      setCurrentSpread(Math.ceil(targetPage / 2));
    }
    setPageContentVisible(true);
  };

  // Direct Jump for Desktop Spreads
  const jumpToSpread = (targetSpread) => {
    if (isAnimating || targetSpread === currentSpread) return;

    if (currentSpread === 0 && targetSpread === finaleSpreadIndex) {
      handleSpinCoverToFinale();
      return;
    }
    if (currentSpread === finaleSpreadIndex && targetSpread === 0) {
      handleSpinFinaleToCover();
      return;
    }
    if (currentSpread === 0 && targetSpread > 0) {
      handleOpenBook(targetSpread);
      return;
    }
    if (currentSpread === finaleSpreadIndex && targetSpread < finaleSpreadIndex) {
      handleOpenFromFinale(targetSpread);
      return;
    }
    if (targetSpread === 0) {
      handleCloseToCover();
      return;
    }
    if (targetSpread === finaleSpreadIndex) {
      handleCloseToFinale();
      return;
    }

    const dir = targetSpread > currentSpread ? 'forward' : 'backward';
    executeSpreadTransition(targetSpread, dir);
  };

  // Helper to navigate on clicking page regions (excluding interactive buttons/videos)
  const handlePageClickNavigation = (e, targetDirection) => {
    // If click originated from interactive elements (buttons, links, inputs), do not turn page
    if (e.target.closest('button, a, input, select, textarea, [data-prevent-nav]')) {
      return;
    }
    if (targetDirection === 'next') {
      goToNext();
    } else if (targetDirection === 'prev') {
      goToPrev();
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
    const isFinale = isMobile
      ? currentMobilePage === totalPages + 1
      : currentSpread === finaleSpreadIndex;

    if (isFinale) {
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
  }, [isMobile, currentMobilePage, currentSpread, finaleSpreadIndex, totalPages]);

  // Desktop active spread data
  const activeSpreadData = currentSpread >= 1 && currentSpread <= totalPageSpreads
    ? getSpreadPages(currentSpread)
    : getSpreadPages(1);

  const targetSpreadData = getSpreadPages(targetOpenSpread);

  return (
    <div 
      ref={bookContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-1 select-none"
    >
      {/* ── Floating Side Navigation Arrows ── */}
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

      {/* ── Book Stage ── */}
      <motion.div 
        className="book-stage flex items-center justify-center relative origin-center"
        style={{ minHeight: H + 20 }}
        animate={{ 
          scale: mobileScale,
          rotateX: isMobile ? 0 : tilt.x, 
          rotateY: isMobile ? 0 : tilt.y 
        }}
        transition={{ 
          scale: { duration: 0.35, ease: 'easeOut' },
          rotateX: { type: 'spring', stiffness: 90, damping: 20 },
          rotateY: { type: 'spring', stiffness: 90, damping: 20 }
        }}
      >
        {/* ========================================================================= */}
        {/* MOBILE VIEW: SHOW EXACTLY ONE PAGE AT A TIME                              */}
        {/* ========================================================================= */}
        {isMobile ? (
          <div className="relative flex items-center justify-center" style={{ width: W, height: H }}>
            {/* Mobile Cover (Page 0) */}
            {currentMobilePage === 0 && (
              <motion.div
                key="mobile-cover"
                onClick={goToNext}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative cursor-pointer rounded-r-2xl rounded-l-md border-4 border-amber-300 shadow-2xl book-ambient-shadow"
                style={{ width: W, height: H }}
              >
                {/* 3D Spine on Left */}
                <div className="absolute -left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-purple-950 via-purple-900 to-transparent rounded-l-md flex flex-col justify-around py-10 pointer-events-none z-30">
                  <div className="spine-rib-band h-2 w-full" />
                  <div className="spine-rib-band h-2 w-full" />
                  <div className="spine-rib-band h-2 w-full" />
                  <div className="spine-rib-band h-2 w-full" />
                </div>

                <div className="absolute -right-3.5 top-3 bottom-3 w-3.5 page-edges-gilded-right rounded-r-sm pointer-events-none z-20" />
                <div className="absolute -bottom-3.5 left-5 right-2 h-3.5 page-edges-gilded-bottom rounded-b-sm pointer-events-none z-20" />

                <FantasyFrontCover friendName={friendName || BOOK_DATA.friendName} />
              </motion.div>
            )}

            {/* Mobile Single Pages (Pages 1 to totalPages) */}
            {currentMobilePage >= 1 && currentMobilePage <= totalPages && (
              <div 
                className="relative book-ambient-shadow rounded-xl flex items-center justify-center border-4 border-amber-300/80"
                style={{ width: W, height: H, transformStyle: 'flat' }}
              >
                {/* Hardcover Outer Leather Lip */}
                <div className="absolute inset-0 leather-lilac rounded-xl pointer-events-none -m-2 z-0" />

                {/* Gilded Edge Stacks on Left, Right & Bottom */}
                <div className="absolute -left-1.5 top-2 bottom-2 w-2 page-edges-gilded-right rounded-l-xs pointer-events-none z-10" />
                <div className="absolute -right-1.5 top-2 bottom-2 w-2 page-edges-gilded-right rounded-r-xs pointer-events-none z-10" />
                <div className="absolute bottom-0 left-2 right-2 h-2 page-edges-gilded-bottom pointer-events-none z-10" />

                {/* Silk Bookmark Ribbon */}
                <div 
                  className="absolute right-6 top-0 w-4 h-12 shadow-md z-40 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, #d8b4fe, #ec4899, #eab308)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)',
                  }}
                />

                {/* Single Page Wrapper with Smooth Slide/Fade Animation */}
                <div 
                  className="relative w-full h-full z-10 overflow-hidden rounded-lg cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    if (clickX < rect.width / 2) {
                      handlePageClickNavigation(e, 'prev');
                    } else {
                      handlePageClickNavigation(e, 'next');
                    }
                  }}
                >
                  <AnimatePresence mode="wait" custom={mobileDirection}>
                    <motion.div
                      key={`single-page-${currentMobilePage}`}
                      custom={mobileDirection}
                      variants={{
                        enter: (dir) => ({
                          x: dir > 0 ? 40 : -40,
                          opacity: 0,
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                        },
                        exit: (dir) => ({
                          x: dir > 0 ? -40 : 40,
                          opacity: 0,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                      className="w-full h-full"
                      style={{ transformStyle: 'flat' }}
                    >
                      <Page 
                        pageNumber={currentMobilePage} 
                        position="single" 
                        friendData={pages[currentMobilePage - 1]} 
                        contentVisible={true} 
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Mobile Finale / Disney Back Cover (Page totalPages + 1) */}
            {currentMobilePage === totalPages + 1 && (
              <motion.div
                key="mobile-finale"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-l-2xl rounded-r-md border-4 border-amber-300 shadow-2xl book-ambient-shadow"
                style={{ width: W, height: H }}
              >
                {/* 3D Spine on Right */}
                <div className="absolute -right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-purple-950 via-purple-900 to-transparent rounded-r-md flex flex-col justify-around py-10 pointer-events-none z-30">
                  <div className="spine-rib-band h-2 w-full" />
                  <div className="spine-rib-band h-2 w-full" />
                  <div className="spine-rib-band h-2 w-full" />
                  <div className="spine-rib-band h-2 w-full" />
                </div>

                <div className="absolute -left-3.5 top-3 bottom-3 w-3.5 page-edges-gilded-right rounded-l-sm pointer-events-none z-20" />
                <div className="absolute -bottom-3.5 left-2 right-5 h-3.5 page-edges-gilded-bottom rounded-b-sm pointer-events-none z-20" />

                <DisneyFairytaleBackCover onReplay={() => jumpToMobilePage(0)} />
              </motion.div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* DESKTOP / TABLET VIEW: DUAL-PAGE SPREADS WITH 3D POP-UPS & FLIP LEAVES    */
          /* ========================================================================= */
          <>
            {/* CASE 0: DIRECT 3D BOOK TURNOVER FLIP (Cover <-> Finale) */}
            {(transitionPhase === 'spinning-to-finale' || transitionPhase === 'spinning-to-cover') && (
              <motion.div
                key="direct-spin-flipper"
                className="relative preserve-3d book-ambient-shadow rounded-2xl border-4 border-amber-300"
                style={{ width: W, height: H }}
                initial={{ rotateY: transitionPhase === 'spinning-to-finale' ? 0 : 180, scale: 0.96 }}
                animate={{ rotateY: transitionPhase === 'spinning-to-finale' ? 180 : 0, scale: 1 }}
                transition={{ duration: SPIN_TIME / 1000, ease: [0.4, 0.0, 0.2, 1] }}
              >
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl">
                  <FantasyFrontCover friendName={friendName || BOOK_DATA.friendName} />
                </div>
                <div 
                  className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <DisneyFairytaleBackCover onReplay={() => jumpToSpread(0)} />
                </div>
              </motion.div>
            )}

            {/* CASE 1: CLOSED FRONT COVER (Idle centered or sliding right / left) */}
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
                className="relative cursor-pointer group rounded-r-2xl rounded-l-md border-4 border-amber-300 shadow-2xl book-ambient-shadow transform hover:scale-[1.015] transition-transform duration-300"
                style={{ width: W, height: H }}
              >
                <div className="absolute -left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-purple-950 via-purple-900 to-transparent rounded-l-md flex flex-col justify-around py-10 pointer-events-none z-30">
                  <div className="spine-rib-band h-2 w-full" />
                  <div className="spine-rib-band h-2 w-full" />
                  <div className="spine-rib-band h-2 w-full" />
                  <div className="spine-rib-band h-2 w-full" />
                </div>
                <div className="absolute -right-3.5 top-3 bottom-3 w-3.5 page-edges-gilded-right rounded-r-sm pointer-events-none z-20" />
                <div className="absolute -bottom-3.5 left-5 right-2 h-3.5 page-edges-gilded-bottom rounded-b-sm pointer-events-none z-20" />
                <FantasyFrontCover friendName={friendName || BOOK_DATA.friendName} />
              </motion.div>
            )}

            {/* CASE 2: COVER SWINGING OPEN */}
            {transitionPhase === 'swinging-open' && (
              <div 
                className="relative book-ambient-shadow rounded-xl flex items-center justify-center border-4 border-amber-300/80"
                style={{ width: W * 2, height: H, transformStyle: 'flat' }}
              >
                <div className="absolute inset-0 leather-lilac rounded-xl pointer-events-none -m-2 z-0" />
                <div className="absolute left-1/2 top-0 bottom-0 w-14 -translate-x-1/2 spine-center-shadow z-20 pointer-events-none" />

                <div className="absolute left-0 top-0 bottom-0 w-1/2 rounded-l-lg overflow-hidden z-10">
                  <Page pageNumber={targetSpreadData.leftPageNumber} position="left" friendData={targetSpreadData.leftFriend} contentVisible={false} />
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 rounded-r-lg overflow-hidden z-10">
                  <Page pageNumber={targetSpreadData.rightPageNumber} position="right" friendData={targetSpreadData.rightFriend} contentVisible={false} />
                </div>

                <motion.div
                  className="absolute top-0 bottom-0 w-1/2 preserve-3d z-40 rounded-r-lg"
                  style={{ left: '50%', transformOrigin: 'left center' }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
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
                    <p className="text-xs font-cinzel font-bold text-purple-900 tracking-widest">THE FAIRYTALE OPENS</p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* CASE 3: COVER SWINGING CLOSED */}
            {transitionPhase === 'swinging-closed' && (
              <div 
                className="relative book-ambient-shadow rounded-xl flex items-center justify-center border-4 border-amber-300/80"
                style={{ width: W * 2, height: H, transformStyle: 'flat' }}
              >
                <div className="absolute inset-0 leather-lilac rounded-xl pointer-events-none -m-2 z-0" />
                <div className="absolute left-1/2 top-0 bottom-0 w-14 -translate-x-1/2 spine-center-shadow z-20 pointer-events-none" />

                <div className="absolute left-0 top-0 bottom-0 w-1/2 rounded-l-lg overflow-hidden z-10">
                  <Page pageNumber={1} position="left" friendData={pages[0]} contentVisible={false} />
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 rounded-r-lg overflow-hidden z-10">
                  <Page pageNumber={2} position="right" friendData={pages[1]} contentVisible={false} />
                </div>

                <motion.div
                  className="absolute top-0 bottom-0 w-1/2 preserve-3d z-40 rounded-l-lg"
                  style={{ left: '50%', transformOrigin: 'left center' }}
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

            {/* CASE 4: CLOSING TO FINALE */}
            {transitionPhase === 'closing-to-finale' && (
              <div 
                className="relative book-ambient-shadow rounded-xl flex items-center justify-center border-4 border-amber-300/80"
                style={{ width: W * 2, height: H, transformStyle: 'flat' }}
              >
                <div className="absolute inset-0 leather-lilac rounded-xl pointer-events-none -m-2 z-0" />
                <div className="absolute left-1/2 top-0 bottom-0 w-14 -translate-x-1/2 spine-center-shadow z-20 pointer-events-none" />

                <div className="absolute left-0 top-0 bottom-0 w-1/2 rounded-l-lg overflow-hidden z-10">
                  <Page pageNumber={activeSpreadData.leftPageNumber} position="left" friendData={activeSpreadData.leftFriend} contentVisible={false} />
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 rounded-r-lg overflow-hidden z-10">
                  <Page pageNumber={activeSpreadData.rightPageNumber} position="right" friendData={activeSpreadData.rightFriend} contentVisible={false} />
                </div>

                <motion.div
                  className="absolute top-0 bottom-0 w-1/2 preserve-3d z-40 rounded-r-lg"
                  style={{ left: '50%', transformOrigin: 'left center' }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{ duration: SWING_TIME / 1000, ease: [0.45, 0.05, 0.2, 1] }}
                >
                  <div className="absolute inset-0 backface-hidden rounded-r-lg overflow-hidden shadow-2xl">
                    <Page pageNumber={activeSpreadData.rightPageNumber} position="right" friendData={activeSpreadData.rightFriend} contentVisible={false} />
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

            {/* CASE 5: OPENING FROM FINALE */}
            {transitionPhase === 'opening-from-finale' && (
              <div 
                className="relative book-ambient-shadow rounded-xl flex items-center justify-center border-4 border-amber-300/80"
                style={{ width: W * 2, height: H, transformStyle: 'flat' }}
              >
                <div className="absolute inset-0 leather-lilac rounded-xl pointer-events-none -m-2 z-0" />
                <div className="absolute left-1/2 top-0 bottom-0 w-14 -translate-x-1/2 spine-center-shadow z-20 pointer-events-none" />

                <div className="absolute left-0 top-0 bottom-0 w-1/2 rounded-l-lg overflow-hidden z-10">
                  <Page pageNumber={targetSpreadData.leftPageNumber} position="left" friendData={targetSpreadData.leftFriend} contentVisible={false} />
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 rounded-r-lg overflow-hidden z-10">
                  <Page pageNumber={targetSpreadData.rightPageNumber} position="right" friendData={targetSpreadData.rightFriend} contentVisible={false} />
                </div>

                <motion.div
                  className="absolute top-0 bottom-0 w-1/2 preserve-3d z-40 rounded-l-lg"
                  style={{ left: '50%', transformOrigin: 'left center' }}
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

            {/* CASE 6: OPEN DUAL-PAGE SPREADS (Spreads 1 to totalPageSpreads) */}
            {currentSpread >= 1 && currentSpread <= totalPageSpreads && transitionPhase === 'idle' && (
              <div
                className="relative book-ambient-shadow rounded-xl flex items-center justify-center border-4 border-amber-300/80"
                style={{ width: W * 2, height: H, transformStyle: 'flat' }}
              >
                <div className="absolute inset-0 leather-lilac rounded-xl pointer-events-none -m-2 z-0" />
                <div className="absolute -left-1.5 top-2 bottom-2 w-2 page-edges-gilded-right rounded-l-xs pointer-events-none z-10" />
                <div className="absolute -right-1.5 top-2 bottom-2 w-2 page-edges-gilded-right rounded-r-xs pointer-events-none z-10" />
                <div className="absolute bottom-0 left-2 right-2 h-2 page-edges-gilded-bottom pointer-events-none z-10" />
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
                  className="relative w-1/2 h-full z-10 overflow-hidden rounded-l-lg cursor-pointer" 
                  style={{ transformStyle: 'flat' }}
                  onClick={(e) => handlePageClickNavigation(e, 'prev')}
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
                  className="relative w-1/2 h-full z-10 overflow-hidden rounded-r-lg cursor-pointer" 
                  style={{ transformStyle: 'flat' }}
                  onClick={(e) => handlePageClickNavigation(e, 'next')}
                >
                  <Page 
                    pageNumber={activeSpreadData.rightPageNumber} 
                    position="right" 
                    friendData={activeSpreadData.rightFriend} 
                    contentVisible={pageContentVisible} 
                  />
                </div>

                {/* Center 3D Origami Pop-Up Scene */}
                <PopUpElement 
                  spreadIndex={currentSpread} 
                  folded={!pageContentVisible || popupFolded} 
                />

                {/* 3D Turning Leaf Simulation */}
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
                    <div className="absolute inset-0 backface-hidden parchment-lilac shadow-2xl rounded-r-lg border-l border-purple-300 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-purple-400/40 animate-pulse" />
                    </div>
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

            {/* CASE 7: FINALE / DISNEY BACK COVER */}
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
                <div className="absolute -right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-purple-950 via-purple-900 to-transparent rounded-r-md flex flex-col justify-around py-10 pointer-events-none z-30">
                  <div className="spine-rib-band h-2 w-full" />
                  <div className="spine-rib-band h-2 w-full" />
                  <div className="spine-rib-band h-2 w-full" />
                  <div className="spine-rib-band h-2 w-full" />
                </div>
                <div className="absolute -left-3.5 top-3 bottom-3 w-3.5 page-edges-gilded-right rounded-l-sm pointer-events-none z-20" />
                <div className="absolute -bottom-3.5 left-2 right-5 h-3.5 page-edges-gilded-bottom rounded-b-sm pointer-events-none z-20" />
                <DisneyFairytaleBackCover onReplay={() => jumpToSpread(0)} />
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      {/* ── Bottom Navigation Controls (Pill Bar & Chevrons) ──────── */}
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

        {/* Spread / Page Navigation Indicators */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 bg-purple-950/85 px-2.5 sm:px-3 py-1 rounded-full border border-purple-600/60 shadow-md backdrop-blur-md overflow-x-auto max-w-[210px] sm:max-w-md md:max-w-xl no-scrollbar">
          {isMobile ? (
            /* Mobile Single Page Pills */
            <>
              <button
                onClick={() => jumpToMobilePage(0)}
                className={`px-2 py-0.5 rounded-full text-[9px] font-cinzel font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  currentMobilePage === 0
                    ? 'bg-gradient-to-r from-amber-300 to-purple-300 text-purple-950 shadow-[0_0_10px_rgba(216,180,254,0.8)] scale-105'
                    : 'text-purple-300 hover:text-amber-200'
                }`}
              >
                Cover
              </button>

              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={`mobile-pill-${pageNum}`}
                    onClick={() => jumpToMobilePage(pageNum)}
                    className={`px-2 py-0.5 rounded-full text-[9px] font-cinzel font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      currentMobilePage === pageNum
                        ? 'bg-gradient-to-r from-amber-300 to-purple-300 text-purple-950 shadow-[0_0_10px_rgba(216,180,254,0.8)] scale-105'
                        : 'text-purple-300 hover:text-amber-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => jumpToMobilePage(totalPages + 1)}
                className={`px-2 py-0.5 rounded-full text-[9px] font-cinzel font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  currentMobilePage === totalPages + 1
                    ? 'bg-gradient-to-r from-amber-300 to-purple-300 text-purple-950 shadow-[0_0_10px_rgba(216,180,254,0.8)] scale-105'
                    : 'text-purple-300 hover:text-amber-200'
                }`}
              >
                Finale
              </button>
            </>
          ) : (
            /* Desktop Dual Spread Pills */
            <>
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
            </>
          )}
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

// Configuration file for Lilac Fairytale Pop-Up Book
// Supports dynamic friend profiles paired into dual-page spreads (2 friends per spread).

import finalePhoto from '../assets/finale-photo.jpg';

export const BOOK_DATA = {
  // Recipient details (The Birthday Star)
  friendName: "Kavya Krishnakumar",
  subtitle: "A Fairytale Birthday Journey",
  birthdayDate: "October 2026",

  // =========================================================================
  // FRIENDS' WISHES & PROFILES
  // =========================================================================
  pages: [
    {
      id: 1,
      name: "Krishnakumar - Appa",
      title: "The Guardian King Across the Seas",
      role: "Loving Father & Royal Protector",
      driveFileId: "1XXn9WgEvEhnPc5OP-UjONhq6MIjA8je2",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      orientation: "vertical",
      quote: "“No ocean is too vast, nor distance too far, to dim a father’s unconditional love for his cherished princess.”",
      badge: "Chapter I • The King's Blessing",
    },
    {
      id: 2,
      name: "Kalyani - Amma",
      title: "The Queen of Whispered Dreams",
      role: "Devoted Mother & Guiding Light",
      driveFileId: "", // Kept blank as requested
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      orientation: "horizontal",
      quote: "“A mother’s loving embrace is the enchanted sanctuary where all of a daughter’s dreams take flight.”",
      badge: "Chapter II • A Mother's Haven",
    },
    {
      id: 3,
      name: "Kaushik",
      title: "The Valiant Shield & Brother",
      role: "Younger Brother & Lifelong Partner",
      driveFileId: "1aw1b9uqtP4agnOpzDSbGh5GuJ-Q2iiQf",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      orientation: "vertical",
      quote: "“From childhood adventures to forever dreams, a brother’s loyalty and love stand unwavering.”",
      badge: "Chapter III • The Valiant Companion",
    },
    {
      id: 4,
      name: "Cherished Friend",
      title: "The Starlight Wanderer",
      role: "Beloved Companion",
      driveFileId: "",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      orientation: "horizontal",
      quote: "“Every great storybook holds magical chapters waiting to be written in golden ink.”",
      badge: "Chapter IV • Whispering Stars",
    },
    {
      id: 5,
      name: "Cherished Friend",
      title: "The Radiant Voyager",
      role: "Treasured Friend",
      driveFileId: "",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      orientation: "horizontal",
      quote: "“True friendship is a golden thread woven across the tapestry of time.”",
      badge: "Chapter V • Golden Echoes",
    },
    {
      id: 6,
      name: "Harithaa - Deepesh",
      title: "The Enchanted Newlyweds",
      role: "Best Friends & Newlywed Companions",
      driveFileId: "1fg8CIa9ZpNV2FnseCQdAES6U7VGo4nHA",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      orientation: "horizontal",
      quote: "“From dancing with pure joy at your wedding to celebrating every golden milestone, our bond dances on forever.”",
      badge: "Chapter VI • Celebration of Love",
    },
    {
      id: 7,
      name: "Girls Trio - Harithaa, Deepika, Logi",
      title: "The Unbreakable Sisterhood",
      role: "College Besties & Lifelong Sisters",
      driveFileId: "18pny_ithXIR_G7KjMPGt9nJXX6P7ssdM",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      orientation: "horizontal",
      quote: "“We may quarrel and banter like playful storms, but in our hearts, we will never let each other fall.”",
      badge: "Chapter VII • The Unbreakable Bond",
    },
    {
      id: 8,
      name: "The Boys - Maddy, Kaushik, Kamal, Deepesh, Ajay",
      title: "The Royal Brigade of Buddies",
      role: "The Boy Squad & Lifelong Buddies",
      driveFileId: "1SwXx9uSboP36k7m-m08-eO0qZnEFm7gS",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      orientation: "horizontal",
      quote: "“A princess needs no guard when she has a squad that treasures and respects her as their truest buddy.”",
      badge: "Chapter VIII • The Royal Brigade",
    },
    {
      id: 9,
      name: "Dharshan- Adhi K7",
      title: "The Guardians of Good Times",
      role: "Cherished Friends & Companions",
      driveFileId: "1aav0G95P5Zt8d1OaotZSFd9KqUHSscM2",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      orientation: "horizontal",
      quote: "“Golden friends make every memory brighter and every chapter of life infinitely richer.”",
      badge: "Chapter IX • Starlight Companions",
    },
    {
      id: 10,
      name: "The Kingdom of Friends",
      title: "The Eternal Fairytale",
      role: "All Your Loving Family & Friends",
      driveFileId: "",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      orientation: "horizontal",
      quote: "“And so the adventure continues, surrounded by the loving hearts that cherish you most in this world.”",
      badge: "Chapter X • Eternal Fairytale",
    },
  ],

  // =========================================================================
  // THE FINALE (Back Cover Keepsake)
  // =========================================================================
  finale: {
    title: "Forever Our Fairytale Princess",
    subtext: "Crafted with love by all your treasured friends & family",
    polaroidCaption: "Treasured Moments • Happy Birthday Kavya!",
    // Local bundled asset - 100% reliable, zero 403 blocks, works on GitHub Pages & offline
    polaroidImage: finalePhoto,
    wishes: [
      "May each day bring you closer to your wildest dreams.",
      "Surrounded by family and friends who will always cheer you on.",
      "Stay as radiant, kind, and wonderful as you are today!"
    ]
  }
};

// Backwards compatibility mappings:
BOOK_DATA.page1 = BOOK_DATA.pages[0];
BOOK_DATA.page2 = BOOK_DATA.pages[1];
BOOK_DATA.page3 = BOOK_DATA.pages[2];
BOOK_DATA.page4 = BOOK_DATA.pages[3];

// Configuration file for Lilac Fairytale Pop-Up Book
// You can add as many friends as you want (4, 10, 30, 50+ friends)!
// The book automatically creates dual-page spreads (2 friends per spread).

export const BOOK_DATA = {
  // Recipient details (The Birthday Star)
  friendName: "Kavya Krishnakumar", // Change to the recipient's name
  subtitle: "A Fairytale Birthday Journey",
  birthdayDate: "October 2026",

  // =========================================================================
  // FRIENDS' WISHES & PROFILES (Supports 30+ friends!)
  // =========================================================================
  // To add a new friend, simply copy a profile block and paste it below.
  // Each friend gets their own page with:
  // - name: Friend's Name
  // - title: Their Fairytale Title (e.g. "The Radiant Voyager")
  // - role: Friendship Role (e.g. "Cherished Friend", "Partner in Mischief")
  // - driveFileId: Google Drive Video ID (see README for guide)
  // - fallbackVideo: Sample video URL (works when testing or offline)
  // - message: Heartfelt birthday letter/message
  // - quote: Inspiring fairytale quote
  // - badge: Chapter badge displayed on top of page
  // =========================================================================
  pages: [
    {
      id: 1,
      name: "Adhavan",
      title: "The Radiant Voyager",
      role: "Cherished Friend",
      driveFileId: "1dQv6zJ_example_adhavan_id",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      message: "May your journey ahead be as vast as the twilight sky and filled with stars that never stop shining for you. Keep lighting up every room you enter!",
      quote: "“Spread your wings, for the world awaits the magic you carry.”",
      badge: "Chapter I • Golden Dawn",
    },
    {
      id: 2,
      name: "John Sam",
      title: "The Melodic Wanderer",
      role: "Guardian of Smiles",
      driveFileId: "1dQv6zJ_example_johnsam_id",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      message: "Another year of laughter, crazy memories, and endless dreams! Here's to more adventures, inside jokes, and celebrations that make our hearts sing.",
      quote: "“May your year be scored with the sweetest symphonies of joy.”",
      badge: "Chapter II • Starry Horizons",
    },
    {
      id: 3,
      name: "PK",
      title: "The Brave Dreamer",
      role: "Partner in Mischief",
      driveFileId: "1dQv6zJ_example_pk_id",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      message: "To the one who turns ordinary days into extraordinary fairytales! Never lose that spark and boundless courage that inspires everyone around you.",
      quote: "“In every chapter of your story, you shine like gold.”",
      badge: "Chapter III • Royal Citadel",
    },
    {
      id: 4,
      name: "Karthikeyan",
      title: "The Loyal Companion",
      role: "Cherished Friend",
      driveFileId: "1dQv6zJ_example_karthikeyan_id",
      fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      message: "May every path you take lead to wonderful discoveries and boundless happiness. Thank you for being such an extraordinary friend and bringing so much warmth to all of us!",
      quote: "“True friendship is a golden thread that never fades with time.”",
      badge: "Chapter IV • The Golden Thread",
    },
  ],

  // =========================================================================
  // THE FINALE (Back Cover Keepsake)
  // =========================================================================
  finale: {
    title: "Forever Our Fairytale Princess",
    subtext: "Crafted with love by all your treasured friends",
    polaroidCaption: "Treasured Moments • Happy Birthday!",
    // Polaroid photo URL - can be an online link or a local asset in /src/assets/
    polaroidImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    wishes: [
      "May each day bring you closer to your wildest dreams.",
      "Surrounded by friends who will always cheer you on.",
      "Stay as radiant, kind, and wonderful as you are today!"
    ]
  }
};

// Backwards compatibility mappings:
BOOK_DATA.page1 = BOOK_DATA.pages[0];
BOOK_DATA.page2 = BOOK_DATA.pages[1];
BOOK_DATA.page3 = BOOK_DATA.pages[2];
BOOK_DATA.page4 = BOOK_DATA.pages[3];

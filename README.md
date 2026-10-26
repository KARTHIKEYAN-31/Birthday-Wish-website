# The Princess Chronicles 📖✨

An interactive, realistic 3D Princess Storybook web app created as a royal birthday keepsake. Features friend birthday videos, fairytale gold filigree leather binding, 3D paper-cutout origami pop-up scenes (Hot Air Balloon & Fairytale Castle), and support for **30+ friends' wishes**!

---

## 🌟 Key Features

* **Authentic Disney Princess Storybook Tome:** Deep lilac & amethyst leather texture with continuous gold-thread scalloped/wavy stitching, baroque rococo corner flourishes, symmetrical palmette fleurons, and an authentic 5-petal antique bronze clasp latch.
* **Supports 30+ Friends Dynamically:** Easily scale from 4 friends to 30, 50, or more! The book automatically pairs friends into dual-page spreads (2 friends per spread).
* **3D Origami Pop-Up Scenes:**
  * **Spread 1 (and odd spreads):** Multi-layered Lilac Hot Air Balloon, celestial crescent moon, twinkling golden stars, and floating fairytale clouds.
  * **Spread 2 (and even spreads):** Disney Fairytale Castle, soaring golden spires, galloping white stallions, winged pegasus, and blooming lilac lilies.
* **Clean Page-Turn & Close Physics:**
  * When closing to cover or finale: page content, video frames, and pop-ups disappear first, then the cover leaf swings shut over clean antique parchment!
  * When opening: the book swings open over blank parchment, then the page content gracefully materializes with enchanted sparkles!
* **Magical Moving-Portrait Video Frames:** Embeds Google Drive video previews inside baroque gold filigree frames with sample fallback video support.
* **Disney Princess Finale Keepsake:** Polaroid memory frame topped with a princess tiara, heartfelt wishes, and celebratory lilac & gold confetti cascade.
* **Responsive Scrollable Navigation Bar:** Clean pill navigation supporting any number of spreads (`Cover`, `Pages 1-2`, `Pages 3-4`, ..., `Pages 29-30`, `Finale`).

---

## 🚀 Quick Start

### 1. Install & Run Dev Server
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```

---

## 👥 How to Add New Friend Profiles (30+ Friends Guide)

All friend profiles and wishes are stored in [`src/config/data.js`](src/config/data.js).

### Step 1: Open `src/config/data.js`
Locate the `pages` array inside `BOOK_DATA`:

```javascript
export const BOOK_DATA = {
  friendName: "Pooja", // The Birthday Star's Name
  subtitle: "A Fairytale Birthday Journey",
  birthdayDate: "October 2026",

  pages: [
    // Friend profiles are listed here...
  ],
  ...
};
```

---

### Step 2: Copy & Paste a New Profile Block
To add another friend, simply copy this template and paste it inside the `pages: [...]` array:

```javascript
{
  id: 5,
  name: "Friend's Name",
  title: "The Fairytale Title",          // e.g. "The Radiant Explorer", "The Melodic Wanderer"
  role: "Cherished Friend",              // e.g. "Best Friend", "Partner in Mischief"
  driveFileId: "PASTE_GOOGLE_DRIVE_ID",  // Google Drive video file ID (see guide below)
  fallbackVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  message: "Write their heartfelt birthday wish or letter here. Share memories, wishes, and kind words!",
  quote: "“A memorable quote or blessing for the birthday star.”",
  badge: "Chapter V • Dawn of Magic",     // Chapter badge shown at top of the page
},
```

> [!TIP]
> **Automatic Dual-Page Layout:**
> * Friends `1 & 2` appear on **Spread 1** (`Pages 1-2`).
> * Friends `3 & 4` appear on **Spread 2** (`Pages 3-4`).
> * Friends `5 & 6` appear on **Spread 3** (`Pages 5-6`).
> * ...
> * Friends `29 & 30` appear on **Spread 15** (`Pages 29-30`).
> * The book automatically creates as many spreads as needed and updates the navigation pills!

---

### Step 3: Profile Field Breakdown

| Field | Description | Example |
| :--- | :--- | :--- |
| `name` | The friend's real name | `"Divya"` |
| `title` | Fairytale royal title / moniker | `"The Guardian of Laughter"` |
| `role` | Friendship role / bond | `"Best Friend Since School"` |
| `driveFileId` | The unique ID of the Google Drive video | `"1dQv6zJ_example_id"` |
| `fallbackVideo` | Sample video URL used when testing or if Drive is offline | Any valid `.mp4` URL |
| `message` | The friend's main birthday wish paragraph | `"Wishing you the happiest birthday..."` |
| `quote` | Short poetic or inspirational quote | `"“May your light shine forever bright.”"` |
| `badge` | Chapter heading at the top of the parchment | `"Chapter VII • Starlight Haven"` |

---

## 📹 Setting Up Google Drive Video Messages

Follow these simple steps so friends' videos play smoothly inside the gilded frame:

1. **Upload Video to Google Drive:**
   Upload the friend's recorded video (`.mp4`, `.mov`, etc.) to your Google Drive.
2. **Set Sharing Permissions:**
   * Right-click the video file $\rightarrow$ **Share** $\rightarrow$ **Share**.
   * Under **General access**, change from *Restricted* to **"Anyone with the link can view"**.
3. **Extract the File ID:**
   Copy the shareable link. It will look like this:
   `https://drive.google.com/file/d/`**`1a2b3c4d5e6f7g8h9i`**`/view?usp=sharing`
   The bold part between `/d/` and `/view` is the **File ID**:
   `1a2b3c4d5e6f7g8h9i`
4. **Paste into `data.js`:**
   ```javascript
   driveFileId: "1a2b3c4d5e6f7g8h9i",
   ```

> [!NOTE]
> If a video ID is not set or Google Drive preview is restricted, clicking **"Play Sample"** inside the frame will automatically play the fallback sample video so you can preview the animation!

---

## 🎨 Changing the Recipient & Finale Details

In [`src/config/data.js`](src/config/data.js):

* **Recipient's Name:**
  Change `friendName: "Pooja"` to your friend's name. It automatically updates on the Front Cover, Header, and Footer.
* **Finale Polaroid Photo:**
  Change `finale.polaroidImage` to any photo URL or local imported image.
* **Finale Wishes:**
  Edit the bullet points in `finale.wishes: [...]`.

---

## 🌐 Deploying to GitHub Pages

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "feat: Add friends' wishes and update Disney fairytale theme"
   git push origin main
   ```
2. In your GitHub repository:
   * Go to **Settings** $\rightarrow$ **Pages**.
   * Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` workflow will automatically build and publish the web app!

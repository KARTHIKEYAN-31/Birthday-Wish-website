# System Prompt for Antigravity: Build "Lilac Fairytale Pop-Up Book" Web App

Act as an expert Frontend Developer, UI/UX Designer, and CSS 3D Animation Specialist. Generate a complete, production-ready Single Page Application (SPA) using React (Vite), Tailwind CSS, and Framer Motion (or standard CSS 3D transforms). The app is a highly realistic, interactive, fantastical pop-up book designed as a birthday surprise for a female friend.

Please generate the entire codebase, including components, complex 3D CSS states, SVG assets/placeholders, and a GitHub Actions workflow for deployment to GitHub Pages.

## 1. Tech Stack
* **Framework:** React 18 (via Vite)
* **Animation/3D:** Framer Motion for pop-up SVG elements and smooth page transitions, vanilla CSS 3D transforms (`perspective`, `rotateY`, `transform-origin`) for the realistic page flipping.
* **Styling:** Tailwind CSS
* **Deployment:** GitHub Pages (via GitHub Actions)

## 2. UI/UX Design Language: Fantastical Lilac Realism
* **Global Background:** A beautifully detailed, soft-focus background of a wooden desk illuminated by magical, glowing dust motes and a soft lilac ambient light (`bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200 via-fuchsia-100 to-indigo-300`).
* **The Book Texture:** The book cover should simulate realistic textured lilac leather with glowing gold-embossed typography. The inner pages should simulate soft, slightly textured lavender-tinted parchment.
* **The Pop-Up Aesthetic:** When a page turns, 2D/3D cartoonish, highly detailed paper-cutout elements (blooming lilies, a Disney-style castle, a hot air balloon) must fold up from the center crease using rotateX transforms and drop shadows (`drop-shadow-xl`) to look physical.
* **Colors:** Strictly feminine, dreamy palette. Lilac, lavender, soft gold, blush pink, and deep plum for text.

## 3. Application Flow & Core Features

### A. Cover Page (Start Screen)
* A beautifully bound lilac book sitting closed in the center of the screen.
* Gold text reads: "A Magical Journey: Happy Birthday [Friend's Name]".
* A glowing, pulsing prompt says "Click to Open".

### B. Interactive Page Turning Logic
* Implement a realistic book layout (two pages visible side-by-side on desktop, single page on mobile).
* Clicking the right edge of the right page triggers a smooth, 1.5-second CSS 3D rotation (`rotateY(-180deg)`) simulating a page turn.

### C. The Pop-Up Scenes & Video Integration (Google Drive)
* **Pages 1-2 (Adhavan & John Sam):** As the page lands flat, an SVG paper hot air balloon and a cluster of stars pop up from the center. Embedded seamlessly into the illustration on each page is an `<iframe>` bordered by ornate, magical gold frames.
* **Pages 3-4 (PK & Karthikeyan):** A paper-cutout castle and blooming lilac flowers fold up. On Karthikeyan's page, include beautifully formatted text styled as a Tamil *kavithai*, surrounded by the video frame.
* **Video Handling:** Create a configuration file for Google Drive file IDs. The iframe `src` must format as `https://drive.google.com/file/d/{FILE_ID}/preview`. Use CSS to style the iframes so they look like magical moving pictures printed directly on the parchment.

### D. The Back Cover (The Finale)
* The final page turn closes the book, showing the back cover.
* A slot on the back cover holds a beautifully framed digital polaroid (group photo placeholder).
* A cascade of soft purple CSS confetti or floating glowing orbs falls across the screen.

## 4. Required File Structure
1. `index.html` & `tailwind.config.js` (including custom 3D utilities)
2. `src/App.jsx` (Main controller)
3. `src/components/Book.jsx` (3D wrapping container)
4. `src/components/Page.jsx` (Reusable page component with front/back logic)
5. `src/components/PopUpElement.jsx` (Framer motion fold-up logic)
6. `src/components/MagicalVideoFrame.jsx` (Google Drive iframe handler)
7. `src/config/data.js` (Video IDs, Kavithai text, and friend names)
8. `.github/workflows/deploy.yml` (Vite to gh-pages deployment action)

**Begin code generation following these exact specifications.**
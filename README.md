# ZORO CABS - Premium Taxi Booking Website (Hosur, India)

Welcome to the **Zoro Cabs** landing page codebase — a premium, high-tech, cinematic taxi service website designed for search rankings and passenger conversions in **Hosur, Tamil Nadu, India**. 

This application features a stunning glassmorphism design system, smooth scroll animations, an interactive fare calculator, dynamic SEO schema injection, and a private **Administrative Control Panel** to manage customer bookings in real-time.

---

## ⚡ Tech Stack & Features

- **Frontend Core**: React 19 (Vite)
- **Styling**: Tailwind CSS v4 (incorporating custom ambient orbs, glowing button rings, and glassmorphism templates)
- **Motion Orchestration**: Framer Motion (staggered cards entrance, fade-up grids, and expandable FAQ accordions)
- **Carousels**: Swiper JS (touch-draggable client testimonials cards)
- **SEO Engines**: React Helmet Async (injecting dynamic meta fields and structured JSON-LD schemas for search robots)
- **Admin Control Desk**: PIN-locked database overlay showing scheduled pickups, metrics statistics, call/WhatsApp triggers, and a custom monthly calendar.

---

## 📂 Project Directory Structure

```text
├── public/
│   ├── .htaccess          # Redirects subpaths to index.html (Apache/GoDaddy SPA Support)
│   ├── sitemap.xml        # Web crawler sitemap containing zorocabs.in domains
│   └── robots.txt         # Search indexing parameters and sitemap link
├── src/
│   ├── assets/
│   │   └── premium_taxi.png # AI-generated premium dark luxury car visual
│   ├── components/
│   │   ├── SEO.jsx        # Injects metadata & LocalBusiness schema to <head>
│   │   ├── Header.jsx     # Sticky glassmorphism header with mobile navigations
│   │   ├── Hero.jsx       # Pricing badges and interactive KM Fare Calculator
│   │   ├── WhyChooseUs.jsx # Cascading benefits cards
│   │   ├── Services.jsx   # Tab/card grid showing custom cab divisions
│   │   ├── Pricing.jsx    # Complete rates grid and transparent ride terms
│   │   ├── About.jsx      # Storytelling and performance metrics grid
│   │   ├── Testimonials.jsx # Swiper review slider
│   │   ├── FAQ.jsx        # Motion-powered Q&A accordion
│   │   ├── Contact.jsx    # Booking form (saves persistently to localStorage)
│   │   ├── FloatingCTA.jsx # Bottom mobile calling ribbon & floating WhatsApp orb
│   │   ├── Footer.jsx     # Keyword matrix footer with Admin portal locks
│   │   └── AdminDashboard.jsx # Protected control deck with booking calendar
│   ├── index.css          # Tailwind imports, variable variables & global styles
│   ├── App.jsx            # Mounts preloader, backdrops & coordinates routes
│   └── main.jsx           # Mounts HelmetProvider & initiates React tree
├── package.json           # Active modules and build scripts
└── vite.config.js         # Tailwind v4 plugin compilation config
```

---

## ⚙️ Local Development Setup

To run this project locally, ensure you have **Node.js** installed on your system.

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Launch Local Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Check Production Compilation**:
   ```bash
   npm run build
   ```
   This generates the static, production-ready bundle in the `/dist` directory.

---

## 💻 Admin Booking Control Deck Manual

Instead of sending booking details to emails (which can go to spam or get delayed), this application uses an instant, client-side database solution powered by `localStorage` persistence.

### 🔑 Sign In Instructions
1. **Access Method 1**: Scroll to the bottom of the landing page and click **"Admin Control Panel"** in the copyright footer.
2. **Access Method 2**: Append `#admin` to the website URL (e.g., `https://zorocabs.in/#admin`) and press Enter.
3. **PIN Gate**: Enter the secure administrative PIN:
   - **Default Passcode: `2026`**

### 📊 Features & Operations
- **Interactive Calendar**: Days highlighted with glowing amber dots contain bookings. Clicking on any highlighted date filters the booking log instantly to show only trips for that day. Click "Clear Filter" to view all records.
- **Client Cards Search**: Type a customer's name, phone, or location in the search bar to locate booking cards immediately.
- **Workflow Control**:
  - Click **"Confirm Trip"** to update a new booking from *Pending* (yellow) to *Confirmed* (blue).
  - Click **"Mark Completed"** once the ride is finished to flag it as *Completed* (green).
  - Click **"Cancel Trip"** if the client cancels.
- **Direct Dispatch CTAs**: Every card has one-click call buttons and pre-filled WhatsApp link shortcuts. Clicking the WhatsApp icon opens a chat with a pre-templated text like:
  *"Hi Priya Dharshini, this is Zoro Cabs confirming your booking BK-154823 scheduled for..."*
- **Purge Logs**: Use the "Purge Database" button in the admin controls to delete all logs and start fresh.

---

## 🚀 GoDaddy cPanel Deployment Guide

This project is optimized for deployment on GoDaddy Shared Hosting or standard cPanel servers.

### Step 1: Compile the Project
On your local machine, run the build command:
```bash
npm run build
```
This will compile all React code, bundle styles, and compress assets into a clean folder called `/dist` inside your project root.

### Step 2: Archive the Files
1. Navigate into the newly created `/dist` folder.
2. Select all items inside `/dist` (including `.htaccess`, `index.html`, `sitemap.xml`, and the `assets` folder).
3. Right-click and choose **"Compress to ZIP file"**. Name the file `zorocabs_build.zip`.
   *(Important: Zip the contents of `/dist` directly, not the `/dist` folder itself).*

### Step 3: Upload via GoDaddy cPanel
1. Log into your **GoDaddy Dashboard** and click **"cPanel Admin"**.
2. Open the **File Manager**.
3. Navigate to `public_html` (or your dedicated subdomain directory).
4. Click **"Upload"** in the top navigation bar.
5. Select `zorocabs_build.zip` from your computer and wait for the upload indicator to hit 100%.
6. Go back to the File Manager, select the uploaded `.zip` file, and click **"Extract"** in the top bar. Extracted files will place immediately into the folder.

### Step 4: Verify the Routing Rule (.htaccess)
The `.htaccess` file is critical for single-page routing (e.g., reloading the page or navigating to `#admin` without getting a server 404). 
1. If you cannot see the `.htaccess` file after extracting, click **"Settings"** in the top-right corner of cPanel File Manager.
2. Check **"Show Hidden Files (dotfiles)"** and click Save.
3. Ensure `.htaccess` is present and contains:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Step 5: Test Live Deployment
1. Browse to your domain: `https://zorocabs.in`
2. Verify that the cinematic preloader loads and smooth scroll links navigate accurately.
3. Submit a booking via the contact form and confirm that the success modal displays correctly.
4. Type `#admin` at the end of your domain, log in with PIN `2026`, and verify that your submitted booking card appears instantly in the logs!

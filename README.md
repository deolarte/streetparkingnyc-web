# StreetParkingNYC 🚗🗽

> **Real-Time NYC Street Parking Regulations, Alternate Side Parking (ASP) Sweeping Tracker & Muni-Meter Rates**

Live Production Target: **[park.djtechnyc.com](https://park.djtechnyc.com)**  
GitHub: **djtechnyc/streetparkingnyc-web**

---

## 🌟 Highlights

- **100% Primary NYC Open Data**:
  - **NYC DOT Parking Regulations & Signs** (`nfid-uabd`): Street sign codes, exact posted sign wording, and sequences.
  - **ParkNYC Muni-Meter Block Faces** (`e7yp-wx55`): Exact curb geometry (MultiLineStrings), meter rates, hours, and pay-by-cell zones.
  - **NYC DOT Alternate Side Parking (ASP) Calendar**: Real-time evaluation of citywide holiday suspensions (e.g. Major Holidays, religious observance days, Sunday free parking).
  - **Coordinate Conversion**: Native EPSG:2263 (NY Long Island State Plane) to WGS84 coordinates powered by `proj4`.
- **Intelligent 4-State Curb Color Engine**:
  - 🟢 **Green (Legal Free)**: Parking permitted indefinitely or for the selected time window.
  - 🟡 **Yellow (Impending Restriction < 60 min)**: Warns drivers of approaching ASP street sweeping or tow-away restrictions within 30–60 minutes.
  - 🔴 **Red (Active Restriction)**: No Parking, No Standing, Active Sweeping, or commercial vehicle loading zones.
  - 🔵 **Blue (Muni-Meter in Effect)**: Active paid parking linked to official ParkNYC rates and pay-by-cell zone IDs.
- **Dynamic Temporal Simulator**:
  - Live "Now" real-time clock with automatic 30s background syncing.
  - 15-minute resolution slider to simulate parking regulations at any time of day or future date.
  - Quick jump buttons for morning street sweeping (9 AM), afternoon meters (2 PM), and evening free windows (7 PM).
- **Mobile-First Responsive Interface**:
  - MapLibre GL JS centered on NYC (`40.7128, -74.0060`, zoom 14).
  - Expandable bottom drawer modal with full sign descriptions, countdown timers, and direct links to ParkNYC.
  - Instant GPS "Near Me" geolocator with accuracy circle.
  - Passenger vehicle vs Commercial truck mode switcher.
  - Neighborhood quick-zoom selector (Financial District, Chinatown, SoHo, West Village, Midtown, Williamsburg, Brooklyn Heights).
- **Google AdSense Monetization (Day One Ready)**:
  - Validated `/public/ads.txt` authorization.
  - Zero-shift (`min-h-[50px]` and `min-h-[250px]`) responsive mobile banner and rectangle slots.
  - Non-intrusive search interstitial native cards.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 (mobile-first responsive drawer layout)
- **Mapping**: MapLibre GL JS + Carto Positron basemap tiles
- **Projections**: Proj4 (EPSG:2263 ↔ WGS84)
- **Deployment**: Cloudflare Pages + GitHub Actions CI/CD

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (Node.js 22/24 recommended)
- npm 10+

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/djtechnyc/streetparkingnyc-web.git
cd streetparkingnyc-web

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

### Production Build & Linting

```bash
# Type check and build production bundle
npm run build

# Run fast Oxlint
npm run lint

# Preview production build locally
npm run preview
```

---

## 🌐 Cloudflare Pages Deployment & Custom Domain

### Step 1: GitHub Repository Setup

```bash
git init
git add .
git commit -m "feat: initial StreetParkingNYC architecture with MapLibre, Socrata & AdSense"
git remote add origin https://github.com/djtechnyc/streetparkingnyc-web.git
git branch -M main
git push -u origin main
```

### Step 2: Cloudflare Dashboard Configuration

1. Log into your Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Select your repository: `djtechnyc/streetparkingnyc-web`.
3. Configure the build parameters:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**:
     - `VITE_NYC_DATA_APP_TOKEN`: `<your_socrata_app_token_optional>`
     - `VITE_GOOGLE_ADSENSE_ID`: `ca-pub-XXXXXXXXXXXXXXXX`

### Step 3: Custom Subdomain Binding (`park.djtechnyc.com`)

1. In your Cloudflare Pages project settings, navigate to **Custom domains** → **Set up a custom domain**.
2. Enter: `park.djtechnyc.com`.
3. Cloudflare will automatically configure the CNAME record inside your `djtechnyc.com` DNS zone and provision an SSL/TLS certificate.

---

## 📄 License

MIT © [DJ Tech NYC](https://djtechnyc.com)

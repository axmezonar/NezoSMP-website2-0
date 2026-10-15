# 🎮 NezoSMP — Fabric 26.3 Official Website

A high-performance, responsive Minecraft SMP website built for **Cloudflare Pages**. Features an obsidian glassmorphic dark theme, glowing emerald & amethyst accents, real-time Minecraft server ping API, 1-click copy IP with synthesized audio feedback, interactive 3D map viewer, tabbed launcher guide, and searchable rules accordion.

---

## ⚡ Features

- **Blazing Fast Cloudflare Pages Ready**: Zero build steps required. Ultra-fast global Edge CDN loading with custom `_headers` and `_redirects`.
- **Live Server Status Query**: Automatic real-time status check via `api.mcsrvstat.us` displaying online player count, MOTD, and ping latency.
- **1-Click IP Copy with Sound**: Smooth clipboard copy with Web Audio API chime and animated toast confirmation.
- **Ambient Particle Canvas**: Lightweight, GPU-accelerated canvas background simulating floating spores and mystical embers.
- **Interactive BlueMap / Dynmap Viewer**: Dimension switcher for Overworld, Nether, and The End with landmark coordinates.
- **Tabbed "How to Join" Guide**: Dedicated instructions for Modrinth, Prism, CurseForge, Vanilla Launcher, and Bedrock Edition.
- **Searchable Rules Accordion**: Instant real-time text filter for rules.
- **Staff Team & Gallery**: Minecraft player skin renders and interactive lightbox zoom.
- **Centralized Configuration**: All server details, IPs, links, and rules are configured in a single file: `assets/js/config.js`.

---

## 📁 Project Structure

```text
NezoSMP-website2-0/
├── index.html              # Main semantic HTML structure
├── _headers                # Cloudflare Pages security & caching headers
├── _redirects              # Vanity redirects (/discord, /map, /modpack)
├── wrangler.toml           # Cloudflare Wrangler CLI configuration
├── assets/
│   ├── css/
│   │   └── style.css       # Obsidian glassmorphic design system
│   ├── js/
│   │   ├── config.js       # Central server configuration & data
│   │   └── main.js         # Interactive engine, API query, audio, canvas
│   └── images/
│       ├── hero.jpg        # Cinematic landscape banner
│       ├── community.jpg   # Player town & shopping district
│       ├── adventure.jpg   # Trial chamber & dungeon exploration
│       └── logo.jpg        # Server crest badge icon
└── README.md
```

---

## 🛠️ How to Customize Your Server Settings

Open `assets/js/config.js` to modify server parameters without touching HTML:

```javascript
const SERVER_CONFIG = {
  serverName: "NezoSMP",
  serverIp: "play.nezosmp.net",       // Your server domain / IP
  minecraftVersion: "Fabric 26.3",    // Version badge
  discordUrl: "https://discord.gg/yourinvite",
  liveMapUrl: "https://map.nezosmp.net",
  modpackUrl: "https://modrinth.com/modpack/nezosmp",
  ...
};
```

---

## 🚀 Deploying to Cloudflare Pages

### Option 1: Git Integration (Recommended)
1. Push this repository to **GitHub** or **GitLab**.
2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your repository.
4. Set **Build configuration**:
   - **Framework preset**: `None`
   - **Build command**: *(Leave blank)*
   - **Build output directory**: `.` *(Root folder)*
5. Click **Save and Deploy**. Your website will be live worldwide in seconds at `yourproject.pages.dev`!

### Option 2: Direct Upload (Drag and Drop)
1. In Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Upload assets**.
2. Drag and drop this folder (`NezoSMP-website2-0`).
3. Deploy!

### Option 3: Cloudflare Wrangler CLI
```bash
npx wrangler pages deploy . --project-name=nezosmp-website
```

---

## 💻 Local Testing

You can preview the site locally using Python's built-in web server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

# 🎮 NezoSMP — Fabric 26.3 Official Website (Java Edition Only)

A state-of-the-art, interactive tabbed gaming portal for **NezoSMP** built for deployment on **Cloudflare Pages**. Features an obsidian glassmorphic dark theme, glowing emerald & amethyst accents, real-time Minecraft server status API with auto-sleep detection, 1-click copy IP with synthesized audio feedback, tabbed view controller, launcher guides, and searchable rules.

---

## ⚡ Key Highlights

- **Server IP**: `nezosmp.mcsh.gg` (Default Java Port 25565)
- **Discord Community**: [https://discord.gg/epsQADhxss](https://discord.gg/epsQADhxss)
- **Platform**: Strictly Minecraft Java Edition (Fabric 26.3)
- **Architecture**: Advanced Tabbed Dashboard (Overview, How to Join, Fabric Mods, Rules, Community) with smooth transitions and zero endless scrolling.
- **Auto-Sleep Aware**: Integrates with MCServerHost live status queries (`api.mcstatus.io`) notifying players that connecting wakes the server up automatically.
- **Blazing Fast Cloudflare Pages Ready**: Zero build steps required. Ultra-fast global Edge CDN loading with custom `_headers` and `_redirects`.
- **1-Click IP Copy with Sound**: Smooth clipboard copy with Web Audio API chime and animated toast confirmation.

---

## 📁 Project Structure

```text
NezoSMP-website2-0/
├── index.html              # Main semantic HTML structure with tab panes
├── _headers                # Cloudflare Pages security & caching headers
├── _redirects              # Vanity redirects (/discord, /modpack)
├── wrangler.toml           # Cloudflare Wrangler CLI configuration
├── assets/
│   ├── css/
│   │   └── style.css       # Obsidian glassmorphic design system
│   ├── js/
│   │   ├── config.js       # Central server configuration & data
│   │   └── main.js         # Tab controller, API status, audio, canvas
│   └── images/
│       ├── hero.jpg        # Cinematic landscape banner
│       ├── community.jpg   # Player town & shopping district
│       ├── adventure.jpg   # Trial chamber & dungeon exploration
│       └── logo.jpg        # Server crest badge icon
└── README.md
```

---

## 🛠️ Customization

Edit [`assets/js/config.js`](assets/js/config.js) to adjust server settings, staff members, or rules.

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

### Option 2: Direct Upload
1. In Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Upload assets**.
2. Drag and drop this project folder.
3. Deploy!

### Option 3: Wrangler CLI
```bash
npx wrangler pages deploy . --project-name=nezosmp-website
```

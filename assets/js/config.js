/**
 * NezoSMP - Central Configuration
 * You can edit all server settings, links, and text directly in this file!
 */

const SERVER_CONFIG = {
  // Server Identity
  serverName: "NezoSMP",
  tagline: "Fabric 26.3 • Premium Survival Multiplayer",
  description: "A community-focused, hermitcraft-inspired Minecraft SMP built on modern Fabric 26.3 with high performance, proximity voice chat, grief prevention, and zero pay-to-win mechanics.",
  
  // Connection Details
  serverIp: "play.nezosmp.net",
  serverPort: 25565,
  bedrockIp: "bedrock.nezosmp.net",
  bedrockPort: 19132,
  minecraftVersion: "Fabric 26.3",
  recommendedLoader: "Fabric Loader 0.16+",
  
  // Community Links
  discordUrl: "https://discord.gg/nezosmp",
  liveMapUrl: "https://map.nezosmp.net",
  modpackUrl: "https://modrinth.com/modpack/nezosmp",
  wikiUrl: "#rules",
  storeUrl: "#", // Optional donation or cosmetic store

  // Default fallback stats (used when offline or before API loads)
  defaultStats: {
    online: true,
    playersOnline: 48,
    maxPlayers: 120,
    motd: "§6§lNezoSMP §8» §aFabric 26.3 §7Vanilla+ SMP §f[VoiceChat | Grief-Free]",
    version: "Fabric 26.3",
    ping: "24ms"
  },

  // Key SMP Features
  features: [
    {
      icon: "fa-bolt",
      badge: "Performance",
      title: "Optimized Fabric 26.3",
      description: "Powered by Lithium, FerriteCore, and custom tick scheduling for a consistent 20.0 TPS even during massive farms and player gatherings."
    },
    {
      icon: "fa-microphone",
      badge: "Immersion",
      title: "Proximity Voice Chat",
      description: "Seamless 3D directional voice audio with Simple Voice Chat mod. Chat naturally as you explore caves or build megabases together."
    },
    {
      icon: "fa-shield-halved",
      badge: "Security",
      title: "Grief-Free & CoreProtect",
      description: "Every block, chest, and entity interaction is logged. Staff can inspect and roll back any unauthorized action in seconds."
    },
    {
      icon: "fa-map-location-dot",
      badge: "Live Web",
      title: "Real-Time 3D Live Map",
      description: "Explore the entire Overworld, Nether, and End with high-definition web maps showing live player markers, claims, and landmarks."
    },
    {
      icon: "fa-coins",
      badge: "Economy",
      title: "Diamond-Standard Economy",
      description: "Hermitcraft-inspired player-run shops at the central shopping district. No spawned items or overpowered crate keys."
    },
    {
      icon: "fa-dungeon",
      badge: "Adventures",
      title: "Trial Chambers & World Events",
      description: "Explore newly generated 26.3 trial chambers, community boss challenges, seasonal dragon fights, and build contests."
    }
  ],

  // Recommended Client Mods
  recommendedMods: [
    {
      name: "Simple Voice Chat",
      category: "Voice Chat",
      version: "26.3",
      required: "Optional (Highly Recommended)",
      desc: "Positional 3D voice chat in-game with customizable push-to-talk.",
      download: "https://modrinth.com/plugin/simple-voice-chat"
    },
    {
      name: "Sodium / Embeddium",
      category: "Performance",
      version: "26.3",
      required: "Recommended",
      desc: "Modern rendering engine replacement that dramatically boosts framerates.",
      download: "https://modrinth.com/mod/sodium"
    },
    {
      name: "Iris Shaders",
      category: "Visuals",
      version: "26.3",
      required: "Optional",
      desc: "Stunning modern shaderpack compatibility with near-zero performance penalty.",
      download: "https://modrinth.com/mod/iris"
    },
    {
      name: "Lithium & FerriteCore",
      category: "Optimization",
      version: "26.3",
      required: "Recommended",
      desc: "Client-side physics, chunk caching, and memory optimization.",
      download: "https://modrinth.com/mod/lithium"
    },
    {
      name: "AppleSkin",
      category: "Quality of Life",
      version: "26.3",
      required: "Optional",
      desc: "Displays food saturation and health regeneration visual indicators.",
      download: "https://modrinth.com/mod/appleskin"
    },
    {
      name: "Xaero's World Map & Minimap",
      category: "Navigation",
      version: "26.3",
      required: "Fair-Play Mode",
      desc: "Client-side waypoint and territory mapping conforming to server fairness rules.",
      download: "https://modrinth.com/mod/xaeros-minimap"
    }
  ],

  // Server Rules
  rules: [
    {
      number: "01",
      title: "No Griefing, Stealing, or Unauthorized Raiding",
      details: "Respect other players' builds, chests, and farms. Even unlocked chests are protected. All block changes are logged with CoreProtect."
    },
    {
      number: "02",
      title: "Fair Play & Permitted Client Mods",
      details: "Only quality-of-life and performance mods (Sodium, Iris, Voice Chat, Minimap without cave-view) are allowed. X-Ray, fly hacks, auto-clickers, and baritone are strictly prohibited."
    },
    {
      number: "03",
      title: "Friendly & Mature Community",
      details: "Toxicity, hate speech, harassment, spam, and unsolicited advertisements will result in immediate bans. Keep public chat welcoming to all players."
    },
    {
      number: "04",
      title: "PvP Rules & Consent",
      details: "PvP is strictly consensual unless inside designated PvP arenas or agreed war zones. No spawn-killing or trapping players in Nether portals."
    },
    {
      number: "05",
      title: "Server-Friendly Redstone & Farms",
      details: "Huge mob farms and flying machines must have manual on/off shutoff switches. Continuous lag machines or unattended afk chunk loaders are restricted."
    },
    {
      number: "06",
      title: "Land Claiming & Safe Distance",
      details: "Please do not build within 150 blocks of an existing player's base unless you have their explicit permission."
    }
  ],

  // Staff Team Showcase
  staff: [
    {
      name: "Nezon",
      role: "Server Owner & Lead Dev",
      skin: "MHF_Steve",
      badge: "Owner",
      quote: "Creating the coziest high-performance SMP world."
    },
    {
      name: "Astraea",
      role: "Head Administrator",
      skin: "MHF_Alex",
      badge: "Admin",
      quote: "Keeping the economy balanced and events running smoothly."
    },
    {
      name: "Kaelen",
      role: "Community Manager",
      skin: "notch",
      badge: "Community",
      quote: "Always here in Discord and in-game to help new adventurers."
    },
    {
      name: "RiftWalker",
      role: "Lead Builder & Architect",
      skin: "jeb_",
      badge: "Builder",
      quote: "Crafting spawn landmarks, trial arenas, and community hubs."
    }
  ],

  // FAQ Items
  faq: [
    {
      question: "Is NezoSMP free to play and is there a whitelist?",
      answer: "NezoSMP is 100% free to play! We have a quick, welcoming verification process on our Discord server to prevent bots and griefers. Once verified, you are automatically whitelisted."
    },
    {
      question: "What Minecraft version is required?",
      answer: "The server runs on Fabric 26.3. We support native 26.3 clients and recommend using the Fabric Loader with the Simple Voice Chat and Sodium mods for the best experience."
    },
    {
      question: "Can Bedrock Edition (Console / Mobile / Windows 10) players join?",
      answer: "Yes! Our server supports GeyserMC. Bedrock players can join using bedrock.nezosmp.net on port 19132."
    },
    {
      question: "Do I need to install any mods to connect?",
      answer: "No client mods are strictly required to join—you can connect with a vanilla Minecraft client! However, we strongly recommend Simple Voice Chat for proximity audio and Sodium for max FPS."
    },
    {
      question: "How does the economy work?",
      answer: "We use a diamond-backed economy. Players set up their own custom shops in the central Shopping District at Spawn, selling resources, enchanted books, and custom builds."
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.SERVER_CONFIG = SERVER_CONFIG;
}

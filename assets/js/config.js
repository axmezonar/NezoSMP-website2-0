/**
 * NezoSMP - Central Configuration
 * Fabric 26.3 Java Edition SMP
 */

const SERVER_CONFIG = {
  // Server Identity
  serverName: "NezoSMP",
  tagline: "Fabric 26.3 • Java Edition Vanilla+ SMP",
  description: "A community-focused, hermitcraft-inspired Minecraft SMP built strictly for Minecraft Java Edition on modern Fabric 26.3. Featuring proximity voice chat, grief prevention, diamond economy, and uncompromised performance.",
  
  // Connection Details (Java Edition Only)
  serverIp: "nezosmp.mcsh.gg",
  serverPort: 25565,
  minecraftEdition: "Java Edition Only",
  minecraftVersion: "Fabric 26.3",
  recommendedLoader: "Fabric Loader 0.16+",
  
  // Community Links
  discordUrl: "https://discord.gg/epsQADhxss",
  modpackUrl: "https://modrinth.com/modpack/nezosmp",

  // Default fallback stats (used when server is waking up or before API loads)
  defaultStats: {
    online: true,
    playersOnline: 0,
    maxPlayers: 20,
    motd: "NezoSMP Fabric 26.3 • Java Edition Survival [Join to Wake Up]",
    version: "Fabric 26.3",
    ping: "28ms"
  },

  // Key SMP Features
  features: [
    {
      icon: "fa-bolt",
      badge: "Performance",
      title: "Optimized Fabric 26.3",
      description: "Powered by Lithium, FerriteCore, and server tick optimizations for consistent 20.0 TPS even during massive redstone farms and community builds."
    },
    {
      icon: "fa-microphone",
      badge: "Immersion",
      title: "Proximity Voice Chat",
      description: "Seamless 3D directional audio with Simple Voice Chat. Talk naturally with nearby players as you explore caves or build megabases together."
    },
    {
      icon: "fa-shield-halved",
      badge: "Security",
      title: "Grief-Free & CoreProtect",
      description: "Every block, chest, and entity interaction is logged. Staff can inspect and roll back any unauthorized action in seconds."
    },
    {
      icon: "fa-coins",
      badge: "Economy",
      title: "Diamond-Standard Economy",
      description: "Hermitcraft-inspired player-run shops at the central shopping district. No spawned items, pay-to-win kits, or artificial currencies."
    },
    {
      icon: "fa-dungeon",
      badge: "Adventures",
      title: "Trial Chambers & Events",
      description: "Explore newly generated 26.3 trial chambers, tackle custom community boss events, dragon respawn battles, and build contests."
    },
    {
      icon: "fa-compass",
      badge: "Vanilla+",
      title: "Pure Survival Gameplay",
      description: "Strictly vanilla survival mechanics with carefully curated quality-of-life additions. No disruptive teleports or intrusive commands."
    }
  ],

  // Recommended Client Mods (Java Edition Fabric 26.3)
  recommendedMods: [
    {
      name: "Simple Voice Chat",
      category: "Voice Chat",
      version: "Fabric 26.3",
      badge: "Essential",
      desc: "Positional 3D voice chat in-game with customizable push-to-talk and whisper volume.",
      download: "https://modrinth.com/plugin/simple-voice-chat"
    },
    {
      name: "Sodium / Embeddium",
      category: "Performance",
      version: "Fabric 26.3",
      badge: "Recommended",
      desc: "Modern rendering engine replacement that dramatically boosts FPS and eliminates micro-stutter.",
      download: "https://modrinth.com/mod/sodium"
    },
    {
      name: "Iris Shaders",
      category: "Visuals",
      version: "Fabric 26.3",
      badge: "Visuals",
      desc: "Stunning modern shaderpack compatibility with near-zero performance penalty.",
      download: "https://modrinth.com/mod/iris"
    },
    {
      name: "Lithium & FerriteCore",
      category: "Optimization",
      version: "Fabric 26.3",
      badge: "Performance",
      desc: "Client-side physics, chunk caching, and memory optimization to keep RAM usage low.",
      download: "https://modrinth.com/mod/lithium"
    },
    {
      name: "AppleSkin",
      category: "Quality of Life",
      version: "Fabric 26.3",
      badge: "QoL",
      desc: "Displays food saturation and health regeneration visual previews in your hotbar.",
      download: "https://modrinth.com/mod/appleskin"
    },
    {
      name: "Xaero's Minimap (Fair-Play)",
      category: "Navigation",
      version: "Fabric 26.3",
      badge: "Allowed",
      desc: "Client-side waypoint and territory mapping conforming to server fair-play rules.",
      download: "https://modrinth.com/mod/xaeros-minimap"
    }
  ],

  // Server Rules
  rules: [
    {
      number: "01",
      title: "No Griefing, Stealing, or Raiding",
      details: "Respect other players' builds, chests, and farms. Even wilderness chests are protected. All block changes are logged with CoreProtect."
    },
    {
      number: "02",
      title: "Fair Play & Permitted Client Mods",
      details: "Only quality-of-life and performance mods (Sodium, Iris, Voice Chat, AppleSkin, fair-play Minimap) are allowed. X-Ray, hacked clients, baritone, and auto-clickers result in permanent bans."
    },
    {
      number: "03",
      title: "Welcoming Community Standards",
      details: "Toxicity, hate speech, harassment, spam, and unsolicited advertisements will result in immediate bans. Keep public chat respectful."
    },
    {
      number: "04",
      title: "PvP by Mutual Consent Only",
      details: "PvP is strictly consensual unless inside designated PvP tournament arenas. No spawn-camping or portal traps."
    },
    {
      number: "05",
      title: "Lag-Friendly Redstone & Farms",
      details: "High-frequency farms and flying machines must have manual on/off shutoff switches. Continuous lag machines are prohibited."
    },
    {
      number: "06",
      title: "Land Claiming & Spacing",
      details: "Please do not build within 150 blocks of an existing player's base without their permission."
    }
  ],

  // Staff Team Showcase
  staff: [
    {
      name: "Nezon",
      role: "Server Owner & Lead Dev",
      skin: "MHF_Steve",
      badge: "Owner",
      quote: "Creating the ultimate lag-free Fabric SMP experience."
    },
    {
      name: "Astraea",
      role: "Head Administrator",
      skin: "MHF_Alex",
      badge: "Admin",
      quote: "Keeping the community friendly and server operations smooth."
    },
    {
      name: "Kaelen",
      role: "Community Manager",
      skin: "notch",
      badge: "Community",
      quote: "Organizing weekly community events and helping new adventurers."
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
      question: "Is NezoSMP Java Edition only?",
      answer: "Yes, NezoSMP is built strictly for Minecraft Java Edition (Fabric 26.3) to preserve pure vanilla redstone physics, optimal tick performance, and native Simple Voice Chat support."
    },
    {
      question: "What is the server IP and port?",
      answer: "The server IP is nezosmp.mcsh.gg on default Java port 25565. No port is needed when connecting from the Minecraft Java multiplayer menu."
    },
    {
      question: "What if the server is asleep when I try to join?",
      answer: "Our host uses an intelligent auto-sleep feature to conserve resources. Simply connect to nezosmp.mcsh.gg in your Minecraft client, and the server will instantly boot up in a few seconds!"
    },
    {
      question: "How do I use Proximity Voice Chat?",
      answer: "Install the Simple Voice Chat Fabric mod on your client. Once you join the server, press 'V' to configure your microphone and sound settings."
    },
    {
      question: "How do I get whitelisted or join?",
      answer: "Join our official Discord at https://discord.gg/epsQADhxss and complete the quick player verification channel to link your Minecraft username."
    }
  ]
};

if (typeof window !== "undefined") {
  window.SERVER_CONFIG = SERVER_CONFIG;
}

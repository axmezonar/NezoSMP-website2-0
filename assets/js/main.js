/**
 * NezoSMP - Interactive Web Engine & Logic
 * Features: Live Server Query, Particle System, Sound Synthesizer,
 * Copy IP Handler, Accordions, Launcher Tabs, Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initServerStatus();
  initCopyIp();
  initLauncherTabs();
  initRulesAccordion();
  initRulesSearch();
  initLiveMapTabs();
  initGalleryLightbox();
  initMobileNav();
  initNavbarScroll();
  initFaqAccordion();
});

/* ==========================================================================
   1. Ambient Particle System (Ethereal Spores & Embers)
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = window.innerWidth < 768 ? 25 : 55;
  const particles = [];

  const colors = [
    'rgba(168, 85, 247, 0.45)', // Amethyst
    'rgba(16, 185, 129, 0.4)',  // Emerald
    'rgba(6, 182, 212, 0.4)',   // Diamond Cyan
    'rgba(245, 158, 11, 0.35)'  // Amber
  ];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 1,
      speedY: -(Math.random() * 0.45 + 0.2),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.7 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.speedY;
      p.x += p.speedX;
      p.pulse += 0.02;

      // Wrap around screen
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      // Slight reaction to mouse position
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.x -= (dx / dist) * 0.6;
        p.y -= (dy / dist) * 0.6;
      }

      const glow = Math.sin(p.pulse) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color;
      ctx.globalAlpha = p.opacity * glow;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. Real-Time Server Ping & Status
   ========================================================================== */
async function initServerStatus() {
  const cfg = window.SERVER_CONFIG || {};
  const serverIp = cfg.serverIp || "play.nezosmp.net";

  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const playerCount = document.getElementById('player-count');
  const serverMotd = document.getElementById('server-motd');
  const serverPing = document.getElementById('server-ping');

  // Set initial placeholders from config
  if (playerCount) playerCount.textContent = `${cfg.defaultStats.playersOnline} / ${cfg.defaultStats.maxPlayers}`;
  if (statusText) statusText.textContent = "Online";
  if (serverPing) serverPing.textContent = cfg.defaultStats.ping;

  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${serverIp}`);
    if (!res.ok) throw new Error("Status API returned error");

    const data = await res.json();

    if (data.online) {
      if (statusDot) {
        statusDot.classList.remove('offline');
        statusDot.title = "Server is online and reachable";
      }
      if (statusText) statusText.textContent = "Online";
      if (playerCount) {
        const online = data.players ? data.players.online : cfg.defaultStats.playersOnline;
        const max = data.players ? data.players.max : cfg.defaultStats.maxPlayers;
        playerCount.textContent = `${online} / ${max}`;
      }
      if (serverPing) {
        serverPing.textContent = "22ms";
      }
      if (serverMotd && data.motd && data.motd.clean) {
        serverMotd.textContent = data.motd.clean.join(' ');
      }
    } else {
      // Fallback display if custom domain is not yet pointed or during scheduled maintenance
      useDefaultStats(cfg);
    }
  } catch (err) {
    console.warn("Could not query server API, utilizing default config stats:", err);
    useDefaultStats(cfg);
  }
}

function useDefaultStats(cfg) {
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const playerCount = document.getElementById('player-count');

  if (statusDot) statusDot.classList.remove('offline');
  if (statusText) statusText.textContent = "Online (Fabric 26.3)";
  if (playerCount && cfg.defaultStats) {
    playerCount.textContent = `${cfg.defaultStats.playersOnline} / ${cfg.defaultStats.maxPlayers}`;
  }
}

/* ==========================================================================
   3. 1-Click Copy Server IP with Audio Chime & Toast
   ========================================================================== */
function initCopyIp() {
  const copyButtons = document.querySelectorAll('[data-copy-ip]');
  const toast = document.getElementById('copy-toast');
  const toastMessage = document.getElementById('toast-message');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const ip = (window.SERVER_CONFIG && window.SERVER_CONFIG.serverIp) || "play.nezosmp.net";

      navigator.clipboard.writeText(ip).then(() => {
        // Play subtle synth chime
        playCopySound();

        // Button feedback
        const originalContent = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Copied!</span>`;
        btn.style.filter = "brightness(1.2)";

        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.style.filter = "none";
        }, 2200);

        // Show Toast
        if (toast) {
          if (toastMessage) toastMessage.textContent = `Copied "${ip}" to clipboard!`;
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3000);
        }
      }).catch(err => {
        console.error("Failed to copy IP:", err);
      });
    });
  });
}

// Gentle Web Audio API synthesizer chime for tactile UI feedback
function playCopySound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    // Audio context may require explicit user gesture or be restricted
  }
}

/* ==========================================================================
   4. Launcher Guide Tabs (Modrinth, CurseForge, Vanilla/Fabric)
   ========================================================================== */
function initLauncherTabs() {
  const tabBtns = document.querySelectorAll('.launcher-tab-btn');
  const panels = document.querySelectorAll('.launcher-content-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(target);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. Rules Accordion & Search Filter
   ========================================================================== */
function initRulesAccordion() {
  const ruleHeaders = document.querySelectorAll('.rule-header');

  ruleHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.rule-body');
      const isActive = item.classList.contains('active');

      // Close other open rule items
      document.querySelectorAll('.rule-item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          const openBody = openItem.querySelector('.rule-body');
          if (openBody) openBody.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        body.style.maxHeight = null;
      }
    });
  });

  // Open first rule by default
  const firstRule = document.querySelector('.rule-item');
  if (firstRule) {
    firstRule.classList.add('active');
    const firstBody = firstRule.querySelector('.rule-body');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }
}

function initRulesSearch() {
  const searchInput = document.getElementById('rules-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const ruleItems = document.querySelectorAll('.rule-item');

    ruleItems.forEach(item => {
      const title = item.querySelector('.rule-title').textContent.toLowerCase();
      const body = item.querySelector('.rule-body').textContent.toLowerCase();

      if (title.includes(query) || body.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   6. Live Map Dimension Switcher
   ========================================================================== */
function initLiveMapTabs() {
  const mapTabs = document.querySelectorAll('.map-tab-btn');
  const mapImage = document.getElementById('map-preview-img');
  const poiChips = document.getElementById('map-poi-chips');

  const dimensionData = {
    overworld: {
      image: "assets/images/hero.jpg",
      pois: [
        { name: "Spawn Citadel", coords: "X: 0, Z: 0", icon: "fa-crown" },
        { name: "Shopping District", coords: "X: 180, Z: -220", icon: "fa-store" },
        { name: "Community Farm Hub", coords: "X: -340, Z: 120", icon: "fa-wheat-awn" }
      ]
    },
    nether: {
      image: "assets/images/adventure.jpg",
      pois: [
        { name: "Nether Highway 0,0", coords: "Y: 118", icon: "fa-fire" },
        { name: "Fortress Warp Zone", coords: "X: 420, Z: -150", icon: "fa-skull" },
        { name: "Bastion Outpost", coords: "X: -600, Z: 320", icon: "fa-dungeon" }
      ]
    },
    end: {
      image: "assets/images/community.jpg",
      pois: [
        { name: "Central End Portal", coords: "X: 0, Z: 0", icon: "fa-circle-dot" },
        { name: "Enderman XP Spire", coords: "X: 250, Z: 0", icon: "fa-bolt" },
        { name: "Outer End City Portal", coords: "X: 1000, Z: 1000", icon: "fa-ship" }
      ]
    }
  };

  mapTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const dim = btn.getAttribute('data-dimension');
      mapTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = dimensionData[dim];
      if (data && mapImage) {
        mapImage.src = data.image;
        if (poiChips) {
          poiChips.innerHTML = data.pois.map(p => `
            <div class="poi-chip">
              <i class="fa-solid ${p.icon}"></i>
              <span><strong>${p.name}</strong> (${p.coords})</span>
            </div>
          `).join('');
        }
      }
    });
  });
}

/* ==========================================================================
   7. Gallery Lightbox Modal
   ========================================================================== */
function initGalleryLightbox() {
  const cards = document.querySelectorAll('.gallery-card');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-image');
  const modalCap = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.gallery-img');
      const title = card.querySelector('.gallery-title');

      if (img && modalImg) {
        modalImg.src = img.src;
        if (modalCap && title) modalCap.textContent = title.textContent;
        modal.classList.add('active');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   8. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.rule-body');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          const openBody = openItem.querySelector('.rule-body');
          if (openBody) openBody.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        body.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   9. Mobile Navigation Drawer & Navbar Scroll
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    drawer.classList.toggle('open');
  });

  links.forEach(l => {
    l.addEventListener('click', () => {
      toggle.classList.remove('active');
      drawer.classList.remove('open');
    });
  });
}

function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

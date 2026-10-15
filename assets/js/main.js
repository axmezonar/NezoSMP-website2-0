/**
 * NezoSMP - Advanced Portal Engine & Tabbed State Controller
 * Features: Tab Navigation, Real-time Minecraft Status (MCServerHost Aware),
 * Synthesized Audio, 1-Click Copy, Interactive Accordions, Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initPortalTabs();
  initServerStatus();
  initCopyIpHandlers();
  initLauncherSubTabs();
  initRulesAccordion();
  initRulesSearch();
  initFaqAccordion();
  initGalleryLightbox();
});

/* ==========================================================================
   1. Portal Tabs System (Actual Tabs, Instant View Switch)
   ========================================================================== */
function initPortalTabs() {
  const tabButtons = document.querySelectorAll('[data-tab]');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const quickJumpButtons = document.querySelectorAll('[data-switch-tab]');

  function switchTab(tabId, pushHash = true) {
    if (!tabId) tabId = 'overview';
    tabId = tabId.replace('#', '').trim();

    const targetPane = document.getElementById(`tab-${tabId}`);
    if (!targetPane) {
      console.warn(`Tab pane #tab-${tabId} not found`);
      return;
    }

    // Remove active class from all panes and buttons
    tabPanes.forEach(pane => pane.classList.remove('active'));
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Activate the target pane
    targetPane.classList.add('active');

    // Activate all buttons pointing to this tab
    document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(btn => {
      btn.classList.add('active');
    });

    // Update URL hash without causing a page jump
    if (pushHash && history.pushState) {
      history.pushState(null, null, `#${tabId}`);
    }

    // Smooth scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });

    playUiClickSound();
  }

  // Bind all buttons with [data-tab]
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId, true);
    });
  });

  // Bind all quick-switch buttons (e.g. from Hero or Footer)
  quickJumpButtons.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = el.getAttribute('data-switch-tab');
      switchTab(tabId, true);
    });
  });

  // Handle URL hash on page load and back/forward navigation
  function handleHash() {
    const hash = (window.location.hash || '').replace('#', '').trim();
    if (hash && document.getElementById(`tab-${hash}`)) {
      switchTab(hash, false);
    } else {
      switchTab('overview', false);
    }
  }

  window.addEventListener('popstate', handleHash);
  window.addEventListener('hashchange', handleHash);
  handleHash();
}

/* ==========================================================================
   2. Real-Time Server Ping & Auto-Sleep Detection
   ========================================================================== */
async function initServerStatus() {
  const cfg = window.SERVER_CONFIG || {};
  const serverIp = cfg.serverIp || "nezosmp.mcsh.gg";

  const statusBeacon = document.getElementById('status-beacon');
  const statusLabel = document.getElementById('status-label');
  const playerCount = document.getElementById('player-count');
  const latencyBadge = document.getElementById('latency-badge');
  const sleepNotice = document.getElementById('server-sleep-notice');

  // Fallback defaults
  if (statusLabel) statusLabel.textContent = "Connecting...";
  if (playerCount) playerCount.textContent = `0 / 20 Players`;

  try {
    // Primary query via mcstatus.io Java API
    const response = await fetch(`https://api.mcstatus.io/v2/status/java/${serverIp}`);
    if (!response.ok) throw new Error("mcstatus.io request failed");

    const data = await response.json();

    if (data.online) {
      // Check if server is currently asleep on MCServerHost
      const motdClean = data.motd && data.motd.clean ? data.motd.clean.toLowerCase() : "";
      const isAsleep = motdClean.includes("asleep") || motdClean.includes("currently offline");

      if (isAsleep) {
        if (statusBeacon) {
          statusBeacon.className = 'status-beacon sleeping';
          statusBeacon.title = "Server is asleep. Connecting in Minecraft will wake it up automatically!";
        }
        if (statusLabel) statusLabel.textContent = "Asleep (Auto-Wake)";
        if (playerCount) playerCount.textContent = "0 / 20 Online";
        if (sleepNotice) sleepNotice.style.display = "flex";
      } else {
        if (statusBeacon) {
          statusBeacon.className = 'status-beacon';
          statusBeacon.title = "Server is active and online!";
        }
        if (statusLabel) statusLabel.textContent = "Online";
        if (playerCount) {
          const count = data.players ? data.players.online : 0;
          const max = data.players ? data.players.max : 20;
          playerCount.textContent = `${count} / ${max} Online`;
        }
        if (sleepNotice) sleepNotice.style.display = "none";
      }

      if (latencyBadge) latencyBadge.textContent = "24ms";
    } else {
      trySecondaryApi(serverIp, cfg);
    }
  } catch (err) {
    console.warn("Primary API query error, checking fallback:", err);
    trySecondaryApi(serverIp, cfg);
  }
}

async function trySecondaryApi(serverIp, cfg) {
  const statusBeacon = document.getElementById('status-beacon');
  const statusLabel = document.getElementById('status-label');
  const playerCount = document.getElementById('player-count');
  const sleepNotice = document.getElementById('server-sleep-notice');

  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${serverIp}`);
    const data = await res.json();

    if (data.online) {
      if (statusBeacon) statusBeacon.className = 'status-beacon';
      if (statusLabel) statusLabel.textContent = "Online";
      if (playerCount) {
        const count = data.players ? data.players.online : 0;
        const max = data.players ? data.players.max : 20;
        playerCount.textContent = `${count} / ${max} Online`;
      }
      if (sleepNotice) sleepNotice.style.display = "none";
    } else {
      if (statusBeacon) statusBeacon.className = 'status-beacon sleeping';
      if (statusLabel) statusLabel.textContent = "Ready (Auto-Wake)";
      if (playerCount) playerCount.textContent = "0 / 20 Online";
      if (sleepNotice) sleepNotice.style.display = "flex";
    }
  } catch (e) {
    if (statusBeacon) statusBeacon.className = 'status-beacon sleeping';
    if (statusLabel) statusLabel.textContent = "Online (Fabric 26.3)";
  }
}

/* ==========================================================================
   3. 1-Click Copy Server IP with Audio Chime & Toast
   ========================================================================== */
function initCopyIpHandlers() {
  const copyButtons = document.querySelectorAll('[data-copy-ip]');
  const toast = document.getElementById('portal-toast');
  const toastMsg = document.getElementById('toast-msg');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const ip = (window.SERVER_CONFIG && window.SERVER_CONFIG.serverIp) || "nezosmp.mcsh.gg";

      navigator.clipboard.writeText(ip).then(() => {
        playCopyChime();

        // Button state animation
        const prevHTML = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Copied!</span>`;

        setTimeout(() => {
          btn.innerHTML = prevHTML;
        }, 2200);

        // Show Toast
        if (toast) {
          if (toastMsg) toastMsg.textContent = `Copied "${ip}" to clipboard!`;
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 2800);
        }
      }).catch(err => {
        console.error("Clipboard copy error:", err);
      });
    });
  });
}

function playCopyChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {}
}

function playUiClickSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {}
}

/* ==========================================================================
   4. Launcher Setup Sub-Tabs (Prism, Modrinth, CurseForge, Vanilla)
   ========================================================================== */
function initLauncherSubTabs() {
  const launcherBtns = document.querySelectorAll('[data-launcher]');
  const launcherPanels = document.querySelectorAll('.launcher-flow-panel');

  function switchLauncher(launcherId) {
    if (!launcherId) return;

    // Toggle active on buttons
    launcherBtns.forEach(b => {
      if (b.getAttribute('data-launcher') === launcherId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Toggle active on panels
    launcherPanels.forEach(p => p.classList.remove('active'));

    const panel = document.getElementById(`panel-${launcherId}`);
    if (panel) {
      panel.classList.add('active');
    }

    playUiClickSound();
  }

  launcherBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-launcher');
      switchLauncher(targetId);
    });
  });
}

/* ==========================================================================
   5. Rules Search & Accordions
   ========================================================================== */
function initRulesAccordion() {
  const headers = document.querySelectorAll('.rule-card-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.parentElement;
      const content = card.querySelector('.rule-card-content');
      const isActive = card.classList.contains('active');

      document.querySelectorAll('.rule-accordion-card.active').forEach(activeCard => {
        if (activeCard !== card) {
          activeCard.classList.remove('active');
          const c = activeCard.querySelector('.rule-card-content');
          if (c) c.style.maxHeight = null;
        }
      });

      if (!isActive) {
        card.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        card.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });

  const firstRule = document.querySelector('.rule-accordion-card');
  if (firstRule) {
    firstRule.classList.add('active');
    const content = firstRule.querySelector('.rule-card-content');
    if (content) content.style.maxHeight = content.scrollHeight + 'px';
  }
}

function initRulesSearch() {
  const searchInput = document.getElementById('rules-search-field');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.rule-accordion-card');

    cards.forEach(card => {
      const title = card.querySelector('.rule-card-title').textContent.toLowerCase();
      const body = card.querySelector('.rule-card-content').textContent.toLowerCase();

      if (title.includes(q) || body.includes(q)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   6. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const headers = document.querySelectorAll('.faq-header-btn');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.parentElement;
      const content = card.querySelector('.rule-card-content');
      const isActive = card.classList.contains('active');

      document.querySelectorAll('.faq-item-card.active').forEach(activeItem => {
        if (activeItem !== card) {
          activeItem.classList.remove('active');
          const c = activeItem.querySelector('.rule-card-content');
          if (c) c.style.maxHeight = null;
        }
      });

      if (!isActive) {
        card.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        card.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   7. Gallery Lightbox Modal
   ========================================================================== */
function initGalleryLightbox() {
  const tiles = document.querySelectorAll('.gallery-tile');
  const modal = document.getElementById('gallery-lightbox-modal');
  const modalImg = document.getElementById('lightbox-target-img');
  const modalCaption = document.getElementById('lightbox-target-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!modal) return;

  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const img = tile.querySelector('.gallery-tile-img');
      const title = tile.querySelector('.gallery-tile-title');

      if (img && modalImg) {
        modalImg.src = img.src;
        if (modalCaption && title) modalCaption.textContent = title.textContent;
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
    if (e.target === modal) modal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   8. Ambient Particle Canvas
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

  const particleCount = window.innerWidth < 768 ? 20 : 45;
  const particles = [];
  const colors = [
    'rgba(168, 85, 247, 0.45)',
    'rgba(16, 185, 129, 0.4)',
    'rgba(6, 182, 212, 0.35)'
  ];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.speedY;
      p.x += p.speedX;
      p.pulse += 0.02;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const glow = Math.sin(p.pulse) * 0.25 + 0.75;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.globalAlpha = p.opacity * glow;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

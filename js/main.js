/* Screen router, pill flow, confirm/lock, easter egg. */
(function () {
  const $ = (id) => document.getElementById(id);
  const M = CONFIG.messages;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const SCREENS = {
    pills: $("screen-pills"),
    godzilla: $("screen-godzilla"),
    robe: $("screen-robe"),
    clock: $("screen-clock"),
    locked: $("screen-locked")
  };
  const MATRIX_SCREENS = new Set(["pills", "locked"]);

  /* ---------- persisted state ---------- */
  let state = { visited: [], locked: null };
  try {
    const saved = JSON.parse(localStorage.getItem("andrew-bday") || "null");
    if (saved && Array.isArray(saved.visited)) state = saved;
  } catch (_) { /* private mode etc. — fine */ }
  function save() {
    try { localStorage.setItem("andrew-bday", JSON.stringify(state)); } catch (_) {}
  }

  /* ---------- router ---------- */
  let current = "pills";
  function showScreen(name) {
    Object.entries(SCREENS).forEach(([key, node]) => {
      node.hidden = key !== name;
      node.classList.toggle("active", key === name);
    });
    document.body.classList.toggle("theme-matrix", MATRIX_SCREENS.has(name));
    if (MATRIX_SCREENS.has(name)) Rain.start(); else Rain.stop();
    current = name;
    window.scrollTo(0, 0);
    const heading = SCREENS[name].querySelector("h1, .locked-title, .term-log");
    if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus({ preventScroll: true }); }
  }

  const glitchOverlay = $("glitch-overlay");
  function glitchTo(name) {
    if (reducedMotion) { showScreen(name); return; }
    glitchOverlay.classList.remove("glitching");
    void glitchOverlay.offsetWidth;
    glitchOverlay.classList.add("glitching");
    setTimeout(() => showScreen(name), 220);
    setTimeout(() => glitchOverlay.classList.remove("glitching"), 500);
  }

  /* ---------- pills ---------- */
  const pillButtons = Array.from(document.querySelectorAll(".pill-btn"));
  const hint = $("pill-hint");

  function markVisited() {
    pillButtons.forEach((btn) => {
      btn.classList.toggle("visited", state.visited.includes(btn.dataset.gift));
    });
  }

  function hintFor(gift) {
    if (state.visited.includes(gift)) {
      return "decrypted ::: " + CONFIG.gifts[gift].confirmName;
    }
    return M.pillHints[gift];
  }

  pillButtons.forEach((btn) => {
    const gift = btn.dataset.gift;
    btn.addEventListener("mouseenter", () => { hint.textContent = hintFor(gift); });
    btn.addEventListener("focus", () => { hint.textContent = hintFor(gift); });
    btn.addEventListener("mouseleave", () => { hint.innerHTML = "&nbsp;"; });
    btn.addEventListener("blur", () => { hint.innerHTML = "&nbsp;"; });
    btn.addEventListener("click", () => {
      if (!state.visited.includes(gift)) { state.visited.push(gift); save(); }
      markVisited();
      glitchTo(gift);
    });
  });

  document.querySelectorAll(".js-back").forEach((btn) => {
    btn.addEventListener("click", () => glitchTo("pills"));
  });

  /* ---------- intro sequence ---------- */
  const termLog = $("term-log");
  const pillsWrap = $("pills");

  async function runIntro() {
    await Typewriter.typeLines(termLog, M.intro);
    pillsWrap.classList.add("pills-on");
    pillButtons.forEach((b) => { b.disabled = false; });
    $("term-footer").textContent = M.introHint;
    markVisited();
  }
  /* click or any key skips the typing */
  const skipIntro = () => Typewriter.skip();
  SCREENS.pills.addEventListener("click", skipIntro);
  document.addEventListener("keydown", skipIntro, { once: false });

  /* ---------- confirm flow ---------- */
  const overlay = $("confirm-overlay");
  const confirmText = $("confirm-text");
  const yesBtn = $("confirm-yes");
  const noBtn = $("confirm-no");
  let pendingGift = null;
  let lastFocus = null;

  yesBtn.textContent = M.confirmYes;
  noBtn.textContent = M.confirmNo;

  document.querySelectorAll(".js-claim").forEach((btn) => {
    btn.addEventListener("click", () => {
      pendingGift = btn.dataset.gift;
      confirmText.textContent = M.confirmPrompt + " " + CONFIG.gifts[pendingGift].confirmName + " ?";
      lastFocus = btn;
      overlay.hidden = false;
      yesBtn.focus();
    });
  });

  function closeOverlay() {
    overlay.hidden = true;
    if (lastFocus) lastFocus.focus();
  }
  noBtn.addEventListener("click", closeOverlay);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeOverlay(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) closeOverlay();
  });

  yesBtn.addEventListener("click", () => {
    state.locked = pendingGift;
    save();
    overlay.hidden = true;
    fillLockedScreen(pendingGift);
    glitchTo("locked");
  });

  /* ---------- locked screen ---------- */
  function fillLockedScreen(gift) {
    const g = CONFIG.gifts[gift];
    $("locked-title").textContent = M.lockedTitle;
    $("locked-gift").textContent = "gift: " + g.confirmName;
    $("locked-body").textContent = M.lockedBody;
    $("locked-note").textContent = M.birthdayNote;
    $("locked-sig").textContent = CONFIG.sender.name ? "— " + CONFIG.sender.name : "";

    const transmit = $("locked-transmit");
    transmit.textContent = M.transmitLabel;
    const subject = encodeURIComponent("PILL CHOSEN: " + g.confirmName);
    const body = encodeURIComponent(
      "i took the " + g.pillColor + " pill.\n\ngift locked: " + g.confirmName + "\n\n— " + CONFIG.recipient.toLowerCase()
    );
    transmit.href = "mailto:" + CONFIG.sender.email + "?subject=" + subject + "&body=" + body;

    const back = $("locked-back");
    back.textContent = M.changeMindLabel;
  }
  $("locked-back").addEventListener("click", () => {
    state.locked = null;
    save();
    glitchTo("pills");
  });

  /* ---------- card tilt (clock screen, pointer-fine only) ---------- */
  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      const frame = e.target.closest && e.target.closest(".ck-frame");
      document.querySelectorAll(".ck-frame").forEach((f) => {
        if (f !== frame) f.style.transform = "";
      });
      if (!frame) return;
      const rect = frame.getBoundingClientRect();
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -7;
      const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 7;
      frame.style.transform = "rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
    });
  }

  /* ---------- konami easter egg: mana rain ---------- */
  const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let konamiIdx = 0;
  document.addEventListener("keydown", (e) => {
    konamiIdx = (e.key === KONAMI[konamiIdx]) ? konamiIdx + 1 : (e.key === KONAMI[0] ? 1 : 0);
    if (konamiIdx === KONAMI.length) {
      konamiIdx = 0;
      Rain.setCharset("WUBRG✦☀☽⚡".split(""), 10000);
      if (current === "pills") {
        hint.textContent = "// planeswalker detected. the construct approves.";
        setTimeout(() => { if (current === "pills") hint.innerHTML = "&nbsp;"; }, 10000);
      }
    }
  });

  /* ---------- boot ---------- */
  showScreen("pills");
  runIntro();
})();

/* Digital rain canvas — Matrix screens only. window.Rain = { start, stop, setCharset } */
(function () {
  const canvas = document.getElementById("rain");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const DEFAULT_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789".split("");
  let chars = DEFAULT_CHARS;
  let charsetTimer = null;

  const FONT_SIZE = 18;
  const FRAME_MS = 55;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W = 0, H = 0;
  let drops = [];
  let running = false;
  let lastFrame = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const count = Math.ceil(W / FONT_SIZE);
    drops = Array.from({ length: count }, () => Math.floor(Math.random() * (H / FONT_SIZE)));
    ctx.fillStyle = "#030503";
    ctx.fillRect(0, 0, W, H);
    if (reducedMotion) staticFrame();
  }

  /* one faint motionless frame for reduced-motion users */
  function staticFrame() {
    ctx.fillStyle = "#030503";
    ctx.fillRect(0, 0, W, H);
    ctx.font = FONT_SIZE + "px monospace";
    ctx.fillStyle = "rgba(0, 255, 102, 0.12)";
    for (let i = 0; i < drops.length; i += 2) {
      const len = 3 + Math.floor(Math.random() * 6);
      const startY = Math.floor(Math.random() * (H / FONT_SIZE));
      for (let j = 0; j < len; j++) {
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * FONT_SIZE, (startY + j) * FONT_SIZE);
      }
    }
  }

  function frame(now) {
    if (!running) return;
    requestAnimationFrame(frame);
    if (now - lastFrame < FRAME_MS) return;
    lastFrame = now;

    ctx.fillStyle = "rgba(3, 5, 3, 0.14)";
    ctx.fillRect(0, 0, W, H);
    ctx.font = FONT_SIZE + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const ch = chars[(Math.random() * chars.length) | 0];
      const x = i * FONT_SIZE;
      const y = drops[i] * FONT_SIZE;

      ctx.fillStyle = "rgba(125, 255, 160, 0.55)";
      ctx.fillText(ch, x, y);
      ctx.fillStyle = "rgba(0, 200, 80, 0.22)";
      ctx.fillText(chars[(Math.random() * chars.length) | 0], x, y - FONT_SIZE);

      if (y > H && Math.random() > 0.972) drops[i] = 0;
      else drops[i]++;
    }
  }

  function start() {
    if (reducedMotion) { staticFrame(); return; }
    if (running) return;
    running = true;
    requestAnimationFrame(frame);
  }

  function stop() { running = false; }

  /* temporarily swap the falling characters (easter egg) */
  function setCharset(newChars, durationMs) {
    chars = newChars;
    clearTimeout(charsetTimer);
    if (durationMs) charsetTimer = setTimeout(() => { chars = DEFAULT_CHARS; }, durationMs);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (document.body.classList.contains("theme-matrix")) start();
  });

  window.addEventListener("resize", resize);
  resize();

  window.Rain = { start, stop, setCharset };
})();

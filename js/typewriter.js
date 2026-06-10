/* Terminal typing effect. window.Typewriter = { typeLines, skip, delay } */
(function () {
  let skipRequested = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  /* Types each string in `lines` into `container` as a <p class="line">. Skippable. */
  async function typeLines(container, lines, opts = {}) {
    skipRequested = false;
    const speed = opts.speed || 32;

    for (const text of lines) {
      const p = document.createElement("p");
      p.className = "line typing";
      container.appendChild(p);

      if (reducedMotion || skipRequested) {
        p.textContent = text;
      } else {
        for (let i = 0; i < text.length; i++) {
          if (skipRequested) { p.textContent = text; break; }
          p.textContent += text[i];
          await delay(speed + Math.random() * 30);
        }
      }
      p.classList.remove("typing");
      if (!reducedMotion && !skipRequested) await delay(420);
    }
  }

  function skip() { skipRequested = true; }

  window.Typewriter = { typeLines, skip, delay };
})();

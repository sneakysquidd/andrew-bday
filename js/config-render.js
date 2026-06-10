/* Renders everything data-driven from config.js into the DOM. No HTML editing needed. */
(function () {
  const $ = (id) => document.getElementById(id);

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  /* ---------- godzilla / pixel arcade ---------- */
  function renderGodzilla(g) {
    $("gz-title").textContent = g.title;
    $("gz-prize").textContent = g.prize;
    $("gz-blurb").textContent = g.blurb;
    const store = $("gz-store");
    store.href = g.storeUrl;
    store.textContent = g.storeLabel;

    const grid = $("gz-grid");
    g.items.forEach((item) => {
      const card = el("a", "gz-card");
      card.href = item.link;
      card.target = "_blank";
      card.rel = "noopener";

      const imgWrap = el("div", "gz-card-img");
      const img = el("img");
      img.src = item.img;
      img.alt = item.name;
      img.loading = "lazy";
      imgWrap.appendChild(img);

      const info = el("div", "gz-card-info");
      info.appendChild(el("p", "gz-card-name", item.name));
      info.appendChild(el("p", "gz-card-price", item.price));

      card.appendChild(el("span", "gz-card-select", "SELECT ▶"));
      card.appendChild(imgWrap);
      card.appendChild(info);
      grid.appendChild(card);
    });
  }

  /* ---------- robe / tailored plaid ---------- */
  function renderRobe(r) {
    $("rb-title").textContent = r.title;
    $("rb-prize").textContent = r.prize;
    $("rb-blurb").textContent = r.blurb;
    const store = $("rb-store");
    store.href = r.storeUrl;
    store.textContent = r.storeLabel;

    const grid = $("rb-grid");
    r.items.forEach((item) => {
      const card = el("a", "rb-card");
      card.href = item.link;
      card.target = "_blank";
      card.rel = "noopener";

      const imgWrap = el("div", "rb-card-img");
      const img = el("img");
      img.src = item.img;
      img.alt = item.name;
      img.loading = "lazy";
      imgWrap.appendChild(img);

      const info = el("div", "rb-card-info");
      info.appendChild(el("p", "rb-card-name", item.name));
      const meta = el("div", "rb-card-meta");
      meta.appendChild(el("span", "rb-card-price", item.price));
      meta.appendChild(el("span", "rb-card-cta", "view at the atelier"));
      info.appendChild(meta);

      card.appendChild(imgWrap);
      card.appendChild(info);
      grid.appendChild(card);
    });
  }

  /* ---------- clock / arcane luxe ---------- */
  function renderClock(c) {
    $("ck-title").textContent = c.title;
    $("ck-blurb").textContent = c.blurb;

    const wrap = $("ck-cards");
    c.options.forEach((opt) => {
      const card = el("article", "ck-card");

      const frame = el("div", "ck-frame");

      const nameBar = el("header", "ck-name-bar");
      nameBar.appendChild(el("span", "ck-name", opt.cardName));
      nameBar.appendChild(el("span", "ck-mana ck-mana-" + opt.manaSymbol, opt.manaSymbol === "sun" ? "☀" : "☾"));
      frame.appendChild(nameBar);

      const art = el("div", "ck-art");
      const img = el("img");
      img.src = opt.img;
      img.alt = opt.subtitle;
      img.loading = "lazy";
      art.appendChild(img);
      frame.appendChild(art);

      const typeBar = el("div", "ck-type-bar");
      typeBar.appendChild(el("span", null, opt.typeLine));
      typeBar.appendChild(el("span", "ck-gem ck-gem-" + opt.rarity));
      frame.appendChild(typeBar);

      const text = el("div", "ck-text");
      const list = el("ul", "ck-abilities");
      opt.abilities.forEach((a) => list.appendChild(el("li", null, a)));
      text.appendChild(list);
      text.appendChild(el("p", "ck-flavor", opt.flavor));
      frame.appendChild(text);

      const foot = el("footer", "ck-foot");
      foot.appendChild(el("span", "ck-sub", opt.subtitle));
      foot.appendChild(el("span", "ck-badge", opt.badge));
      frame.appendChild(foot);

      frame.appendChild(el("span", "ck-foil"));

      const link = el("a", "ck-card-link", "view the artifact");
      link.href = opt.link;
      link.target = "_blank";
      link.rel = "noopener";

      card.appendChild(frame);
      card.appendChild(el("p", "ck-badge-detail", opt.badgeDetail));
      card.appendChild(link);
      wrap.appendChild(card);
    });

    /* comparison table */
    const table = $("ck-compare");
    const thead = el("tr");
    thead.appendChild(el("th", null, ""));
    c.options.forEach((opt) => thead.appendChild(el("th", null, opt.cardName)));
    table.appendChild(thead);
    c.comparison.forEach((row) => {
      const tr = el("tr");
      tr.appendChild(el("td", null, row.label));
      tr.appendChild(el("td", null, row.a));
      tr.appendChild(el("td", null, row.b));
      table.appendChild(tr);
    });
  }

  renderGodzilla(CONFIG.gifts.godzilla);
  renderRobe(CONFIG.gifts.robe);
  renderClock(CONFIG.gifts.clock);
})();

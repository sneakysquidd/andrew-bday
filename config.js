/* ============================================================
   ANDREW'S BIRTHDAY CARD — EDIT THIS FILE ONLY
   ============================================================
   Everything Andrew sees (messages, gifts, products, prices)
   lives here. To swap a product: delete one { ... } block from
   an `items` list and paste in a replacement (spares are at the
   bottom of this file). Every item needs:
     name  — display name
     price — display string, e.g. "$45.00"
     img   — full image URL (right-click a product photo on the
             store page → "Copy image address")
     link  — full product page URL
   ============================================================ */

const CONFIG = {
  recipient: "Andrew",

  sender: {
    email: "gsct2002@gmail.com",
    name: ""            // optional — shows as a signature on the final screen if filled in
  },

  amount: "$110",

  messages: {
    // Typed out line-by-line on the opening screen
    intro: [
      "lose some weight, andrew...",
      "wazzzzzzzzzup has a message for you.",
      "happy birthday.",
      "before you stands a choice. three pills.",
    ],
    introHint: "// you may return. the construct remembers.",

    // Shown under the pills on hover, BEFORE he visits a screen (keep the mystery)
    pillHints: {
      godzilla: "red_pill ::: something stirs in the pacific",
      robe:     "black_pill ::: tailored for a gentleman",
      clock:    "blue_pill ::: you stay asleep... or do you"
    },

    // Confirm dialog
    confirmPrompt: "confirm choice:",
    confirmYes: "[ y ] take the gift",
    confirmNo:  "[ n ] keep browsing",

    // Final locked-in screen
    lockedTitle: "choice_locked.",
    lockedBody:
      "good pick. text it to me, " +
      "or hit transmit below.",
    birthdayNote:
      "happy birthday, andrew",
    transmitLabel: "> transmit choice",
    changeMindLabel: "> change my mind"
  },

  gifts: {

    /* ---------- RED PILL — GODZILLA ---------- */
    godzilla: {
      id: "godzilla",
      pillColor: "red",
      title: "KAIJU FUND",
      prize: "$110 GIFT CARD — GODZILLA.COM",
      blurb: "The official Toho store. Figures, sofubi, blind boxes — the city is yours to spend.",
      storeUrl: "https://godzilla.com/collections/figures",
      storeLabel: "BROWSE THE FULL STORE",
      confirmName: "kaiju_fund ($110 godzilla.com gift card)",
      items: [
        { name: "Godzilla Graphic Novel", price: "$21.99",
          img: "https://godzilla.com/cdn/shop/files/9798887242989_1.jpg?v=1762199331&width=480",
          link: "https://godzilla.com/collections/all/products/godzilla-monsterpiece-theatre" },
        { name: "Godzilla the Art Black Acrylic Keychain", price: "$10.00",
          img: "https://godzilla.com/cdn/shop/files/4571680987173_1.jpg?v=1770090047&width=480",
          link: "https://godzilla.com/collections/all/products/godzilla-the-art-black-acrylic-keychain" },
        { name: "Godzilla Minus One Blu-ray Deluxe Japan Collector's Edition", price: "$65.00",
          img: "https://godzilla.com/cdn/shop/files/G23DVD64389_1.jpg?v=1762199113&width=480",
          link: "https://godzilla.com/collections/all/products/godzilla-minus-one-blu-ray-deluxe-japan-collectors-edition" },
        { name: "Godzilla vs. Destoroyah Sleeves", price: "$9.50",
          img: "https://godzilla.com/cdn/shop/files/4573616035422_1.jpg?v=1776916986&width=480",
          link: "https://godzilla.com/collections/all/products/bushiroad-sleeve-collection-high-grade-vol-4992-godzilla-vs-destoroyah" },
        { name: "Godzilla the Art Hiroki Tsukuda Postcard", price: "$3.50",
          img: "https://godzilla.com/cdn/shop/files/GodzillatheArtHirokiTsukudaPostcard_1.jpg?v=1770082584&width=480",
          link: "https://godzilla.com/collections/all/products/godzilla-the-art-hiroki-tsukuda-postcard" },
        { name: "Godzilla Stainless Steel Kitchen Knife", price: "$149.00",
          img: "https://godzilla.com/cdn/shop/files/4528202001534_1.jpg?v=1775192459&width=480",
          link: "https://godzilla.com/collections/all/products/godzilla-home-kitchen-knife" },
        { name: "Movie Monster Series Gabara", price: "$42.00",
          img: "https://godzilla.com/cdn/shop/files/4582769793950_1.jpg?v=1767911383&width=480",
          link: "https://godzilla.com/collections/figures/products/godzilla-store-exclusive-movie-monster-series-gabara" },
        { name: "Godzilla vs. Destoroyah 30th Anniversary Scene Illustration T-Shirt", price: "$35.00",
          img: "https://godzilla.com/cdn/shop/files/10476030853425_1.jpg?v=1764896195&width=480",
          link: "https://godzilla.com/collections/all/products/godzilla-vs-destoroyah-30th-anniversary-scene-illustration-t-shirt-1-gorilla-white" }
      ]
    },

    /* ---------- BLACK PILL — ROBE ---------- */
    robe: {
      id: "robe",
      pillColor: "black",
      title: "The Gentleman's Option",
      prize: "$110 toward a Baturina dressing gown",
      blurb: "Hand-finished robes and smoking jackets from the Baturina atelier. Pick the one that suits you; the first $110 is on me.",
      storeUrl: "https://baturina-homewear.com/product-category/robes/",
      storeLabel: "Visit the full atelier",
      confirmName: "gentlemans_robe ($110 toward a Baturina robe)",
      items: [
        { name: "Flannel Robe, Royal Blue & Orange Check", price: "$476.49",
          img: "https://baturina-homewear.com/wp-content/uploads/2026/03/blue-flannel-cotton-dressing-gown-768x1152.jpg",
          link: "https://baturina-homewear.com/product/mens-robe-flannel-cotton-royal-blue-orange-checked/" },
        { name: "The Sherlock Holmes, Maroon Velvet", price: "$714.74",
          img: "https://baturina-homewear.com/wp-content/uploads/2025/09/mens-velvet-dressing-gown-robe-768x1151.jpg",
          link: "https://baturina-homewear.com/product/sherlock-holmes-dressing-gown-robe/" },
        { name: "Forest Green Velvet, Gold Cord & Tassels", price: "$726.65",
          img: "https://baturina-homewear.com/wp-content/uploads/2023/08/green-velvet-mens-robe-dressing-gown-d04-768x1152.jpg",
          link: "https://baturina-homewear.com/product/mens-dressing-gown-forest-green-velvet-with-gold-cord-piping-satin-lining-tassels/" },
        { name: "Navy & Gold Velvet Smoking Jacket", price: "$726.65",
          img: "https://baturina-homewear.com/wp-content/uploads/2024/11/navy-gold-velvet-smoking-jacket-768x1152.jpg",
          link: "https://baturina-homewear.com/product/mens-smoking-jacket-navy-velvet-fine-quilted-with-gold-satin-cord-piping-tassels/" },
        { name: "Black Medallion Cotton, Navy Velvet", price: "$762.38",
          img: "https://baturina-homewear.com/wp-content/uploads/2026/05/1black-cotton-navy-velvet-robe-dressing-gown-768x1152.jpg",
          link: "https://baturina-homewear.com/product/mens-dressing-gown-black-medallion-cotton-navy-blue-with-gold-details/" },
        { name: "Dark Brown Wool Dressing Gown", price: "$643.26",
          img: "https://baturina-homewear.com/wp-content/uploads/2026/05/wool6-dressing-gown-photoshooting-768x1152.jpg",
          link: "https://baturina-homewear.com/product/dark-brown-wool-mens-dressing-gown/" },
        { name: "Gold Paisley, Navy Quilted", price: "$643.26",
          img: "https://baturina-homewear.com/wp-content/uploads/2025/04/paisley-dressing-gown-robe-gold-blue-768x1152.jpg",
          link: "https://baturina-homewear.com/product/mens-dressing-gown-bronze-gold-paisley/" },
        { name: "Silver Gray Baroque Vines", price: "$547.96",
          img: "https://baturina-homewear.com/wp-content/uploads/2022/11/1gray-baroque-dressing-gown-mens-robe-cotton-silk-768x1152.jpg",
          link: "https://baturina-homewear.com/product/mens-dressing-gown-silver-gray-baroque-vines-black-quilted-with-cord-piping/" }
      ]
    },

    /* ---------- BLUE PILL — SUNRISE CLOCK ---------- */
    clock: {
      id: "clock",
      pillColor: "blue",
      title: "Choose Your Dawn",
      prize: "A new way to wake up",
      blurb: "Two artifacts. One destiny. Compare their powers and claim the one that wakes you.",
      confirmName: "dawn_artifact (Philips fully covered, or $110 toward a Loftie)",
      options: [
        {
          cardName: "SmartSleep, Herald of Dawn",
          subtitle: "Philips Wake-Up Light HF3520/60",
          typeLine: "Legendary Artifact — Dawn Engine",
          manaSymbol: "sun",
          rarity: "mythic",
          badge: "FULLY COVERED",
          badgeDetail: "≈ $110 retail — this one's entirely on me",
          img: "https://images.philips.com/is/image/philipsconsumer/7ad5c3ce215848ff8a6dadb80115d6bd?wid=700&hei=375&$pnglarge$",
          link: "https://www.usa.philips.com/c-p/HF3520_60/smartsleep",
          abilities: [
            "Colored sunrise simulation — red to yellow over 20–40 min, 300 lux",
            "The only wake-up light clinically proven to work",
            "5 natural wake sounds + FM radio",
            "Sunset wind-down mode for falling asleep",
            "Tap-to-snooze, auto-dimming display"
          ],
          flavor: "“Let there be light. Gradually.”"
        },
        {
          cardName: "Loftie, Keeper of Night",
          subtitle: "The Loftie Clock",
          typeLine: "Legendary Artifact — Night Companion",
          manaSymbol: "moon",
          rarity: "rare",
          badge: "$110 TOWARD",
          badgeDetail: "$135.99 right now (reg. $169.99) — you cover the difference",
          img: "https://byloftie.com/cdn/shop/files/Black_2928ab08-cec5-4819-a602-a2c31771f81d.jpg",
          link: "https://byloftie.com/products/loftie",
          abilities: [
            "Two-phase alarm — gentle sounds lull you awake",
            "100+ sleep sounds, white noise & meditations",
            "Nightlight + blackout mode (wakes with sound, not light)",
            "Bluetooth speaker, 5-hour backup battery",
            "App for setup only — no subscription needed"
          ],
          flavor: "“It guards your sleep. Your phone stays in the other room.”"
        }
      ],
      comparison: [
        { label: "Wake method",  a: "True light sunrise, clinically proven", b: "Gentle two-phase sound" },
        { label: "Light",        a: "300 lux sunrise + sunset wind-down",    b: "Nightlight + blackout mode" },
        { label: "Sound",        a: "5 nature sounds, FM radio",             b: "100+ sounds, white noise, Bluetooth speaker" },
        { label: "The deal",     a: "Fully covered (~$110)",                 b: "$110 toward $135.99 — ~$26 from you" },
        { label: "Availability", a: "Retail partners (Amazon etc.)",         b: "In stock at byloftie.com" }
      ]
    }
  }
};

/* ============================================================
   SPARE ROBES — copy any block into gifts.robe.items above
   ============================================================
{ name: "Dark Purple Floral Jacquard", price: "$762.38",
  img: "https://baturina-homewear.com/wp-content/uploads/2026/05/1purple-jacquard-dressing-gown-robe-768x1152.jpg",
  link: "https://baturina-homewear.com/product/mens-dressing-gown-dark-purple-floral-jacquard-cotton/" },
{ name: "Burgundy & Black Quilted Velvet", price: "$726.65",
  img: "https://baturina-homewear.com/wp-content/uploads/2024/09/velvet-mens-dressing-gown-robe-smoking-jacket-burgundy-black-04-768x1152.jpg",
  link: "https://baturina-homewear.com/product/mens-dressing-gown-burgundy-black-cotton-velvet-fine-quilted-with-gold-satin-cord-piping-tassels/" },
{ name: "Black Velvet Smoking Jacket", price: "$726.65",
  img: "https://baturina-homewear.com/wp-content/uploads/2023/10/velvet-smoking-jacket-blackd04-768x1152.jpg",
  link: "https://baturina-homewear.com/product/mens-smoking-jacket-black-velvet-cord-piping/" },
{ name: "Deep Navy Linen, White Piping", price: "$571.79",
  img: "https://baturina-homewear.com/wp-content/uploads/2026/03/navy-blue-linen-dressing-gown-men-robe-768x1152.jpg",
  link: "https://baturina-homewear.com/product/mens-dressing-gown-deep-navy-linen-with-white-piping/" },
============================================================ */

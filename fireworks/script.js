/* ==========================================================================
   Shree Balaji Crackers — script.js
   Vanilla JavaScript only. No frameworks, no build step.

   CONTENTS
   1.  Store configuration        (phone, offer end date, limits)
   2.  Offer tiers                (bulk-order discounts)
   3.  Categories
   4.  Product data               (EDIT / ADD PRODUCTS HERE)
   5.  Utilities
   6.  Generated product artwork  (SVG fallback when a photo is missing)
   7.  App state + DOM cache
   8.  Layers                     (drawer + modals, focus handling)
   9.  Toasts
   10. Categories + filter chips
   11. Product grid, search, filter, sort
   12. Quick view
   13. Cart
   14. Confirm dialog
   15. Checkout
   16. Offers + countdown
   17. Contact form
   18. Info pages (terms / privacy)
   19. Navigation + scroll behaviour
   20. Visual effects             (hero fireworks, ripple, reveal, loader)
   21. Init
   ========================================================================== */
(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. STORE CONFIGURATION
     Change these values to match the real store.
     ------------------------------------------------------------------------ */
  const CONFIG = {
    storeName: 'Shree Balaji Crackers',
    // WhatsApp number with country code, digits only (no +, spaces or dashes).
    whatsappNumber: '919876543210',
    // Offers (and the countdown) end at this moment. Written in India Standard Time (+05:30).
    // 8 Nov 2026 is Diwali day: update this every year.
    offerEndsAt: '2026-11-08T23:59:59+05:30',
    storageKeys: { cart: 'sbc_cart_v1', lastOrder: 'sbc_last_order_v1', theme: 'sbc_theme' },
    maxQtyPerItem: 50,
    lowStockThreshold: 10,
  };

  /* ------------------------------------------------------------------------
     2. OFFER TIERS — "Buy More, Save More"
     Applied automatically in the cart while the offer period is active.
     Keep the list sorted from the lowest to the highest `min`.
     ------------------------------------------------------------------------ */
  const OFFER_TIERS = [
    { min: 999,  percent: 5,  title: 'Special Discount', icon: 'tag',     text: 'Extra 5% off your order' },
    { min: 1999, percent: 10, title: 'Extra Discount',   icon: 'percent', text: 'Extra 10% off your order' },
    { min: 2999, percent: 15, title: 'Premium Offer',    icon: 'award',   text: 'Extra 15% off your order' },
  ];

  /* ------------------------------------------------------------------------
     3. CATEGORIES
     ------------------------------------------------------------------------ */
  const CATEGORIES = [
    { name: 'Flower Pots',    tagline: 'Fountains of golden sparks' },
    { name: 'Chakri',         tagline: 'Spinning wheels of light' },
    { name: 'Sparklers',      tagline: 'Hand-held glitter and glow' },
    { name: 'Rockets',        tagline: 'Colour bursts in the sky' },
    { name: 'Ground Chakkar', tagline: 'Whirling ground spinners' },
    { name: 'Fancy Items',    tagline: 'Premium fountains and showpieces' },
    { name: 'Gift Boxes',     tagline: 'Assortments ready to gift' },
    { name: 'Kids Special',   tagline: 'Mini favourites, adults in charge' },
  ];

  /* ------------------------------------------------------------------------
     4. PRODUCT DATA
     To add a product, copy any line-group below and give it a new unique id.
     Required : id, name, category (must match a name in CATEGORIES), price
     Optional : oldPrice, discount (auto-calculated if omitted), image,
                popularity (0-100), stock, pack, badge, description
     Images   : put photos in an /images folder and point `image` at them.
                If a file is missing, an illustration is generated instead.
     ------------------------------------------------------------------------ */
   const PRODUCTS = [
    { id: 1, name: 'Flower Pot Deluxe', category: 'Flower Pots', price: 299, oldPrice: 399, discount: 25,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3owL2rdfmRKclwtMiGSVQl-eDv8XekEnPsceOLasH6_HAZRAGiggstbm0&s=10', popularity: 96, stock: 48, pack: 'Box of 5', badge: 'Bestseller',
      description: 'A tall fountain of golden sparks that lights up the courtyard. A festive favourite for the whole family.' },
    { id: 2, name: 'Color Sparklers', category: 'Sparklers', price: 149, oldPrice: 199, discount: 25,
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/2/394391699/VV/PA/QW/138156432/7-cm-colour-sparkler.jpg', popularity: 90, stock: 120, pack: 'Pack of 10',
      description: 'Hand-held sparklers that glow in bright festive colours. Hold at arm\'s length and use outdoors only.' },
    { id: 3, name: 'Ground Chakkar', category: 'Ground Chakkar', price: 199, oldPrice: 249, discount: 20,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFciegv0nF_hwxfX5lsCcfVz7zm-LS8dmtkL_QI8acvEGdOsKCLAf5u9M&s=10', popularity: 84, stock: 60, pack: 'Box of 10',
      description: 'A spinning ground wheel that throws bright sparks in a circle. Place it on a flat, open surface.' },
    { id: 4, name: 'Rocket Pack', category: 'Rockets', price: 399, oldPrice: 549, discount: 27,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQVImlU2M3g4KYLWCoxY5hDEMxOuDb9N3SyoANbnoWcq8br2C_Q2EYQmO&s=10', popularity: 88, stock: 35, pack: 'Pack of 10',
      description: 'Sky rockets with colourful bursts. Launch only from open ground with a clear sky above, as directed on the pack.' },
    { id: 5, name: 'Fancy Fountain', category: 'Fancy Items', price: 549, oldPrice: 749, discount: 27,
      image: 'images/fancy-fountain.jpg', popularity: 92, stock: 22, pack: 'Single piece', badge: 'Premium',
      description: 'A premium multi-colour fountain with a long, glittering display. A showpiece for the main celebration.' },
    { id: 6, name: 'Premium Gift Box', category: 'Gift Boxes', price: 1299, oldPrice: 1799, discount: 28,
      image: 'images/premium-gift-box.jpg', popularity: 78, stock: 18, pack: 'Assorted box', badge: 'Premium',
      description: 'A curated assortment of festive favourites, packed in a gift-ready box for family and friends.' },
    { id: 7, name: 'Electric Sparkler', category: 'Sparklers', price: 179, oldPrice: 239, discount: 25,
      image: 'images/electric-sparkler.jpg', popularity: 80, stock: 9, pack: 'Pack of 5',
      description: 'Bright sparklers with crackling electric-blue sparks. Use outdoors and keep a bucket of water nearby.' },
    { id: 8, name: 'Diwali Celebration Combo', category: 'Gift Boxes', price: 2499, oldPrice: 3499, discount: 29,
      image: 'images/diwali-celebration-combo.jpg', popularity: 99, stock: 12, pack: 'Family combo', badge: 'Combo',
      description: 'Our biggest value pack: flower pots, chakkars, sparklers, fountains and more for a complete Diwali night.' },
    { id: 9, name: 'Flower Pot Big', category: 'Flower Pots', price: 449, oldPrice: 599, discount: 25,
      image: 'images/flower-pot-big.jpg', popularity: 82, stock: 40, pack: 'Box of 5',
      description: 'A larger flower pot with a taller, wider spray of sparks for open courtyards and terraces.' },
    { id: 10, name: 'Colour Koti Flower Pot', category: 'Flower Pots', price: 649, oldPrice: 849, discount: 24,
      image: 'images/colour-koti-flower-pot.jpg', popularity: 70, stock: 25, pack: 'Box of 3',
      description: 'A multi-colour flower pot with a longer burn time and a bright finish.' },
    { id: 11, name: 'Chakri Special', category: 'Chakri', price: 129, oldPrice: 169, discount: 24,
      image: 'images/chakri-special.jpg', popularity: 75, stock: 100, pack: 'Box of 10',
      description: 'Classic spinning chakri that whirls and sparkles. Use on open, flat ground only.' },
    { id: 12, name: 'Twinkling Chakri Bunch', category: 'Chakri', price: 189, oldPrice: 249, discount: 24,
      image: 'images/twinkling-chakri-bunch.jpg', popularity: 68, stock: 70, pack: 'Pack of 25',
      description: 'A bigger bunch of chakri for gatherings, with a bright twinkling spin.' },
    { id: 13, name: 'Mini Chakri Value Pack', category: 'Chakri', price: 99, oldPrice: 129, discount: 23,
      image: 'images/mini-chakri-value-pack.jpg', popularity: 60, stock: 90, pack: 'Pack of 20',
      description: 'Compact chakri at a small price. A good add-on to any order.' },
    { id: 14, name: 'Golden Sparklers 30 cm', category: 'Sparklers', price: 129, oldPrice: 169, discount: 24,
      image: 'images/golden-sparklers-30cm.jpg', popularity: 86, stock: 150, pack: 'Pack of 10',
      description: 'Long golden sparklers with a warm, steady glow. Popular for photos and family gatherings.' },
    { id: 15, name: 'Whistling Rocket Box', category: 'Rockets', price: 299, oldPrice: 399, discount: 25,
      image: 'images/whistling-rocket-box.jpg', popularity: 72, stock: 45, pack: 'Box of 5',
      description: 'Whistling rockets that rise with a trail of sparks. Launch from open ground, as directed on the pack.' },
    { id: 16, name: 'Sky Rocket Deluxe', category: 'Rockets', price: 449, oldPrice: 649, discount: 31,
      image: 'images/sky-rocket-deluxe.jpg', popularity: 74, stock: 0, pack: 'Pack of 5',
      description: 'A deluxe multi-colour sky rocket pack. Currently out of stock. Check back soon.' },
    { id: 17, name: 'Ground Chakkar Deluxe', category: 'Ground Chakkar', price: 279, oldPrice: 349, discount: 20,
      image: 'images/ground-chakkar-deluxe.jpg', popularity: 79, stock: 55, pack: 'Box of 10',
      description: 'A bigger ground chakkar with a wide, bright spin and a longer show.' },
    { id: 18, name: 'Colour Spin Chakkar', category: 'Ground Chakkar', price: 229, oldPrice: 299, discount: 23,
      image: 'images/colour-spin-chakkar.jpg', popularity: 66, stock: 6, pack: 'Box of 10',
      description: 'A ground spinner that throws several colours as it turns.' },
    { id: 19, name: 'Multi-Colour Shower', category: 'Fancy Items', price: 699, oldPrice: 949, discount: 26,
      image: 'images/multi-colour-shower.jpg', popularity: 85, stock: 30, pack: 'Single piece',
      description: 'A fancy fountain that showers the night with changing colours.' },
    { id: 20, name: 'Crackling Waterfall', category: 'Fancy Items', price: 799, oldPrice: 1099, discount: 27,
      image: 'images/crackling-waterfall.jpg', popularity: 77, stock: 20, pack: 'Single piece', badge: 'New',
      description: 'A cascading waterfall of sparks with a crackling finish.' },
    { id: 21, name: 'Family Fun Gift Box', category: 'Gift Boxes', price: 999, oldPrice: 1399, discount: 29,
      image: 'images/family-fun-gift-box.jpg', popularity: 91, stock: 26, pack: 'Assorted box',
      description: 'A balanced mix of sparklers, chakkars and fountains for a family evening.' },
    { id: 22, name: 'Royal Diwali Hamper', category: 'Gift Boxes', price: 1899, oldPrice: 2599, discount: 27,
      image: 'images/royal-diwali-hamper.jpg', popularity: 83, stock: 14, pack: 'Premium hamper', badge: 'Premium',
      description: 'A generous premium hamper with our finest fountains, flower pots and sparklers.' },
    { id: 23, name: 'Kids Mini Sparklers', category: 'Kids Special', price: 99, oldPrice: 149, discount: 34,
      image: 'images/kids-mini-sparklers.jpg', popularity: 87, stock: 200, pack: 'Pack of 20',
      description: 'Short sparklers made for small hands. An adult must supervise at all times.' },
    { id: 24, name: 'Roll Caps Value Pack', category: 'Kids Special', price: 79, oldPrice: 109, discount: 28,
      image: 'images/roll-caps-value-pack.jpg', popularity: 58, stock: 80, pack: 'Set of 10 rolls',
      description: 'Roll caps for toy pistols. Adult supervision is required, and they must be used in the open.' },
    { id: 25, name: 'Kids Fun Kit', category: 'Kids Special', price: 349, oldPrice: 499, discount: 30,
      image: 'images/kids-fun-kit.jpg', popularity: 81, stock: 35, pack: 'Assorted kit', badge: 'New',
      description: 'A mixed kit of mild, kid-friendly favourites. Always use with an adult in charge.' },
  ];

  /* ------------------------------------------------------------------------
     5. UTILITIES
     ------------------------------------------------------------------------ */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const rupee = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  const formatPrice = (n) => rupee.format(n);

  const escapeHTML = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const debounce = (fn, wait = 150) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  };

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // localStorage wrapper that never throws (private mode, blocked storage, etc.)
  const storage = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
    },
  };

  const icon = (name, cls = '') =>
    `<svg class="icon ${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;

  const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
  const maxQty = (p) => Math.min(p.stock, CONFIG.maxQtyPerItem);

  function normalizeProducts() {
    PRODUCTS.forEach((p) => {
      p.oldPrice = p.oldPrice || p.price;
      if (!p.discount && p.oldPrice > p.price) p.discount = Math.round((1 - p.price / p.oldPrice) * 100);
      p.discount = p.discount || 0;
      p.stock = p.stock ?? 99;
      p.popularity = p.popularity ?? 50;
      p.pack = p.pack || '';
      p.description = p.description || '';
    });
  }

  function stockStatus(p) {
    if (p.stock <= 0) return { type: 'out', label: 'Out of stock' };
    if (p.stock <= CONFIG.lowStockThreshold) return { type: 'low', label: `Only ${p.stock} left` };
    return { type: 'in', label: 'In stock' };
  }

  const waLink = (text) => `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;

  /* ------------------------------------------------------------------------
     6. GENERATED PRODUCT ARTWORK
     Each product tries its `image` file first. If it can't load, one of these
     illustrations is used so the shop never shows broken images.
     ------------------------------------------------------------------------ */
  const PALETTES = [
    ['#ffd166', '#ff7a1a', '#e8336d'],
    ['#ffb4d0', '#e8336d', '#ffd166'],
    ['#8be9ff', '#3b82f6', '#ffd166'],
    ['#c4f78a', '#22c55e', '#ffd166'],
    ['#dcb8ff', '#8b5cf6', '#ff8fb1'],
    ['#fff08a', '#f59e0b', '#ff4d8d'],
  ];
  const STAR_DOTS = [[18, 24, 1.4], [52, 14, 1], [170, 22, 1.6], [184, 64, 1], [12, 88, 1], [188, 120, 1.2],
                     [26, 150, 1.5], [176, 168, 1], [60, 186, 1], [140, 10, 1], [120, 40, .8], [90, 186, 1.2]];

  const r1 = (n) => Math.round(n * 10) / 10;

  // Radial "spark" lines: used for sparklers, bursts, etc.
  const burstPath = (cx, cy, inner, outer, n, rot = 0) => {
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = rot + (i * Math.PI * 2) / n;
      d += `M${r1(cx + Math.cos(a) * inner)} ${r1(cy + Math.sin(a) * inner)}L${r1(cx + Math.cos(a) * outer)} ${r1(cy + Math.sin(a) * outer)}`;
    }
    return d;
  };

  const starPoints = (cx, cy, outer, inner, n = 5) => {
    const pts = [];
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = -Math.PI / 2 + (i * Math.PI) / n;
      pts.push(`${r1(cx + Math.cos(a) * r)},${r1(cy + Math.sin(a) * r)}`);
    }
    return pts.join(' ');
  };

  const ART = {
    'Flower Pots': (c1, c2, c3) => `
      <g stroke="url(#a)" stroke-width="3.2" stroke-linecap="round" fill="none">
        <path d="M100 108Q100 70 100 38"/><path d="M100 108Q84 66 62 46"/><path d="M100 108Q116 66 138 46"/>
        <path d="M100 108Q72 78 40 74"/><path d="M100 108Q128 78 160 74"/>
      </g>
      <g fill="${c3}"><circle cx="100" cy="36" r="3.5"/><circle cx="60" cy="44" r="3"/><circle cx="140" cy="44" r="3"/>
        <circle cx="38" cy="74" r="2.6"/><circle cx="162" cy="74" r="2.6"/></g>
      <ellipse cx="100" cy="174" rx="44" ry="6" fill="#000" opacity=".35"/>
      <path d="M72 172L80 116H120L128 172Z" fill="url(#b)"/>
      <rect x="74" y="108" width="52" height="10" rx="3" fill="url(#a)"/>
      <path d="M77 142H123" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>`,

    'Chakri': (c1, c2, c3) => `
      <path d="M100 100C100 92 109 90 113 97C119 108 108 122 93 119C75 115 71 92 84 78C98 62 127 66 135 89C145 118 121 143 93 141"
            fill="none" stroke="url(#a)" stroke-width="5" stroke-linecap="round"/>
      <path d="M93 141C78 140 66 132 60 120" stroke="url(#b)" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="1 7"/>
      <g stroke="${c1}" stroke-width="2.2" stroke-linecap="round"><path d="${burstPath(56, 122, 5, 14, 7)}"/><path d="${burstPath(150, 62, 4, 12, 7, .3)}"/></g>
      <circle cx="100" cy="100" r="4" fill="${c3}"/>`,

    'Sparklers': (c1, c2, c3) => `
      <g stroke="#cbd0e6" stroke-width="3" stroke-linecap="round"><path d="M62 172L88 82"/><path d="M100 176V70"/><path d="M138 172L112 82"/></g>
      <g stroke="url(#a)" stroke-width="2.4" stroke-linecap="round">
        <path d="${burstPath(88, 72, 6, 26, 10)}"/><path d="${burstPath(100, 56, 6, 30, 12, .2)}"/><path d="${burstPath(112, 72, 6, 26, 10, .3)}"/>
      </g>
      <g fill="${c3}"><circle cx="88" cy="72" r="4"/><circle cx="100" cy="56" r="4.5"/><circle cx="112" cy="72" r="4"/></g>`,

    'Rockets': (c1, c2, c3) => `
      <g transform="rotate(38 100 100)">
        <path d="M91 128Q100 178 109 128Z" fill="url(#b)"/>
        <path d="M96 128Q100 158 104 128Z" fill="#fff6c8"/>
        <path d="M100 26C121 52 123 92 117 128H83C77 92 79 52 100 26Z" fill="url(#a)"/>
        <path d="M83 108L62 142L84 134ZM117 108L138 142L116 134Z" fill="url(#b)"/>
        <circle cx="100" cy="76" r="9" fill="#0a0d26" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>
      </g>
      <g fill="${c1}"><circle cx="58" cy="164" r="2.6"/><circle cx="46" cy="150" r="1.8"/><circle cx="72" cy="174" r="1.8"/></g>
      <path d="${burstPath(158, 40, 4, 13, 8)}" stroke="${c3}" stroke-width="2" stroke-linecap="round"/>`,

    'Ground Chakkar': (c1, c2, c3) => `
      <ellipse cx="100" cy="152" rx="66" ry="17" fill="#000" opacity=".35"/>
      <g transform="translate(100 126) scale(1 .62)">
        <circle r="54" fill="#141a4a" stroke="url(#a)" stroke-width="4"/>
        <circle r="34" fill="none" stroke="${c3}" stroke-opacity=".55" stroke-width="1.5" stroke-dasharray="3 5"/>
        <g fill="none" stroke="url(#a)" stroke-width="6" stroke-linecap="round">
          <path d="M0 0Q26 -30 60 -26"/><path d="M0 0Q26 -30 60 -26" transform="rotate(90)"/>
          <path d="M0 0Q26 -30 60 -26" transform="rotate(180)"/><path d="M0 0Q26 -30 60 -26" transform="rotate(270)"/>
        </g>
        <circle r="7" fill="${c3}"/>
      </g>
      <g stroke="${c1}" stroke-width="2.2" stroke-linecap="round">
        <path d="${burstPath(46, 86, 4, 13, 7)}"/><path d="${burstPath(156, 80, 4, 15, 7, .3)}"/><path d="${burstPath(100, 48, 4, 14, 8)}"/>
      </g>`,

    'Fancy Items': (c1, c2, c3) => {
      const dots = Array.from({ length: 16 }, (_, i) => {
        const a = (i * Math.PI) / 8;
        return `<circle cx="${r1(100 + Math.cos(a) * 66)}" cy="${r1(92 + Math.sin(a) * 66)}" r="2.6"/>`;
      }).join('');
      return `
        <circle cx="100" cy="92" r="40" fill="url(#glow)"/>
        <g stroke="url(#a)" stroke-width="3" stroke-linecap="round"><path d="${burstPath(100, 92, 14, 56, 16)}"/></g>
        <g stroke="url(#b)" stroke-width="2.5" stroke-linecap="round"><path d="${burstPath(100, 92, 22, 42, 16, Math.PI / 16)}"/></g>
        <g fill="${c3}">${dots}</g>
        <circle cx="100" cy="92" r="5" fill="#fff6c8"/>
        <g stroke="${c1}" stroke-width="2" stroke-linecap="round"><path d="${burstPath(34, 160, 3, 11, 8)}"/><path d="${burstPath(168, 158, 3, 11, 8)}"/></g>`;
    },

    'Gift Boxes': (c1, c2, c3) => `
      <ellipse cx="100" cy="176" rx="58" ry="7" fill="#000" opacity=".35"/>
      <rect x="56" y="106" width="88" height="68" rx="5" fill="url(#a)"/>
      <rect x="50" y="90" width="100" height="22" rx="5" fill="url(#b)"/>
      <rect x="93" y="90" width="14" height="84" fill="${c3}" opacity=".9"/>
      <path d="M100 90C78 58 54 76 100 90C146 76 122 58 100 90Z" fill="${c3}" stroke="#fff" stroke-opacity=".3" stroke-width="1.5"/>
      <g stroke="${c1}" stroke-width="2.2" stroke-linecap="round"><path d="${burstPath(44, 50, 3, 10, 8)}"/><path d="${burstPath(158, 44, 3, 12, 8)}"/></g>`,

    'Kids Special': (c1, c2, c3) => `
      <circle cx="100" cy="104" r="62" fill="url(#glow)"/>
      <polygon points="${starPoints(100, 102, 58, 26)}" fill="url(#a)" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="88" cy="100" r="4.2" fill="#0a0d26"/><circle cx="112" cy="100" r="4.2" fill="#0a0d26"/>
      <path d="M88 114Q100 126 112 114" fill="none" stroke="#0a0d26" stroke-width="3.4" stroke-linecap="round"/>
      <circle cx="80" cy="112" r="4" fill="${c3}" opacity=".7"/><circle cx="120" cy="112" r="4" fill="${c3}" opacity=".7"/>
      <g stroke="${c1}" stroke-width="2.2" stroke-linecap="round">
        <path d="${burstPath(34, 52, 3, 11, 8)}"/><path d="${burstPath(168, 58, 3, 11, 8)}"/>
        <path d="${burstPath(160, 160, 3, 10, 8)}"/><path d="${burstPath(40, 156, 3, 10, 8)}"/>
      </g>`,
  };

  const artCache = new Map();
  function artFor(category, paletteIndex) {
    const key = `${category}|${paletteIndex}`;
    if (artCache.has(key)) return artCache.get(key);
    const [c1, c2, c3] = PALETTES[paletteIndex % PALETTES.length];
    const body = (ART[category] || ART['Fancy Items'])(c1, c2, c3);
    const stars = STAR_DOTS.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".7"/>`).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <radialGradient id="bg" cx=".5" cy=".62" r=".75"><stop offset="0" stop-color="#2b2f7e"/><stop offset=".6" stop-color="#141a4a"/><stop offset="1" stop-color="#090c24"/></radialGradient>
        <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="40" y1="30" x2="160" y2="170"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
        <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="40" y1="30" x2="160" y2="170"><stop offset="0" stop-color="${c3}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
        <radialGradient id="glow"><stop offset="0" stop-color="${c1}" stop-opacity=".5"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#bg)"/>
      <circle cx="100" cy="100" r="88" fill="url(#glow)"/>
      ${stars}${body}</svg>`;
    const uri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    artCache.set(key, uri);
    return uri;
  }

  const productArt = (p) => artFor(p.category, p.id);
  const categoryArt = (name, index) => artFor(name, index);

  // <img> markup for a product. The `data-pid` lets the global error handler
  // swap in generated artwork if the photo file is missing.
  function productImgHTML(p, { lazy = true, cls = '', size = 400 } = {}) {
    const src = p.image ? escapeHTML(p.image) : productArt(p);
    return `<img class="${cls}" src="${src}" data-pid="${p.id}" alt="${escapeHTML(p.name)} - ${escapeHTML(p.category)} crackers"
            width="${size}" height="${size}" ${lazy ? 'loading="lazy"' : ''} decoding="async">`;
  }

  document.addEventListener('error', (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.dataset.pid || img.dataset.fellback) return;
    const p = getProduct(Number(img.dataset.pid));
    if (!p) return;
    img.dataset.fellback = '1';
    img.src = productArt(p);
  }, true); // error events don't bubble, so listen in the capture phase

  /* ------------------------------------------------------------------------
     7. APP STATE + DOM CACHE
     ------------------------------------------------------------------------ */
  const state = {
    filters: { search: '', category: 'All', price: 'all', sort: 'featured' },
    cart: [], // [{ id, qty }] — prices are always looked up from PRODUCTS
  };

  const PRICE_RANGES = {
    all: [0, Infinity], u200: [0, 200], '200-500': [200, 500],
    '500-1000': [500, 1000], '1000-2000': [1000, 2000], '2000+': [2000, Infinity],
  };

  const el = {};
  function cacheDom() {
    const ids = ['loader', 'header', 'nav', 'menuToggle', 'searchToggle', 'searchPanel', 'headerSearch', 'headerSearchForm',
      'cartToggle', 'floatCart', 'floatCartTotal', 'toTop', 'categoryGrid', 'categoryChips', 'shopSearch', 'priceFilter',
      'sortSelect', 'clearFilters', 'resultsInfo', 'productGrid', 'noResults', 'noResultsText', 'offerGrid', 'comboBanner',
      'countdown', 'countdownNote', 'cartDrawer', 'cartEmpty', 'cartContent', 'cartList', 'cartProgress', 'cartProgressText',
      'cartProgressBar', 'cartSummary', 'checkoutBtn', 'clearCartBtn', 'quickView', 'quickViewBody', 'checkoutModal',
      'checkoutForm', 'checkoutSummary', 'agreeTerms', 'placeOrder', 'paymentNote', 'successModal', 'successBody',
      'confirmModal', 'confirmTitle', 'confirmMessage', 'confirmOk', 'infoModal', 'infoTitle', 'infoBody', 'toasts',
      'contactForm', 'coState'];
    ids.forEach((id) => { el[id] = document.getElementById(id); });
  }

  /* ------------------------------------------------------------------------
     8. LAYERS — cart drawer + modals
     Handles open/close, Escape, focus trap, and body scroll lock.
     ------------------------------------------------------------------------ */
  const layers = [];
  const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  function openLayer(layer, opener) {
    if (!layer || layer.classList.contains('is-open')) return;
    layer._opener = opener || document.activeElement;
    layer.classList.add('is-open');
    layer.setAttribute('aria-hidden', 'false');
    layers.push(layer);
    document.body.classList.add('no-scroll');
    const target = $('[data-autofocus]', layer) || $(FOCUSABLE, layer);
    setTimeout(() => target && target.focus({ preventScroll: true }), 60);
  }

  function closeLayer(layer) {
    if (!layer || !layer.classList.contains('is-open')) return;
    layer.classList.remove('is-open');
    layer.setAttribute('aria-hidden', 'true');
    const i = layers.indexOf(layer);
    if (i > -1) layers.splice(i, 1);
    if (!layers.length) document.body.classList.remove('no-scroll');
    if (layer._onClose) { const cb = layer._onClose; layer._onClose = null; cb(); }
    if (layer._opener && layer._opener.focus) layer._opener.focus({ preventScroll: true });
  }

  function bindLayers() {
    // Any element with [data-close] closes the layer it lives in.
    document.addEventListener('click', (e) => {
      const closer = e.target.closest('[data-close]');
      if (closer) closeLayer(closer.closest('.layer'));
    });

    document.addEventListener('keydown', (e) => {
      if (!layers.length) return;
      const top = layers[layers.length - 1];
      if (e.key === 'Escape') { closeLayer(top); return; }
      if (e.key !== 'Tab') return;
      const items = $$(FOCUSABLE, top).filter((n) => n.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ------------------------------------------------------------------------
     9. TOASTS
     ------------------------------------------------------------------------ */
  function toast(message, type = 'success', opts = {}) {
    const node = document.createElement('div');
    node.className = `toast toast--${type}`;
    node.setAttribute('role', 'status');
    const iconName = type === 'error' ? 'alert-triangle' : type === 'info' ? 'info' : 'check-circle';
    node.innerHTML = `
      <span class="toast__icon">${icon(iconName)}</span>
      <span class="toast__msg">${escapeHTML(message)}</span>
      ${opts.action ? `<button type="button" class="toast__action">${escapeHTML(opts.action)}</button>` : ''}
      <button type="button" class="toast__close" aria-label="Dismiss notification">${icon('x')}</button>`;

    const dismiss = () => {
      if (node._gone) return;
      node._gone = true;
      node.classList.add('is-leaving');
      setTimeout(() => node.remove(), 260);
    };
    node.querySelector('.toast__close').addEventListener('click', dismiss);
    const actionBtn = node.querySelector('.toast__action');
    if (actionBtn) actionBtn.addEventListener('click', () => { if (opts.onAction) opts.onAction(); dismiss(); });

    el.toasts.appendChild(node);
    while (el.toasts.children.length > 3) el.toasts.firstElementChild.remove();
    setTimeout(dismiss, opts.duration || 3600);
  }

  /* ------------------------------------------------------------------------
     10. CATEGORIES + FILTER CHIPS
     ------------------------------------------------------------------------ */
  const countByCategory = () =>
    PRODUCTS.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + 1; return acc; }, {});

  function renderCategories() {
    const counts = countByCategory();
    el.categoryGrid.innerHTML = CATEGORIES.map((c, i) => `
      <article class="cat-card reveal" style="--d:${(i % 4) * 70}ms">
        <div class="cat-card__art">
          <img src="${categoryArt(c.name, i)}" alt="${escapeHTML(c.name)} - category illustration" width="240" height="240" loading="lazy" decoding="async">
        </div>
        <h3 class="cat-card__name">${escapeHTML(c.name)}</h3>
        <p class="cat-card__tag">${escapeHTML(c.tagline)}</p>
        <p class="cat-card__count">${counts[c.name] || 0} products</p>
        <button type="button" class="btn btn--ghost btn--sm" data-category="${escapeHTML(c.name)}"
                aria-label="View ${escapeHTML(c.name)} products">View Products</button>
      </article>`).join('');
  }

  function renderChips() {
    const counts = countByCategory();
    const chip = (name, count) =>
      `<button type="button" class="chip" data-chip="${escapeHTML(name)}" aria-pressed="false">${escapeHTML(name)}<span class="chip__count">${count}</span></button>`;
    el.categoryChips.innerHTML = chip('All', PRODUCTS.length) + CATEGORIES.map((c) => chip(c.name, counts[c.name] || 0)).join('');
    updateChips();
  }

  function updateChips() {
    $$('.chip', el.categoryChips).forEach((chip) => {
      const active = chip.dataset.chip === state.filters.category;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', String(active));
    });
  }

  function scrollToId(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }

  function setCategory(name) {
    state.filters.category = name;
    updateChips();
    renderProducts();
  }

  /* ------------------------------------------------------------------------
     11. PRODUCT GRID, SEARCH, FILTER, SORT
     ------------------------------------------------------------------------ */
  function getVisibleProducts() {
    const { search, category, price, sort } = state.filters;
    const q = search.trim().toLowerCase();
    const [min, max] = PRICE_RANGES[price] || PRICE_RANGES.all;

    const list = PRODUCTS.filter((p) =>
      (category === 'All' || p.category === category) &&
      p.price >= min && p.price < max &&
      (!q || `${p.name} ${p.category}`.toLowerCase().includes(q)));

    const sorters = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      popularity: (a, b) => b.popularity - a.popularity,
      discount: (a, b) => b.discount - a.discount || b.popularity - a.popularity,
    };
    if (sorters[sort]) list.sort(sorters[sort]); // 'featured' keeps the order in PRODUCTS
    return list;
  }

  function productCardHTML(p, index) {
    const status = stockStatus(p);
    const out = status.type === 'out';
    const name = escapeHTML(p.name);
    return `
      <article class="product-card" data-id="${p.id}" style="--i:${Math.min(index, 11)}">
        <div class="product-card__media">
          ${productImgHTML(p)}
          ${p.discount ? `<span class="tag tag--discount">${p.discount}% OFF</span>` : ''}
          ${p.badge && !out ? `<span class="tag tag--badge">${escapeHTML(p.badge)}</span>` : ''}
          <button type="button" class="quick-btn" data-action="quickview" aria-label="Quick view: ${name}">${icon('eye')}<span>Quick View</span></button>
        </div>
        <div class="product-card__body">
          <p class="product-card__cat">${escapeHTML(p.category)}</p>
          <h3 class="product-card__name">${name}</h3>
          <p class="product-card__pack">${escapeHTML(p.pack)}</p>
          <div class="price">
            <span class="price__now">${formatPrice(p.price)}</span>
            ${p.oldPrice > p.price ? `<s class="price__old" aria-label="Original price ${formatPrice(p.oldPrice)}">${formatPrice(p.oldPrice)}</s>` : ''}
          </div>
          <p class="stock stock--${status.type}"><span class="stock__dot" aria-hidden="true"></span>${status.label}</p>
          <div class="product-card__actions">
            <div class="qty" data-max="${maxQty(p)}">
              <button type="button" data-action="qty-dec" aria-label="Decrease quantity" ${out ? 'disabled' : ''}>${icon('minus')}</button>
              <input type="number" class="qty__input" value="1" min="1" max="${maxQty(p)}" inputmode="numeric" aria-label="Quantity for ${name}" ${out ? 'disabled' : ''}>
              <button type="button" data-action="qty-inc" aria-label="Increase quantity" ${out ? 'disabled' : ''}>${icon('plus')}</button>
            </div>
            <button type="button" class="btn btn--primary btn--sm add-btn" data-action="add" ${out ? 'disabled' : ''}>${out ? 'Out of Stock' : 'Add to Cart'}</button>
          </div>
        </div>
      </article>`;
  }

  function renderProducts() {
    const list = getVisibleProducts();
    const { search, category } = state.filters;

    el.productGrid.innerHTML = list.map(productCardHTML).join('');
    el.productGrid.hidden = list.length === 0;
    el.noResults.hidden = list.length > 0;

    el.resultsInfo.textContent = list.length
      ? `Showing ${list.length} of ${PRODUCTS.length} products${category !== 'All' ? ` in ${category}` : ''}`
      : '';

    if (!list.length) {
      const q = search.trim();
      el.noResultsText.textContent = q
        ? `We couldn't find anything for "${q}" with these filters. Try a different word or clear the filters.`
        : 'No products match these filters. Try a wider price range or another category.';
    }
  }

  function clearFilters() {
    state.filters = { search: '', category: 'All', price: 'all', sort: 'featured' };
    el.shopSearch.value = '';
    el.headerSearch.value = '';
    el.priceFilter.value = 'all';
    el.sortSelect.value = 'featured';
    updateChips();
    renderProducts();
  }

  function setSearch(value, from) {
    state.filters.search = value;
    if (from !== 'shop') el.shopSearch.value = value;
    if (from !== 'header') el.headerSearch.value = value;
    renderProducts();
  }

  // Quantity helpers shared by product cards and the quick view.
  function stepQty(box, delta) {
    const input = $('.qty__input', box);
    const max = Number(box.dataset.max) || 1;
    input.value = clamp((parseInt(input.value, 10) || 1) + delta, 1, max);
  }
  function readQty(box) {
    const input = $('.qty__input', box);
    const max = Number(box.dataset.max) || 1;
    const qty = clamp(parseInt(input.value, 10) || 1, 1, max);
    input.value = qty;
    return qty;
  }
  function flashButton(btn, label) {
    if (!btn) return;
    const original = btn.dataset.label || btn.textContent;
    btn.dataset.label = original;
    btn.textContent = label;
    btn.classList.add('is-added');
    clearTimeout(btn._flash);
    btn._flash = setTimeout(() => { btn.textContent = original; btn.classList.remove('is-added'); }, 1300);
  }

  function bindProductGrid() {
    el.productGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      const id = Number(card.dataset.id);
      const btn = e.target.closest('[data-action]');

      if (!btn) { if (e.target.closest('.product-card__media')) openQuickView(id, card); return; }

      const box = $('.qty', card);
      switch (btn.dataset.action) {
        case 'qty-inc': stepQty(box, 1); break;
        case 'qty-dec': stepQty(box, -1); break;
        case 'quickview': openQuickView(id, btn); break;
        case 'add':
          if (addToCart(id, readQty(box))) { $('.qty__input', box).value = 1; flashButton(btn, 'Added'); }
          break;
        default: break;
      }
    });
    el.productGrid.addEventListener('change', (e) => {
      if (e.target.classList.contains('qty__input')) readQty(e.target.closest('.qty'));
    });
  }

  /* ------------------------------------------------------------------------
     12. QUICK VIEW
     ------------------------------------------------------------------------ */
  function openQuickView(id, opener) {
    const p = getProduct(id);
    if (!p) return;
    const status = stockStatus(p);
    const out = status.type === 'out';
    const saved = p.oldPrice - p.price;

    el.quickViewBody.innerHTML = `
      <div class="qv" data-id="${p.id}">
        <div class="qv__media">
          ${productImgHTML(p, { lazy: false, size: 520 })}
          ${p.discount ? `<span class="tag tag--discount">${p.discount}% OFF</span>` : ''}
        </div>
        <div class="qv__info">
          <p class="product-card__cat">${escapeHTML(p.category)}</p>
          <h2 class="qv__title" id="quickViewTitle">${escapeHTML(p.name)}</h2>
          <p class="product-card__pack">${escapeHTML(p.pack)}</p>
          <div class="price price--lg">
            <span class="price__now">${formatPrice(p.price)}</span>
            ${saved > 0 ? `<s class="price__old">${formatPrice(p.oldPrice)}</s>` : ''}
          </div>
          ${saved > 0 ? `<p class="qv__save">You save ${formatPrice(saved)} (${p.discount}%)</p>` : ''}
          <p class="qv__desc">${escapeHTML(p.description)}</p>
          <p class="stock stock--${status.type}"><span class="stock__dot" aria-hidden="true"></span>${status.label}</p>
          <ul class="qv__notes">
            <li>${icon('check')}Read and follow the instructions printed on the pack.</li>
            <li>${icon('check')}Use only in open areas where fireworks are permitted.</li>
            <li>${icon('check')}Adult supervision is required at all times.</li>
          </ul>
          <div class="qv__actions">
            <div class="qty" data-max="${maxQty(p)}">
              <button type="button" data-action="qty-dec" aria-label="Decrease quantity" ${out ? 'disabled' : ''}>${icon('minus')}</button>
              <input type="number" class="qty__input" value="1" min="1" max="${maxQty(p)}" inputmode="numeric" aria-label="Quantity" ${out ? 'disabled' : ''}>
              <button type="button" data-action="qty-inc" aria-label="Increase quantity" ${out ? 'disabled' : ''}>${icon('plus')}</button>
            </div>
            <button type="button" class="btn btn--primary" data-action="add" ${out ? 'disabled' : ''}>${out ? 'Out of Stock' : 'Add to Cart'}</button>
          </div>
        </div>
      </div>`;
    openLayer(el.quickView, opener);
  }

  function bindQuickView() {
    el.quickViewBody.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      const root = e.target.closest('.qv');
      if (!btn || !root) return;
      const box = $('.qty', root);
      if (btn.dataset.action === 'qty-inc') stepQty(box, 1);
      else if (btn.dataset.action === 'qty-dec') stepQty(box, -1);
      else if (btn.dataset.action === 'add') {
        if (addToCart(Number(root.dataset.id), readQty(box))) { $('.qty__input', box).value = 1; flashButton(btn, 'Added'); }
      }
    });
    el.quickViewBody.addEventListener('change', (e) => {
      if (e.target.classList.contains('qty__input')) readQty(e.target.closest('.qty'));
    });
  }

  /* ------------------------------------------------------------------------
     13. CART
     ------------------------------------------------------------------------ */
  const offersActive = () => Date.now() < new Date(CONFIG.offerEndsAt).getTime();

  function loadCart() {
    const saved = storage.get(CONFIG.storageKeys.cart, []);
    state.cart = (Array.isArray(saved) ? saved : [])
      .filter((l) => l && Number.isInteger(l.id) && Number.isInteger(l.qty) && l.qty > 0)
      .map((l) => ({ id: l.id, product: getProduct(l.id), qty: l.qty }))
      .filter((l) => l.product && l.product.stock > 0)
      .map((l) => ({ id: l.id, qty: Math.min(l.qty, maxQty(l.product)) }));
  }
  const saveCart = () => storage.set(CONFIG.storageKeys.cart, state.cart);
  const cartLines = () => state.cart.map((l) => ({ product: getProduct(l.id), qty: l.qty })).filter((l) => l.product);

  // All money maths lives here so the cart and checkout always agree.
  function calcTotals(lines) {
    let mrp = 0;
    let selling = 0;
    lines.forEach(({ product: p, qty }) => { mrp += p.oldPrice * qty; selling += p.price * qty; });

    const active = offersActive();
    const tier = active ? [...OFFER_TIERS].reverse().find((t) => selling >= t.min) || null : null;
    const nextTier = active ? OFFER_TIERS.find((t) => selling < t.min) || null : null;
    const productDiscount = mrp - selling;
    const offerDiscount = tier ? Math.round((selling * tier.percent) / 100) : 0;

    return {
      mrp, selling, productDiscount, tier, nextTier, offerDiscount,
      total: selling - offerDiscount,
      savings: productDiscount + offerDiscount,
      count: lines.reduce((s, l) => s + l.qty, 0),
    };
  }

  function addToCart(id, qty = 1) {
    const p = getProduct(id);
    if (!p || p.stock <= 0) return false;
    const line = state.cart.find((l) => l.id === id);
    const current = line ? line.qty : 0;
    const max = maxQty(p);
    const next = Math.min(current + qty, max);

    if (next === current) { toast(`You already have the maximum available (${max}) of ${p.name}.`, 'info'); return false; }
    if (line) line.qty = next; else state.cart.push({ id, qty: next });

    saveCart();
    renderCart();
    bumpCartBadge();
    const added = next - current;
    toast(`${added} × ${p.name} added to your cart`, 'success', { action: 'View cart', onAction: openCart });
    if (next < current + qty) toast(`Only ${max} of ${p.name} available per order.`, 'info');
    return true;
  }

  function setLineQty(id, qty) {
    const line = state.cart.find((l) => l.id === id);
    const p = getProduct(id);
    if (!line || !p) return;
    const max = maxQty(p);
    if (qty > max) { toast(`Only ${max} of ${p.name} available per order.`, 'info'); qty = max; }
    if (qty < 1) return;
    line.qty = qty;
    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    const line = state.cart.find((l) => l.id === id);
    const p = getProduct(id);
    if (!line) return;
    const removed = { ...line };
    state.cart = state.cart.filter((l) => l.id !== id);
    saveCart();
    renderCart();
    toast(`${p ? p.name : 'Item'} removed`, 'info', {
      action: 'Undo',
      onAction: () => { state.cart.push(removed); saveCart(); renderCart(); },
    });
  }

  async function clearCart() {
    if (!state.cart.length) return;
    const ok = await confirmDialog({
      title: 'Clear your cart?',
      message: 'This removes every item from your cart. You can\'t undo this.',
      confirmText: 'Yes, clear cart',
      cancelText: 'Keep items',
    });
    if (!ok) return;
    state.cart = [];
    saveCart();
    renderCart();
    toast('Your cart is now empty', 'info');
  }

  function bumpCartBadge() {
    $$('.js-cart-count').forEach((b) => { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); });
  }

  function cartItemHTML({ product: p, qty }) {
    const name = escapeHTML(p.name);
    return `
      <li class="cart-item" data-id="${p.id}">
        ${productImgHTML(p, { cls: 'cart-item__img', size: 96 })}
        <div class="cart-item__info">
          <h3 class="cart-item__name">${name}</h3>
          <p class="cart-item__price">${formatPrice(p.price)}${p.oldPrice > p.price ? ` <s>${formatPrice(p.oldPrice)}</s>` : ''}</p>
          <div class="qty qty--sm">
            <button type="button" data-cart="dec" aria-label="Decrease quantity of ${name}" ${qty <= 1 ? 'disabled' : ''}>${icon('minus')}</button>
            <span class="qty__value" aria-live="polite">${qty}</span>
            <button type="button" data-cart="inc" aria-label="Increase quantity of ${name}" ${qty >= maxQty(p) ? 'disabled' : ''}>${icon('plus')}</button>
          </div>
        </div>
        <div class="cart-item__side">
          <strong>${formatPrice(p.price * qty)}</strong>
          <button type="button" class="icon-btn icon-btn--sm" data-cart="remove" aria-label="Remove ${name} from cart">${icon('trash-2')}</button>
        </div>
      </li>`;
  }

  function summaryHTML(t) {
    return `
      <div class="sum-row"><dt>Subtotal (MRP)</dt><dd>${formatPrice(t.mrp)}</dd></div>
      <div class="sum-row sum-row--save"><dt>Product discount</dt><dd>&minus;${formatPrice(t.productDiscount)}</dd></div>
      <div class="sum-row sum-row--save"><dt>${t.tier ? `Extra offer (${t.tier.percent}% off)` : 'Extra offer'}</dt>
        <dd>${t.offerDiscount ? '&minus;' + formatPrice(t.offerDiscount) : formatPrice(0)}</dd></div>
      <div class="sum-row sum-row--total"><dt>Final total</dt><dd>${formatPrice(t.total)}</dd></div>`;
  }

  function renderCart() {
    const lines = cartLines();
    const t = calcTotals(lines);
    const empty = lines.length === 0;

    $$('.js-cart-count').forEach((b) => { b.textContent = t.count; b.classList.toggle('is-empty', empty); });
    el.floatCartTotal.textContent = empty ? '' : formatPrice(t.total);

    el.cartEmpty.hidden = !empty;
    el.cartContent.hidden = empty;
    el.checkoutBtn.disabled = empty;
    el.clearCartBtn.disabled = empty;
    el.cartList.innerHTML = lines.map(cartItemHTML).join('');

    // "Buy more, save more" progress
    if (!empty && (t.nextTier || t.tier)) {
      el.cartProgress.hidden = false;
      if (t.nextTier) {
        el.cartProgressText.innerHTML = `Add <strong>${formatPrice(t.nextTier.min - t.selling)}</strong> more to get <strong>${t.nextTier.percent}% extra off</strong>`;
        el.cartProgressBar.style.width = `${clamp((t.selling / t.nextTier.min) * 100, 4, 100)}%`;
      } else {
        el.cartProgressText.innerHTML = `Top offer unlocked. <strong>${t.tier.percent}% extra off</strong> applied.`;
        el.cartProgressBar.style.width = '100%';
      }
    } else {
      el.cartProgress.hidden = true;
    }

    el.cartSummary.innerHTML = summaryHTML(t) +
      (t.savings > 0 ? `<p class="sum-saved">${icon('sparkles')}You save ${formatPrice(t.savings)} on this order</p>` : '');

    if (el.checkoutModal.classList.contains('is-open')) renderCheckoutSummary();
  }

  const openCart = () => openLayer(el.cartDrawer, el.cartToggle);

  function bindCart() {
    el.cartToggle.addEventListener('click', openCart);
    el.floatCart.addEventListener('click', () => openLayer(el.cartDrawer, el.floatCart));
    el.clearCartBtn.addEventListener('click', clearCart);
    el.checkoutBtn.addEventListener('click', openCheckout);

    el.cartList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-cart]');
      const item = e.target.closest('.cart-item');
      if (!btn || !item) return;
      const id = Number(item.dataset.id);
      const line = state.cart.find((l) => l.id === id);
      if (!line) return;
      if (btn.dataset.cart === 'inc') setLineQty(id, line.qty + 1);
      else if (btn.dataset.cart === 'dec') setLineQty(id, line.qty - 1);
      else if (btn.dataset.cart === 'remove') removeFromCart(id);
    });

    // Keep tabs in sync (cart edited in another tab).
    window.addEventListener('storage', (e) => {
      if (e.key === CONFIG.storageKeys.cart) { loadCart(); renderCart(); }
    });
  }

  /* ------------------------------------------------------------------------
     14. CONFIRM DIALOG (promise based)
     ------------------------------------------------------------------------ */
  function confirmDialog({ title, message, confirmText = 'Confirm', cancelText = 'Cancel' }) {
    return new Promise((resolve) => {
      el.confirmTitle.textContent = title;
      el.confirmMessage.textContent = message;
      el.confirmOk.textContent = confirmText;
      $('[data-confirm-cancel]', el.confirmModal).textContent = cancelText;
      el.confirmModal._onClose = () => resolve(false); // Escape / backdrop / cancel
      el.confirmOk.onclick = () => { el.confirmModal._onClose = null; closeLayer(el.confirmModal); resolve(true); };
      openLayer(el.confirmModal);
    });
  }

  /* ------------------------------------------------------------------------
     15. CHECKOUT
     Front-end only: validation + a WhatsApp hand-off. No payment is taken.
     ------------------------------------------------------------------------ */
  const INDIAN_STATES = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh',
    'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
    'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

  const PAYMENT_INFO = {
    cod:    { label: 'Cash on Delivery / Store Pickup', note: 'Pay in cash when your order is delivered or when you collect it from the store.' },
    upi:    { label: 'UPI',            note: 'After the store confirms your order, you will receive UPI payment details. No payment is taken on this website.' },
    online: { label: 'Online Payment', note: 'After the store confirms your order, you will receive a secure payment link. No payment is taken on this website.' },
  };

  const normalizeMobile = (v) => v.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');

  // Each rule returns an error message, or '' when the value is fine.
  const RULES = {
    coName:    (v) => /^[\p{L}\p{M}][\p{L}\p{M} .'-]{2,59}$/u.test(v.trim()) ? '' : 'Enter your full name (letters only, at least 3 characters).',
    coMobile:  (v) => /^[6-9]\d{9}$/.test(normalizeMobile(v)) ? '' : 'Enter a valid 10-digit Indian mobile number.',
    coEmail:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email address, like name@example.com.',
    coAddress: (v) => v.trim().length >= 10 ? '' : 'Enter your full address with house number, street and area.',
    coCity:    (v) => /^[\p{L}\p{M}][\p{L}\p{M} .'-]{1,39}$/u.test(v.trim()) ? '' : 'Enter your city or town.',
    coState:   (v) => v ? '' : 'Select your state or union territory.',
    coPin:     (v) => /^[1-9]\d{5}$/.test(v.trim()) ? '' : 'Enter a valid 6-digit PIN code.',
    cfName:    (v) => /^[\p{L}\p{M}][\p{L}\p{M} .'-]{2,59}$/u.test(v.trim()) ? '' : 'Enter your name (at least 3 letters).',
    cfMobile:  (v) => /^[6-9]\d{9}$/.test(normalizeMobile(v)) ? '' : 'Enter a valid 10-digit Indian mobile number.',
    cfMessage: (v) => v.trim().length >= 10 ? '' : 'Write a short message (at least 10 characters).',
  };

  function validateField(input) {
    const rule = RULES[input.id];
    if (!rule) return true;
    const msg = rule(input.value);
    const wrap = input.closest('.field');
    wrap.classList.toggle('has-error', Boolean(msg));
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    $('.field__error', wrap).textContent = msg;
    return !msg;
  }

  function validateForm(form) {
    const inputs = $$('[data-validate]', form);
    const results = inputs.map((i) => ({ input: i, ok: validateField(i) }));
    const firstBad = results.find((r) => !r.ok);
    if (firstBad) firstBad.input.focus();
    return !firstBad;
  }

  function clearErrors(form) {
    $$('.field', form).forEach((f) => f.classList.remove('has-error'));
    $$('[data-validate]', form).forEach((i) => i.setAttribute('aria-invalid', 'false'));
    $$('.field__error', form).forEach((n) => { n.textContent = ''; });
  }

  function bindLiveValidation(form) {
    form.addEventListener('focusout', (e) => { if (e.target.matches('[data-validate]')) validateField(e.target); });
    form.addEventListener('input', (e) => {
      if (e.target.matches('[data-validate]') && e.target.closest('.field').classList.contains('has-error')) validateField(e.target);
    });
    form.addEventListener('change', (e) => { if (e.target.matches('select[data-validate]')) validateField(e.target); });
  }

  const selectedPayment = () => {
    const value = ($('input[name="payment"]:checked', el.checkoutForm) || {}).value || 'cod';
    return { value, ...PAYMENT_INFO[value] };
  };
  const updatePaymentNote = () => { el.paymentNote.textContent = selectedPayment().note; };
  const updateSubmitState = () => { el.placeOrder.disabled = !(el.agreeTerms.checked && state.cart.length > 0); };

  function renderCheckoutSummary() {
    const lines = cartLines();
    const t = calcTotals(lines);
    el.checkoutSummary.innerHTML = `
      <ul class="summary-list">
        ${lines.map(({ product: p, qty }) => `
          <li>
            ${productImgHTML(p, { cls: 'summary-list__img', size: 56 })}
            <div><strong>${escapeHTML(p.name)}</strong><small>${qty} × ${formatPrice(p.price)}</small></div>
            <span>${formatPrice(p.price * qty)}</span>
          </li>`).join('')}
      </ul>
      <dl class="summary-totals">${summaryHTML(t)}</dl>
      ${t.savings > 0 ? `<p class="sum-saved">${icon('sparkles')}You save ${formatPrice(t.savings)} on this order</p>` : ''}`;
    updateSubmitState();
  }

  function openCheckout() {
    if (!cartLines().length) { toast('Your cart is empty. Add some crackers first.', 'info'); return; }
    closeLayer(el.cartDrawer);
    el.agreeTerms.checked = false; // consent must be given fresh each time
    clearErrors(el.checkoutForm);
    updatePaymentNote();
    renderCheckoutSummary();
    openLayer(el.checkoutModal, el.cartToggle);
  }

  const makeOrderId = () => 'SBC' + Date.now().toString(36).toUpperCase().slice(-6) + Math.floor(Math.random() * 90 + 10);

  function buildWhatsAppOrder(order) {
    const c = order.customer;
    const lines = order.items.map((it, i) => `${i + 1}. ${it.name} × ${it.qty} = ${formatPrice(it.price * it.qty)}`).join('\n');
    return waLink(
      `*New order - ${CONFIG.storeName}*\nOrder ID: ${order.id}\n\n*Customer*\n${c.name}\nMobile: ${c.mobile}\nEmail: ${c.email}\n` +
      `${c.address}, ${c.city}, ${c.state} - ${c.pin}\n\n*Items*\n${lines}\n\n` +
      `Subtotal (MRP): ${formatPrice(order.totals.mrp)}\nDiscounts: ${formatPrice(order.totals.savings)}\n*Final total: ${formatPrice(order.totals.total)}*\n\n` +
      `Payment: ${order.payment.label}`);
  }

  function showSuccess(order) {
    el.successBody.innerHTML = `
      <div class="success">
        <span class="success__icon">${icon('check-circle')}</span>
        <h2 id="successTitle" class="success__title">Order request created</h2>
        <p class="success__id">Order ID <strong>${order.id}</strong></p>
        <p class="success__text">Thank you, ${escapeHTML(order.customer.name.split(' ')[0])}. Send this order to the store on WhatsApp so the team can confirm
          availability, delivery and payment with you. Total: <strong>${formatPrice(order.totals.total)}</strong>.</p>
        <div class="success__actions">
          <a class="btn btn--primary" href="${buildWhatsAppOrder(order)}" target="_blank" rel="noopener noreferrer" data-autofocus>${icon('whatsapp')}Send order on WhatsApp</a>
          <button type="button" class="btn btn--ghost" data-close>Continue shopping</button>
        </div>
        <p class="success__note">Your order is saved on this device. It is not confirmed until the store contacts you.</p>
      </div>`;
    openLayer(el.successModal, el.cartToggle);
  }

  function bindCheckout() {
    // Populate the state dropdown
    el.coState.insertAdjacentHTML('beforeend', INDIAN_STATES.map((s) => `<option value="${s}">${s}</option>`).join(''));

    bindLiveValidation(el.checkoutForm);
    el.agreeTerms.addEventListener('change', updateSubmitState);
    $$('input[name="payment"]', el.checkoutForm).forEach((r) => r.addEventListener('change', updatePaymentNote));

    el.checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const lines = cartLines();
      if (!lines.length || !el.agreeTerms.checked) return;
      if (!validateForm(el.checkoutForm)) { toast('Please fix the highlighted fields.', 'error'); return; }

      const val = (id) => document.getElementById(id).value.trim();
      const totals = calcTotals(lines);
      const order = {
        id: makeOrderId(),
        placedAt: new Date().toISOString(),
        customer: {
          name: val('coName'), mobile: normalizeMobile(val('coMobile')), email: val('coEmail'),
          address: val('coAddress'), city: val('coCity'), state: val('coState'), pin: val('coPin'),
        },
        payment: selectedPayment(),
        items: lines.map(({ product: p, qty }) => ({ id: p.id, name: p.name, qty, price: p.price, oldPrice: p.oldPrice })),
        totals,
      };

      storage.set(CONFIG.storageKeys.lastOrder, order);
      state.cart = [];
      saveCart();
      renderCart();
      el.checkoutForm.reset();
      clearErrors(el.checkoutForm);
      closeLayer(el.checkoutModal);
      showSuccess(order);
    });
  }

  /* ------------------------------------------------------------------------
     16. OFFERS + COUNTDOWN
     ------------------------------------------------------------------------ */
  function renderOffers() {
    el.offerGrid.innerHTML = OFFER_TIERS.map((t, i) => `
      <article class="offer-card${i === 1 ? ' offer-card--featured' : ''} reveal" style="--d:${i * 90}ms">
        <span class="offer-card__icon">${icon(t.icon)}</span>
        <p class="offer-card__min">${formatPrice(t.min)}+</p>
        <h3 class="offer-card__title">${escapeHTML(t.title)}</h3>
        <p class="offer-card__text">${escapeHTML(t.text)}</p>
        <p class="offer-card__fine">Applied automatically in your cart</p>
      </article>`).join('');

    const combo = getProduct(8);
    if (combo) {
      el.comboBanner.innerHTML = `
        <div class="combo__art">${productImgHTML(combo, { size: 320 })}</div>
        <div class="combo__copy">
          <h3>${escapeHTML(combo.name)}</h3>
          <p>${escapeHTML(combo.description)}</p>
          <p class="combo__price"><strong>${formatPrice(combo.price)}</strong> <s>${formatPrice(combo.oldPrice)}</s> <span class="tag tag--discount">${combo.discount}% OFF</span></p>
          <div class="combo__actions">
            <button type="button" class="btn btn--primary" data-combo="add">Add Combo to Cart</button>
            <button type="button" class="btn btn--ghost" data-combo="view">View Details</button>
          </div>
        </div>`;
      el.comboBanner.addEventListener('click', (e) => {
        const b = e.target.closest('[data-combo]');
        if (!b) return;
        if (b.dataset.combo === 'add') { if (addToCart(combo.id, 1)) flashButton(b, 'Added'); }
        else openQuickView(combo.id, b);
      });
    } else {
      el.comboBanner.hidden = true;
    }
  }

  function initCountdown() {
    const end = new Date(CONFIG.offerEndsAt).getTime();
    const node = (u) => $(`[data-cd="${u}"]`, el.countdown);
    const nodes = { days: node('days'), hours: node('hours'), minutes: node('minutes'), seconds: node('seconds') };
    const pad = (n) => String(n).padStart(2, '0');
    const endLabel = new Date(end).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
    let timer;

    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      const s = Math.floor(diff / 1000);
      nodes.days.textContent = pad(Math.floor(s / 86400));
      nodes.hours.textContent = pad(Math.floor((s % 86400) / 3600));
      nodes.minutes.textContent = pad(Math.floor((s % 3600) / 60));
      nodes.seconds.textContent = pad(s % 60);
      if (diff === 0) {
        el.countdownNote.textContent = 'This offer period has ended. Watch this space for the next one.';
        el.offerGrid.classList.add('is-ended');
        clearInterval(timer);
        renderCart();
      }
    };
    if (end > Date.now()) el.countdownNote.textContent = `Offers are valid until ${endLabel}, while stock lasts.`;
    tick();
    timer = setInterval(tick, 1000);
  }

  /* ------------------------------------------------------------------------
     17. CONTACT FORM
     There is no server here. After validation the message opens in WhatsApp,
     which delivers it to the store. To use your own backend instead, replace
     the window.open(...) line with a fetch() POST to your endpoint.
     ------------------------------------------------------------------------ */
  function bindContactForm() {
    const form = el.contactForm;
    bindLiveValidation(form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(form)) { toast('Please fix the highlighted fields.', 'error'); return; }
      const name = $('#cfName').value.trim();
      const mobile = normalizeMobile($('#cfMobile').value);
      const message = $('#cfMessage').value.trim();
      const url = waLink(`Hello ${CONFIG.storeName},\n${message}\n\n- ${name}, ${mobile}`);
      toast(`Thanks, ${name.split(' ')[0]}. Opening WhatsApp so you can send your message.`, 'success', { duration: 5000 });
      window.open(url, '_blank', 'noopener,noreferrer');
      form.reset();
      clearErrors(form);
    });
  }

  /* ------------------------------------------------------------------------
     18. INFO PAGES (Terms / Privacy) — sample text, replace before launch
     ------------------------------------------------------------------------ */
  const INFO_PAGES = {
    terms: {
      title: 'Terms & Conditions',
      html: `
        <p class="info__note">Sample text. Please have it reviewed and replace it with your own terms before going live.</p>
        <h3>Orders</h3><p>Placing an order on this website is a request to buy. An order is confirmed only after our team contacts you to confirm availability, delivery and payment.</p>
        <h3>Legal compliance</h3><p>Fireworks are regulated. You are responsible for checking that the products you order may lawfully be sold to you, stored, transported and used at your location. We may decline or cancel any order that cannot be lawfully fulfilled.</p>
        <h3>Prices and stock</h3><p>Prices, discounts and stock can change without notice. Bulk-order offers apply only during the offer period shown on this site.</p>
        <h3>Safety</h3><p>You agree to follow the safety guidelines on this website and the instructions printed on every product. Fireworks must be used only by, or under the direct supervision of, an adult.</p>
        <h3>Returns</h3><p>Because fireworks are hazardous goods, return and refund conditions will be shared when your order is confirmed.</p>`,
    },
    privacy: {
      title: 'Privacy Policy',
      html: `
        <p class="info__note">Sample text. Please have it reviewed and replace it with your own policy before going live.</p>
        <h3>What we collect</h3><p>When you place an order or send a message, we collect the details you enter: name, mobile number, email address and delivery address.</p>
        <h3>How we use it</h3><p>We use your details only to confirm and deliver your order and to reply to your questions. We do not sell your personal information.</p>
        <h3>On your device</h3><p>Your cart and your most recent order are saved in your browser's local storage so they remain after you refresh the page. You can clear them at any time from your browser settings.</p>
        <h3>Payments</h3><p>This website does not collect card, UPI or bank details.</p>
        <h3>Contact</h3><p>To ask us to correct or delete your details, call or WhatsApp us using the contact details on this page.</p>`,
    },
  };

  function bindInfoLinks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-info]');
      if (!link) return;
      e.preventDefault();
      const page = INFO_PAGES[link.dataset.info];
      if (!page) return;
      el.infoTitle.textContent = page.title;
      el.infoBody.innerHTML = page.html;
      openLayer(el.infoModal, link);
    });
  }

  /* ------------------------------------------------------------------------
     19. NAVIGATION + SCROLL BEHAVIOUR
     ------------------------------------------------------------------------ */
  function initNav() {
    const setMenu = (open) => {
      el.nav.classList.toggle('is-open', open);
      el.menuToggle.setAttribute('aria-expanded', String(open));
      el.menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      el.menuToggle.innerHTML = icon(open ? 'x' : 'menu');
      if (open) setSearchPanel(false);
    };
    const setSearchPanel = (open) => {
      el.searchPanel.classList.toggle('is-open', open);
      el.searchToggle.setAttribute('aria-expanded', String(open));
      if (open) { setMenu(false); setTimeout(() => el.headerSearch.focus(), 120); }
    };

    el.menuToggle.addEventListener('click', () => setMenu(!el.nav.classList.contains('is-open')));
    el.searchToggle.addEventListener('click', () => setSearchPanel(!el.searchPanel.classList.contains('is-open')));

    // Close the menu after choosing a link, or when clicking elsewhere.
    el.nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    // composedPath() is captured at dispatch time, so it still works after the
    // toggle button's icon has been swapped out (e.target would be detached).
    document.addEventListener('click', (e) => {
      const ids = e.composedPath().map((n) => n.id);
      if (!ids.includes('nav') && !ids.includes('menuToggle')) setMenu(false);
      if (!ids.includes('searchPanel') && !ids.includes('searchToggle')) setSearchPanel(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !layers.length) { setMenu(false); setSearchPanel(false); }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

    // Header search: filters live; Enter jumps to the shop.
    el.headerSearch.addEventListener('input', debounce((e) => setSearch(e.target.value, 'header'), 120));
    el.headerSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      setSearch(el.headerSearch.value, 'header');
      setSearchPanel(false);
      scrollToId('shop');
    });

    // Sticky header style + back-to-top visibility (one rAF-throttled handler).
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        el.header.classList.toggle('is-scrolled', y > 12);
        el.toTop.classList.toggle('is-visible', y > 700);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    el.toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' }));

    // Highlight the nav link for the section in view.
    const links = $$('.nav__link');
    if ('IntersectionObserver' in window) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => {
            const on = a.getAttribute('href') === `#${en.target.id}`;
            a.classList.toggle('is-active', on);
            if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      $$('main section[id]').forEach((s) => spy.observe(s));
    }
  }

  function bindShopControls() {
    el.shopSearch.addEventListener('input', debounce((e) => setSearch(e.target.value, 'shop'), 120));
    el.priceFilter.addEventListener('change', (e) => { state.filters.price = e.target.value; renderProducts(); });
    el.sortSelect.addEventListener('change', (e) => { state.filters.sort = e.target.value; renderProducts(); });
    el.clearFilters.addEventListener('click', () => { clearFilters(); toast('Filters cleared', 'info', { duration: 2000 }); });

    el.categoryChips.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-chip]');
      if (chip) setCategory(chip.dataset.chip);
    });

    document.addEventListener('click', (e) => {
      const catBtn = e.target.closest('[data-category]');
      if (catBtn) { setCategory(catBtn.dataset.category); scrollToId('shop'); return; }
      if (e.target.closest('[data-clear]')) clearFilters();
      if (e.target.closest('[data-shop-now]')) { closeLayer(el.cartDrawer); scrollToId('shop'); }
    });
  }

  /* ------------------------------------------------------------------------
     20. VISUAL EFFECTS
     ------------------------------------------------------------------------ */

  /* ------------------------------------------------------------------------
     THEME (dark / light)
     The saved choice is applied by a tiny inline script in <head> before the
     page paints. This function wires the toggle button and keeps things in sync.
     ------------------------------------------------------------------------ */
  const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';

  function initTheme() {
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!btn) return;
    const label = btn.querySelector('.theme-toggle__label');

    const apply = (theme, { animate = false, announce = false } = {}) => {
      if (animate && !prefersReducedMotion()) {
        root.classList.add('theme-anim');
        setTimeout(() => root.classList.remove('theme-anim'), 450);
      }
      root.setAttribute('data-theme', theme);
      if (meta) meta.setAttribute('content', theme === 'light' ? '#fff8ee' : '#080b1f');

      const next = theme === 'light' ? 'dark' : 'light'; // what the button will switch TO
      btn.setAttribute('aria-label', `Switch to ${next} theme`);
      btn.title = `Switch to ${next} theme`;
      if (label) label.textContent = next === 'light' ? 'Light' : 'Dark';

      window.dispatchEvent(new Event('themechange'));
      if (announce) toast(`${theme === 'light' ? 'Light' : 'Dark'} theme on`, 'info', { duration: 1800 });
    };

    apply(isLight() ? 'light' : 'dark');
    btn.addEventListener('click', () => {
      const next = isLight() ? 'dark' : 'light';
      apply(next, { animate: true, announce: true });
      storage.set(CONFIG.storageKeys.theme, next);
    });
  }

  // Hero canvas: twinkling stars, rising embers, and a soft firework every few
  // seconds. Pauses when off-screen / tab hidden, and stays static for people
  // who prefer reduced motion.
  function initHeroFX() {
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    if (!ctx) return;

    const reduce = prefersReducedMotion();
    const small = () => window.innerWidth < 768;
    // Bright colours glow on the dark sky; deeper, saturated ones read on the light sky.
    const COLORS_DARK = ['#ffd166', '#ffb347', '#ff6f91', '#ffe9a8', '#8be9ff'];
    const COLORS_LIGHT = ['#ff7a1a', '#e8336d', '#e09a00', '#7c3aed', '#0d9edb'];
    const palette = () => (isLight() ? COLORS_LIGHT : COLORS_DARK);
    const pick = (a) => a[Math.floor(Math.random() * a.length)];
    const TAU = Math.PI * 2;

    let w = 0, h = 0, lastW = 0, dpr = 1;
    let stars = [], embers = [], rockets = [], sparks = [], flashes = [];
    let raf = 0, running = false, last = 0, nextLaunch = 0;

    const newEmber = (initial) => ({
      x: Math.random() * w, y: initial ? Math.random() * h : h + 10,
      vy: -(8 + Math.random() * 14), sway: Math.random() * TAU, r: 1 + Math.random() * 1.7, a: 0.2 + Math.random() * 0.4,
    });

    const drawStars = (t, staticMode) => {
      for (const s of stars) {
        const light = isLight();
        const base = staticMode ? 0.55 : 0.22 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.s + s.p));
        ctx.globalAlpha = light ? base * 0.7 : base;
        ctx.fillStyle = light ? (s.gold ? '#e8a020' : '#d9a05b') : (s.gold ? '#ffd98a' : '#e8ecff');
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, TAU); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5); // sparks stay crisp at 1.5x and cost far less to draw
      w = Math.round(rect.width); h = Math.round(rect.height);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(clamp((w * h) / (small() ? 11000 : 8000), 36, 150));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h * 0.92, r: Math.random() * 1.3 + 0.3,
        p: Math.random() * TAU, s: Math.random() * 1.6 + 0.4, gold: Math.random() < 0.25,
      }));
      embers = Array.from({ length: small() ? 8 : 16 }, () => newEmber(true));
      if (reduce || !running) { ctx.clearRect(0, 0, w, h); drawStars(0, true); }
    };

    const launch = () => {
      const x = w * (0.1 + Math.random() * 0.8);
      rockets.push({ x, y: h, tx: x + (Math.random() - 0.5) * 60, ty: h * (0.1 + Math.random() * 0.3), vy: -(h * 0.55 + Math.random() * 80), color: pick(palette()) });
    };

    const explode = (x, y, color) => {
      const n = small() ? 26 : 44;
      const second = pick(palette());
      for (let i = 0; i < n; i++) {
        const a = (i / n) * TAU + Math.random() * 0.15;
        const speed = 60 + Math.random() * 95;
        sparks.push({ x, y, px: x, py: y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, life: 1, decay: 0.55 + Math.random() * 0.4, color: i % 3 === 0 ? second : color });
      }
      flashes.push({ x, y, life: 1, color });
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      const t = now / 1000;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      drawStars(t, false);

      ctx.fillStyle = isLight() ? '#e8630a' : '#ffb84d';
      for (const e of embers) {
        e.y += e.vy * dt; e.x += Math.sin(t * 0.8 + e.sway) * 8 * dt;
        if (e.y < -10) Object.assign(e, newEmber(false));
        ctx.globalAlpha = e.a; ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, TAU); ctx.fill();
      }

      if (t >= nextLaunch && rockets.length < 2) {
        launch();
        nextLaunch = t + (small() ? 3.6 : 2.4) + Math.random() * (small() ? 2 : 2.2);
      }

      ctx.globalCompositeOperation = isLight() ? 'source-over' : 'lighter'; // glow on dark, solid on light
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy * dt; r.x += (r.tx - r.x) * dt * 0.8;
        ctx.globalAlpha = 0.9; ctx.strokeStyle = r.color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(r.x, r.y + 14); ctx.lineTo(r.x, r.y); ctx.stroke();
        if (r.y <= r.ty) { explode(r.x, r.y, r.color); rockets.splice(i, 1); }
      }
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.life -= dt * 3;
        if (f.life <= 0) { flashes.splice(i, 1); continue; }
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 70);
        g.addColorStop(0, f.color); g.addColorStop(1, 'transparent');
        ctx.globalAlpha = f.life * (isLight() ? 0.16 : 0.28); ctx.fillStyle = g;
        ctx.fillRect(f.x - 70, f.y - 70, 140, 140);
      }
      ctx.lineWidth = isLight() ? 2 : 1.6;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.px = s.x; s.py = s.y;
        s.vx *= Math.pow(0.35, dt); s.vy = s.vy * Math.pow(0.35, dt) + 70 * dt;
        s.x += s.vx * dt; s.y += s.vy * dt; s.life -= s.decay * dt;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.globalAlpha = s.life; ctx.strokeStyle = s.color;
        ctx.beginPath(); ctx.moveTo(s.px, s.py); ctx.lineTo(s.x, s.y); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const start = () => {
      if (running || reduce) return;
      running = true; last = performance.now(); nextLaunch = last / 1000 + 1.2;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    resize();
    window.addEventListener('themechange', () => { if (!running) { ctx.clearRect(0, 0, w, h); drawStars(0, true); } });
    window.addEventListener('resize', debounce(() => {
      // Ignore height-only changes (mobile URL bar) so stars don't reshuffle.
      if (Math.abs(window.innerWidth - lastW) > 40) { lastW = window.innerWidth; resize(); }
    }, 200));
    lastW = window.innerWidth;

    if (reduce) return;
    let inView = true;
    const sync = () => (inView && !document.hidden ? start() : stop());
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, { threshold: 0.05 }).observe(canvas);
    }
    document.addEventListener('visibilitychange', sync);
    sync();
  }

  // Stops every hero animation while the hero is scrolled out of view (keeps the rest of the page smooth)
  function initHeroPause() {
    const hero = document.getElementById('home');
    if (!hero || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(([entry]) => hero.classList.toggle('is-offscreen', !entry.isIntersecting), { threshold: 0 }).observe(hero);
  }

  // Button ripple
  function initRipple() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn || btn.disabled) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.6;
      const hasPointer = e.clientX || e.clientY; // keyboard "clicks" report 0,0
      const x = (hasPointer ? e.clientX - rect.left : rect.width / 2) - size / 2;
      const y = (hasPointer ? e.clientY - rect.top : rect.height / 2) - size / 2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  // Scroll reveal
  let revealObserver = null;
  function initReveal() {
    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('is-visible'); revealObserver.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    }
    $$('.reveal').forEach((n) => (revealObserver ? revealObserver.observe(n) : n.classList.add('is-visible')));
  }

  // Loading screen
  function hideLoader() {
    if (hideLoader.done || !el.loader) return;
    hideLoader.done = true;
    el.loader.classList.add('is-hidden');
    document.body.classList.add('is-ready');
    setTimeout(() => el.loader.remove(), 800);
  }

  /* ------------------------------------------------------------------------
     21. INIT
     ------------------------------------------------------------------------ */
  function init() {
    cacheDom();
    normalizeProducts();

    renderCategories();
    renderChips();
    renderOffers();
    renderProducts();
    loadCart();
    renderCart();

    bindLayers();
    bindProductGrid();
    bindQuickView();
    bindCart();
    bindCheckout();
    bindContactForm();
    bindInfoLinks();
    bindShopControls();

    initNav();
    initTheme();
    initCountdown();
    initReveal();
    initRipple();
    initHeroFX();
    initHeroPause();

    // Every .js-whatsapp link points at the store's WhatsApp number.
    $$('.js-whatsapp').forEach((a) => { a.href = waLink(`Hello ${CONFIG.storeName}, I would like to know more about your crackers.`); });

    if (document.readyState === 'complete') setTimeout(hideLoader, 400);
    else window.addEventListener('load', () => setTimeout(hideLoader, 500));
    setTimeout(hideLoader, 3000); // never trap the visitor behind the loader
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
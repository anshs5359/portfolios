/* =========================================================
   J&C FITNESS — script.js
   ---------------------------------------------------------
   OWNER: you only need to edit the three blocks below.
   1. GYM          -> business details (phone, address, links)
   2. SITE_IMAGES  -> image URLs (leave "" to show a placeholder)
   3. VIDEO_URL    -> YouTube / Vimeo / .mp4 link for the video section
   ========================================================= */
"use strict";

/* 1. BUSINESS INFORMATION ---------------------------------- */
const GYM = {
  name: "J&C Fitness",
  phone: "9205002319",
  whatsapp: "919205002319",
  phone2: "9310038356",
  rating: "4.8",
  reviews: "22",
  instagram: "https://www.instagram.com/jndcfitness/",
  address: "Plot No. 96, Pocket 27, Sector 24, Rohini, New Delhi, Delhi 110085",

  // Optional. Leave "" to build them automatically from the address above.
  mapsUrl: "",       // your exact Google Maps listing link (used by "View all Google reviews")
  mapsEmbedUrl: ""   // Google Maps > Share > Embed a map > copy the src="..." URL
};

/* 2. IMAGES ------------------------------------------------
   Paste an image URL (https://...) or a file path (images/hero.jpg).
   Empty "" = a clearly marked placeholder is shown instead.   */
const SITE_IMAGES = {
  hero: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnpzSdB3ICDWT9_Jw6kjMVVjRBGewB0qnwVlu93wY_GtOoovB0qS2W13Vd8RUdl99BX5w6sA-2O-lniH3niUZ2QS04eb63sOHeLQsTtPr_Z2kl54veyoKWCdcXePyeML_iw2tw=s1360-w1360-h1020-rw",
  about: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlzxPnMT56C8DiJHgj-YHZHnsrJ4YDqPZnmufqhORyPHZvDTZAihiSBhZmIP8DDG2ajM-PDkVe8lNrzSPcETfUnacMoObtomHNLSvhN9MsSqhD6s8K_Wsc3Vk5rWJWo7XlyWh3YZA=s1360-w1360-h1020-rw",
  trainer: "",
  transformation1: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlLDYeqBbE0klf8g5jTwoCpUqLb7fNIT3ddelaGO9OQm-ffuq6FwEUpfNZxHDgDYNTugcvlGCuEz3L3qyNBTcL9V98rkK_cNPvaAtxTGsuppFLZdwZ61_7ymECT1vFgcwYWoM4=s1360-w1360-h1020-rw",
  transformation2: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWldMmQcJ90gQyJhmARgwqhys0NJi21R1VwW0ss3WJpypuBuUhHV9KLgAvyGWrH8XSFIYKEJJqKghldtQ2qlJC4YmrBz52vOua2i7cCFxExyks343rkDljw_sAFifHlXldp1KBeF=s1360-w1360-h1020-rw",
  transformation3: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnVbE2MR7pYhJ34ei9S13S_4rbNi8VHX8kSTrOHLEaO9i5BqWY9TuAcQouVhlnzd_yhEO8z7NbLz_yGj6Cm1aCUNQcdul_V2UCZt1acvPSIOeEDfe4vWvXleE-P2fRyDcHruZdD=s1360-w1360-h1020-rw",
  transformation4: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlhBDmCNSA2D1bI92fgW9jzWQ6lpu5zGLJggUGzqIGben3U9pNWIhw07IN2CiL5C7l91Dv0iatygZN_EKltuq9_2BBqz_gslAHy7D_Z8v1YTbB1nulnXW-vzLquOyB6pZe04zP3=s1360-w1360-h1020-rw",
  gallery1: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlmJbdq9TR2rbq4T40gLH0WTlwni1zGDyKjbLI2jxy_0pdD2iDYmYaiQtJBI5JoH346fQMQAXR_BZmKtcnPDbUD0S5pOns7WDQgaeDhVcV3KtbAi92i5JLMTbfq_RomVxdY_L0v1g=s1360-w1360-h1020-rw",
  gallery2: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWntpPDS-P_UCWxiaCykxoBr8quiprO6DJCz-u0kaohz79N_BUfI-C4erO7PfHFQdstvfaSBVgr7w9Nhn_fPQbL3y4e0bCS4DtGhXtGFyOKPQZI-4WQalz7J7wjGfz0pWvUNibSm0g=s1360-w1360-h1020-rw",
  gallery3: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnZbEXa6tO3U_qYub9-ju96ZLorJZM3lrvpruNTx36JU7Q6mDrZpMhpmCiaEtxd-oEdlKGr18uXRPk689v4EiS0A1nUAI-hwbQHhnWAllxD6aeDAL_iV8ubNcXwYPAGODoKH_5Q=s1360-w1360-h1020-rw",
  gallery4: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmt7xFeub1Jap0-Tvufapqv9ApEMxgBojuuj2z5rEoWH2-cTcKaqs2ohAdm7buapAukBk47GQ2hB0oiPRTDRYE0gHoYkxWAPlEq4Ek_PvVgYwG5rRQgGG-Tz3qlgOGYgMCyDRA=s1360-w1360-h1020-rw",
  gallery5: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkUF4eTPasM6MVaBg8o_t0UYiHn5PNp1GD0y8XYBj--oSY1B6kJicPIZ87ohEtk95YAJpCe3RAcV12dt8nn1lRi1rJk805XdiizoJWBBSlvMw-VO3UVzn-uX61ZFTk1JQ7MJxMzEA=s1360-w1360-h1020-rw",
  gallery6: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnMXyZwKX1o0ybr9HgFzh7lFTWEO-Far8X8DWy9rwnJNV4D6__S6CfXBfWOb2SYeIQeonmwFWyv_3fAq0zoLDM13EZaUi4KnBjp_v4NJhdFNkKBdCeeTz8ew5DX28Xb0aNnbm9X=s1360-w1360-h1020-rw",
  gallery7: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnbOnMTkjjrZ_PHt3bIbfCC3v5QnwvIAMIDnHrDjrrdbzpBCBRF1KDqBmflu_SyHIMmspY3Vhxkhb88F4kqsWKKFjK86mdvd97FYAucDo6UHHgTJyO8GWK6br3AcJRMpZdJQaIpLg=s1360-w1360-h1020-rw",
  gallery8: "",
  gallery9: "",
  gallery10: "",
  gallery11: "",
  gallery12: "",
  insta1: "",
  insta2: "",
  insta3: "",
  insta4: "",
  insta5: "",
  insta6: "",
  videoPoster: "",
  ctaBackground: ""
};

/* 3. VIDEO -------------------------------------------------
   Use a video you own or have permission to use.
   Examples: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
             "https://vimeo.com/123456789"
             "videos/gym-tour.mp4"                              */
const VIDEO_URL = "";

/* =========================================================
   Everything below this line is the site logic.
   ========================================================= */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const scrollBehavior = () => (reducedMotion.matches ? "auto" : "smooth");

/* ---------- Derived links ---------- */
const mapQuery = encodeURIComponent(`${GYM.name}, ${GYM.address}`);
const LINKS = {
  call: `tel:${GYM.phone}`,
  call2: `tel:${GYM.phone2}`,
  whatsapp: `https://wa.me/${GYM.whatsapp}`,
  instagram: GYM.instagram,
  maps: GYM.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`,
  mapEmbed: GYM.mapsEmbedUrl || `https://www.google.com/maps?q=${mapQuery}&output=embed`
};
const instagramHandle = "@" + GYM.instagram.replace(/\/+$/, "").split("/").pop();
const whatsappLink = (text) =>
  text ? `${LINKS.whatsapp}?text=${encodeURIComponent(text)}` : LINKS.whatsapp;

/* ---------- Scroll lock (shared by menu + modals) ---------- */
let scrollLocks = 0;
function lockScroll() {
  scrollLocks += 1;
  document.body.classList.add("no-scroll");
}
function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) document.body.classList.remove("no-scroll");
}

/* =========================================================
   Business info + images
   ========================================================= */
function initBusinessInfo() {
  $$("[data-link]").forEach((el) => {
    const href = LINKS[el.dataset.link];
    if (!href) return;
    el.setAttribute("href", href);
    if (el.getAttribute("target") === "_blank") el.setAttribute("rel", "noopener noreferrer");
  });

  $$("[data-wa]").forEach((el) => {
    el.setAttribute("href", whatsappLink(el.dataset.wa));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  const text = {
    name: GYM.name,
    phone: GYM.phone,
    phone2: GYM.phone2,
    rating: GYM.rating,
    reviews: GYM.reviews,
    instagram: instagramHandle,
    address: GYM.address
  };
  $$("[data-gym]").forEach((el) => {
    const value = text[el.dataset.gym];
    if (value) el.textContent = value;
  });

  const frame = $("#mapFrame");
  if (frame) frame.setAttribute("src", LINKS.mapEmbed);
}

function initImages() {
  $$("[data-img]").forEach((box) => {
    const url = (SITE_IMAGES[box.dataset.img] || "").trim();
    const img = $("img", box);
    if (!img || !url) return; // keep the placeholder

    const markLoaded = () => box.classList.add("has-img");
    img.addEventListener("load", markLoaded, { once: true });
    img.addEventListener(
      "error",
      () => {
        img.removeAttribute("src");
        box.classList.remove("has-img");
      },
      { once: true }
    );
    img.setAttribute("src", url);
    if (img.complete && img.naturalWidth > 0) markLoaded();
  });
}

/* =========================================================
   Header, back-to-top, footer year
   ========================================================= */
function initHeaderAndScroll() {
  const header = $("#header");
  const toTop = $("#backToTop");
  let ticking = false;

  const update = () => {
    const y = window.scrollY || window.pageYOffset;
    header.classList.toggle("is-scrolled", y > 24);
    toTop.classList.toggle("is-visible", y > 700);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  });

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
}

/* =========================================================
   Mobile menu
   ========================================================= */
const menuEl = $("#mobileMenu");
const menuToggle = $("#menuToggle");
const headerEl = $("#header");
const menuIsOpen = () => menuEl.classList.contains("is-open");

function openMenu() {
  if (menuIsOpen()) return;
  menuEl.classList.add("is-open");
  headerEl.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close menu");
  lockScroll();
}

function closeMenu() {
  if (!menuIsOpen()) return;
  menuEl.classList.remove("is-open");
  headerEl.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  unlockScroll();
}

function initMenu() {
  menuToggle.addEventListener("click", () => (menuIsOpen() ? closeMenu() : openMenu()));
  window.matchMedia("(min-width: 1100px)").addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });
}

/* =========================================================
   Smooth scrolling + active navigation
   ========================================================= */
function initSmoothScroll() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute("href");
    if (!hash || hash.length < 2) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    event.preventDefault();
    closeMenu(); // also releases the scroll lock

    target.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    try {
      history.replaceState(null, "", hash);
    } catch (err) {
      /* history can be restricted on some file:// setups; ignore */
    }
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
}

function initActiveNav() {
  const links = $$("[data-navlink]");
  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  setActive("home");
  if (!("IntersectionObserver" in window)) return;

  const sections = $$("main section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.dataset.nav || entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));
}

/* =========================================================
   Scroll reveal
   ========================================================= */
function initReveal() {
  // Children of [data-stagger] containers reveal one after another.
  $$("[data-stagger]").forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.classList.add("reveal");
      child.style.setProperty("--i", String(Math.min(i, 6)));
    });
  });

  const items = $$(".reveal");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.remove("reveal"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        obs.unobserve(el);
        el.classList.add("is-visible");
        // Remove the helper classes once finished so hover effects work normally.
        window.setTimeout(() => {
          el.classList.remove("reveal", "is-visible");
          el.style.removeProperty("--i");
        }, 1300);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  items.forEach((el) => observer.observe(el));
}

/* =========================================================
   Brand ticker (decorative)
   ========================================================= */
function initTicker() {
  const track = $(".ticker__track");
  const group = track && $(".ticker__group", track);
  if (!track || !group || reducedMotion.matches) return;

  const build = () => {
    $$(".ticker__group[data-clone]", track).forEach((node) => node.remove());
    const width = group.getBoundingClientRect().width;
    if (!width) return;
    const copies = Math.ceil(window.innerWidth / width) + 1;
    for (let i = 0; i < copies; i += 1) {
      const clone = group.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("data-clone", "true");
      track.appendChild(clone);
    }
    track.style.setProperty("--ticker-shift", `-${width}px`);
    track.style.setProperty("--ticker-duration", `${Math.max(20, Math.round(width / 55))}s`);
    track.classList.add("is-running");
  };

  build();
  window.addEventListener("load", build);
  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(build, 200);
  });
}

/* =========================================================
   Modal helpers (lightbox + video)
   ========================================================= */
const modalStack = [];
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, video[controls], [tabindex]:not([tabindex="-1"])';

function openModal(modal, trigger) {
  modal.hidden = false;
  modalStack.push({ modal, trigger });
  lockScroll();
  const closeBtn = $(".modal__close", modal);
  if (closeBtn) closeBtn.focus();
}

function closeModal(modal) {
  const index = modalStack.findIndex((item) => item.modal === modal);
  if (index === -1) return;
  const [{ trigger }] = modalStack.splice(index, 1);
  modal.hidden = true;
  unlockScroll();
  if (modal.id === "videoModal") $("#videoBody").replaceChildren();
  if (trigger && document.contains(trigger)) trigger.focus();
}

function closeTopModal() {
  const top = modalStack[modalStack.length - 1];
  if (top) closeModal(top.modal);
}

function trapFocus(event, container) {
  const focusable = $$(FOCUSABLE, container).filter((el) => el.offsetParent !== null || el === document.activeElement);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function initModalControls() {
  $$("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => {
      const modal = el.closest(".modal");
      if (modal) closeModal(modal);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (modalStack.length) {
        closeTopModal();
      } else if (menuIsOpen()) {
        closeMenu();
        menuToggle.focus();
      }
      return;
    }

    const top = modalStack[modalStack.length - 1];
    if (!top) return;
    if (event.key === "Tab") trapFocus(event, top.modal);
    if (top.modal.id === "lightbox") {
      if (event.key === "ArrowRight") stepLightbox(1);
      if (event.key === "ArrowLeft") stepLightbox(-1);
    }
  });
}

/* =========================================================
   Gallery: filtering + lightbox
   ========================================================= */
const lightbox = { items: [], index: 0 };

function visibleGalleryCards() {
  return $$("#galleryGrid .g-item:not([hidden]) .g-card");
}

function renderLightbox() {
  const card = lightbox.items[lightbox.index];
  if (!card) return;
  const stage = $("#lbStage");
  const key = $(".media", card).dataset.img;
  const url = (SITE_IMAGES[key] || "").trim();
  const alt = $("img", card).getAttribute("alt") || "";
  const caption = $(".g-cap", card).textContent;

  stage.replaceChildren();
  if (url) {
    const img = document.createElement("img");
    img.src = url;
    img.alt = alt;
    stage.appendChild(img);
  } else {
    const box = document.createElement("div");
    box.className = "lb-ph";
    box.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-image"></use></svg>';
    const title = document.createElement("strong");
    title.textContent = "Photo placeholder";
    const hint = document.createElement("small");
    hint.textContent = `Add an image for "${key}" in SITE_IMAGES (script.js).`;
    box.append(title, hint);
    stage.appendChild(box);
  }

  $("#lbCaption").textContent = caption;
  $("#lbCounter").textContent = `${lightbox.index + 1} / ${lightbox.items.length}`;
  const multiple = lightbox.items.length > 1;
  $("#lbPrev").hidden = !multiple;
  $("#lbNext").hidden = !multiple;
}

function stepLightbox(direction) {
  if (lightbox.items.length < 2) return;
  const total = lightbox.items.length;
  lightbox.index = (lightbox.index + direction + total) % total;
  renderLightbox();
}

function openLightbox(card) {
  lightbox.items = visibleGalleryCards();
  lightbox.index = Math.max(0, lightbox.items.indexOf(card));
  renderLightbox();
  openModal($("#lightbox"), card);
}

function initGallery() {
  const grid = $("#galleryGrid");
  const buttons = $$(".filter-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((b) => {
        const active = b === button;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      $$(".g-item", grid).forEach((item) => {
        item.hidden = !(filter === "all" || item.dataset.category === filter);
      });
    });
  });

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".g-card");
    if (card) openLightbox(card);
  });

  $("#lbPrev").addEventListener("click", () => stepLightbox(-1));
  $("#lbNext").addEventListener("click", () => stepLightbox(1));

  // Swipe on touch screens
  const stage = $("#lbStage");
  let startX = null;
  stage.addEventListener("touchstart", (e) => { startX = e.changedTouches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const delta = e.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(delta) > 50) stepLightbox(delta < 0 ? 1 : -1);
  }, { passive: true });
}

/* =========================================================
   Video modal
   ========================================================= */
function videoEmbed(url) {
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (youtube) {
    return { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0` };
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { type: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` };
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return { type: "video", src: url };
  return { type: "iframe", src: url };
}

function renderVideo(container) {
  container.replaceChildren();
  const url = VIDEO_URL.trim();

  if (!url) {
    const empty = document.createElement("div");
    empty.className = "videomodal__empty";
    const title = document.createElement("h3");
    title.textContent = "Video coming soon";
    const copy = document.createElement("p");
    copy.textContent = "We're preparing a tour of the gym. Follow us on Instagram to see training clips in the meantime.";
    const link = document.createElement("a");
    link.className = "btn";
    link.href = LINKS.instagram;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Follow on Instagram";
    empty.append(title, copy, link);
    container.appendChild(empty);
    return;
  }

  const embed = videoEmbed(url);
  if (embed.type === "video") {
    const video = document.createElement("video");
    video.src = embed.src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    container.appendChild(video);
  } else {
    const frame = document.createElement("iframe");
    frame.src = embed.src;
    frame.title = "J&C Fitness video";
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    container.appendChild(frame);
  }
}

function initVideo() {
  const button = $("#videoOpen");
  button.addEventListener("click", () => {
    renderVideo($("#videoBody"));
    openModal($("#videoModal"), button);
  });
}

/* =========================================================
   Review slider
   ========================================================= */
function initReviewSlider() {
  const root = $("#reviewSlider");
  if (!root) return;
  const track = $(".slider__track", root);
  const slides = $$(".review-slide", track);
  const prev = $("#reviewPrev");
  const next = $("#reviewNext");
  const dotsWrap = $("#reviewDots");
  const controls = $(".slider__controls", root);
  let index = 0;
  let timer = null;
  let stopped = false;

  if (slides.length < 2) {
    controls.hidden = true;
    return;
  }

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider__dot";
    dot.setAttribute("aria-label", `Show review ${i + 1} of ${slides.length}`);
    dot.addEventListener("click", () => { stopAutoplay(true); go(i); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function go(target) {
    index = (target + slides.length) % slides.length;
    track.style.transform = `translateX(${-index * 100}%)`;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.setAttribute("aria-hidden", String(!active));
      slide.inert = !active;
    });
    dots.forEach((dot, i) => dot.setAttribute("aria-current", String(i === index)));
  }

  function startAutoplay() {
    if (stopped || reducedMotion.matches || timer) return;
    timer = window.setInterval(() => go(index + 1), 7000);
  }
  function pauseAutoplay() {
    window.clearInterval(timer);
    timer = null;
  }
  function stopAutoplay(permanent) {
    pauseAutoplay();
    if (permanent) {
      stopped = true;
      track.setAttribute("aria-live", "polite");
    }
  }

  prev.addEventListener("click", () => { stopAutoplay(true); go(index - 1); });
  next.addEventListener("click", () => { stopAutoplay(true); go(index + 1); });

  root.addEventListener("mouseenter", pauseAutoplay);
  root.addEventListener("mouseleave", startAutoplay);
  root.addEventListener("focusin", pauseAutoplay);
  root.addEventListener("focusout", startAutoplay);

  let startX = null;
  root.addEventListener("touchstart", (e) => { startX = e.changedTouches[0].clientX; }, { passive: true });
  root.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const delta = e.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(delta) > 50) { stopAutoplay(true); go(index + (delta < 0 ? 1 : -1)); }
  }, { passive: true });

  track.setAttribute("aria-live", "off");
  go(0);
  startAutoplay();
}

/* =========================================================
   Lead form -> WhatsApp
   ========================================================= */
function normalisePhone(raw) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

function initForm() {
  const form = $("#leadForm");
  if (!form) return;
  const status = $("#formStatus");

  const fields = {
    name: {
      el: $("#leadName"),
      check: (v) => /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]{1,59}$/u.test(v.trim()) ? "" : "Enter your name using at least 2 letters."
    },
    phone: {
      el: $("#leadPhone"),
      check: (v) => /^[6-9]\d{9}$/.test(normalisePhone(v)) ? "" : "Enter a valid 10-digit mobile number, for example 98765 43210."
    },
    goal: {
      el: $("#leadGoal"),
      check: (v) => v ? "" : "Choose the goal that fits you best."
    },
    time: { el: $("#leadTime"), check: () => "" },
    message: {
      el: $("#leadMessage"),
      check: (v) => v.length <= 500 ? "" : "Keep your message under 500 characters."
    }
  };

  const setError = (field, message) => {
    const error = $(`#err-${field.el.id}`);
    error.textContent = message;
    if (message) field.el.setAttribute("aria-invalid", "true");
    else field.el.removeAttribute("aria-invalid");
  };

  Object.values(fields).forEach((field) => {
    const clear = () => { if (field.el.getAttribute("aria-invalid")) setError(field, field.check(field.el.value)); };
    field.el.addEventListener("input", clear);
    field.el.addEventListener("change", clear);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.replaceChildren();

    let firstInvalid = null;
    Object.values(fields).forEach((field) => {
      const message = field.check(field.el.value);
      setError(field, message);
      if (message && !firstInvalid) firstInvalid = field.el;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const value = (key, fallback = "Not specified") => fields[key].el.value.trim() || fallback;
    const message = [
      `Hello ${GYM.name},`,
      "I want to know more about membership/training.",
      "",
      `Name: ${value("name")}`,
      `Phone: ${normalisePhone(fields.phone.el.value)}`,
      `Goal: ${value("goal")}`,
      `Preferred Time: ${value("time")}`,
      `Message: ${value("message")}`
    ].join("\n");

    const url = whatsappLink(message);
    const opened = window.open(url, "_blank");
    if (opened) opened.opener = null;
    else window.location.href = url;

    const note = document.createTextNode("WhatsApp is opening with your details. If nothing happens, ");
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "open WhatsApp here";
    status.append(note, link, document.createTextNode("."));
  });
}

/* =========================================================
   Init
   ========================================================= */
function init() {
  initBusinessInfo();
  initImages();
  initHeaderAndScroll();
  initMenu();
  initSmoothScroll();
  initActiveNav();
  initReveal();
  initTicker();
  initModalControls();
  initGallery();
  initVideo();
  initReviewSlider();
  initForm();
}

init();
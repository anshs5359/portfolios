/* ============================================================
   Kulwant & Co. — main.js
   Shared behaviour across all public pages.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Sticky Navbar ---------- */
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 30) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggle.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open") ? "true" : "false"
      );
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => navLinks.classList.remove("open"))
    );
  }

  /* ---------- Scroll Reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------- Hero / Page Search Form -> redirects to properties.html ---------- */
  document.querySelectorAll(".kc-search-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const params = new URLSearchParams();
      const type = form.querySelector('[name="ptype"]');
      const loc = form.querySelector('[name="location"]');
      const budget = form.querySelector('[name="budget"]');
      if (type && type.value) params.set("type", type.value);
      if (loc && loc.value) params.set("location", loc.value);
      if (budget && budget.value) params.set("budget", budget.value);
      window.location.href = "properties.html?" + params.toString();
    });
  });

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      item.closest(".faq-list")?.querySelectorAll(".faq-item").forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ---------- Testimonial Slider ---------- */
  initTestimonialSlider();

  /* ---------- Lead Forms (inquiry + contact) ---------- */
  document.querySelectorAll(".kc-lead-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (window.KCData) {
        window.KCData.addLead({
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          requirement: data.requirement || "",
          budget: data.budget || "",
          message: data.message || "",
          source: form.dataset.source || "Website Form"
        });
      }
      const successBox = form.parentElement.querySelector(".form-success");
      if (successBox) successBox.classList.add("show");
      form.reset();
      form.style.opacity = "0.5";
      setTimeout(() => { form.style.opacity = "1"; }, 300);
    });
  });

  /* ---------- Render dynamic blocks if data layer present ---------- */
  if (window.KCData) {
    renderFeaturedProperties();
    renderTestimonialsFromData();
  }
});

function initTestimonialSlider() {
  const slider = document.querySelector(".testimonial-slider");
  if (!slider) return;
  const row = slider.querySelector(".testimonial-slide-row");
  const dotsWrap = slider.querySelector(".slider-controls");
  let index = 0;
  let slides = () => row.querySelectorAll(".testimonial-slide");
  let timer = null;

  function update() {
    const n = slides().length;
    if (!n) return;
    row.style.transform = `translateX(-${index * 100}%)`;
    if (dotsWrap) {
      dotsWrap.querySelectorAll(".slider-dot").forEach((d, i) =>
        d.classList.toggle("active", i === index)
      );
    }
  }
  function go(delta) {
    const n = slides().length;
    if (!n) return;
    index = (index + delta + n) % n;
    update();
  }
  slider.querySelector(".slider-arrow.prev")?.addEventListener("click", () => { go(-1); restart(); });
  slider.querySelector(".slider-arrow.next")?.addEventListener("click", () => { go(1); restart(); });

  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => go(1), 6000);
  }

  function goTo(i) {
    const n = slides().length;
    if (!n) return;
    index = ((i % n) + n) % n;
    update();
  }

  slider._kcUpdate = update;
  slider._kcGo = go;
  slider._kcGoTo = goTo;
  slider._kcRestart = restart;
  update();
  restart();
}

function renderTestimonialsFromData() {
  const slider = document.querySelector(".testimonial-slider");
  if (!slider) return;
  const row = slider.querySelector(".testimonial-slide-row");
  const dotsWrap = slider.querySelector(".slider-controls");
  if (!row) return;
  const items = window.KCData.getTestimonials();
  if (!items.length) return;

  row.innerHTML = items.map((t) => `
    <div class="testimonial-slide">
      <div class="testimonial-card">
        <div class="stars">${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}</div>
        <p>&ldquo;${escapeHtml(t.text)}&rdquo;</p>
        <div class="testimonial-person">
          <img src="${t.avatar}" alt="${escapeHtml(t.name)}" loading="lazy">
          <div>
            <strong>${escapeHtml(t.name)}</strong>
            <span>${escapeHtml(t.role)}</span>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  if (dotsWrap) {
    dotsWrap.innerHTML = items.map((_, i) => `<span class="slider-dot${i === 0 ? " active" : ""}" data-i="${i}"></span>`).join("");
    dotsWrap.querySelectorAll(".slider-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        const i = parseInt(dot.dataset.i, 10);
        slider._kcGoTo && slider._kcGoTo(i);
        slider._kcRestart && slider._kcRestart();
      });
    });
  }
  slider._kcUpdate && slider._kcUpdate();
}

function renderFeaturedProperties() {
  const grid = document.querySelector("[data-featured-grid]");
  if (!grid) return;
  const items = window.KCData.getProperties().filter((p) => p.featured).slice(0, 4);
  grid.innerHTML = items.map(propertyCardHTML).join("");
}

function propertyCardHTML(p) {
  return `
  <article class="property-card reveal in-view">
    <div class="property-media">
      <img src="${p.image}" alt="${escapeHtml(p.title)}" loading="lazy">
      <span class="property-tag">${escapeHtml(p.type)}</span>
      <span class="property-status">${escapeHtml(p.status)}</span>
    </div>
    <div class="property-body">
      <div class="property-price">${p.priceLabel}</div>
      <h3 class="property-title">${escapeHtml(p.title)}</h3>
      <div class="property-loc">${pinSvg()} ${escapeHtml(p.location)}</div>
      <div class="property-meta">
        <span>${areaSvg()} ${p.area} sq.ft</span>
        ${p.bedrooms ? `<span>${bedSvg()} ${p.bedrooms} Bed</span>` : ""}
      </div>
      <div class="property-cta">
        <a href="property-detail.html?id=${p.id}" class="btn btn-outline-dark btn-sm">View Details</a>
        <a href="https://wa.me/919876543210?text=${encodeURIComponent("Hi, I'm interested in " + p.title + " (" + p.priceLabel + ")")}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">Enquire</a>
      </div>
    </div>
  </article>`;
}

function pinSvg() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>`;
}
function areaSvg() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h6"/></svg>`;
}
function bedSvg() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M5 10V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>`;
}
function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

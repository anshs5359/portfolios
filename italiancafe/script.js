/* =================================================================
   AMORE ITALIAN CAFE — SCRIPT.JS
   Organized by feature. Vanilla JS only, no dependencies.
   ================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initActiveNavHighlight();
  initSmoothScroll();
  initTypingEffect();
  initParallaxHero();
  initScrollReveal();
  initCounters();
  initMenuFilter();
  initCarousel();
  initGalleryLightbox();
  initTestimonialSlider();
  initReservationForm();
  initNewsletterForm();
  initBackToTop();
  initButtonRipple();
  initFloatingBeans();
  initFooterYear();
});

/* -----------------------------------------------------------------
   LOADING SCREEN
   ----------------------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const hide = () => {
    loader.classList.add('loader--hidden');
    document.body.style.overflow = '';
  };

  // Hide once everything (including hero image) is loaded, with a small
  // minimum display time so it doesn't just flash on fast connections.
  const minTime = new Promise((resolve) => setTimeout(resolve, 600));
  const pageLoad = new Promise((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve);
  });

  document.body.style.overflow = 'hidden';
  Promise.all([minTime, pageLoad]).then(hide);

  // Safety net: never trap the user behind the loader.
  setTimeout(hide, 4000);
}

/* -----------------------------------------------------------------
   SCROLL PROGRESS BAR
   ----------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* -----------------------------------------------------------------
   NAVBAR — solid background on scroll
   ----------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const update = () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* -----------------------------------------------------------------
   MOBILE HAMBURGER MENU
   ----------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  const closeMenu = () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll('[data-link]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });
}

/* -----------------------------------------------------------------
   ACTIVE NAV LINK HIGHLIGHTING (scroll-spy)
   ----------------------------------------------------------------- */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}

/* -----------------------------------------------------------------
   SMOOTH SCROLL FOR NAV LINKS
   ----------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* -----------------------------------------------------------------
   HERO TYPING EFFECT
   ----------------------------------------------------------------- */
function initTypingEffect() {
  const target = document.querySelector('.typed-text');
  if (!target) return;

  const fullText = 'Experience Authentic Italy in Every Bite';
  let i = 0;

  const type = () => {
    if (i <= fullText.length) {
      target.textContent = fullText.slice(0, i);
      i++;
      setTimeout(type, 38);
    }
  };

  // Slight delay so it begins after the loader fades.
  setTimeout(type, 700);
}

/* -----------------------------------------------------------------
   HERO PARALLAX (subtle, scroll-driven)
   ----------------------------------------------------------------- */
function initParallaxHero() {
  const bg = document.getElementById('heroBg');
  const hero = document.querySelector('.hero');
  if (!bg || !hero) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const update = () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    if (scrollY > heroHeight) return;
    bg.style.transform = `translateY(${scrollY * 0.25}px) scale(1.05)`;
  };

  window.addEventListener('scroll', update, { passive: true });
}

/* -----------------------------------------------------------------
   SCROLL-TRIGGERED REVEAL ANIMATIONS (Intersection Observer)
   ----------------------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el) => observer.observe(el));
}

/* -----------------------------------------------------------------
   ANIMATED NUMBER COUNTERS
   ----------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter__number');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('en-IN') + suffix;
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

/* -----------------------------------------------------------------
   MENU CATEGORY FILTERING
   ----------------------------------------------------------------- */
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');
  if (!filterBtns.length || !menuCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      menuCards.forEach((card) => {
        const matches = filter === 'all' || card.getAttribute('data-category') === filter;
        if (matches) {
          card.classList.remove('is-hidden');
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'card-fade-in 0.5s cubic-bezier(0.65,0,0.35,1)';
          });
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/* -----------------------------------------------------------------
   BEST SELLERS CAROUSEL (auto-sliding, vanilla JS)
   ----------------------------------------------------------------- */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const carousel = document.getElementById('carousel');
  if (!track || !dotsWrap || !carousel) return;

  const slides = track.children;
  const total = slides.length;
  let current = 0;
  let autoTimer = null;
  const AUTO_DELAY = 4500;

  // Build dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }
  const dots = dotsWrap.querySelectorAll('.dot');

  function render() {
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(index) {
    current = (index + total) % total;
    render();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, AUTO_DELAY);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  nextBtn?.addEventListener('click', () => { next(); startAuto(); });
  prevBtn?.addEventListener('click', () => { prev(); startAuto(); });

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // Touch swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 50) prev();
    else if (delta < -50) next();
    startAuto();
  }, { passive: true });

  render();
  startAuto();
}

/* -----------------------------------------------------------------
   GALLERY — CUSTOM LIGHTBOX
   ----------------------------------------------------------------- */
function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery__item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  if (!items.length || !lightbox || !lightboxImage) return;

  const images = Array.from(items).map((item) => ({
    full: item.getAttribute('data-full'),
    alt: item.querySelector('img')?.getAttribute('alt') || 'Gallery image',
  }));

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateImage();
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightbox.hidden = true; }, 450);
  }

  function updateImage() {
    lightboxImage.src = images[currentIndex].full;
    lightboxImage.alt = images[currentIndex].alt;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  nextBtn?.addEventListener('click', showNext);
  prevBtn?.addEventListener('click', showPrev);

  // Close on outside click (clicking the dark backdrop, not the image/arrows)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') showNext();
    else if (e.key === 'ArrowLeft') showPrev();
  });
}

/* -----------------------------------------------------------------
   CUSTOMER REVIEWS — TESTIMONIAL SLIDER (auto + manual)
   ----------------------------------------------------------------- */
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  const slider = document.getElementById('testimonialSlider');
  if (!track || !dotsWrap || !slider) return;

  const slides = track.children;
  const total = slides.length;
  let current = 0;
  let autoTimer = null;
  const AUTO_DELAY = 5500;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Go to review ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
    dotsWrap.appendChild(dot);
  }
  const dots = dotsWrap.querySelectorAll('.dot');

  function render() {
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(index) {
    current = (index + total) % total;
    render();
  }

  function next() { goTo(current + 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, AUTO_DELAY);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 50) goTo(current - 1);
    else if (delta < -50) goTo(current + 1);
    startAuto();
  }, { passive: true });

  render();
  startAuto();
}

/* -----------------------------------------------------------------
   RESERVATION FORM — VALIDATION + SIMULATED SUBMIT
   ----------------------------------------------------------------- */
function initReservationForm() {
  const form = document.getElementById('reservationForm');
  const successPanel = document.getElementById('formSuccess');
  if (!form) return;

  // ---- Contact details that receive reservation notifications ----
  const NOTIFY_EMAIL = 'ashs5359@gmail.com';
  const NOTIFY_WHATSAPP = '920500319'; // include country code, digits only

  const fields = {
    name: document.getElementById('resName'),
    phone: document.getElementById('resPhone'),
    date: document.getElementById('resDate'),
    time: document.getElementById('resTime'),
    guests: document.getElementById('resGuests'),
  };

  const errors = {
    name: document.getElementById('errName'),
    phone: document.getElementById('errPhone'),
    date: document.getElementById('errDate'),
    time: document.getElementById('errTime'),
    guests: document.getElementById('errGuests'),
  };

  // Set the date input's minimum to today so the native picker also
  // discourages past dates, in addition to our own JS validation.
  if (fields.date) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    fields.date.min = `${yyyy}-${mm}-${dd}`;
  }

  function setError(key, message) {
    if (errors[key]) errors[key].textContent = message;
    if (fields[key]) fields[key].classList.toggle('invalid', Boolean(message));
  }

  function clearAllErrors() {
    Object.keys(errors).forEach((key) => setError(key, ''));
  }

  function validatePhone(value) {
    // Accepts Indian-style numbers: optional +91, optional spaces/hyphens, 10 digits.
    const cleaned = value.replace(/[\s-]/g, '');
    const phoneRegex = /^(\+?91)?[6-9]\d{9}$/;
    return phoneRegex.test(cleaned);
  }

  function validateFutureDateTime(dateValue, timeValue) {
    if (!dateValue) return false;
    const now = new Date();
    const selected = new Date(dateValue + 'T' + (timeValue || '00:00'));
    // If a time was given, the full datetime must be in the future.
    // If no time yet, just check the date isn't before today.
    if (timeValue) {
      return selected.getTime() > now.getTime();
    }
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return selected.getTime() >= todayStart.getTime();
  }

  function validate() {
    clearAllErrors();
    let isValid = true;

    if (!fields.name.value.trim()) {
      setError('name', 'Please enter your name.');
      isValid = false;
    } else if (fields.name.value.trim().length < 2) {
      setError('name', 'Name looks too short.');
      isValid = false;
    }

    if (!fields.phone.value.trim()) {
      setError('phone', 'Please enter your phone number.');
      isValid = false;
    } else if (!validatePhone(fields.phone.value.trim())) {
      setError('phone', 'Enter a valid 10-digit phone number.');
      isValid = false;
    }

    if (!fields.date.value) {
      setError('date', 'Please choose a date.');
      isValid = false;
    } else if (!validateFutureDateTime(fields.date.value, fields.time.value)) {
      setError('date', 'Please choose a current or future date.');
      isValid = false;
    }

    if (!fields.time.value) {
      setError('time', 'Please choose a time.');
      isValid = false;
    } else if (fields.date.value && !validateFutureDateTime(fields.date.value, fields.time.value)) {
      setError('time', 'That time has already passed today.');
      isValid = false;
    }

    if (!fields.guests.value) {
      setError('guests', 'Please select the number of guests.');
      isValid = false;
    }

    return isValid;
  }

  // Live-clear individual field errors as the user fixes them.
  Object.entries(fields).forEach(([key, field]) => {
    field?.addEventListener('input', () => setError(key, ''));
    field?.addEventListener('change', () => setError(key, ''));
  });

  // Build a human-readable summary of the reservation for email/WhatsApp.
  function buildReservationSummary() {
    const guestsLabel = fields.guests.value === '7+' ? '7+ Guests' : `${fields.guests.value} Guest(s)`;
    const message = document.getElementById('resMessage')?.value.trim() || '—';

    return (
      `New Table Reservation - Amore Italian Cafe\n` +
      `--------------------------------------------\n` +
      `Name: ${fields.name.value.trim()}\n` +
      `Phone: ${fields.phone.value.trim()}\n` +
      `Date: ${fields.date.value}\n` +
      `Time: ${fields.time.value}\n` +
      `Guests: ${guestsLabel}\n` +
      `Special Requests: ${message}`
    );
  }

  // Opens a pre-filled email draft and a pre-filled WhatsApp chat so the
  // restaurant gets notified. Note: this is a static front-end with no
  // server, so the browser cannot send email/WhatsApp messages silently —
  // these links open the user's mail app / WhatsApp with everything
  // pre-typed; one tap on "Send" in each is all that's needed.
  function sendReservationNotifications() {
    const summary = buildReservationSummary();

    const subject = encodeURIComponent(
      `Table Reservation Request - ${fields.name.value.trim()} (${fields.date.value} ${fields.time.value})`
    );
    const body = encodeURIComponent(summary);
    const mailtoLink = `mailto:${NOTIFY_EMAIL}?subject=${subject}&body=${body}`;

    const waText = encodeURIComponent(summary);
    const whatsappLink = `https://wa.me/${NOTIFY_WHATSAPP}?text=${waText}`;

    // Open WhatsApp in a new tab (so the reservation tab stays put)...
    window.open(whatsappLink, '_blank');
    // ...and trigger the email client right after.
    window.location.href = mailtoLink;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) {
      const firstInvalid = form.querySelector('.invalid');
      firstInvalid?.focus();
      return;
    }

    const submitBtn = form.querySelector('.reserve__submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.btn-spinner');

    submitBtn.disabled = true;
    btnText.textContent = 'Confirming...';
    spinner.hidden = false;

    // Simulate network request (no backend required by spec).
    setTimeout(() => {
      sendReservationNotifications();

      successPanel.hidden = false;
      requestAnimationFrame(() => successPanel.classList.add('show'));

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        btnText.textContent = 'Confirm Reservation';
        spinner.hidden = true;
        successPanel.classList.remove('show');
        setTimeout(() => { successPanel.hidden = true; }, 450);
      }, 3200);
    }, 1100);
  });
}

/* -----------------------------------------------------------------
   NEWSLETTER FORM — EMAIL VALIDATION
   ----------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  const emailInput = document.getElementById('newsletterEmail');
  const errorEl = document.getElementById('errNewsletter');
  const successEl = document.getElementById('newsletterSuccess');

  function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  }

  emailInput?.addEventListener('input', () => {
    errorEl.textContent = '';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = emailInput.value.trim();

    if (!value) {
      errorEl.textContent = 'Please enter your email.';
      return;
    }
    if (!validateEmail(value)) {
      errorEl.textContent = 'Please enter a valid email address.';
      return;
    }

    errorEl.textContent = '';
    successEl.hidden = false;
    emailInput.value = '';

    setTimeout(() => { successEl.hidden = true; }, 4000);
  });
}

/* -----------------------------------------------------------------
   BACK TO TOP BUTTON
   ----------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggleVisibility = () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -----------------------------------------------------------------
   BUTTON RIPPLE EFFECT
   ----------------------------------------------------------------- */
function initButtonRipple() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      ripple.classList.add('ripple');
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

/* -----------------------------------------------------------------
   FLOATING DECORATIVE COFFEE BEANS
   ----------------------------------------------------------------- */
function initFloatingBeans() {
  const wrap = document.getElementById('floatingBeans');
  if (!wrap) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const BEAN_COUNT = 8;

  for (let i = 0; i < BEAN_COUNT; i++) {
    const bean = document.createElement('i');
    bean.className = 'fa-solid fa-mug-hot bean';
    bean.style.left = Math.random() * 100 + 'vw';
    bean.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
    bean.style.animationDuration = (18 + Math.random() * 18) + 's';
    bean.style.animationDelay = (Math.random() * 20) + 's';
    wrap.appendChild(bean);
  }
}

/* -----------------------------------------------------------------
   FOOTER — DYNAMIC COPYRIGHT YEAR
   ----------------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

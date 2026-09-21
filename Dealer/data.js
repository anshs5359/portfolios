/* ============================================================
   Kulwant & Co. — Data Layer
   Seeds localStorage on first run and exposes a tiny CRUD API
   used by the public pages AND the admin dashboard.
   ============================================================ */

(function (window) {
  "use strict";

  const KEYS = {
    PROPERTIES: "kc_properties",
    LEADS: "kc_leads",
    TESTIMONIALS: "kc_testimonials",
    AUTH: "kc_admin_session"
  };

  const SEED_PROPERTIES = [
    {
      id: "p1",
      title: "Royal Enclave Luxury Floor",
      type: "3 BHK Luxury Floor",
      category: "luxury-floor",
      location: "Sector-25, Rohini, Delhi",
      price: 18500000,
      priceLabel: "₹1.85 Cr",
      area: 1800,
      status: "Ready to Move",
      bedrooms: 3,
      bathrooms: 3,
      facing: "East",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "An exquisitely finished third-floor residence with private terrace, Italian marble flooring and a dedicated covered car park. Built for families who want a freehold address in the heart of Rohini.",
      featured: true
    },
    {
      id: "p2",
      title: "Sapphire Residency Flat",
      type: "2 BHK Flat",
      category: "flat",
      location: "Sector-24, Rohini, Delhi",
      price: 9800000,
      priceLabel: "₹98 Lakh",
      area: 1050,
      status: "Ready to Move",
      bedrooms: 2,
      bathrooms: 2,
      facing: "North",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "A bright, well-ventilated 2 BHK in a gated society with lift, power backup and 24x7 security — ideal for a young family's first home.",
      featured: true
    },
    {
      id: "p3",
      title: "Greenline Residential Plot",
      type: "Residential Plot",
      category: "plot",
      location: "Sector-26, Rohini, Delhi",
      price: 14200000,
      priceLabel: "₹1.42 Cr",
      area: 2250,
      status: "Freehold",
      bedrooms: null,
      bathrooms: null,
      facing: "South",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556020685-ae41abfc9365?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Corner plot on a 30-ft road with clear title and MCD-sanctioned layout — a strong appreciation play in a fast-developing Rohini pocket.",
      featured: true
    },
    {
      id: "p4",
      title: "Crown Arcade Commercial Shop",
      type: "Commercial Shop",
      category: "shop",
      location: "Sector-25 Market, Rohini, Delhi",
      price: 6500000,
      priceLabel: "₹65 Lakh",
      area: 380,
      status: "Ready to Move",
      bedrooms: null,
      bathrooms: 1,
      facing: "Main Road",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Ground-floor shop with frontage on the main market road — high footfall location, ideal for retail or a clinic/office.",
      featured: true
    },
    {
      id: "p5",
      title: "Maple Court 1 BHK Floor",
      type: "1 BHK Floor",
      category: "1bhk",
      location: "Sector-27, Rohini, Delhi",
      price: 4800000,
      priceLabel: "₹48 Lakh",
      area: 650,
      status: "Ready to Move",
      bedrooms: 1,
      bathrooms: 1,
      facing: "East",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Compact, efficiently planned 1 BHK floor — a smart entry-level buy or a steady rental-yield asset.",
      featured: false
    },
    {
      id: "p6",
      title: "Orchid Heights 2 BHK Floor",
      type: "2 BHK Floor",
      category: "2bhk",
      location: "Sector-24, Rohini, Delhi",
      price: 8200000,
      priceLabel: "₹82 Lakh",
      area: 950,
      status: "Under Construction",
      bedrooms: 2,
      bathrooms: 2,
      facing: "West",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Stilt-plus-three independent floor with a private terrace, currently under finishing — possession in 6 months.",
      featured: false
    },
    {
      id: "p7",
      title: "Imperial Heights Luxury Apartment",
      type: "3 BHK Luxury Floor",
      category: "luxury-floor",
      location: "Sector-26, Rohini, Delhi",
      price: 21000000,
      priceLabel: "₹2.10 Cr",
      area: 2000,
      status: "Ready to Move",
      bedrooms: 3,
      bathrooms: 4,
      facing: "North-East",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Top-floor residence with double-height living room, modular kitchen and a landscaped terrace garden.",
      featured: false
    },
    {
      id: "p8",
      title: "Silverline Business Shop",
      type: "Commercial Shop",
      category: "shop",
      location: "Sector-27 Market, Rohini, Delhi",
      price: 5200000,
      priceLabel: "₹52 Lakh",
      area: 300,
      status: "Ready to Move",
      bedrooms: null,
      bathrooms: 1,
      facing: "Main Road",
      image: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Compact shop near the main bus stand — steady rental demand from F&B and service businesses.",
      featured: false
    }
  ];

  const SEED_TESTIMONIALS = [
    {
      id: "t1",
      name: "Rajesh Mehra",
      role: "Bought a 3 BHK Floor, Sector-25",
      rating: 5,
      text: "Kulwant & Co. handled every paper from the title check to the registry. Forty years of experience really shows in how calmly they handle problems.",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "t2",
      name: "Simran Kaur",
      role: "Sold a Plot, Sector-26",
      rating: 5,
      text: "I got three genuine buyers within two weeks. No time-wasters, no broker drama — just a fair price and a clean closing.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "t3",
      name: "Arvind & Pooja Sharma",
      role: "Rented a 2 BHK, Sector-24",
      rating: 5,
      text: "We were new to Delhi. The team shortlisted only homes that matched our budget and commute, and the agreement was sorted the same week.",
      avatar: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "t4",
      name: "Deepak Chawla",
      role: "Investor, Commercial Shop",
      rating: 4,
      text: "Good investment guidance — they were upfront about rental yield expectations instead of just pushing for a sale.",
      avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=200&q=80"
    }
  ];

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function seed() {
    if (!localStorage.getItem(KEYS.PROPERTIES)) write(KEYS.PROPERTIES, SEED_PROPERTIES);
    if (!localStorage.getItem(KEYS.TESTIMONIALS)) write(KEYS.TESTIMONIALS, SEED_TESTIMONIALS);
    if (!localStorage.getItem(KEYS.LEADS)) write(KEYS.LEADS, []);
  }
  seed();

  const KCData = {
    KEYS,
    getProperties: () => read(KEYS.PROPERTIES, []),
    saveProperties: (list) => write(KEYS.PROPERTIES, list),
    addProperty: (prop) => {
      const list = read(KEYS.PROPERTIES, []);
      prop.id = "p" + Date.now();
      list.unshift(prop);
      write(KEYS.PROPERTIES, list);
      return prop;
    },
    updateProperty: (id, updates) => {
      const list = read(KEYS.PROPERTIES, []);
      const idx = list.findIndex((p) => p.id === id);
      if (idx > -1) {
        list[idx] = Object.assign({}, list[idx], updates);
        write(KEYS.PROPERTIES, list);
      }
      return idx > -1 ? list[idx] : null;
    },
    deleteProperty: (id) => {
      const list = read(KEYS.PROPERTIES, []).filter((p) => p.id !== id);
      write(KEYS.PROPERTIES, list);
    },
    getPropertyById: (id) => read(KEYS.PROPERTIES, []).find((p) => p.id === id),

    getTestimonials: () => read(KEYS.TESTIMONIALS, []),
    saveTestimonials: (list) => write(KEYS.TESTIMONIALS, list),
    addTestimonial: (t) => {
      const list = read(KEYS.TESTIMONIALS, []);
      t.id = "t" + Date.now();
      list.unshift(t);
      write(KEYS.TESTIMONIALS, list);
      return t;
    },
    deleteTestimonial: (id) => {
      const list = read(KEYS.TESTIMONIALS, []).filter((t) => t.id !== id);
      write(KEYS.TESTIMONIALS, list);
    },

    getLeads: () => read(KEYS.LEADS, []),
    addLead: (lead) => {
      const list = read(KEYS.LEADS, []);
      lead.id = "l" + Date.now();
      lead.date = new Date().toISOString();
      lead.status = "New";
      list.unshift(lead);
      write(KEYS.LEADS, list);
      return lead;
    },
    updateLeadStatus: (id, status) => {
      const list = read(KEYS.LEADS, []);
      const idx = list.findIndex((l) => l.id === id);
      if (idx > -1) {
        list[idx].status = status;
        write(KEYS.LEADS, list);
      }
    },
    deleteLead: (id) => {
      const list = read(KEYS.LEADS, []).filter((l) => l.id !== id);
      write(KEYS.LEADS, list);
    },

    resetDemoData: () => {
      write(KEYS.PROPERTIES, SEED_PROPERTIES);
      write(KEYS.TESTIMONIALS, SEED_TESTIMONIALS);
      write(KEYS.LEADS, []);
    }
  };

  window.KCData = KCData;
})(window);

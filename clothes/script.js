/* =====================================================
   1. SHOP CONFIG - edit these values
   ===================================================== */
const SHOP = {
  name: "My Shop Name",
  tagline: "My Shop Tagline",
  phone: "+919205002319",
  whatsapp: "919205002319",          // country code + number, no + or spaces
  address: "Shop address here",
  mapsLink: "https://maps.google.com/",
  mapsEmbed: "",                     // paste Google Maps "Embed a map" src URL here
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  hours: "Mon-Sun: 10:00 AM - 9:00 PM",
  years: "",                         // e.g. "Serving customers since 20XX" (leave "" to hide)
  about: "Write a short description of your store here.",
  heroText: "Discover quality clothing for the whole family, chosen with care and shown in person at our store."
};

/* =====================================================
   2. SHOP PHOTOS - replace paths with your own photos
   ===================================================== */
const SHOP_IMAGES = {
  mainGate: "https://lh3.googleusercontent.com/grass-cs/ACvplmNYAwZiCUiHOb7wMj-It_aR1HEt0OeeXIeOpkLUSW1CaC50kogw9bZZ46HG1q_o1E-o1nOJolXp6bMV-y71oItgOIKKsX6V5kMngEvdn57mSMKZzxJwkywhXCQUc6Zv3kklq7yYAjxWWFHc=s1360-w1360-h1020-rw",
  interior1: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmZ9Q7_0SPiRkJrh96wMXqh3wIF1QuL31G4vfSJDTaW-E1BuMPAB0kbtSi-qEfD9BpxlCAF9mJesoUppozhksOk4IX4wTPtLTZyZcEvC6aqWAg77ea5x9t0njuskGiY-AD2tCxo=s1360-w1360-h1020-rw",
  interior2: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWloksosTRRBhCkbKFrDg6MZdu8AZRuEoIiZTCDWBv21TUAC7IVKrQf6uNs7t5pNVUGMuFeJf1SUmkXidkTmQuzgH2qBpJCXQv4UqyedZtD-nju8RB34jvY3rlnDy-HJYeMhO7lr4Dy7eQUo=s1360-w1360-h1020-rw",
  display: "https://lh3.googleusercontent.com/grass-cs/ACvplmMN2KA1yUpDOfbScmQ3jhAt4LCPhrWLTgzyI-xQfnRb78XkYVrtspAHnLPHtChwDZf1rayV5NY2G8gLFwNO3nnDW1jLT5nMr2JjHwA1zp1zlUN7pT6sNvhQspIfOsgwSKyY6x_hhGo4xHXi=s1360-w1360-h1020-rw",
  trial: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWk3my479eLF7KFkE0h1VzuzVM00ycrm8w7lVLWDZk-L9kzVTcgyWLZVnJ8xd-lFrSPtMWn4xunk8OSRmH9j1NK2OfuIwDRlaBj_HNT1wpyKkHF0jVX_82vvavm0Z-SvrjJlTgkI=s1360-w1360-h1020-rw",
  ansh:"https://lh3.googleusercontent.com/grass-cs/ACvplmP4JMCrKZlFLumpj0xdHygUZKKmVtrFC57BpUSErlYqFb7K3fS7nyK5149I79hIQ18Rh3taRrOJHtUHEPmkDzOZi2yD4U7MqGkAvXX6qd8LkmURj66V0YbDVlnTWuotX3xrXu3IBwoUcbmC=s1360-w1360-h1020-rw",
  counter: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmts3swOftPdMkN8Us_xuMxi8qspUpoD84cWd3PjL8Oxu4Gr2RSbxFkePOfEYvI1AFx3FrB-O87PDpZTIGtRy0DJf5cj-tJUq69NIMzSSEmXjrKoOdeMRuH6DGEPpAyFtjStWuF=s1360-w1360-h1020-rw"
};
// Gallery: add/remove rows freely
const GALLERY = [
  { img: SHOP_IMAGES.ansh, label: "Main Gate" },
  { img: SHOP_IMAGES.interior1, label: "Inside Store" },
  { img: SHOP_IMAGES.display, label: "Clothing Display" },
  { img: SHOP_IMAGES.interior2, label: "Shopping Area" },
  { img: SHOP_IMAGES.trial, label: "Trial Room" },
  { img: SHOP_IMAGES.counter, label: "Counter" }
];

/* =====================================================
   3. CATEGORIES - only the ones listed here are shown.
   Delete a line to hide it. "image" is optional.
   ===================================================== */
const CATEGORIES = [
  { name: "Men's Wear", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvpSl1JRMym9hxb1WTkhh5Nwrm66_iDpJX4uWaRk5RNY57u_04aKchlNuu&s=10", items: ["Shirts", "T-Shirts", "Jeans", "Jackets"] },
  { name: "Women's Wear", image: "https://www.lavanyathelabel.com/cdn/shop/files/Lavanya72004_400x.jpg?v=1775474973", items: ["Kurtis", "Sarees", "Suits", "Tops"] },
  { name: "Kids Wear", image: "https://www.mumkins.in/cdn/shop/files/tropical-palm-kurta-pajama-set-for-boys-bs10mum92.webp?v=1785144208&width=1080", items: ["Boys", "Girls", "Party Wear"] },
  { name: "Ethnic Wear", image: "https://cdn.shopify.com/s/files/1/1079/3477/7630/files/g3blog-types-of-ethnic-wear-for-men-9f038723b753.jpg", items: ["Kurta", "Lehenga", "Anarkali"] },
  { name: "Western Wear", image: "https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/cotton-one-side-pocket-western-wear-dress-263.jpg", items: ["Dresses", "Co-ord Sets"] },
  { name: "Accessories", image: "https://icmedianew.gumlet.io/pub/media/catalog/product/cache/7c90eecf75182456ca0a208cc3917af8/i/n/india-circus-by-krsnaa-mehta-majestic-myrtle-square-scarf-53102502sd00473-6_1.jpg", items: ["Belts", "Bags", "Scarves"] }
];

/* =====================================================
   4. PRODUCT_DATA - add a product by adding ONE object.
   badge: "NEW" | "BESTSELLER" | "SALE" | "" ; price 0 = "Ask for price"
   SAMPLE ITEMS - replace with your own.
   ===================================================== */
const PRODUCT_DATA = [
  { id: 1, name: "Sample Cotton Shirt", category: "Men's Wear", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ87AW8TqIYK-TbCq2RU-hoSPdBAKUAjTfBmqbuK-A0w7-Dq9oYHgivf4s&s=10", description: "Sample description. Replace with your product details.", price: 0, mrp: 0, sizes: ["S", "M", "L", "XL"], colors: ["White", "Blue"], badge: "NEW" },
  { id: 2, name: "Sample Kurti", category: "Women's Wear", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV2fDbY2nnXlCEYdLfZCEQ-wGPJQB0O20wNx-cSc8KklCSp4F_WhBtkEw&s=10", description: "Sample description. Replace with your product details.", price: 0, mrp: 0, sizes: ["S", "M", "L"], colors: ["Rose", "Green"], badge: "BESTSELLER" },
  { id: 3, name: "Sample Kids Dress", category: "Kids Wear", image: "https://www.mumkins.in/cdn/shop/files/tropical-palm-kurta-pajama-set-for-boys-bs10mum92.webp?v=1785144208&width=1080", description: "Sample description. Replace with your product details.", price: 0, mrp: 0, sizes: ["XS", "S", "M"], colors: ["Pink"], badge: "SALE" },
  { id: 4, name: "Sample Sherwani", category: "Ethnic Wear", image: "https://kundansbridalcouture.com/cdn/shop/files/KoreanFabricSherwaniforGroom.png?v=1776286207&width=1000", description: "Sample description. Replace with your product details.", price: 0, mrp: 0, sizes: ["M", "L", "XL", "XXL"], colors: ["Cream"], badge: "NEW" },
  { id: 5, name: "Sample Co-ord Set", category: "Western Wear", image: "https://img.theloom.in/live/media/catalog/product/cache/101a419f04e4161b4f9f2458eaa9a195/1/0/10-10-23-3214.jpg", description: "Sample description. Replace with your product details.", price: 0, mrp: 0, sizes: ["S", "M", "L"], colors: ["Beige"], badge: "" },
  { id: 6, name: "Sample Belt", category: "Accessories", image: "https://imagescdn.peterengland.com/img/app/product/3/39691911-14204113.jpg?auto=format&w=487", description: "Sample description. Replace with your product details.", price: 0, mrp: 0, sizes: ["Free Size"], colors: ["Brown"], badge: "" }
];

/* 5. ABOUT / WHY / REVIEWS / SIZE GUIDE - all editable text */
const ABOUT_CARDS = [["Quality", "Carefully chosen fabrics."], ["Latest Trends", "Fresh styles each season."], ["Great Selection", "Many categories and sizes."], ["Personal Service", "Friendly help in store."]];
const WHY = ["Quality Collection", "Latest Fashion", "Multiple Categories", "Multiple Sizes", "Helpful Staff", "Easy Shopping", "WhatsApp Enquiry", "Visit Our Store"];
const REVIEWS = [ // SAMPLE ONLY - replace with real customer reviews
  { name: "Sample Customer", rating: 5, text: "Sample review. Replace with a real review.", photo: "" },
  { name: "Sample Customer", rating: 4, text: "Sample review. Replace with a real review.", photo: "" },
  { name: "Sample Customer", rating: 5, text: "Sample review. Replace with a real review.", photo: "" }
];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const SIZE_GUIDE = { // measurements: enter your own; "-" = not filled
  Men: { cols: ["Chest", "Waist"], rows: SIZES.map(s => [s, "-", "-"]) },
  Women: { cols: ["Bust", "Waist"], rows: SIZES.map(s => [s, "-", "-"]) },
  Kids: { cols: ["Age", "Chest"], rows: SIZES.map(s => [s, "-", "-"]) }
};

/* =====================================================
   CODE BELOW - beginners can leave this alone
   ===================================================== */
const $ = id => document.getElementById(id);
const wa = msg => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`;
const inr = n => "₹" + n.toLocaleString("en-IN");
const img = (src, alt, lazy = true) => `<img src="${src}" alt="${alt}" ${lazy ? 'loading="lazy"' : ""} onerror="this.style.opacity=0">`;
const disc = p => p.mrp > p.price && p.price > 0 ? Math.round((1 - p.price / p.mrp) * 100) : 0;
const priceHTML = p => p.price ? `<span class="price"><b>${inr(p.price)}</b>${p.mrp > p.price ? `<s>${inr(p.mrp)}</s><em>${disc(p)}% off</em>` : ""}</span>` : `<span class="price"><b>Ask for price</b></span>`;
const badgeLabel = b => ({ NEW: "New Arrival", BESTSELLER: "Bestseller", SALE: "Sale" }[b] || "");
const usedCats = CATEGORIES.map(c => c.name);
const products = PRODUCT_DATA.filter(p => usedCats.includes(p.category));

function fillStatic() {
  document.title = `${SHOP.name} | ${SHOP.tagline}`;
  document.querySelectorAll("[data-shop=name]").forEach(e => e.textContent = SHOP.name);
  $("welcome").textContent = "WELCOME TO " + SHOP.name.toUpperCase();
  $("heroDesc").textContent = SHOP.heroText;
  $("heroImg").outerHTML = img(SHOP_IMAGES.mainGate, "Front of " + SHOP.name, false).replace("<img", '<img id="heroImg"');
  $("aboutImg").outerHTML = img(SHOP_IMAGES.interior1, "Inside " + SHOP.name).replace("<img", '<img id="aboutImg"');
  $("aboutText").textContent = SHOP.about;
  $("years").textContent = SHOP.years; $("years").hidden = !SHOP.years;
  $("aboutCards").innerHTML = ABOUT_CARDS.map(c => `<div><b>${c[0]}</b><small>${c[1]}</small></div>`).join("");
  $("why").innerHTML = WHY.map(w => `<div><b class="stars">✓</b><b>${w}</b></div>`).join("");
  $("revs").innerHTML = REVIEWS.map(r => `<div>${r.photo ? `<img src="${r.photo}" alt="" style="width:44px;height:44px;border-radius:50%">` : ""}<span class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span><p>${r.text}</p><b>${r.name}</b></div>`).join("");
  $("cAddr").textContent = SHOP.address; $("cPhone").textContent = "Phone: " + SHOP.phone; $("cHours").textContent = "Hours: " + SHOP.hours;
  const tel = "tel:" + SHOP.phone, chat = wa(`Hello ${SHOP.name}, I would like to know more.`);
  ["callBtn", "bCall"].forEach(i => $(i).href = tel);
  ["waBtn", "bWa", "waFloat", "fWa"].forEach(i => $(i).href = chat);
  ["dirBtn", "fMap"].forEach(i => $(i).href = SHOP.mapsLink);
  $("fIg").href = SHOP.instagram; $("fFb").href = SHOP.facebook;
  if (SHOP.mapsEmbed) $("map").src = SHOP.mapsEmbed; else $("map").srcdoc = "<p style='font-family:sans-serif;padding:2rem'>Paste your Google Maps embed link in SHOP.mapsEmbed</p>";
  $("fDesc").textContent = SHOP.tagline;
  $("fCats").innerHTML = usedCats.map(c => `<a href="#collection" data-cat="${c}">${c}</a>`).join("");
  $("copy").textContent = `© 2026 ${SHOP.name}. All Rights Reserved.`;
  $("ld").textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "ClothingStore", name: SHOP.name, telephone: SHOP.phone, address: SHOP.address, openingHours: SHOP.hours, image: SHOP_IMAGES.mainGate, url: "https://example.com/" });
  $("strip").innerHTML = usedCats.map(c => `<a href="#collection" data-cat="${c}">${c}</a>`).join("");
  $("catCards").innerHTML = CATEGORIES.map(c => `<a class="catcard" href="#collection" data-cat="${c.name}">${img(c.image, c.name)}<span>${c.name}<small>${c.items.join(", ")}</small></span></a>`).join("");
  $("gallery").innerHTML = GALLERY.map(g => `<div data-src="${g.img}">${img(g.img, g.label + " - " + SHOP.name)}</div>`).join("");
  const feat = products.slice(0, 2);
  $("editImgs").innerHTML = feat.map(p => `<div>${img(p.image, p.name)}</div>`).join("");
}

function card(p) {
  return `<article class="pcard" data-id="${p.id}"><div class="card-img">${img(p.image, p.name)}${p.badge ? `<span class="tag">${badgeLabel(p.badge)}</span>` : ""}</div>
  <div class="pinfo"><small>${p.category}</small><h3>${p.name}</h3>${priceHTML(p)}</div></article>`;
}

let tag = "";
function render() {
  const q = $("q").value.toLowerCase(), cat = $("fCat").value, size = $("fSize").value, pr = $("fPrice").value;
  const [lo, hi] = pr ? pr.split("-").map(Number) : [0, Infinity];
  const list = products.filter(p => (!q || (p.name + p.description + p.category).toLowerCase().includes(q)) && (!cat || p.category === cat) && (!size || p.sizes.includes(size)) &&
    (!pr || p.price === 0 || (p.price >= lo && p.price <= hi)) && (!tag || p.badge === tag));
  $("grid").innerHTML = list.map(card).join("");
  $("empty").hidden = list.length > 0;
}

function initFilters() {
  $("fCat").innerHTML = `<option value="">All categories</option>` + usedCats.map(c => `<option>${c}</option>`).join("");
  const sizes = [...new Set(products.flatMap(p => p.sizes))];
  $("fSize").innerHTML = `<option value="">Any size</option>` + sizes.map(s => `<option>${s}</option>`).join("");
  const chips = [["", "All"], ["NEW", "New Arrivals"], ["SALE", "Sale"], ["BESTSELLER", "Bestsellers"]];
  $("chips").innerHTML = chips.map(c => `<button data-t="${c[0]}" class="${c[0] === "" ? "on" : ""}">${c[1]}</button>`).join("");
  $("chips").onclick = e => { const b = e.target.closest("button"); if (!b) return; tag = b.dataset.t; [...$("chips").children].forEach(x => x.classList.toggle("on", x === b)); render(); };
  ["q", "fCat", "fPrice", "fSize"].forEach(i => $(i).addEventListener("input", render));
  $("newRow").innerHTML = products.filter(p => p.badge === "NEW").map(p => `<div class="pcard" data-id="${p.id}"><div class="card-img">${img(p.image, p.name)}<span class="tag">New</span></div><div class="pinfo"><h3>${p.name}</h3>${priceHTML(p)}<br><a class="btn small" style="margin-top:.6rem">Quick View</a></div></div>`).join("");
}

function openModal(html) { $("modalBox").innerHTML = html + `<div class="row"><button class="btn ghost" id="closeM">Close</button></div>`; $("modal").classList.add("open"); $("closeM").onclick = closeAll; }
function closeAll() { document.querySelectorAll(".modal").forEach(m => m.classList.remove("open")); }

function showProduct(id) {
  const p = products.find(x => x.id == id); if (!p) return;
  const msg = `Hello, I am interested in ${p.name}. Please share availability, sizes and price.`;
  openModal(`<div class="pm"><div class="card-img">${img(p.image, p.name, false)}</div><div><small>${p.category}</small><h2>${p.name}</h2><p>${p.description}</p><p>${priceHTML(p)}</p>
  <p><b>Sizes</b><br>${p.sizes.map(s => `<span class="pill">${s}</span>`).join("")}</p><p><b>Colors</b><br>${p.colors.map(s => `<span class="pill">${s}</span>`).join("")}</p>
  <p class="muted">Availability: confirm on WhatsApp</p><div class="row"><a class="btn" target="_blank" rel="noopener" href="${wa(msg)}">Ask on WhatsApp</a><a class="btn ghost" target="_blank" rel="noopener" href="${wa(`Hello, please share available sizes for ${p.name}.`)}">Ask About Size</a></div></div></div>`);
}

function showSizeGuide() {
  openModal("<h2>Size Guide</h2>" + Object.entries(SIZE_GUIDE).map(([k, g]) => `<h3>${k}</h3><table><tr><th>Size</th>${g.cols.map(c => `<th>${c}</th>`).join("")}</tr>${g.rows.map(r => `<tr>${r.map(c => `<td contenteditable="true">${c}</td>`).join("")}</tr>`).join("")}</table>`).join(""));
}

document.addEventListener("click", e => {
  const pc = e.target.closest(".pcard"); if (pc) return showProduct(pc.dataset.id);
  const cl = e.target.closest("[data-cat]"); if (cl) { $("fCat").value = cl.dataset.cat; render(); }
  const g = e.target.closest(".gallery div"); if (g) { $("lbImg").src = g.dataset.src; $("lightbox").classList.add("open"); }
  if (e.target === $("modal") || e.target === $("lightbox") || e.target === $("lbImg")) closeAll();
  if (e.target.closest("#menu a")) $("menu").classList.remove("open");
});
document.addEventListener("keydown", e => e.key === "Escape" && closeAll());
$("sizeBtn").onclick = e => { e.preventDefault(); showSizeGuide(); };
$("burger").onclick = () => $("menu").classList.toggle("open");
window.addEventListener("scroll", () => $("nav").classList.toggle("solid", scrollY > 30), { passive: true });

fillStatic(); initFilters(); render();
const io = new IntersectionObserver(es => es.forEach(x => x.isIntersecting && x.target.classList.add("in")), { threshold: .1 });
document.querySelectorAll(".sec h2, .gallery, .edit").forEach(el => { el.classList.add("reveal"); io.observe(el); });

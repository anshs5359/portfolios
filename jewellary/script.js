'use strict';
/* ---------- EDITABLE DATA ---------- */
const U = (id, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${w}&q=70`;
const IMG = {
  a: 'photo-1515562141207-7a88fb7ce338', b: 'photo-1605100804763-247f67b3557e', c: 'photo-1599643478518-a784e5dc4c8f',
  d: 'photo-1535632066927-ab7c9ab60908', e: 'photo-1611591437281-460bfbe1220a', f: 'photo-1573408301185-9146fe634ad0',
  g: 'photo-1602173574767-37ac01994b2a', h: 'photo-1617038220319-276d3cfab638'
};
const DELIVERY = { freeAbove: 25000, fee: 499 }; // delivery rules
const P = (id, name, category, price, originalPrice, rating, img, metal, purity, weight, size, tags) => ({
  id, name, category, price, originalPrice, rating, image: U(IMG[img]), metal, purity, weight, size, tags,
  description: `${name} is hand-finished by our artisans in ${metal}, certified and hallmarked for lasting brilliance.`
});
const products = [
  P(1, 'Royal Solitaire Ring', 'rings', 48999, 65000, 4.8, 'b', '18K Gold', '18K', '4.8g', '12 (adjustable)', 'diamond gold'),
  P(2, 'Imperial Diamond Ring', 'rings', 124999, 152000, 4.9, 'g', '18K White Gold', '18K', '5.6g', '12 (adjustable)', 'diamond'),
  P(3, 'Rose Gold Halo Ring', 'rings', 36500, 44000, 4.6, 'h', '14K Rose Gold', '14K', '3.4g', '12 (adjustable)', 'diamond rose'),
  P(4, 'Celestial Diamond Necklace', 'necklaces', 72500, 89000, 4.8, 'a', '18K Gold', '18K', '9.2g', '18 inch', 'diamond gold'),
  P(5, 'Heritage Bridal Necklace', 'necklaces', 245000, 289000, 4.9, 'e', '22K Gold', '22K', '46g', '20 inch', 'gold bridal'),
  P(6, 'Lotus Pendant Chain', 'necklaces', 41999, 49500, 4.5, 'c', '22K Gold', '22K', '7.1g', '18 inch', 'gold'),
  P(7, 'Rose Petal Earrings', 'earrings', 28999, 34000, 4.7, 'd', '14K Rose Gold', '14K', '3.2g', 'Standard', 'gold rose'),
  P(8, 'Diamond Jhumka Earrings', 'earrings', 84999, 99000, 4.8, 'f', '18K Gold', '18K', '8.4g', 'Standard', 'diamond bridal gold'),
  P(9, 'Pearl Drop Studs', 'earrings', 19999, 24000, 4.4, 'd', '18K Gold', '18K', '2.6g', 'Standard', 'gold pearl'),
  P(10, 'Regal Gold Bangles', 'bracelets', 124999, 141000, 4.9, 'f', '22K Gold', '22K', '38g', '2.6 / 2.8', 'gold bridal'),
  P(11, 'Tennis Diamond Bracelet', 'bracelets', 98500, 119000, 4.7, 'h', '18K White Gold', '18K', '10.5g', '7 inch', 'diamond'),
  P(12, 'Kundan Cuff Kada', 'bracelets', 56999, 67000, 4.6, 'e', '22K Gold', '22K', '22g', 'Adjustable', 'gold bridal')
];
const cats = [
  ['Gold Jewellery', 'gold', 'e'], ['Diamond Jewellery', 'diamond', 'a'], ['Bridal Collection', 'bridal', 'c'],
  ['Earrings', 'earrings', 'd'], ['Necklaces', 'necklaces', 'h'], ['Rings', 'rings', 'b']
];
const social = ['a', 'b', 'c', 'd', 'e', 'f'];

/* ---------- HELPERS ---------- */
const $ = s => document.querySelector(s);
const inr = n => '₹' + n.toLocaleString('en-IN');
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
let cart = load('mj_cart', {}), wish = load('mj_wish', []), recent = load('mj_recent', []);
const byId = id => products.find(p => p.id === +id);
const off = p => Math.round((1 - p.price / p.originalPrice) * 100);
const stars = r => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
const img = (src, alt, w = 600) => `<img src="${src}" alt="${alt}" width="${w}" height="${w}" loading="lazy">`;
let toastT;
const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2200); };

/* ---------- RENDER ---------- */
const card = p => `<article class="card rv"><div class="pimg">${img(p.image, p.name)}<span class="off">${off(p)}% off</span>
<button class="heart ${wish.includes(p.id) ? 'on' : ''}" data-action="wish" data-id="${p.id}" aria-label="Add ${p.name} to wishlist" aria-pressed="${wish.includes(p.id)}">♥</button></div>
<div class="pinfo"><small>${p.category}</small><h3>${p.name}</h3><span class="stars" aria-label="Rated ${p.rating} out of 5">${stars(p.rating)} ${p.rating}</span>
<span class="price"><b>${inr(p.price)}</b><s>${inr(p.originalPrice)}</s></span>
<div class="pbtn"><button class="btn sm" data-action="add" data-id="${p.id}">Add to Bag</button><button class="btn sm ghost" data-action="quick" data-id="${p.id}">Quick View</button></div></div></article>`;

let filter = 'all';
function renderGrid() {
  const list = products.filter(p => filter === 'all' || p.category === filter);
  $('#grid').innerHTML = list.map(card).join('');
  observe();
}
const match = (p, q) => `${p.name} ${p.category} ${p.metal} ${p.tags}`.toLowerCase().includes(q.toLowerCase());

function renderCart() {
  const ids = Object.keys(cart).filter(id => byId(id));
  let sub = 0, disc = 0, count = 0;
  $('#items').innerHTML = ids.length ? ids.map(id => {
    const p = byId(id), q = cart[id]; sub += p.price * q; disc += (p.originalPrice - p.price) * q; count += q;
    return `<div class="row">${img(p.image, p.name, 70)}<div><h4>${p.name}</h4><b>${inr(p.price)}</b><br>
<span class="qty"><button data-action="dec" data-id="${id}" aria-label="Decrease quantity">−</button><span>${q}</span><button data-action="inc" data-id="${id}" aria-label="Increase quantity">+</button></span>
<button class="link" data-action="remove" data-id="${id}">Remove</button></div></div>`;
  }).join('') : '<p style="padding:2rem 0;text-align:center">Your bag is empty. Browse the Signature Collection to add a piece.</p>';
  const ship = sub && sub < DELIVERY.freeAbove ? DELIVERY.fee : 0, total = sub + ship;
  $('#sum').innerHTML = `<div><span>Subtotal</span><span>${inr(sub)}</span></div><div><span>You save</span><span>− ${inr(disc)}</span></div>
<div><span>Delivery</span><span>${sub ? (ship ? inr(ship) : 'Free') : '—'}</span></div><div class="tot"><span>Total</span><span>${inr(total)}</span></div>
<button class="btn" data-action="checkout" ${sub ? '' : 'disabled'}>Proceed to Checkout</button>`;
  $('#cartCount').textContent = count; $('#wishCount').textContent = wish.length;
  save('mj_cart', cart); save('mj_wish', wish);
  return total;
}

/* ---------- PANELS ---------- */
const panels = ['#searchBox', '#cartBox', '#modal', '#nav'];
function open(sel, scrim = true) {
  closeAll(); const el = $(sel); el.classList.add('on'); el.setAttribute('aria-hidden', 'false');
  if (scrim) $('#scrim').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeAll() {
  panels.forEach(s => { const e = $(s); e.classList.remove('on'); e.setAttribute('aria-hidden', 'true'); });
  $('#scrim').classList.remove('on'); document.body.style.overflow = '';
  $('.burger').setAttribute('aria-expanded', 'false');
}
function quickView(id) {
  const p = byId(id); recent = [p.id, ...recent.filter(x => x !== p.id)].slice(0, 6); save('mj_recent', recent);
  $('#modalBody').innerHTML = `<div class="qv">${img(p.image, p.name, 600).replace('loading="lazy"', '')}<div><h3 id="qvT">${p.name}</h3>
<span class="stars">${stars(p.rating)} ${p.rating}</span><p class="price"><b>${inr(p.price)}</b><s>${inr(p.originalPrice)}</s> <span style="color:var(--burg)">${off(p)}% off</span></p><p>${p.description}</p>
<dl><dt>Metal</dt><dd>${p.metal}</dd><dt>Purity</dt><dd>${p.purity} BIS Hallmarked</dd><dt>Weight</dt><dd>${p.weight}</dd><dt>Size</dt><dd>${p.size}</dd><dt>Availability</dt><dd>In stock</dd></dl>
<label>Quantity <input id="qvQty" type="number" min="1" max="5" value="1" style="width:64px;padding:.3rem;border:1px solid var(--gold)"></label><br><br>
<button class="btn" data-action="add" data-id="${p.id}" data-qv="1">Add to Bag</button></div></div>`;
  open('#modal');
}
function checkout() {
  const total = renderCart();
  $('#modalBody').innerHTML = `<h3>Checkout</h3><p>Order total: <b>${inr(total)}</b></p>
<form class="co" id="coForm" novalidate>
<div><label for="n">Full Name</label><input id="n" required></div><div><label for="m">Mobile Number</label><input id="m" inputmode="numeric" maxlength="10" required></div>
<div class="full"><label for="e">Email</label><input id="e" type="email" required></div><div class="full"><label for="a">Delivery Address</label><input id="a" required></div>
<div><label for="c">City</label><input id="c" required></div><div><label for="s">State</label><input id="s" required></div>
<div><label for="pc">Pincode</label><input id="pc" inputmode="numeric" maxlength="6" required></div>
<div><label for="pay">Payment Method</label><select id="pay"><option>UPI</option><option>Credit / Debit Card</option><option>Cash on Delivery</option></select></div>
<p class="err full" id="coErr" role="alert"></p><button class="btn full">Place Order</button></form>`;
  open('#modal');
}
function placeOrder(e) {
  e.preventDefault();
  const v = id => $('#' + id).value.trim(), err = $('#coErr');
  let msg = '';
  if (v('n').length < 2) msg = 'Enter your full name.';
  else if (!/^[6-9]\d{9}$/.test(v('m'))) msg = 'Enter a valid 10-digit Indian mobile number.';
  else if (!/^\S+@\S+\.\S+$/.test(v('e'))) msg = 'Enter a valid email address.';
  else if (!v('a') || !v('c') || !v('s')) msg = 'Complete your address, city and state.';
  else if (!/^\d{6}$/.test(v('pc'))) msg = 'Enter a 6-digit pincode.';
  if (msg) { err.textContent = msg; return; }
  const no = 'MJ' + Date.now().toString().slice(-8);
  cart = {}; renderCart();
  $('#modalBody').innerHTML = `<div class="thanks"><span class="gem" style="font-size:2.4rem">◆</span><h3>Thank You For Choosing Mahira Jewels</h3>
<p>Your order has been received successfully.</p><p>Order number: <b>${no}</b></p><button class="btn" data-action="close">Continue Shopping</button></div>`;
}

/* ---------- EVENTS ---------- */
const add = (id, q = 1) => { cart[id] = Math.min(10, (cart[id] || 0) + q); renderCart(); toast(`${byId(id).name} added to your bag`); };
document.addEventListener('click', e => {
  const q = e.target.closest('[data-q]');
  if (q) { e.preventDefault(); filter = 'all'; $('#q').value = q.dataset.q; runSearch(); open('#searchBox', false); return; }
  const f = e.target.closest('[data-filter]');
  if (f) { filter = f.dataset.filter; document.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === f)); renderGrid(); return; }
  const b = e.target.closest('[data-action]'); if (!b) return;
  const id = b.dataset.id;
  switch (b.dataset.action) {
    case 'menu': open('#nav'); b.setAttribute('aria-expanded', 'true'); break;
    case 'search': open('#searchBox', false); $('#q').focus(); break;
    case 'cart': open('#cartBox'); break;
    case 'wishlist': toast(wish.length ? `${wish.length} saved in your wishlist` : 'Your wishlist is empty'); break;
    case 'close': closeAll(); break;
    case 'add': add(id, b.dataset.qv ? Math.max(1, +$('#qvQty').value || 1) : 1); if (b.dataset.qv) closeAll(); break;
    case 'inc': cart[id]++; renderCart(); break;
    case 'dec': cart[id]--; if (cart[id] < 1) delete cart[id]; renderCart(); break;
    case 'remove': delete cart[id]; renderCart(); break;
    case 'quick': quickView(id); break;
    case 'checkout': checkout(); break;
    case 'wish':
      wish = wish.includes(+id) ? wish.filter(x => x !== +id) : [...wish, +id]; renderCart();
      document.querySelectorAll(`[data-action="wish"][data-id="${id}"]`).forEach(h => { const on = wish.includes(+id); h.classList.toggle('on', on); h.setAttribute('aria-pressed', on); });
      toast(wish.includes(+id) ? 'Saved to wishlist' : 'Removed from wishlist'); break;
  }
  if (b.dataset.action === 'wish' || b.dataset.action === 'cart') return;
});
document.addEventListener('submit', e => { if (e.target.id === 'coForm') placeOrder(e); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
document.querySelector('#nav').addEventListener('click', e => { if (e.target.tagName === 'A') closeAll(); });

function runSearch() {
  const v = $('#q').value.trim(), r = $('#results');
  r.innerHTML = !v ? '' : (products.filter(p => match(p, v)).map(card).join('') || '<p>No pieces match that search. Try ring, diamond, necklace, gold, earrings or bridal.</p>');
  observe();
}
$('#q').addEventListener('input', runSearch);

$('#newsForm').addEventListener('submit', e => {
  e.preventDefault(); const m = $('#newsMsg'), v = $('#email').value.trim();
  if (/^\S+@\S+\.\S+$/.test(v)) { m.style.color = 'var(--gold)'; m.textContent = 'Subscribed. Watch your inbox for new collections.'; e.target.reset(); }
  else { m.style.color = ''; m.textContent = 'Enter a valid email address, for example name@email.com.'; }
});

/* header shadow + reveal */
const hd = $('#header');
addEventListener('scroll', () => hd.classList.toggle('stuck', scrollY > 10), { passive: true });
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .1 }) : null;
function observe() { document.querySelectorAll('.rv:not(.in)').forEach(el => io ? io.observe(el) : el.classList.add('in')); }

/* ---------- INIT ---------- */
$('#cats').innerHTML = cats.map(c => `<button class="cat" data-q="${c[1]}" aria-label="Explore ${c[0]}">${img(U(IMG[c[2]]), c[0])}<div><h3>${c[0]}</h3><span>Explore Collection</span></div></button>`).join('');
$('#social').innerHTML = social.map((s, i) => `<div class="soc-i">${img(U(IMG[s], 300), 'Mahira Jewels on Instagram ' + (i + 1), 300)}</div>`).join('');
renderGrid(); renderCart();

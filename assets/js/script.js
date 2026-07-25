/* ================================================
   PIZZA KINGDOM — Saudi's Best Pizza
   Main Script - All Pages
   ================================================ */

// ===== BASE PATH DETECTION =====
const isInPages = window.location.pathname.includes('/pages/');
const ROOT = isInPages ? '..' : '.';

// ===== HEADER & FOOTER HTML =====
function getHeaderHTML() {
  const r = ROOT;
  return `
<header class="header" id="header">
  <div class="container header__container">
    <a href="${r}/index.html" class="logo">
      <img src="${r}/assets/images/logo.svg" alt="Pizza Kingdom" class="logo__img" />
      <span class="logo__text">Pizza Kingdom</span>
    </a>
    <nav class="nav" id="nav">
      <ul class="nav__list">
        <li><a href="${r}/index.html" class="nav__link" data-en="Home" data-ar="الرئيسية">Home</a></li>
        <li><a href="${r}/pages/menu.html" class="nav__link" data-en="Menu" data-ar="القائمة">Menu</a></li>
        <li><a href="${r}/pages/about.html" class="nav__link" data-en="About" data-ar="من نحن">About</a></li>
        <li><a href="${r}/pages/gallery.html" class="nav__link" data-en="Gallery" data-ar="معرض الصور">Gallery</a></li>
        <li><a href="${r}/pages/offers.html" class="nav__link" data-en="Offers" data-ar="العروض">Offers</a></li>
        <li><a href="${r}/pages/locations.html" class="nav__link" data-en="Locations" data-ar="الفروع">Locations</a></li>
        <li><a href="${r}/pages/contact.html" class="nav__link" data-en="Contact" data-ar="اتصل بنا">Contact</a></li>
      </ul>
    </nav>
    <div class="header__actions">
      <button class="lang-toggle" id="langToggle">عربي</button>
      <a href="${r}/pages/order.html" class="btn btn--primary btn--sm order-btn" data-en="Order Now" data-ar="اطلب الآن">Order Now</a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>`;
}

function getFooterHTML() {
  const r = ROOT;
  return `
<footer class="footer">
  <div class="container footer__container">
    <div class="footer__brand">
      <div class="logo">
        <img src="${r}/assets/images/logo.svg" alt="Pizza Kingdom" class="logo__img" />
        <span class="logo__text">Pizza Kingdom</span>
      </div>
      <p data-en="Saudi's finest pizza since 2020. Quality ingredients, royal taste, delivered to your doorstep." data-ar="أفضل بيتزا في السعودية منذ 2020. مكونات عالية الجودة، طعم ملكي، يُوصَل إلى باب منزلك.">Saudi's finest pizza since 2020. Quality ingredients, royal taste, delivered to your doorstep.</p>
      <div class="footer__social">
        <a href="#"><i class="fa-brands fa-snapchat"></i></a>
        <a href="#"><i class="fa-brands fa-instagram"></i></a>
        <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
        <a href="#"><i class="fa-brands fa-whatsapp"></i></a>
        <a href="#"><i class="fa-brands fa-tiktok"></i></a>
      </div>
    </div>
    <div class="footer__links">
      <h3 data-en="Quick Links" data-ar="روابط سريعة">Quick Links</h3>
      <ul>
        <li><a href="${r}/pages/about.html" data-en="About Us" data-ar="من نحن">About Us</a></li>
        <li><a href="${r}/pages/menu.html" data-en="Menu" data-ar="القائمة">Menu</a></li>
        <li><a href="${r}/pages/gallery.html" data-en="Gallery" data-ar="معرض الصور">Gallery</a></li>
        <li><a href="${r}/pages/offers.html" data-en="Offers" data-ar="العروض">Offers</a></li>
        <li><a href="${r}/pages/locations.html" data-en="Locations" data-ar="الفروع">Locations</a></li>
      </ul>
    </div>
    <div class="footer__links">
      <h3 data-en="Support" data-ar="الدعم">Support</h3>
      <ul>
        <li><a href="${r}/pages/contact.html#faq" data-en="FAQs" data-ar="الأسئلة الشائعة">FAQs</a></li>
        <li><a href="#" data-en="Privacy Policy" data-ar="سياسة الخصوصية">Privacy Policy</a></li>
        <li><a href="#" data-en="Terms of Service" data-ar="شروط الخدمة">Terms of Service</a></li>
        <li><a href="${r}/pages/contact.html" data-en="Contact Us" data-ar="اتصل بنا">Contact</a></li>
      </ul>
    </div>
    <div class="footer__contact">
      <h3 data-en="Contact Us" data-ar="اتصل بنا">Contact Us</h3>
      <ul>
        <li><i class="fa-solid fa-phone"></i> <span dir="ltr">+966 55 123 4567</span></li>
        <li><i class="fa-solid fa-envelope"></i> info@pizzakingdom.sa</li>
        <li><i class="fa-solid fa-location-dot"></i> <span data-en="King Fahd Road, Riyadh, KSA" data-ar="طريق الملك فهد، الرياض، المملكة">King Fahd Road, Riyadh, KSA</span></li>
        <li><i class="fa-regular fa-clock"></i> <span data-en="Sun–Thu: 11AM–1AM | Fri–Sat: 1PM–2AM" data-ar="الأحد–الخميس: 11ص–1ص | الجمعة–السبت: 1م–2ص">Sun–Thu: 11AM–1AM | Fri–Sat: 1PM–2AM</span></li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom">
    <p>&copy; 2026 <strong>Pizza Kingdom</strong>. <span data-en="All rights reserved." data-ar="جميع الحقوق محفوظة.">All rights reserved.</span></p>
  </div>
</footer>`;
}

// ===== GLOBALS =====
let currentLang = localStorage.getItem('pk_lang') || 'en';

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  // Inject header & footer
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (headerPlaceholder) headerPlaceholder.innerHTML = getHeaderHTML();
  if (footerPlaceholder) footerPlaceholder.innerHTML = getFooterHTML();

  cacheElements();
  initHeader();
  initLanguage();
  applyLanguage(currentLang);
  initScrollEffects();
  initPageSpecific();
});

// ===== CACHED ELEMENTS =====
let header, navToggle, nav, langToggle;

function cacheElements() {
  header = document.getElementById('header');
  navToggle = document.getElementById('navToggle');
  nav = document.getElementById('nav');
  langToggle = document.getElementById('langToggle');
}

// ===== HEADER SCROLL =====
function initScrollEffects() {
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 80);
  });
}

// ===== MOBILE NAV =====
function initHeader() {
  if (!navToggle || !nav) return;
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
}

// ===== LANGUAGE SYSTEM =====
function initLanguage() {
  if (!langToggle) langToggle = document.getElementById('langToggle');
  if (!langToggle) return;
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('pk_lang', currentLang);
    applyLanguage(currentLang);
  });
}

function applyLanguage(lang) {
  currentLang = lang;
  const body = document.body;
  if (lang === 'ar') {
    body.classList.add('rtl');
    body.setAttribute('dir', 'rtl');
    document.documentElement.lang = 'ar';
  } else {
    body.classList.remove('rtl');
    body.setAttribute('dir', 'ltr');
    document.documentElement.lang = 'en';
  }
  document.querySelectorAll('[data-en][data-ar]').forEach(el => {
    el.innerHTML = el.getAttribute(`data-${lang}`);
  });

  // Handle placeholders
  document.querySelectorAll('[data-en-placeholder][data-ar-placeholder]').forEach(el => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
  });

  // Update select option text
  document.querySelectorAll('[data-en][data-ar] option').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
  const toggle = document.getElementById('langToggle');
  if (toggle) toggle.innerHTML = lang === 'en' ? 'عربي' : 'English';
}

// ===== PAGE DISPATCH =====
function initPageSpecific() {
  const page = document.body.dataset.page;
  if (page === 'menu' || !page) highlightNav();
  if (page === 'menu') initMenuPage();
  if (page === 'gallery') initGallery();
  if (page === 'about') initAboutPage();
  if (page === 'offers') initOffers();
  if (page === 'locations') initLocations();
  if (page === 'contact') initContact();
  if (page === 'order') initOrderPage();
  if (page === 'home' || !page) initHomePage();
}

function highlightNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (path.endsWith(href) || (href.includes('index.html') && (path.endsWith('/') || path.endsWith('index.html')))) {
      link.classList.add('active');
    }
  });
}

// ===== MENU DATA =====
const menuData = [
  { id: 1, category: 'classic', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    en: { name: 'Margherita Pizza', desc: 'San Marzano tomatoes, fresh mozzarella, basil & olive oil' },
    ar: { name: 'بيتزا مارجريتا', desc: 'طماطم سان مارزانو، موزاريلا طازجة، ريحان وزيت زيتون' }, price: '29' },
  { id: 2, category: 'classic', img: 'https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=400&q=80',
    en: { name: 'Pepperoni Pizza', desc: 'Classic pepperoni, mozzarella, house tomato sauce' },
    ar: { name: 'بيتزا بيبروني', desc: 'بيبروني كلاسيك، موزاريلا، صلصة طماطم المنزلية' }, price: '32' },
  { id: 3, category: 'classic', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
    en: { name: 'Four Cheese', desc: 'Mozzarella, parmesan, gorgonzola, ricotta' },
    ar: { name: 'أربعة أجبان', desc: 'موزاريلا، بارميزان، جورجونزولا، ريكوتا' }, price: '36' },
  { id: 4, category: 'special', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    en: { name: 'Truffle Mushroom', desc: 'Wild mushrooms, truffle oil, arugula, parmesan' },
    ar: { name: 'مشروم وترفيل', desc: 'مشروم بري، زيت الترفيل، جرجير، بارميزان' }, price: '45' },
  { id: 5, category: 'special', img: 'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?w=400&q=80',
    en: { name: 'BBQ Chicken', desc: 'Grilled chicken, smoky BBQ sauce, red onions' },
    ar: { name: 'دجاج باربكيو', desc: 'دجاج مشوي، صلصة باربكيو مدخنة، بصل أحمر' }, price: '39' },
  { id: 6, category: 'special', img: 'https://images.unsplash.com/photo-1552539617-99c5c10fda82?w=400&q=80',
    en: { name: 'Steak & Cheese', desc: 'Angus beef strips, cheddar, bell peppers' },
    ar: { name: 'ستيك وجبن', desc: 'شرائح لحم أنجوس، شيدر، فلفل ألوان' }, price: '48' },
  { id: 7, category: 'saudi', img: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&q=80',
    en: { name: 'Saudi Special', desc: 'Lamb kebab, pine nuts, Saudi spices, tahina' },
    ar: { name: 'سعودي سبشيال', desc: 'كباب لحم، صنوبر، بهارات سعودية، طحينة' }, price: '42' },
  { id: 8, category: 'saudi', img: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?w=400&q=80',
    en: { name: 'Jareesh Pizza', desc: 'Creamy Jareesh, lamb shawarma, pomegranate molasses' },
    ar: { name: 'بيتزا جريش', desc: 'قاعدة جريش كريمية، شاورما لحم، دبس رمان' }, price: '44' },
  { id: 9, category: 'saudi', img: 'https://images.unsplash.com/photo-1561758033-7e924f619b47?w=400&q=80',
    en: { name: 'Mandala Chicken', desc: 'Mandala-spiced chicken, saffron rice crust' },
    ar: { name: 'دجاج مندلي', desc: 'دجاج ببهارات المندلي، قاعدة أرز زعفران' }, price: '46' },
  { id: 10, category: 'sides', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    en: { name: 'Garlic Bread', desc: 'Toasted ciabatta with garlic butter & herbs' },
    ar: { name: 'خبز بالثوم', desc: 'شياباتا محمصة بزبدة الثوم والأعشاب' }, price: '14' },
  { id: 11, category: 'sides', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    en: { name: 'Mozzarella Sticks', desc: 'Crispy fried mozzarella with marinara dip' },
    ar: { name: 'أصابع موزاريلا', desc: 'موزاريلا مقلية مقرمشة مع صلصة مارينارا' }, price: '18' },
  { id: 12, category: 'sides', img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
    en: { name: 'French Fries', desc: 'Golden crispy fries with truffle mayo' },
    ar: { name: 'بطاطس مقلية', desc: 'بطاطس ذهبية مقرمشة مع مايونيز الترفيل' }, price: '12' }
];

// ===============================================
// HOME PAGE
// ===============================================
function initHomePage() {
  animateCounters();
  initTestimonials();
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!emailInput?.value.trim()) return;
      alert(currentLang === 'ar' ? 'شكرًا! تم الاشتراك بنجاح 🎉' : 'Thank you! Subscribed successfully 🎉');
      if (emailInput) emailInput.value = '';
    });
  }
}

function animateCounters() {
  document.querySelectorAll('.stat__num').forEach(el => {
    const target = parseInt(el.dataset.count);
    if (!target) return;
    let current = 0;
    const inc = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current >= 1000 ? (current / 1000).toFixed(0) + 'K+' : current + '+';
    }, 25);
  });
}

function initTestimonials() {
  const slider = document.getElementById('testimonialsSlider');
  const dots = document.getElementById('testimonialsDots');
  if (!slider || !dots) return;
  const cards = slider.querySelectorAll('.testimonial__card');
  if (!cards.length) return;
  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = `testimonials__dot${i===0?' active':''}`;
    d.addEventListener('click', () => cards[i].scrollIntoView({behavior:'smooth',inline:'start'}));
    dots.appendChild(d);
  });
  slider.addEventListener('scroll', () => {
    const idx = Math.round(slider.scrollLeft / (cards[0].offsetWidth + 25));
    dots.querySelectorAll('.testimonials__dot').forEach((d,i)=>d.classList.toggle('active',i===idx));
  });
}

// ===============================================
// MENU PAGE
// ===============================================
function initMenuPage() {
  const grid = document.getElementById('menuGrid');
  const tabs = document.querySelectorAll('.menu__tab');
  if (!grid) return;
  let items = [...menuData];
  function render() {
    const lang = currentLang;
    grid.innerHTML = items.map(i => {
      const t = i[lang] || i.en;
      return `<div class="menu__card" data-id="${i.id}">
        <img src="${i.img}" alt="${t.name}" class="menu__card-img" loading="lazy" />
        <div class="menu__card-body">
          <h3 class="menu__card-title">${t.name}</h3>
          <p class="menu__card-desc">${t.desc}</p>
          <div class="menu__card-footer">
            <span class="menu__card-price">${i.price} <small>SAR</small></span>
            <button class="menu__card-order">${lang==='ar'?'اطلب':'Order'}</button>
          </div>
        </div>
      </div>`;
    }).join('');
  }
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(tb => tb.classList.remove('active'));
      t.classList.add('active');
      items = t.dataset.category === 'all' ? [...menuData] : menuData.filter(i => i.category === t.dataset.category);
      render();
    });
  });
  render();
}

// ===============================================
// GALLERY
// ===============================================
function initGallery() {}

// ===============================================
// ABOUT
// ===============================================
function initAboutPage() {}

// ===============================================
// OFFERS
// ===============================================
function initOffers() {}

// ===============================================
// LOCATIONS
// ===============================================
function initLocations() {}

// ===============================================
// CONTACT
// ===============================================
function initContact() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(currentLang === 'ar' ? 'شكرًا! تم إرسال رسالتك. سنتواصل معك قريبًا.' : 'Thank you! Your message has been sent. We\'ll get back to you soon.');
      form.reset();
    });
  }
  document.querySelectorAll('.faq__question').forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = answer.style.maxHeight;
      document.querySelectorAll('.faq__answer').forEach(a => a.style.maxHeight = null);
      document.querySelectorAll('.faq__question').forEach(qe => qe.classList.remove('active'));
      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        q.classList.add('active');
      }
    });
  });
}

// ===============================================
// ORDER
// ===============================================
function initOrderPage() {
  const qtyInputs = document.querySelectorAll('.order__qty');
  const totalEl = document.getElementById('orderTotal');
  const pickupBtn = document.getElementById('pickupBtn');
  const deliveryBtn = document.getElementById('deliveryBtn');
  const orderForm = document.getElementById('orderForm');
  function updateTotal() {
    let total = 0;
    qtyInputs.forEach(i => { total += (parseInt(i.value)||0) * (parseFloat(i.dataset.price)||0); });
    if (totalEl) totalEl.textContent = total.toFixed(2);
  }
  qtyInputs.forEach(i => { i.addEventListener('change', updateTotal); i.addEventListener('input', updateTotal); });
  if (pickupBtn && deliveryBtn) {
    pickupBtn.addEventListener('click', () => { pickupBtn.classList.add('active'); deliveryBtn.classList.remove('active'); });
    deliveryBtn.addEventListener('click', () => { deliveryBtn.classList.add('active'); pickupBtn.classList.remove('active'); });
  }
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(currentLang === 'ar' ? '✅ تم استلام طلبك! سنقوم بالتواصل معك قريبًا.' : '✅ Your order has been received! We\'ll contact you shortly.');
    });
  }
  updateTotal();
}

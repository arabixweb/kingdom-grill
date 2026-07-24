/**
 * Shared Components — Common Header & Footer
 * Kingdom Grill | مشاوي المملكة
 */

// ============================================================
// RENDER HEADER
// ============================================================
function renderHeader(currentPage = 'home') {
  const pages = [
    { id: 'home', en: 'Home', ar: 'الرئيسية', href: '../index.html' },
    { id: 'menu', en: 'Menu', ar: 'القائمة', href: 'menu.html' },
    { id: 'chef', en: 'Chef', ar: 'الشيف', href: 'chef.html' },
    { id: 'reservation', en: 'Reservation', ar: 'الحجز', href: 'reservation.html' },
    { id: 'contact', en: 'Contact', ar: 'اتصل بنا', href: 'contact.html' },
  ];

  const rootPath = currentPage === 'home' ? '.' : '..';

  return `
    <div class="lang-toggle" id="langToggle">
      <button class="lang-btn active" data-lang="en">English</button>
      <button class="lang-btn" data-lang="ar">العربية</button>
    </div>

    <nav class="navbar" id="navbar">
      <div class="nav-container">
        <a href="${rootPath}/index.html" class="logo">
          <span class="logo-icon">👑</span>
          <span class="logo-text" data-en="Kingdom Grill" data-ar="مشاوي المملكة">Kingdom Grill</span>
        </a>
        <div class="nav-toggle" id="navToggle">
          <span></span><span></span><span></span>
        </div>
        <ul class="nav-menu" id="navMenu">
          ${pages.map(p => `
            <li><a href="${rootPath}/${p.href}" class="${p.id === currentPage ? 'active' : ''}" 
                   data-en="${p.en}" data-ar="${p.ar}">${p.en}</a></li>
          `).join('')}
        </ul>
      </div>
    </nav>
  `;
}

// ============================================================
// RENDER FOOTER
// ============================================================
function renderFooter(currentPage = 'home') {
  const rootPath = currentPage === 'home' ? '.' : '..';

  return `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="logo-text footer-main-logo" data-en="Kingdom Grill" data-ar="مشاوي المملكة">Kingdom Grill</span>
          <p data-en="Royalty on a plate. Since 2024." data-ar="الملكية في طبق. منذ 2024.">Royalty on a plate. Since 2024.</p>
        </div>
        <div class="footer-links">
          <div class="footer-col">
            <h4 data-en="Quick Links" data-ar="روابط سريعة">Quick Links</h4>
            <a href="${rootPath}/index.html" data-en="Home" data-ar="الرئيسية">Home</a>
            <a href="${rootPath}/pages/menu.html" data-en="Menu" data-ar="القائمة">Menu</a>
            <a href="${rootPath}/pages/reservation.html" data-en="Reservation" data-ar="الحجز">Reservation</a>
            <a href="${rootPath}/pages/contact.html" data-en="Contact" data-ar="اتصل بنا">Contact</a>
          </div>
          <div class="footer-col">
            <h4 data-en="Hours" data-ar="ساعات العمل">Hours</h4>
            <p data-en="Daily: 12PM - 1AM" data-ar="يوميًا: 12م - 1ص">Daily: 12PM - 1AM</p>
            <p data-en="Fri Brunch: 11AM - 3PM" data-ar="الجمعة: 11ص - 3م">Fri Brunch: 11AM - 3PM</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Kingdom Grill. <span data-en="All rights reserved." data-ar="جميع الحقوق محفوظة.">All rights reserved.</span></p>
        <div class="footer-developed">
          <a href="https://www.arabixweb.com" target="_blank" rel="noopener" class="arabix-credit">
            <img src="${rootPath}/assets/arabix-logo.png" alt="Arabix" class="arabix-logo" />
            <span data-en="Developed by Arabix" data-ar="تطوير عربيكس">Developed by Arabix</span>
          </a>
        </div>
      </div>
    </footer>

    <button class="scroll-top" id="scrollTop">
      <i class="fas fa-arrow-up"></i>
    </button>
  `;
}

// ============================================================
// INIT SHARED COMPONENTS
// ============================================================
function initSharedComponents(currentPage) {
  // Inject header
  document.getElementById('header-placeholder').innerHTML = renderHeader(currentPage);
  // Inject footer
  document.getElementById('footer-placeholder').innerHTML = renderFooter(currentPage);

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.pageYOffset > 80);
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('active');
      navMenu?.classList.remove('active');
    });
  });

  // Scroll to top
  const scrollTop = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollTop?.classList.toggle('visible', window.pageYOffset > 500);
  });
  scrollTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Language switcher
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      document.querySelectorAll('[data-en]').forEach(el => {
        const key = lang === 'en' ? 'data-en' : 'data-ar';
        const text = el.getAttribute(key);
        if (text) el.textContent = text;
      });
    });
  });

  // Scroll reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

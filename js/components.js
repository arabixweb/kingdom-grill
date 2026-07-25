/**
 * Shared Components — Kingdom Grill | مشاوي المملكة
 * Premium multi-page header/footer system
 */

function renderHeader(currentPage = 'home') {
  const pageData = {
    home:     { label: { en: 'Home',     ar: 'الرئيسية' },     file: 'index.html' },
    menu:     { label: { en: 'Menu',     ar: 'القائمة' },     file: 'menu.html' },
    chef:     { label: { en: 'Chef',     ar: 'الشيف' },       file: 'chef.html' },
    reservation: { label: { en: 'Reservation', ar: 'الحجز' }, file: 'reservation.html' },
    contact:  { label: { en: 'Contact',  ar: 'اتصل بنا' },    file: 'contact.html' },
  };

  const pageIds = ['home', 'menu', 'chef', 'reservation', 'contact'];

  const navUrl = (id) => {
    if (currentPage === 'home') {
      if (id === 'home') return 'index.html';
      return `pages/${pageData[id].file}`;
    }
    if (id === 'home') return '../index.html';
    return pageData[id].file;
  };

  return `
    <nav class="navbar" id="navbar">
      <div class="nav-container">
        <a href="${currentPage === 'home' ? 'index.html' : '../index.html'}" class="logo">
          <img src="${currentPage === 'home' ? 'assets/logo.svg' : '../assets/logo.svg'}" alt="Kingdom Grill" style="height:48px;">
        </a>
        <div class="lang-toggle" id="langToggle">
          <button class="lang-btn active" data-lang="en">English</button>
          <button class="lang-btn" data-lang="ar">العربية</button>
        </div>
        <div class="nav-toggle" id="navToggle">
          <span></span><span></span><span></span>
        </div>
        <ul class="nav-menu" id="navMenu">
          ${pageIds.map(id => `
            <li><a href="${navUrl(id)}" class="${id === currentPage ? 'active' : ''}"
                   data-en="${pageData[id].label.en}" data-ar="${pageData[id].label.ar}">${pageData[id].label.en}</a></li>
          `).join('')}
        </ul>
      </div>
    </nav>
  `;
}

function renderFooter(currentPage = 'home') {
  const prefix = currentPage === 'home' ? './' : '../';
  const pageLinkPrefix = currentPage === 'home' ? 'pages/' : '';

  return `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="logo-text" data-en="Kingdom Grill" data-ar="مشاوي المملكة">Kingdom Grill</span>
          <p data-en="Royalty on a plate. Since 2024." data-ar="الملكية في طبق. منذ 2024.">Royalty on a plate. Since 2024.</p>
          <p style="margin-top:8px;font-size:0.82rem;color:var(--text-muted);opacity:0.8;"
             data-en="King Fahd Road, Riyadh, Saudi Arabia"
             data-ar="طريق الملك فهد، الرياض، المملكة العربية السعودية">
            King Fahd Road, Riyadh, Saudi Arabia
          </p>
        </div>
        <div class="footer-links-grid">
          <div class="footer-col">
            <h4 data-en="Explore" data-ar="تصفح">Explore</h4>
            <a href="${prefix}index.html" data-en="Home" data-ar="الرئيسية">Home</a>
            <a href="${pageLinkPrefix}menu.html" data-en="Menu" data-ar="القائمة">Menu</a>
            <a href="${pageLinkPrefix}chef.html" data-en="Our Chef" data-ar="الشيف">Our Chef</a>
            <a href="${pageLinkPrefix}reservation.html" data-en="Reservation" data-ar="الحجز">Reservation</a>
            <a href="${pageLinkPrefix}contact.html" data-en="Contact" data-ar="اتصل بنا">Contact</a>
          </div>
          <div class="footer-col">
            <h4 data-en="Hours" data-ar="ساعات العمل">Hours</h4>
            <p data-en="Daily: 12:00 PM – 1:00 AM" data-ar="يوميًا: 12:00 م – 1:00 ص">Daily: 12:00 PM – 1:00 AM</p>
            <p data-en="Friday Brunch: 11:00 AM – 3:00 PM" data-ar="الجمعة: 11:00 ص – 3:00 م">Fri Brunch: 11 AM – 3 PM</p>
            <p data-en="📍 King Fahd Road, Riyadh" data-ar="📍 طريق الملك فهد، الرياض">📍 King Fahd Road, Riyadh</p>
          </div>
        </div>
        <div class="footer-newsletter">
          <h4 data-en="Stay Connected" data-ar="ابق على اتصال">Stay Connected</h4>
          <div class="newsletter-input">
            <input type="email" placeholder="your@email.com">
            <button data-en="Subscribe" data-ar="اشتراك">→</button>
          </div>
          <div class="social-links" style="margin-top:18px;justify-content:flex-start;">
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" aria-label="Snapchat"><i class="fab fa-snapchat"></i></a>
            <a href="#" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Kingdom Grill. <span data-en="All rights reserved." data-ar="جميع الحقوق محفوظة.">All rights reserved.</span></p>
        <a href="https://www.arabixweb.com" target="_blank" rel="noopener" class="footer-credit">
          <img src="${prefix}assets/arabix-logo.png" alt="Arabix" />
          <span data-en="Developed by Arabix" data-ar="تطوير عربيكس">Developed by Arabix</span>
        </a>
      </div>
    </footer>
    <button class="scroll-top" id="scrollTop"><i class="fas fa-arrow-up"></i></button>
  `;
}

function initSharedComponents(currentPage) {
  document.getElementById('header-placeholder').innerHTML = renderHeader(currentPage);
  document.getElementById('footer-placeholder').innerHTML = renderFooter(currentPage);

  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 80);
  });

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

  const scrollTop = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollTop?.classList.toggle('visible', window.scrollY > 500);
  });
  scrollTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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

  new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    .observeAll?.() || document.querySelectorAll('.reveal').forEach(el => {
      new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 }).observe(el);
    });
}

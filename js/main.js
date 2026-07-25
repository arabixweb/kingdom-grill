/**
 * Main JS — Kingdom Grill | مشاوي المملكة
 * Premium animations, parallax, counters, section reveals
 */

document.addEventListener('DOMContentLoaded', () => {

  // =====================================================
  // 1. HERO PARTICLES (home page)
  // =====================================================
  const heroP = document.getElementById('heroParticles');
  if (heroP) {
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position:absolute;
        width:${1.5 + Math.random() * 3}px;
        height:2px;
        background:var(--gold);
        left:${Math.random() * 100}%;
        bottom:-10px;
        opacity:0;
        animation:sparkRise ${5 + Math.random() * 8}s infinite;
        animation-delay:${Math.random() * 8}s;
      `;
      heroP.appendChild(p);
    }
  }

  // =====================================================
  // 2. SCROLL REVEAL — Full site sections & cards
  // =====================================================
  const revealElements = document.querySelectorAll(
    '.section, .section-header, .about-content, .about-text, .about-gallery, ' +
    '.menu-card, .chef-card, .chef-image, .chef-info, ' +
    '.testimonial-card, .contact-grid, .contact-info-wrap, .contact-form-wrap, ' +
    '.feature-card, .info-card, .reservation-form-wrap'
  );

  // First: set all to hidden
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = Math.min(entry.target.dataset.revealDelay || 0, 400);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach((el, i) => {
    // Stagger delay for card grids
    if (el.classList.contains('menu-card') || el.classList.contains('testimonial-card')) {
      el.dataset.revealDelay = 100 + (i % 6) * 100;
    }
    // Chef elements
    if (el.classList.contains('chef-image')) el.dataset.revealDelay = '0';
    if (el.classList.contains('chef-info')) el.dataset.revealDelay = '200';
    // Contact
    if (el.classList.contains('contact-info-wrap')) el.dataset.revealDelay = '0';
    if (el.classList.contains('contact-form-wrap')) el.dataset.revealDelay = '200';
    // Section header first
    if (el.classList.contains('section-header')) el.dataset.revealDelay = '0';

    revealObserver.observe(el);
  });

  // =====================================================
  // 3. PARALLAX ON SCROLL — section backgrounds
  // =====================================================
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    // Hero parallax (home)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollY < vh) {
      heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
      heroContent.style.opacity = Math.max(0, 1 - (scrollY / vh) * 0.7);
    }

    // Page heroes parallax
    document.querySelectorAll('.page-hero-content').forEach(el => {
      const rect = el.closest('.page-hero').getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        const progress = (vh - rect.top) / (vh + rect.height);
        el.style.transform = `translateY(${progress * -30}px)`;
      }
    });

    // Counter section parallax
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
      const rect = counterSection.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        const progress = 1 - (rect.top / vh);
        counterSection.style.backgroundPositionY = `${progress * 30}%`;
      }
    }
  });

  // =====================================================
  // 4. ANIMATED COUNTERS — stat numbers
  // =====================================================
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(stat => {
          const target = parseInt(stat.dataset.count);
          if (!target) return;
          const duration = 2000;
          const step = Math.max(1, Math.ceil(target / (duration / 16)));
          let current = 0;
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            stat.textContent = current.toLocaleString();
          }, 16);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.counter-section').forEach(el => counterObserver.observe(el));
  const heroStats = document.querySelector('.hero-content');
  if (heroStats) counterObserver.observe(heroStats);

  // =====================================================
  // 5. SMOOTH SCROLL FOR ANCHORS
  // =====================================================
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // =====================================================
  // 6. CURSOR GLOW (desktop only)
  // =====================================================
  if (window.innerWidth > 768 && !document.querySelector('.cursor-glow')) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
      position:fixed;width:500px;height:500px;
      border-radius:50%;pointer-events:none;z-index:99999;
      background:radial-gradient(circle,rgba(201,168,76,0.04) 0%,transparent 65%);
      transform:translate(-50%,-50%);
      transition:left 0.2s ease, top 0.2s ease;
    `;
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }

  // =====================================================
  // 7. RESERVATION FORM VALIDATION
  // =====================================================
  const resForm = document.getElementById('reservationForm');
  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('resName')?.value.trim();
      const email = document.getElementById('resEmail')?.value.trim();
      const phone = document.getElementById('resPhone')?.value.trim();
      const date = document.getElementById('resDate')?.value;
      const time = document.getElementById('resTime')?.value;
      const guests = document.getElementById('resGuests')?.value;

      if (!name || !email || !phone || !date || !time || !guests) {
        alert('Please fill in all fields');
        return;
      }

      const btn = resForm.querySelector('.btn-primary');
      if (btn) {
        btn.textContent = 'Reservation Submitted ✓';
        btn.style.background = 'linear-gradient(135deg, #2E7D32, #1B5E20)';
        setTimeout(() => {
          btn.textContent = 'Reserve a Table';
          btn.style.background = '';
          resForm.reset();
        }, 3000);
      }
    });

    // Set min date to today
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }
  }

  // =====================================================
  // 8. COUNTER SECTION — subtle background animations
  // =====================================================
  const counterRows = document.querySelectorAll('.counter-row');
  counterRows.forEach((row, i) => {
    row.style.transition = 'all 0.6s ease';
    row.style.transitionDelay = `${i * 0.1}s`;
  });

  console.log('🏰 Kingdom Grill — مشاوي المملكة');
});

// =====================================================
// STYLES FOR ANIMATIONS
// =====================================================
const style = document.createElement('style');
style.textContent = `
  @keyframes sparkRise {
    0%   { transform: translateY(0) scale(1); opacity: 0; }
    10%  { opacity: 0.6; }
    50%  { opacity: 0.3; }
    90%  { opacity: 0.1; }
    100% { transform: translateY(-100vh) scale(0); opacity: 0; }
  }

  /* Section content fade transitions */
  .section, .about-content, .about-text, .about-gallery,
  .chef-card, .chef-image, .chef-info,
  .contact-grid, .contact-info-wrap, .contact-form-wrap,
  .feature-card, .info-card, .reservation-form-wrap {
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  .menu-card {
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  .testimonial-card {
    transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  .section-header {
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  /* Counter items animate on scroll */
  .counter-item {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .counter-item.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

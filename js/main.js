/**
 * Main JavaScript — Kingdom Grill | مشاوي المملكة
 * Language switching, menu data, animations, interactions
 */

// ============================================================
// MENU DATA
// ============================================================
const menuData = {
  appetizers: [
    {
      en: "Hummus Royale",
      ar: "حمّص ملكي",
      desc_en: "Silky chickpea purée with truffle oil, pine nuts & smoked paprika",
      desc_ar: "حمص ناعم مع زيت الكمأة والصنوبر والبابريكا المدخنة",
      price: "45 SAR",
      icon: "🫘"
    },
    {
      en: "Sambousa Trio",
      ar: "سمبوسة ثلاثية",
      desc_en: "Three fillings — spiced meat, cheese, and mushroom — served with tamarind dip",
      desc_ar: "ثلاث حشوات — لحم بالبهارات، جبن، وفطر — مع صلصة التمر الهندي",
      price: "38 SAR",
      icon: "🥟"
    },
    {
      en: "Jareesh Shrimp",
      ar: "جريش الجمبري",
      desc_en: "Creamy crushed wheat with succulent Gulf shrimp and saffron",
      desc_ar: "جريش كريمي مع جمبري الخليج والزعفران",
      price: "55 SAR",
      icon: "🍤"
    }
  ],
  mains: [
    {
      en: "Royal Lamb Kabsa",
      ar: "كابسة لحم ملكية",
      desc_en: "Slow-cooked lamb on fragrant spiced rice with roasted nuts & raisins",
      desc_ar: "لحم مطبوخ ببطء على أرز منكه بالبهارات مع المكسرات والزبيب",
      price: "95 SAR",
      icon: "🥩"
    },
    {
      en: "Grilled Hammour",
      ar: "هامور مشوي",
      desc_en: "Fresh Gulf grouper fillet with lemon herb butter and saffron couscous",
      desc_ar: "فيليه هامور الخليج الطازج مع زبدة الليمون والأعشاب وكسكس الزعفران",
      price: "110 SAR",
      icon: "🐟"
    },
    {
      en: "Mandi de la Maison",
      ar: "مندي المطعم",
      desc_en: "Tender chicken mandi with aged basmati rice, special house spice blend",
      desc_ar: "مندي دجاج طري مع أرز بسمتي معتق ومزيج بهارات المطعم الخاص",
      price: "75 SAR",
      icon: "🍗"
    },
    {
      en: "Stuffed Camel Saddle",
      ar: "سرج الجمل المحشي",
      desc_en: "Premium camel meat stuffed with freekeh, dates & aromatic herbs",
      desc_ar: "لحم جمل فاخر محشي بالفريكة والتمر والأعشاب العطرية",
      price: "145 SAR",
      icon: "🐪"
    }
  ],
  desserts: [
    {
      en: "Gold Leaf Knafeh",
      ar: "كنافة ورق الذهب",
      desc_en: "Crispy shredded phyllo with sweet cheese, rose syrup & 24k gold leaf",
      desc_ar: "كنافة مقرمشة مع جبن حلو وشراب الورد وورق الذهب عيار 24",
      price: "65 SAR",
      icon: "🥮"
    },
    {
      en: "Date Pudding Majesty",
      ar: "بودنغ التمر الملكي",
      desc_en: "Warm date and cardamom pudding with tahini caramel & toasted sesame",
      desc_ar: "بودنغ التمر والهيل الدافئ مع كراميل الطحينية والسمسم المحمص",
      price: "55 SAR",
      icon: "🍮"
    },
    {
      en: "Saffron Ice Cream",
      ar: "آيس كريم الزعفران",
      desc_en: "Hand-churned saffron ice cream with pistachio crumble & honey drizzle",
      desc_ar: "آيس كريم الزعفران المخفوق يدويًا مع فتات الفستق ورذاذ العسل",
      price: "35 SAR",
      icon: "🍨"
    }
  ],
  beverages: [
    {
      en: "Saudi Coffee",
      ar: "قهوة سعودية",
      desc_en: "Traditional Arabic coffee with cardamom, saffron & dates",
      desc_ar: "قهوة عربية تقليدية مع الهيل والزعفران والتمر",
      price: "25 SAR",
      icon: "☕"
    },
    {
      en: "Lemon Mint Royale",
      ar: "ليمون نعناع ملكي",
      desc_en: "Fresh lemonade with mint, rose water and sparkling water",
      desc_ar: "ليموناضة طازجة مع النعناع وماء الورد والمياه الفوارة",
      price: "22 SAR",
      icon: "🍋"
    },
    {
      en: "Karak Chai",
      ar: "شاي كرك",
      desc_en: "Spiced milk tea with cardamom, cinnamon & evaporated milk",
      desc_ar: "شاي بالحليب والبهارات مع الهيل والقرفة والحليب المبخر",
      price: "18 SAR",
      icon: "🫖"
    }
  ]
};

// ============================================================
// DOM ELEMENTS
// ============================================================
const menuGrid = document.querySelector('.menu-grid');
const heroParticles = document.getElementById('heroParticles');
const stats = document.querySelectorAll('.stat-num');

let currentLang = 'en';
let currentCategory = 'all';

// ============================================================
// PARTICLES — Hero Section
// ============================================================
function createParticles() {
  if (!heroParticles) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
    particle.style.width = (2 + Math.random() * 4) + 'px';
    particle.style.height = particle.style.width;
    particle.style.opacity = 0.2 + Math.random() * 0.4;
    heroParticles.appendChild(particle);
  }
}
createParticles();

// ============================================================
// LANGUAGE SWITCHER
// ============================================================
// MENU RENDERER
// ============================================================
function renderMenu(category) {
  const items = [];
  
  if (category === 'all') {
    Object.values(menuData).forEach(cat => items.push(...cat));
  } else if (menuData[category]) {
    items.push(...menuData[category]);
  }

  menuGrid.innerHTML = items.map(item => {
    const title = currentLang === 'en' ? item.en : item.ar;
    const desc = currentLang === 'en' ? item.desc_en : item.desc_ar;
    return `
      <div class="menu-card reveal">
        <div class="menu-card-icon">${item.icon}</div>
        <h3>${title}</h3>
        <p class="desc">${desc}</p>
        <span class="price">${item.price}</span>
      </div>
    `;
  }).join('');

  // Trigger reveal animation
  setTimeout(() => {
    document.querySelectorAll('.menu-card.reveal').forEach(card => {
      card.classList.add('visible');
    });
  }, 50);
}

// Menu category filters
document.querySelectorAll('.menu-cat').forEach(cat => {
  cat.addEventListener('click', () => {
    document.querySelectorAll('.menu-cat').forEach(c => c.classList.remove('active'));
    cat.classList.add('active');
    currentCategory = cat.dataset.cat;
    renderMenu(currentCategory);
  });
});

// Initial render
if (document.querySelector('.menu-grid')) {
  renderMenu('all');
}

// ============================================================
// SCROLL REVEAL ANIMATIONS
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Observe cards that may be added dynamically
function observeNewCards() {
  document.querySelectorAll('.menu-card:not(.observed)').forEach(card => {
    card.classList.add('observed');
    revealObserver.observe(card);
  });
}

// ============================================================
// ANIMATED COUNTERS
// ============================================================
function animateCounters() {
  stats.forEach(stat => {
    const target = parseInt(stat.dataset.count);
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
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
}

// Trigger counters when hero stats are visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ============================================================
// SMOOTH SCROLL for anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================================
// PARALLAX on scroll for hero
// ============================================================
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  if (hero && scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${scrollY * 0.15}px)`;
    hero.style.opacity = 1 - (scrollY / window.innerHeight);
  }
});

// ============================================================
// CUSTOM CURSOR GLOW (desktop only)
// ============================================================
if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  cursor.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    background: radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.1s ease, top 0.1s ease;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

// ============================================================
// INIT
// ============================================================
console.log('🏰 Kingdom Grill — مشاوي المملكة');
console.log('👑 Royal cuisine website loaded');

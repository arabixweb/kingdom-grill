/**
 * Main JS — Kingdom Grill | مشاوي المملكة
 * Animations, counters, particles, interactivity
 */

document.addEventListener('DOMContentLoaded', () => {

  // === Particles for Home Hero ===
  const heroP = document.getElementById('heroParticles');
  if (heroP) {
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position:absolute;
        width:${2 + Math.random() * 4}px;
        height:${p.style.width};
        background:var(--gold);
        border-radius:50%;
        left:${Math.random() * 100}%;
        opacity:0;
        animation:particleDrift ${4 + Math.random() * 6}s infinite;
        animation-delay:${Math.random() * 6}s;
      `;
      heroP.appendChild(p);
    }
  }

  // === Page Hero Particles ===
  document.querySelectorAll('.page-hero-particles').forEach(container => {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position:absolute;width:2px;height:2px;
        background:var(--gold);border-radius:50%;
        left:${Math.random()*100}%;top:${Math.random()*100}%;
        opacity:${0.1 + Math.random()*0.3};
        animation:particleDrift ${5+Math.random()*5}s infinite;
        animation-delay:${Math.random()*5}s;
      `;
      container.appendChild(p);
    }
  });

  // === Animated Counters (Home Hero Stats) ===
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(stat => {
          const target = parseInt(stat.dataset.count);
          const duration = 2000;
          const step = Math.ceil(target / (duration / 16));
          let current = 0;
          const interval = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(interval); }
            stat.textContent = current.toLocaleString();
          }, 16);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  });
  const heroStatsContainer = document.querySelector('.hero-content');
  if (heroStatsContainer) statsObserver.observe(heroStatsContainer);

  // === Scroll Parallax for Hero ===
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.12}px)`;
      heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.8;
    }
  });

  // === Smooth Scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // === Cursor Glow (desktop) ===
  if (window.innerWidth > 768 && !document.querySelector('.cursor-glow')) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
      position:fixed;width:400px;height:400px;
      border-radius:50%;pointer-events:none;z-index:99999;
      background:radial-gradient(circle,rgba(201,168,76,0.04) 0%,transparent 70%);
      transform:translate(-50%,-50%);
      transition:left 0.15s ease, top 0.15s ease;
    `;
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }

  console.log('🏰 Kingdom Grill — مشاوي المملكة');
});

// Style for particles animation
const style = document.createElement('style');
style.textContent = `
  @keyframes particleDrift {
    0% { transform:translateY(100vh) rotate(0deg); opacity:0; }
    15% { opacity:0.5; }
    85% { opacity:0.5; }
    100% { transform:translateY(-10vh) rotate(720deg); opacity:0; }
  }
`;
document.head.appendChild(style);

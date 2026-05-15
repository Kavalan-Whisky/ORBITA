/* ORBITA — main.js
   Subtle interactions: parallax stars, planet card glow on hover.
*/
(function () {
  'use strict';

  // Star field subtle scroll parallax — only on desktop, motion-safe
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches && window.innerWidth > 900) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          document.body.style.setProperty('--stars-y', `${y * 0.1}px`);
          // Apply via the ::before
          const sheet = document.styleSheets[document.styleSheets.length - 1];
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Planet card click → ripple glow effect
  document.querySelectorAll('.planet-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(240, 193, 74, 0.05) 0%, var(--space) 50%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // Scale dot tooltip emphasis
  document.querySelectorAll('.scale-dot').forEach(dot => {
    dot.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%, 50%) scale(1.6)';
      dot.style.boxShadow = '0 0 16px currentColor';
    });
    dot.addEventListener('mouseleave', () => {
      dot.style.transform = '';
      dot.style.boxShadow = '';
    });
  });

  // Nav fade on scroll
  const nav = document.querySelector('.nav');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) {
      if (y > lastY && y > 200) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
      nav.style.transition = 'transform 0.3s';
    }
    lastY = y;
  });

})();

(() => {
  'use strict';
  const menuButton = document.querySelector('.mobile-nav-toggle');
  const menu = document.querySelector('#navmenu');
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.hash)).filter(Boolean);
  const progress = document.querySelector('.reading-progress');
  const scrollTop = document.querySelector('#scroll-top');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    menuButton.querySelector('i').className = open ? 'bi bi-x-lg' : 'bi bi-list';
  }
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  links.forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('#header')) setMenu(false);
  });
  const desktop = window.matchMedia('(min-width: 768px)');
  desktop.addEventListener('change', () => setMenu(false));

  let scheduled = false;
  function updateScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    document.body.classList.toggle('scrolled', y > 25);
    scrollTop.classList.toggle('active', y > 600);
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, y / max)) : 0})`;
    let active = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 145) active = section; });
    if (max > 0 && y >= max - 4) active = sections[sections.length - 1];
    links.forEach(link => {
      const current = link.hash === `#${active.id}`;
      link.classList.toggle('active', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  window.addEventListener('resize', updateScroll);
  window.addEventListener('load', updateScroll);
  updateScroll();
  document.querySelector('#year').textContent = new Date().getFullYear();

  // Animate visible content rather than hiding it while waiting for JavaScript.
  const animations = new Set();
  function enter(element, delay = 0) {
    if (reducedMotion.matches || !element.animate) return;
    const animation = element.animate([
      { opacity: 0, transform: 'translateY(24px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 720, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    animations.add(animation);
    animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
  }
  const hero = document.querySelector('#hero');
  if (!window.location.hash || window.location.hash === '#hero') {
    hero.querySelectorAll('.hero-copy > *, .hero-portrait').forEach((element, index) => enter(element, index * 75));
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      let sequence = 0;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          enter(entry.target, sequence++ * 85);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal, .life-photo').forEach(element => {
      if (element.getBoundingClientRect().top >= window.innerHeight) observer.observe(element);
    });
  }

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const portrait = document.querySelector('.hero-portrait');
  const cards = [...document.querySelectorAll('.skill-card')];
  const targets = [portrait, ...cards];
  let pointerFrame = 0;
  function resetPointer() {
    cancelAnimationFrame(pointerFrame);
    targets.forEach(element => {
      element.style.removeProperty('--tilt-x');
      element.style.removeProperty('--tilt-y');
      element.style.removeProperty('--light-x');
      element.style.removeProperty('--light-y');
    });
  }
  targets.forEach(element => {
    element.addEventListener('pointermove', event => {
      if (reducedMotion.matches || !finePointer.matches) return;
      const rect = element.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        element.style.setProperty('--light-x', `${x * 100}%`);
        element.style.setProperty('--light-y', `${y * 100}%`);
        if (element === portrait) {
          element.style.setProperty('--tilt-x', `${(0.5 - y) * 4}deg`);
          element.style.setProperty('--tilt-y', `${(x - 0.5) * 4}deg`);
        }
      });
    }, { passive: true });
    element.addEventListener('pointerleave', resetPointer);
  });
  finePointer.addEventListener('change', resetPointer);
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      animations.forEach(animation => animation.cancel());
      resetPointer();
    }
  });
})();

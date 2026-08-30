(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });

  if (reduceMotion || !('IntersectionObserver' in window)) return;

  root.classList.add('motion-ready');

  const items = [...document.querySelectorAll('.reveal')];
  const heroItems = items.filter(el => el.closest('.hero'));

  requestAnimationFrame(() => {
    heroItems.forEach((el, i) => {
      window.setTimeout(() => el.classList.add('in-view'), 70 + i * 50);
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  items
    .filter(el => !el.closest('.hero'))
    .forEach(el => observer.observe(el));
})();

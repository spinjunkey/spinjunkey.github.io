(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 16);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive:true });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    root.classList.add('motion-ready');
    const reveals = [...document.querySelectorAll('.reveal')];
    const heroReveals = reveals.filter(el => el.closest('.hero'));
    requestAnimationFrame(() => heroReveals.forEach((el, i) => setTimeout(() => el.classList.add('in-view'), 80 + i * 70)));
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      });
    }, { threshold:.12, rootMargin:'0px 0px -8% 0px' });
    reveals.filter(el => !el.closest('.hero')).forEach(el => observer.observe(el));
  }

  const modalTriggers = [...document.querySelectorAll('[data-open-modal]')];
  let activeModal = null;
  let lastFocused = null;
  const focusableSelector = 'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

  function openModal(modal) {
    if (!modal) return;
    lastFocused = document.activeElement;
    activeModal = modal;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => modal.querySelector('.modal-panel').focus());
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    if (!activeModal) return;
    activeModal.hidden = true;
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onKeydown);
    const returnTo = lastFocused;
    activeModal = null;
    lastFocused = null;
    if (returnTo && typeof returnTo.focus === 'function') returnTo.focus();
  }

  function onKeydown(event) {
    if (!activeModal) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusables = [...activeModal.querySelectorAll(focusableSelector)].filter(el => !el.hasAttribute('hidden'));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }

  modalTriggers.forEach(trigger => trigger.addEventListener('click', () => openModal(document.getElementById(trigger.dataset.openModal))));
  document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
})();

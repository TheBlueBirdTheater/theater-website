const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCountUp(el: HTMLElement) {
  const target = Number(el.dataset.countTo ?? '0');
  const suffix = el.dataset.countSuffix ?? '';

  if (prefersReducedMotion()) {
    el.textContent = `${target}${suffix}`;
    return;
  }

  const duration = 6000;
  const start = performance.now();

  // Ease-in (not ease-out) so the count visibly winds up to speed rather
  // than jumping most of the way there in the first instant.
  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = Math.pow(progress, 3);
    el.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

/** Counts up each stat independently of the fade-reveal below — it needs
 * to actually be in view (not just peeking past the fade threshold) before
 * the numbers start climbing. */
function initCountUps() {
  const counters = document.querySelectorAll<HTMLElement>('[data-count-to]');
  if (counters.length === 0) return;

  if (prefersReducedMotion()) {
    counters.forEach(animateCountUp);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        animateCountUp(entry.target as HTMLElement);
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.6 },
  );

  counters.forEach((el) => observer.observe(el));
}

function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (items.length === 0) return;

  if (prefersReducedMotion()) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  items.forEach((el) => {
    const delay = el.dataset.revealDelay;
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('in-view');
        obs.unobserve(el);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  items.forEach((el) => observer.observe(el));
}

function initNavbarScroll() {
  const header = document.querySelector<HTMLElement>('header[data-navbar]');
  if (!header) return;

  const updateScrolled = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 80);
  };

  updateScrolled();
  window.addEventListener('scroll', updateScrolled, { passive: true });
}

function initLightbox() {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    const opener = target.closest<HTMLElement>('[data-lightbox-open]');
    if (opener) {
      const id = opener.getAttribute('data-lightbox-open');
      const dialog = id ? document.getElementById(id) : null;
      if (dialog instanceof HTMLDialogElement) dialog.showModal();
      return;
    }

    const closer = target.closest<HTMLElement>('[data-lightbox-close]');
    if (closer) {
      closer.closest('dialog')?.close();
      return;
    }

    // A click that lands on the <dialog> element itself (not one of its
    // children) is a click on the backdrop area.
    if (target instanceof HTMLDialogElement && target.hasAttribute('data-lightbox')) {
      target.close();
    }
  });
}

initReveal();
initCountUps();
initNavbarScroll();
initLightbox();

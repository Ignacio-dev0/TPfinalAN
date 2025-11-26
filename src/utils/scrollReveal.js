// Lightweight scroll reveal using IntersectionObserver
// Usage: call initScrollReveal() once on app startup.

export default function initScrollReveal({
  selector = '.reveal',
  root = null,
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.08,
  once = true,
  // If autoInject is true, automatically add the reveal class to sensible page elements
  autoInject = true,
  // per-element stagger (ms) when auto-injecting
  staggerMs = 80
} = {}) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // If no IO support, simply reveal everything
    document.querySelectorAll(selector).forEach(el => el.classList.add('reveal--visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('reveal--visible');
        if (once) observer.unobserve(el);
      }
    });
  }, { root, rootMargin, threshold });

  // Optionally auto-inject reveal class into sections and major blocks across the page
  if (autoInject && typeof document !== 'undefined') {
    try {
      // target header/footer + all immediate children inside each main > section
      const anchors = [];

      // header & footer
      document.querySelectorAll('header, footer').forEach(el => anchors.push(el));

      // for each main > section, inject reveal on immediate children with a small stagger
      const sections = document.querySelectorAll('main > section');
      sections.forEach((sec, sIdx) => {
        const children = Array.from(sec.children).filter(c => c.nodeType === 1);
        children.forEach((ch, idx) => {
          anchors.push(ch);
        });
      });

      // Add the class with inline stagger if not present
      anchors.forEach((el, index) => {
        if (!(el instanceof HTMLElement)) return;
        if (!el.classList.contains(selector.replace(/^\./, ''))) {
          el.classList.add(selector.replace(/^\./, ''));
          // only set delay when not already set by dev
          if (!el.style.getPropertyValue('--sr-delay')) {
            el.style.setProperty('--sr-delay', `${index * staggerMs}ms`);
          }
        }
      });
    } catch (err) {
      // silently ignore DOM issues
      // console.warn('scrollReveal auto-inject failed', err);
    }
  }

  // Observe existing and future nodes (observe nodes present now)
  const nodes = document.querySelectorAll(selector);
  nodes.forEach(n => observer.observe(n));

  // Simple live-observer: observe nodes added later matching selector
  const mutationObserver = new MutationObserver(mutations => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        if (node.matches && node.matches(selector)) observer.observe(node);
        // Also check children
        node.querySelectorAll && node.querySelectorAll(selector).forEach(n => observer.observe(n));
      }
    }
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  // Return observer for possible cleanup (not used now)
  return { observer, mutationObserver };
}

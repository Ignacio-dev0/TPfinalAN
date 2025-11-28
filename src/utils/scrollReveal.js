// scrollReveal.js - Versión mejorada y simplificada
export default function initScrollReveal(options = {}) {
  // Configuración por defecto
  const config = {
    selector: '.reveal',
    root: null,
    rootMargin: '0px 0px -50px 0px', // Más temprano para mejor UX
    threshold: 0.1, // Más sensible
    once: true,
    staggerMs: 80,
    ...options
  };

  // Verificar soporte de IntersectionObserver
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Fallback: mostrar todo inmediatamente
    document.querySelectorAll(config.selector).forEach(el => {
      el.classList.add('reveal--visible');
    });
    return;
  }

  // Crear el observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        // Agregar un pequeño delay para mejor efecto visual
        setTimeout(() => {
          el.classList.add('reveal--visible');
        }, 50);
        
        if (config.once) {
          observer.unobserve(el);
        }
      }
    });
  }, { 
    root: config.root, 
    rootMargin: config.rootMargin, 
    threshold: config.threshold 
  });

  // Observar elementos existentes
  const elements = document.querySelectorAll(config.selector);
  elements.forEach((el, index) => {
    // Agregar delay escalonado si no está definido
    if (!el.style.getPropertyValue('--sr-delay')) {
      const delay = index * config.staggerMs;
      el.style.setProperty('--sr-delay', `${delay}ms`);
    }
    
    observer.observe(el);
  });

  // Observer para elementos dinámicos
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element nodes only
          if (node.matches && node.matches(config.selector)) {
            observer.observe(node);
          }
          if (node.querySelectorAll) {
            node.querySelectorAll(config.selector).forEach(el => {
              observer.observe(el);
            });
          }
        }
      });
    });
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  return { observer, mutationObserver };
}
/**
 * AVO HealthCare - Advanced Animation Engine
 * Handles scroll reveals, 3D tilt effects, parallax background movement,
 * and high-performance interactive micro-animations.
 */
export class AnimationEngine {
  constructor() {
    this.observer = null;
    this.initScrollReveal();
    this.initTiltEffects();
    this.initParallaxElements();
  }

  /**
   * Initializes IntersectionObserver for scroll animations
   */
  initScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          
          // Trigger stat counters if element has data-counter
          if (entry.target.hasAttribute('data-counter')) {
            this.animateCounter(entry.target);
          }

          // Handle staggered children animations
          const staggeredChildren = entry.target.querySelectorAll('[data-stagger]');
          staggeredChildren.forEach((child, index) => {
            child.style.transitionDelay = `${index * 120}ms`;
            child.classList.add('is-revealed');
          });
        }
      });
    }, observerOptions);

    // Observe all revealable elements
    document.querySelectorAll('.reveal-on-scroll, [data-counter]').forEach((el) => {
      this.observer.observe(el);
    });
  }

  /**
   * Smooth number counter animation
   * @param {HTMLElement} element 
   */
  animateCounter(element) {
    if (element.dataset.counted === 'true') return;
    element.dataset.counted = 'true';

    const target = parseFloat(element.getAttribute('data-target') || element.innerText);
    const suffix = element.getAttribute('data-suffix') || '';
    const prefix = element.getAttribute('data-prefix') || '';
    const duration = parseInt(element.getAttribute('data-duration') || '1800', 10);
    const isDecimal = target % 1 !== 0;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeProgress * target;

      element.innerText = `${prefix}${isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal).toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.innerText = `${prefix}${isDecimal ? target.toFixed(1) : target.toLocaleString()}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  }

  /**
   * 3D Perspective Tilt on interactive cards
   */
  initTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach((el) => {
      const maxTilt = parseFloat(el.getAttribute('data-tilt-max') || '12');

      const handleMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      };

      const handleMouseLeave = () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      };

      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
  }

  /**
   * Dynamic parallax tracking on subtle floating decorative elements
   */
  initParallaxElements() {
    const floatingBlobs = document.querySelectorAll('.ambient-orb, .parallax-shape');
    if (!floatingBlobs.length) return;

    window.addEventListener('mousemove', (e) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

      floatingBlobs.forEach((blob, index) => {
        const depth = (index + 1) * 15;
        blob.style.transform = `translate(${xRatio * depth}px, ${yRatio * depth}px)`;
      });
    }, { passive: true });
  }

  /**
   * Re-scans DOM for dynamically added elements to observe
   */
  refresh() {
    document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)').forEach((el) => {
      this.observer?.observe(el);
    });
    this.initTiltEffects();
  }
}

/**
 * AVO HealthCare - NavbarView
 * Handles navigation bar events, theme toggle binding, and active link state
 */
export class NavbarView {
  constructor(appViewModel) {
    this.vm = appViewModel;
    this.navElement = document.querySelector('.navbar');
    this.themeBtn = document.getElementById('theme-toggle-btn');
    this.mobileToggle = document.getElementById('mobile-menu-toggle');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.mobileMenu = document.getElementById('mobile-nav-drawer');

    this.bindEvents();
  }

  bindEvents() {
    // Theme toggle
    if (this.themeBtn) {
      this.themeBtn.addEventListener('click', () => this.vm.toggleTheme());
    }

    // Subscribe to theme updates to change button icon
    this.vm.theme.subscribe((theme) => {
      if (this.themeBtn) {
        if (theme === 'dark') {
          this.themeBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        } else {
          this.themeBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        }
        this.themeBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      }
    }, true);

    // Window scroll event for sticky shadow
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        this.navElement?.classList.add('scrolled');
      } else {
        this.navElement?.classList.remove('scrolled');
      }
      this.updateActiveSectionOnScroll();
    }, { passive: true });

    // Nav links smooth scroll & click
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            this.vm.closeMobileMenu();
          }
        }
      });
    });

    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => this.vm.toggleMobileMenu());
    }

    this.vm.isMobileMenuOpen.subscribe((isOpen) => {
      if (this.mobileMenu) {
        this.mobileMenu.classList.toggle('is-open', isOpen);
      }
    });
  }

  updateActiveSectionOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 140;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        this.navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
}

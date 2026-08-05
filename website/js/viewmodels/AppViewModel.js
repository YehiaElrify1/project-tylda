import { Observable } from '../core/Observable.js';

/**
 * AVO HealthCare - AppViewModel
 * Manages global application state (Theme, Mobile Menu, Active Section, Notifications)
 */
export class AppViewModel {
  constructor() {
    const savedTheme = localStorage.getItem('avo_theme') || 'light';
    this.theme = new Observable(savedTheme);
    this.isMobileMenuOpen = new Observable(false);
    this.activeSection = new Observable('hero');
    this.toast = new Observable(null);

    // Apply initial theme
    this.theme.subscribe((t) => {
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('avo_theme', t);
    }, true);
  }

  toggleTheme() {
    this.theme.value = this.theme.value === 'light' ? 'dark' : 'light';
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.value = !this.isMobileMenuOpen.value;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.value = false;
  }

  setActiveSection(sectionId) {
    this.activeSection.value = sectionId;
  }

  showToast(message, type = 'success') {
    this.toast.value = { message, type, id: Date.now() };
    setTimeout(() => {
      if (this.toast.value?.id === this.toast.value?.id) {
        this.toast.value = null;
      }
    }, 3500);
  }
}

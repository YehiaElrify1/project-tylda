/**
 * AVO HealthCare - ScreensView
 * Interactive App Screens Gallery and Flow Explorer
 */
export class ScreensView {
  constructor() {
    this.track = document.getElementById('screens-track');
    this.prevBtn = document.getElementById('screens-prev-btn');
    this.nextBtn = document.getElementById('screens-next-btn');
    this.currentOffset = 0;

    this.bindEvents();
  }

  bindEvents() {
    this.prevBtn?.addEventListener('click', () => {
      this.scroll(-320);
    });

    this.nextBtn?.addEventListener('click', () => {
      this.scroll(320);
    });
  }

  scroll(amount) {
    if (!this.track) return;
    const maxScroll = this.track.scrollWidth - this.track.clientWidth;
    this.currentOffset = Math.max(0, Math.min(this.currentOffset + amount, maxScroll));
    this.track.style.transform = `translateX(-${this.currentOffset}px)`;
  }
}

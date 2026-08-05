/**
 * AVO HealthCare - ReminderView
 * Interactive Medication Scheduler & Adherence Gauge Demo
 */
export class ReminderView {
  constructor(reminderViewModel) {
    this.vm = reminderViewModel;
    this.timelineContainer = document.getElementById('reminder-timeline-list');
    this.adherenceBar = document.getElementById('adherence-progress-bar');
    this.adherencePercent = document.getElementById('adherence-percentage-text');

    this.bindEvents();
  }

  bindEvents() {
    this.vm.medications.subscribe((meds) => {
      this.renderTimeline(meds);
    }, true);

    this.vm.adherenceRate.subscribe((rate) => {
      if (this.adherenceBar) {
        this.adherenceBar.style.width = `${rate}%`;
      }
      if (this.adherencePercent) {
        this.adherencePercent.innerText = `${rate}%`;
      }
    }, true);

    this.timelineContainer?.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.med-toggle-btn');
      if (toggleBtn) {
        const medId = toggleBtn.getAttribute('data-med-id');
        if (medId) {
          this.vm.toggleTaken(medId);
        }
      }
    });
  }

  renderTimeline(meds) {
    if (!this.timelineContainer) return;

    this.timelineContainer.innerHTML = meds
      .map(
        (med) => `
      <div class="doctor-selection-row" style="margin-bottom: 12px; justify-content: space-between; opacity: ${med.taken ? 0.75 : 1};">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 0.78rem; font-weight: 800; width: 44px; height: 44px; border-radius: 10px; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; letter-spacing: 0.5px;">
            ${med.type || 'Rx'}
          </div>
          <div>
            <h4 style="font-size: 0.98rem; text-decoration: ${med.taken ? 'line-through' : 'none'};">${med.name}</h4>
            <div style="font-size: 0.82rem; color: var(--text-secondary);">${med.time} · <em>${med.condition}</em></div>
          </div>
        </div>
        <button class="btn btn-sm ${med.taken ? 'btn-secondary' : 'btn-primary'} med-toggle-btn" data-med-id="${med.id}">
          ${med.taken ? 'Taken' : 'Mark Taken'}
        </button>
      </div>
    `
      )
      .join('');
  }
}

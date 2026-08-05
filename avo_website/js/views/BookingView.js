/**
 * AVO HealthCare - BookingView
 * View controller for the interactive doctor appointment booking demo
 */
export class BookingView {
  constructor(bookingViewModel) {
    this.vm = bookingViewModel;
    this.specialtiesContainer = document.getElementById('booking-specialties');
    this.doctorCardContainer = document.getElementById('booking-doctor-card');
    this.daysContainer = document.getElementById('booking-days');
    this.slotsContainer = document.getElementById('booking-slots');
    this.confirmBtn = document.getElementById('booking-confirm-btn');
    this.modalContainer = document.getElementById('booking-result-box');

    this.bindEvents();
  }

  bindEvents() {
    // Render Specialties
    if (this.specialtiesContainer) {
      this.specialtiesContainer.innerHTML = this.vm.specialties
        .map(
          (spec) => `
        <div class="specialty-card ${spec.id === this.vm.selectedSpecialty.value ? 'selected' : ''}" data-spec-id="${spec.id}">
          <img src="${spec.icon}" alt="${spec.name}" />
          <div style="font-size: 0.8rem; font-weight: 700;">${spec.name}</div>
        </div>
      `
        )
        .join('');

      this.specialtiesContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.specialty-card');
        if (card) {
          const specId = card.getAttribute('data-spec-id');
          this.vm.setSpecialty(specId);
        }
      });
    }

    // Subscribe to specialty changes
    this.vm.selectedSpecialty.subscribe((specId) => {
      document.querySelectorAll('.specialty-card').forEach((card) => {
        if (card.getAttribute('data-spec-id') === specId) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });
    });

    // Subscribe to doctor changes
    this.vm.selectedDoctor.subscribe((doc) => {
      this.renderDoctor(doc);
    }, true);

    // Render Days
    if (this.daysContainer) {
      this.daysContainer.innerHTML = this.vm.days
        .map(
          (d) => `
        <button class="role-tab-btn btn-sm ${d.id === this.vm.selectedDay.value ? 'active' : ''}" data-day-id="${d.id}">
          <strong>${d.label}</strong> <span style="font-size: 0.8rem; opacity: 0.8;">(${d.date})</span>
        </button>
      `
        )
        .join('');

      this.daysContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-day-id]');
        if (btn) {
          this.vm.setDay(btn.getAttribute('data-day-id'));
        }
      });
    }

    this.vm.selectedDay.subscribe((dayId) => {
      document.querySelectorAll('button[data-day-id]').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-day-id') === dayId);
      });
    });

    // Render Slots
    if (this.slotsContainer) {
      this.slotsContainer.innerHTML = this.vm.slots
        .map(
          (slot) => `
        <button class="time-slot-btn ${slot === this.vm.selectedSlot.value ? 'selected' : ''}" data-slot="${slot}">
          ${slot}
        </button>
      `
        )
        .join('');

      this.slotsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-slot]');
        if (btn) {
          this.vm.setSlot(btn.getAttribute('data-slot'));
        }
      });
    }

    this.vm.selectedSlot.subscribe((slot) => {
      document.querySelectorAll('button[data-slot]').forEach((btn) => {
        btn.classList.toggle('selected', btn.getAttribute('data-slot') === slot);
      });
    });

    // Confirm Booking
    this.confirmBtn?.addEventListener('click', () => {
      this.vm.confirmBooking();
    });

    // Subscribe to isBooked
    this.vm.isBooked.subscribe((booked) => {
      if (this.modalContainer) {
        if (booked) {
          const doc = this.vm.selectedDoctor.value;
          const slot = this.vm.selectedSlot.value;
          const day = this.vm.days.find((d) => d.id === this.vm.selectedDay.value);

          this.modalContainer.innerHTML = `
            <div style="background: var(--primary-light); border: 1px solid var(--primary); padding: 16px; border-radius: var(--radius-md); text-align: center; animation: message-slide-up 0.3s ease;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--primary); color: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h4 style="color: var(--primary); margin-bottom: 4px;">Appointment Confirmed</h4>
              <p style="font-size: 0.9rem; color: var(--text-primary); margin-bottom: 10px;">
                Reserved with <strong>${doc.name}</strong> on <strong>${day.label} (${day.date})</strong> at <strong>${slot}</strong>.
              </p>
              <span class="mini-badge" style="background: var(--primary); color: #fff;">Ref: #AVO-${Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
          `;
        } else {
          this.modalContainer.innerHTML = '';
        }
      }
    });
  }

  renderDoctor(doc) {
    if (!this.doctorCardContainer || !doc) return;
    this.doctorCardContainer.innerHTML = `
      <div class="doctor-selection-row">
        <img class="doc-thumb" src="${doc.avatar}" alt="${doc.name}" />
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="font-size: 1.05rem;">${doc.name}</h4>
            <span style="font-weight: 800; color: var(--primary);">${doc.fee}</span>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">${doc.specialtyName} · ${doc.hospital}</div>
          <div style="font-size: 0.8rem; color: var(--accent-amber); margin-top: 4px; display: flex; align-items: center; gap: 4px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>${doc.rating} (${doc.reviewsCount} reviews) · ${doc.experience}</span>
          </div>
        </div>
      </div>
    `;
  }
}

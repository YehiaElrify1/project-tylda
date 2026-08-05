import { Observable } from '../core/Observable.js';
import { SPECIALTIES, DOCTORS, AVAILABLE_DAYS, AVAILABLE_SLOTS } from '../models/BookingModel.js';

/**
 * AVO HealthCare - BookingViewModel
 * Manages the step-by-step appointment wizard state & doctor selection
 */
export class BookingViewModel {
  constructor() {
    this.specialties = SPECIALTIES;
    this.doctors = DOCTORS;
    this.days = AVAILABLE_DAYS;
    this.slots = AVAILABLE_SLOTS;

    this.selectedSpecialty = new Observable(this.specialties[0].id);
    this.selectedDoctor = new Observable(this.doctors[0]);
    this.selectedDay = new Observable(this.days[0].id);
    this.selectedSlot = new Observable(this.slots[0]);
    this.isBooked = new Observable(false);

    // Auto-update selected doctor when specialty changes
    this.selectedSpecialty.subscribe((specialtyId) => {
      const match = this.doctors.find((d) => d.specialty === specialtyId) || this.doctors[0];
      this.selectedDoctor.value = match;
      this.isBooked.value = false;
    });
  }

  setSpecialty(specialtyId) {
    this.selectedSpecialty.value = specialtyId;
  }

  setDoctor(doctor) {
    this.selectedDoctor.value = doctor;
    this.isBooked.value = false;
  }

  setDay(dayId) {
    this.selectedDay.value = dayId;
    this.isBooked.value = false;
  }

  setSlot(slot) {
    this.selectedSlot.value = slot;
    this.isBooked.value = false;
  }

  confirmBooking() {
    this.isBooked.value = true;
  }

  resetBooking() {
    this.isBooked.value = false;
  }
}

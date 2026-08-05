import { Observable } from '../core/Observable.js';

export const INITIAL_MEDICATIONS = [
  { id: 'm1', name: 'Metformin 500mg', time: '08:00 AM', condition: 'After breakfast', taken: true, type: 'Tab' },
  { id: 'm2', name: 'Omega-3 Fish Oil', time: '01:00 PM', condition: 'With lunch', taken: true, type: 'Cap' },
  { id: 'm3', name: 'Vitamin D3 (5000 IU)', time: '06:00 PM', condition: 'With meal', taken: false, type: 'Softgel' },
  { id: 'm4', name: 'Lisinopril 10mg', time: '09:30 PM', condition: 'Before bedtime', taken: false, type: 'Tab' }
];

/**
 * AVO HealthCare - ReminderViewModel
 * Handles medication timeline states, doses, adherence calculations, and notifications
 */
export class ReminderViewModel {
  constructor() {
    this.medications = new Observable([...INITIAL_MEDICATIONS]);
    this.adherenceRate = new Observable(this._calcAdherence(INITIAL_MEDICATIONS));
  }

  toggleTaken(medId) {
    const updated = this.medications.value.map((med) => {
      if (med.id === medId) {
        return { ...med, taken: !med.taken };
      }
      return med;
    });

    this.medications.value = updated;
    this.adherenceRate.value = this._calcAdherence(updated);
  }

  _calcAdherence(list) {
    const total = list.length;
    if (total === 0) return 100;
    const takenCount = list.filter((m) => m.taken).length;
    return Math.round((takenCount / total) * 100);
  }
}

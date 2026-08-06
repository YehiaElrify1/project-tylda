import { Observable } from '../core/Observable.js';
import { ECOSYSTEM_ROLES } from '../models/EcosystemModel.js';

/**
 * AVO HealthCare - EcosystemViewModel
 * Controls the 5-actor healthcare ecosystem state and role switching logic
 */
export class EcosystemViewModel {
  constructor() {
    this.roles = ECOSYSTEM_ROLES;
    this.selectedRoleId = new Observable('patient');
    this.currentRole = new Observable(this.roles[0]);

    this.selectedRoleId.subscribe((roleId) => {
      const match = this.roles.find((r) => r.id === roleId);
      if (match) {
        this.currentRole.value = match;
      }
    });
  }

  selectRole(roleId) {
    if (this.selectedRoleId.value !== roleId) {
      this.selectedRoleId.value = roleId;
    }
  }
}

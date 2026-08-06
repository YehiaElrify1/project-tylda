/**
 * AVO HealthCare - EcosystemView
 * Renders the interactive tabs and smoothly animated capability card for the 5 roles
 */
export class EcosystemView {
  constructor(ecosystemViewModel) {
    this.vm = ecosystemViewModel;
    this.tabButtons = document.querySelectorAll('.role-tab-btn');
    this.cardContainer = document.getElementById('ecosystem-card-container');

    this.bindEvents();
  }

  bindEvents() {
    this.tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const roleId = btn.getAttribute('data-role');
        if (roleId) {
          this.vm.selectRole(roleId);
        }
      });
    });

    this.vm.selectedRoleId.subscribe((activeId) => {
      this.tabButtons.forEach((btn) => {
        if (btn.getAttribute('data-role') === activeId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    });

    this.vm.currentRole.subscribe((role) => {
      this.renderRoleCard(role);
    }, true);
  }

  renderRoleCard(role) {
    if (!this.cardContainer || !role) return;

    // Fade animation trigger
    this.cardContainer.style.opacity = '0';
    this.cardContainer.style.transform = 'translateY(10px)';

    setTimeout(() => {
      const capabilitiesHtml = role.capabilities
        .map(
          (cap) => `
        <li class="capability-item">
          <span class="capability-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </span>
          <span>${cap}</span>
        </li>
      `
        )
        .join('');

      this.cardContainer.innerHTML = `
        <div class="ecosystem-role-info">
          <div class="section-tag" style="margin-bottom: 12px;">
            <span>${role.roleTag || 'Portal'}</span> · ${role.badge}
          </div>
          <h3>${role.title}</h3>
          <p>${role.summary}</p>
          <ul class="capability-list">
            ${capabilitiesHtml}
          </ul>
        </div>
        <div class="ecosystem-preview-visual" data-tilt data-tilt-max="8">
          <img class="ecosystem-preview-img" src="${role.image}" alt="${role.title}" />
        </div>
      `;

      this.cardContainer.style.opacity = '1';
      this.cardContainer.style.transform = 'translateY(0)';
    }, 180);
  }
}

import { ARCHITECTURE_LAYERS } from '../models/FeaturesModel.js';

/**
 * AVO HealthCare - ArchitectureView
 * Interactive 4-Layer Clean Architecture & MVVM Explorer
 */
export class ArchitectureView {
  constructor() {
    this.layers = ARCHITECTURE_LAYERS;
    this.container = document.getElementById('architecture-layers-container');
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = this.layers
      .map(
        (layer, idx) => `
      <div class="arch-layer-card ${idx === 0 ? 'active' : ''}" data-layer-idx="${idx}">
        <div class="layer-meta">
          <span class="layer-num">${layer.level}</span>
          <div class="layer-title">
            <h4>${layer.title}</h4>
            <p>${layer.subtitle}</p>
          </div>
        </div>
        <div class="feature-badge-row">
          ${layer.techs.map((t) => `<span class="mini-badge">${t}</span>`).join('')}
        </div>
      </div>
    `
      )
      .join('');

    this.container.addEventListener('click', (e) => {
      const card = e.target.closest('.arch-layer-card');
      if (card) {
        document.querySelectorAll('.arch-layer-card').forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
      }
    });
  }
}

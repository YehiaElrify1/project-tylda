/**
 * AVO HealthCare - DiagramsView
 * Handles interactive software engineering diagram switching with smooth transitions
 */

export const DIAGRAM_DATA = {
  dfd0: {
    title: "Context Level DFD (Level 0)",
    desc: "High-level information boundary depicting all 5 primary actors (Patient, Doctor, Pharmacy, Laboratory, Admin) interacting with the unified AVO HealthCare core system.",
    image: "./assets/diagrams/dfd_level_0.png"
  },
  dfd1: {
    title: "Context Level DFD (Level 1)",
    desc: "Decomposed subsystem data flow mapping authentication, appointment scheduling, e-prescription generation, telemetry logging, and administrative oversight.",
    image: "./assets/diagrams/dfd_level_1.png"
  },
  usecase: {
    title: "Comprehensive Use Case Model",
    desc: "Complete functional specifications showing actor interactions with clinical triage, booking workflows, lab specimen uploads, pharmacy dispatch, and role management.",
    image: "./assets/diagrams/use_case.png"
  },
  sequence: {
    title: "System Sequence Diagram",
    desc: "Synchronous and asynchronous message flows across presentation UI, Bloc/Cubit ViewModels, Domain UseCases, and Firebase Cloud backends.",
    image: "./assets/diagrams/sequence_diagram.png"
  },
  activity_patient: {
    title: "Activity Diagram — Patient & Doctor",
    desc: "Decision flow chart showing patient appointment booking, doctor triage, consultation execution, and digital prescription issuance.",
    image: "./assets/diagrams/activity_patient_doctor.png"
  },
  activity_pharmacy: {
    title: "Activity Diagram — Pharmacy & Laboratory",
    desc: "Operational workflow for prescription fulfillment, inventory stock reconciliation, lab test specimen logging, and PDF diagnostic reporting.",
    image: "./assets/diagrams/activity_pharmacy_lab.png"
  },
  activity_admin: {
    title: "Activity Diagram — System Administration",
    desc: "Governance workflow for clinic verification, medical license auditing, system analytics inspection, and role permission management.",
    image: "./assets/diagrams/activity_admin.png"
  },
  class_model: {
    title: "Domain Class & Entity Diagram",
    desc: "Object-oriented class hierarchy detailing Patient, Doctor, Appointment, Prescription, Medication, LabTest, and Role permission entities.",
    image: "./assets/diagrams/class_diagram.png"
  },
  component: {
    title: "Component & Subsystem Diagram",
    desc: "Modular software packaging showing dependency injection via GetIt, Bloc state streams, repositories, and third-party cloud SDK connectors.",
    image: "./assets/diagrams/component_diagram.png"
  },
  deployment: {
    title: "Deployment & Infrastructure Diagram",
    desc: "End-to-end production hosting architecture covering iOS TestFlight, Android Play Store, Google Cloud Firestore, Firebase Auth, and CDN storage.",
    image: "./assets/diagrams/deployment_diagram.png"
  }
};

export class DiagramsView {
  constructor() {
    this.tabButtons = document.querySelectorAll('[data-diagram-tab]');
    this.imageEl = document.getElementById('diagram-active-img');
    this.titleEl = document.getElementById('diagram-active-title');
    this.descEl = document.getElementById('diagram-active-desc');

    this.bindEvents();
  }

  bindEvents() {
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-diagram-tab');
        if (key && DIAGRAM_DATA[key]) {
          this.switchDiagram(key, btn);
        }
      });
    });
  }

  switchDiagram(key, activeBtn) {
    const data = DIAGRAM_DATA[key];
    if (!data) return;

    this.tabButtons.forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');

    if (this.imageEl) {
      this.imageEl.style.opacity = '0';
      this.imageEl.style.transform = 'scale(0.97)';
      
      setTimeout(() => {
        this.imageEl.src = data.image;
        this.imageEl.alt = data.title;
        if (this.titleEl) this.titleEl.textContent = data.title;
        if (this.descEl) this.descEl.textContent = data.desc;

        this.imageEl.style.opacity = '1';
        this.imageEl.style.transform = 'scale(1)';
      }, 180);
    }
  }
}

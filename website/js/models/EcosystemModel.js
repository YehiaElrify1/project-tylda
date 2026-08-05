/**
 * AVO HealthCare - Ecosystem Model
 * Represents the 5 core integrated actors of the healthcare network
 */
export const ECOSYSTEM_ROLES = [
  {
    id: 'patient',
    title: 'Patient Portal',
    badge: 'Core Experience',
    roleTag: 'Patient',
    summary: 'Empowering individuals with complete control over appointments, medical history, and AI health support.',
    image: './assets/imgs/onboard/onboard1.svg',
    capabilities: [
      'Instant Doctor Search & Smart Slot Booking',
      'AI Medical Assistant with symptom checks & scan analysis',
      'Live Medication Tracker with smart dosage alerts',
      'Unified Digital Health Records & E-Prescriptions',
      'Real-time Chat with specialists & lab result downloads'
    ]
  },
  {
    id: 'doctor',
    title: 'Doctor Portal',
    badge: 'Clinical Care',
    roleTag: 'Physician',
    summary: 'Streamlined clinical workflow management, patient consultations, and digital prescription issuance.',
    image: './assets/imgs/onboard/onboard2.svg',
    capabilities: [
      'Interactive Consultation Calendar & Patient Queue',
      'Instant Digital Rx Generator with Pharmacy Auto-Sync',
      'Patient History Timeline & Radiology/Lab Insights',
      'Secure Encrypted Telehealth & Chat Channel',
      'Treatment Progress Tracking & Follow-up Triggers'
    ]
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy Network',
    badge: 'Fulfillment',
    roleTag: 'Pharmacy',
    summary: 'Direct digital prescription fulfillment with inventory synchronization and delivery tracking.',
    image: './assets/imgs/onboard/onboard3.svg',
    capabilities: [
      'Direct Digital Prescription Ingestion from Doctors',
      'Real-Time Medicine Inventory & Availability Sync',
      'Automated Drug Interaction & Dosage Safety Checks',
      'Patient Order Tracking & Prescription Dispensation',
      'Direct Chat with Prescribing Physicians'
    ]
  },
  {
    id: 'laboratory',
    title: 'Diagnostic Labs & Radiology',
    badge: 'Diagnostics',
    roleTag: 'Laboratory',
    summary: 'Fast test requisition management, digital result dispatch, and seamless patient report archiving.',
    image: './assets/imgs/onboard/onboard3.svg',
    capabilities: [
      'Digital Test Order Reception & Specimen Tracking',
      'Direct Diagnostic Report Upload & PDF Generation',
      'Immediate Automated Patient & Doctor Notification',
      'Historical Trend Analysis for Diagnostic Biomarkers',
      'Integrated Imaging & Radiology DICOM/PDF Viewer'
    ]
  },
  {
    id: 'admin',
    title: 'Health System Admin',
    badge: 'Governance',
    roleTag: 'Administration',
    summary: 'Enterprise-grade governance, provider credential verification, analytics, and security oversight.',
    image: './assets/imgs/onboard/onboard1.svg',
    capabilities: [
      'Medical Provider License & Credential Verification',
      'System-wide Clinical & Operations KPI Analytics',
      'HIPAA & GDPR Compliant Audit Trail Logging',
      'Role-Based Access Control (RBAC) & Security Policies',
      'Network Performance & Uptime Monitoring'
    ]
  }
];

/**
 * AVO HealthCare - Features & Architecture Model
 */

export const BRAND_PILLARS = [
  {
    letter: 'A',
    word: 'Automate',
    tagline: 'Effortless Clinical Operations',
    description: 'Eliminate paperwork through automated appointment scheduling, instant digital prescriptions, and proactive medication reminder alerts.',
    color: '#00876B'
  },
  {
    letter: 'V',
    word: 'Visualize',
    tagline: 'Instant Diagnostic Clarity',
    description: 'Empower patients and physicians with visual health trend telemetry, radiology reports, and AI-driven symptom mapping.',
    color: '#10B981'
  },
  {
    letter: 'O',
    word: 'Optimize',
    tagline: 'Peak System Performance',
    description: 'Optimize wait times, healthcare provider workflows, inventory turnaround, and cross-facility communication.',
    color: '#0284C7'
  }
];

export const ARCHITECTURE_LAYERS = [
  {
    level: '04',
    title: 'View Layer (UI & Presentation)',
    subtitle: 'Flutter Screens · Custom Widgets · Responsive ScreenUtil',
    description: 'Clean UI composed of atomic, highly reusable widgets with adaptive screen utility scaling, localized strings, and dynamic theme switching.',
    techs: ['Flutter SDK', 'ScreenUtil', 'GoRouter', 'Custom Themes']
  },
  {
    level: '03',
    title: 'ViewModel / Cubit Layer',
    subtitle: 'State Management · Reactive Event Handling · Streams',
    description: 'Decoupled presentation logic utilizing BLoC and Cubit state patterns. Emits immutable UI states and isolates UI from domain side-effects.',
    techs: ['Flutter BLoC', 'Cubit', 'Reactive Streams', 'Provider']
  },
  {
    level: '02',
    title: 'Domain Layer (Pure Business Logic)',
    subtitle: 'Use Cases · Entities · Abstract Repository Interfaces',
    description: 'Zero external framework dependencies. Houses core enterprise health business rules, clinical validation policies, and domain entity structures.',
    techs: ['Use Cases', 'Entities', 'DART Pure Logic', 'Failures & Exceptions']
  },
  {
    level: '01',
    title: 'Data & Infrastructure Layer',
    subtitle: 'Repositories · Firebase Auth · Firestore · Cloud Storage',
    description: 'Concrete repository implementations, remote data sources, local offline caches, and cloud infrastructure connectivity.',
    techs: ['Firebase Auth', 'Cloud Firestore', 'Firebase Storage', 'HTTP & REST']
  }
];

export const APP_METRICS = [
  { target: 99.8, suffix: '%', label: 'System Reliability', duration: 1600 },
  { target: 50, suffix: 'k+', label: 'Active Patients', duration: 2000 },
  { target: 120, suffix: '+', label: 'Verified Physicians', duration: 1800 },
  { target: 1.2, suffix: 's', label: 'AI Diagnostic Latency', duration: 1400 }
];

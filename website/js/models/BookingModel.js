/**
 * AVO HealthCare - Booking Model
 * Master dataset for specialties, top doctors, and interactive booking appointment slots
 */

export const SPECIALTIES = [
  { id: 'cardiology', name: 'Cardiology', icon: './assets/imgs/categories/heart.png' },
  { id: 'neurology', name: 'Neurology', icon: './assets/imgs/categories/brain.png' },
  { id: 'dermatology', name: 'Dermatology', icon: './assets/imgs/categories/Dermatology.png' },
  { id: 'pediatrics', name: 'Pediatrics', icon: './assets/imgs/categories/Pediatrics.png' },
  { id: 'dental', name: 'Dental Care', icon: './assets/imgs/categories/Dental.png' },
  { id: 'ophthalmology', name: 'Eye Clinic', icon: './assets/imgs/categories/Ophthalmology.png' }
];

export const DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Youssef Mansour',
    specialty: 'cardiology',
    specialtyName: 'Consultant Cardiologist',
    hospital: 'AVO Heart Institute',
    rating: 4.9,
    reviewsCount: 328,
    experience: '14+ Years',
    avatar: './assets/imgs/doctor/doctor1.png',
    fee: '$45'
  },
  {
    id: 'doc-2',
    name: 'Dr. Nour El-Din',
    specialty: 'neurology',
    specialtyName: 'Senior Neurologist',
    hospital: 'AVO Neuro Center',
    rating: 4.8,
    reviewsCount: 215,
    experience: '11+ Years',
    avatar: './assets/imgs/doctor/doctor2.png',
    fee: '$50'
  },
  {
    id: 'doc-3',
    name: 'Dr. Mariam Tarek',
    specialty: 'dermatology',
    specialtyName: 'Dermatology & Laser',
    hospital: 'AVO Aesthetic Care',
    rating: 5.0,
    reviewsCount: 412,
    experience: '9+ Years',
    avatar: './assets/imgs/doctor/doctor3.png',
    fee: '$40'
  },
  {
    id: 'doc-4',
    name: 'Dr. Karim Fathy',
    specialty: 'pediatrics',
    specialtyName: 'Pediatric Specialist',
    hospital: 'AVO Children Clinic',
    rating: 4.9,
    reviewsCount: 198,
    experience: '12+ Years',
    avatar: './assets/imgs/doctor/doctor4.png',
    fee: '$35'
  },
  {
    id: 'doc-5',
    name: 'Dr. Laila Samir',
    specialty: 'ophthalmology',
    specialtyName: 'Cornea & Vision Specialist',
    hospital: 'AVO Vision Hospital',
    rating: 4.8,
    reviewsCount: 260,
    experience: '10+ Years',
    avatar: './assets/imgs/doctor/doctor5.png',
    fee: '$45'
  }
];

export const AVAILABLE_DAYS = [
  { id: 'today', label: 'Today', date: 'Aug 5' },
  { id: 'tomorrow', label: 'Tomorrow', date: 'Aug 6' },
  { id: 'day-after', label: 'Thursday', date: 'Aug 7' }
];

export const AVAILABLE_SLOTS = [
  '09:30 AM',
  '11:00 AM',
  '02:15 PM',
  '04:30 PM',
  '06:00 PM',
  '07:30 PM'
];

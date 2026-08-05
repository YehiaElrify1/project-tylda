/**
 * AVO HealthCare - Main Application Entrypoint (MVVM Bootstrap)
 */
import { AnimationEngine } from './core/AnimationEngine.js';
import { AppViewModel } from './viewmodels/AppViewModel.js';
import { EcosystemViewModel } from './viewmodels/EcosystemViewModel.js';
import { ChatViewModel } from './viewmodels/ChatViewModel.js';
import { BookingViewModel } from './viewmodels/BookingViewModel.js';
import { ReminderViewModel } from './viewmodels/ReminderViewModel.js';

import { NavbarView } from './views/NavbarView.js';
import { EcosystemView } from './views/EcosystemView.js';
import { ChatView } from './views/ChatView.js';
import { BookingView } from './views/BookingView.js';
import { ReminderView } from './views/ReminderView.js';
import { ArchitectureView } from './views/ArchitectureView.js';
import { DiagramsView } from './views/DiagramsView.js';
import { ScreensView } from './views/ScreensView.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize ViewModels (State)
  const appViewModel = new AppViewModel();
  const ecosystemViewModel = new EcosystemViewModel();
  const chatViewModel = new ChatViewModel();
  const bookingViewModel = new BookingViewModel();
  const reminderViewModel = new ReminderViewModel();

  // 2. Initialize Views (Component Controllers)
  new NavbarView(appViewModel);
  new EcosystemView(ecosystemViewModel);
  new ChatView(chatViewModel);
  new BookingView(bookingViewModel);
  new ReminderView(reminderViewModel);
  new ArchitectureView();
  new DiagramsView();
  new ScreensView();

  // 3. Initialize Advanced Animations & Scroll Observers
  const animationEngine = new AnimationEngine();

  // Expose global instance for debugging/testing if needed
  window.avoApp = {
    appViewModel,
    ecosystemViewModel,
    chatViewModel,
    bookingViewModel,
    reminderViewModel,
    animationEngine
  };

  console.log('AVO HealthCare Website initialized with MVVM Architecture');
});

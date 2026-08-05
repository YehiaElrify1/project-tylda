/**
 * AVO HealthCare - Core Observable
 * Lightweight reactive state container enabling two-way data binding
 * and decoupled Observer pattern for MVVM architecture.
 */
export class Observable {
  constructor(initialValue) {
    this._value = initialValue;
    this._listeners = new Set();
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    if (this._value !== newValue) {
      const oldValue = this._value;
      this._value = newValue;
      this.notify(newValue, oldValue);
    }
  }

  /**
   * Set value silently without triggering listeners
   */
  setSilent(newValue) {
    this._value = newValue;
  }

  /**
   * Subscribe a callback to value changes
   * @param {Function} callback - Function(newValue, oldValue)
   * @param {boolean} [immediate=false] - Whether to fire immediately with current value
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback, immediate = false) {
    this._listeners.add(callback);
    if (immediate) {
      try {
        callback(this._value, this._value);
      } catch (err) {
        console.error('[Observable] Error in immediate callback:', err);
      }
    }
    return () => this._listeners.delete(callback);
  }

  /**
   * Notify all registered listeners
   */
  notify(newValue, oldValue) {
    this._listeners.forEach((callback) => {
      try {
        callback(newValue, oldValue);
      } catch (err) {
        console.error('[Observable] Error in listener execution:', err);
      }
    });
  }
}

/**
 * EventBus for global decoupled domain/view-model events
 */
export class EventBus {
  constructor() {
    this._events = new Map();
  }

  on(event, handler) {
    if (!this._events.has(event)) {
      this._events.set(event, new Set());
    }
    this._events.get(event).add(handler);
    return () => this._events.get(event)?.delete(handler);
  }

  emit(event, data) {
    if (this._events.has(event)) {
      this._events.get(event).forEach((handler) => {
        try {
          handler(data);
        } catch (err) {
          console.error(`[EventBus] Error in event '${event}':`, err);
        }
      });
    }
  }
}

export const globalEventBus = new EventBus();

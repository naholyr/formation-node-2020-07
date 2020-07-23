export class EventEmitter {
  #handlers = {};

  on(name, handler) {
    (this.#handlers[name] = this.#handlers[name] || []).push(handler);
    return () => this.off(name, handler);
  }

  off(name, handler = null) {
    if (!handler) {
      delete this.#handlers[name];
    } else if (this.#handlers[name]) {
      this.#handlers[name] = this.#handlers[name].filter((h) => h !== handler);
    }
  }

  once(name, handler) {
    const off = this.on(name, (...data) => {
      handler(...data);
      off();
    });
  }

  emit(name, ...data) {
    if (!this.#handlers[name] || !this.#handlers[name].length) return false;
    this.#handlers[name].forEach((handler) => handler(...data));
    return true;
  }
}

export const eventEmitter = new EventEmitter();

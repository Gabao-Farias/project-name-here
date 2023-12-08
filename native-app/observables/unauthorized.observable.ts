/**
 * The main objective of this, is to deal with unauthorized response of axios requests
 * to auto logout user.
 */
class UnauthorizedObservableClass {
  private observers: (() => void)[] = [];

  constructor() {
    this.observers = [];
  }

  /**
   * Subscribes function to be triggered when notified.
   * @param func
   */
  subscribe(func: () => void) {
    this.observers.push(func);
  }

  unsubscribe(func: () => void) {
    this.observers = this.observers.filter(observer => observer !== func);
  }

  notify() {
    this.observers.forEach(observer => observer());
  }
}

export const UnauthorizedObservable = new UnauthorizedObservableClass();

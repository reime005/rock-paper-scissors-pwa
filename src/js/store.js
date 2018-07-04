import { initialState } from './config/initialState';
import reducer from './reducer';

export class Store {
  constructor() {
    this.state = initialState;
    this.subscribers = [];
  }

  dispatch(action) {
    this.state = reducer(this.state, action);
    this.notifySubscribers();
    return action;
  }

  notifySubscribers() {
    this.subscribers.forEach(subscriber => {
      subscriber(this.state);
    });
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  getState() {
    return this.state;
  }
}
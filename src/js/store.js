import * as types from './actions/actionTypes';

export class Store {
  constructor(initialState) {
    this.state = initialState;
    this.subscribers = [];
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.notifySubscribers();
    return action;
  }

  reducer(state, action) {
    let nextState = state || this.state;
  
    switch (action.type) {
      case types.TEST_ACTION:
        nextState = {
          ...state,
          test: action.test,
        }
        break;
      default:
    }

    return nextState;
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
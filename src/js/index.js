import { TestObject } from "./testObject";
import { Store } from "./store";

export class App {
  constructor() {
    this.store = new Store();
  };
  
  init() {
    const parent = document.getElementById("container");
    //new TestObject({store: this.store, parent, id: 'testId'});
  };
}

const app = new App();

window.addEventListener('load', () => app.init());

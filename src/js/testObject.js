import { testAction } from "./actions/actions";

export class TestObject {
  constructor(props) {
    this.store = props.store;
    this.parent = props.parent;
    this.id = props.id;

    this._load();
  }

  _load() {
    const div = document.getElementById(this.id);
    this.div = div;

    const innerText = (text) => {
      return `<span>${text}</span>`;
    }

    div.innerHTML = innerText(this.store.getState().test);
    
    this.store.subscribe((state) => {
      this.div.innerHTML = innerText(state.test);
    });

    div.onclick = () => {
      this.store.dispatch(testAction('Clicked'));
    }
  }
} 
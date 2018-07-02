import { testAction } from "./actions/actions";
import { weaponTypes } from "./config/weapons";

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

    console.log(this.store.getState().weapons[weaponTypes.SCISSORS]);
    
    div.innerHTML = innerText(this.store.getState().weapons[weaponTypes.SCISSORS].beats);
    
    this.store.subscribe((state) => {
      this.div.innerHTML = innerText(state.test);
    });

    div.onclick = () => {
      this.store.dispatch(testAction('Clicked'));
    }
  }
} 
import { setGameModeAction } from "../actions/actions";
import { gameModes } from "../config/gameModes";

export class GameModeView {
  constructor(props) {
    this.store = props.store;
    this.state = props.store.getState();
    this.id = props.id;
    this._init();
  };
  
  _init() {
    this.self = document.getElementById(this.id);
    //TODO: hard coded string
    this.pvcElement = document.getElementById("PVC");
    this.cvcElement = document.getElementById("CVC");

    this.pvcElement.onclick = () => {
      this.store.dispatch(setGameModeAction(gameModes.PVC));
    }

    this.cvcElement.onclick = () => {
      this.store.dispatch(setGameModeAction(gameModes.CVC));
    }

    this.store.subscribe(this._render.bind(this));
  };

  _render(state) {
    if (this.state.gameMode !== state.gameMode) {
      
    }
  }
}

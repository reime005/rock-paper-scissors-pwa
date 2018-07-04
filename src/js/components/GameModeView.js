import { setGameModeAction } from "../actions/actions";
import { gameModes } from "../config/gameModes";
import { initialState } from "../config/initialState";

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

    if (this.state.gameMode === gameModes.CVC &&
      !this.cvcElement.classList.contains("selected")) {
        this.cvcElement.classList.add("selected")
    } else if (this.state.gameMode === gameModes.PVC &&
      !this.pvcElement.classList.contains("selected")) {
        this.pvcElement.classList.add("selected")
    }

    this.store.subscribe(this._render.bind(this));
  };

  _render(state) {
    if (state.started !== initialState.started || state.outcome !== initialState.outcome) {
      this.self.style.display = "none";
      this.pvcElement.classList.remove("selected")
      this.cvcElement.classList.remove("selected")
    } else if (state.started === initialState.started) {
      this.self.style.display = "block";
    }

    this.state = state;
  }
}

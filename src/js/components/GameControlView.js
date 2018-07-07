import { newGameAction, roundRestartAction } from "../actions/actions";
import { initialState } from "../config/initialState";

export class GameControlView {
  constructor(props) {
    this.store = props.store;
    this.state = props.store.getState();
    this.id = props.id;
    this._init();
  };
  
  _init() {
    this.self = document.getElementById(this.id);
    //TODO: hard coded string
    
    this.newGameButtonElement = document.getElementById("newGameButton");
    this.outcomeMessageElement = document.getElementById("outcomeMessage");
    this.countTextElement = document.getElementById("countText");
    this.roundRestartButtonElement = document.getElementById("roundRestartButton");

    this.newGameButtonElement.onclick = () => {
      this.store.dispatch(newGameAction());
    }

    this.roundRestartButtonElement.onclick = () => {
      this.store.dispatch(roundRestartAction());
    }

    this.store.subscribe(this._render.bind(this));
  };

  _render(state) {
    if (state.outcome === initialState.outcome) {
      this.self.style.display = "none";
    } else {
      this.self.style.display = "block";
    }

    if (this.state.outcomeMessage !== state.outcomeMessage) {
      this.outcomeMessageElement.innerText = state.outcomeMessage;
      this.countTextElement.innerText = `${state.player1Count} / ${state.player2Count}`;
    }

    this.state = state;
  }
}

import { playerChoiceAction } from "../actions/actions";
import { weaponTypes } from "../config/weapons";
import { initialState } from "../config/initialState";

export class GamePlayView {
  constructor(props) {
    this.store = props.store;
    this.state = props.store.getState();
    this.id = props.id;
    this._init();
  };
  
  _init() {
    this.self = document.getElementById(this.id);
    //TODO: hard coded string
    
    this.paperElement = document.getElementById("paper");
    this.rockElemet = document.getElementById("rock");
    this.scissorsElement = document.getElementById("scissors");

    this.paperElement.onclick = () => {
      this.store.dispatch(playerChoiceAction(weaponTypes.PAPER));
    }

    this.rockElemet.onclick = () => {
      this.store.dispatch(playerChoiceAction(weaponTypes.ROCK));
    }

    this.scissorsElement.onclick = () => {
      this.store.dispatch(playerChoiceAction(weaponTypes.SCISSORS));
    }

    this.player1Boxes = document.getElementsByClassName("weapon-select-box-player1");
    this.player2Boxes = document.getElementsByClassName("weapon-select-box-player2");

    this.store.subscribe(this._render.bind(this));
  };

  _render(state) {
    // prevent iterating through both lists by comparing with the previous state
    if (state.outcome === initialState.outcome && 
    this.state.outcome !== initialState.outcome) {
      this.player1Boxes[this.state.player1Choice].firstElementChild.classList.remove("selected");
      this.player2Boxes[this.state.player2Choice].firstElementChild.classList.remove("selected");
    } else {
      this.player1Boxes[state.player1Choice].firstElementChild.classList.add("selected");
      this.player2Boxes[state.player2Choice].firstElementChild.classList.add("selected");
    }
  
    this.state = state;
  }
}

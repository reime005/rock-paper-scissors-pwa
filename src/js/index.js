import { Store } from "./store";
import { GameModeView } from "./components/GameModeView";
import { GamePlayView } from "./components/GamePlayView";
import { GameControlView } from "./components/GameControlView";
import registerServiceWorker from "../../src/js/registerServiceWorker";

export class App {
  constructor() {
    this.store = new Store();
  };
  
  init() {
    this.gameModeViewInstane = new GameModeView({id: "gameModeViewContainer", store: this.store});
    this.gamePlayViewInstane = new GamePlayView({id: "gamePlayViewContainer", store: this.store});
    this.gameControlViewInstance = new GameControlView({id: "gameControlViewContainer", store: this.store});
  };
}

const app = new App();

window.addEventListener('load', () => {
  app.init();
  registerServiceWorker();
});

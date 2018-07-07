import { App } from "../js/index";
import { playerChoiceAction, roundEndAction, roundRestartAction, newGameAction, setGameModeAction } from "../js/actions/actions";
import { weaponTypes } from "../js/config/weapons";
import { outcomes } from "../js/config/outcomes";
import { initialState } from "../js/config/initialState";
import { gameModes } from "../js/config/gameModes";
import { players } from "../js/config/players";

let app = new App();

describe('Game of', () => {
  beforeEach(() => {
    app.store.dispatch(newGameAction());
  });

  it('paper vs scissor leads to lost', () => {
    app.store.dispatch(playerChoiceAction(weaponTypes.PAPER, weaponTypes.SCISSORS));
    expect(app.store.getState().outcome).toEqual(outcomes.LOST);
  });

  it('paper vs rock leads to win', () => {
    app.store.dispatch(playerChoiceAction(weaponTypes.PAPER, weaponTypes.ROCK));
    expect(app.store.getState().outcome).toEqual(outcomes.WON);
  });

  it('paper vs paper leads to tie', () => {
    app.store.dispatch(playerChoiceAction(weaponTypes.PAPER, weaponTypes.PAPER));
    expect(app.store.getState().outcome).toEqual(outcomes.TIE);
  });

  
  it('rock vs scissor leads to won', () => {
    app.store.dispatch(playerChoiceAction(weaponTypes.ROCK, weaponTypes.SCISSORS));
    expect(app.store.getState().outcome).toEqual(outcomes.WON);
  });

  it('rock vs rock leads to tie', () => {
    app.store.dispatch(playerChoiceAction(weaponTypes.ROCK, weaponTypes.ROCK));
    expect(app.store.getState().outcome).toEqual(outcomes.TIE);
  });

  it('rock vs paper leads to lost', () => {
    app.store.dispatch(playerChoiceAction(weaponTypes.ROCK, weaponTypes.PAPER));
    expect(app.store.getState().outcome).toEqual(outcomes.LOST);
  });


  it('scissor vs scissor leads to tie', () => {
    app.store.dispatch(playerChoiceAction(weaponTypes.SCISSORS, weaponTypes.SCISSORS));
    expect(app.store.getState().outcome).toEqual(outcomes.TIE);
  });

  it('scissor vs rock leads to lost', () => {
    app.store.dispatch(playerChoiceAction(weaponTypes.SCISSORS, weaponTypes.ROCK));
    expect(app.store.getState().outcome).toEqual(outcomes.LOST);
  });

  it('scissor vs paper leads to win', () => {
    app.store.dispatch(playerChoiceAction(weaponTypes.SCISSORS, weaponTypes.PAPER));
    expect(app.store.getState().outcome).toEqual(outcomes.WON);
  });

  it('computer vs computer game works', () => {
    app.store.dispatch(setGameModeAction(gameModes.CVC));

    // random games so that the chance that both players have won is high
    for (let i = 0; i < 100; i++) {
      app.store.dispatch(playerChoiceAction());
      app.store.dispatch(roundRestartAction());
    }

    expect(app.store.getState().player1Count).toBeGreaterThan(0);
    expect(app.store.getState().player2Count).toBeGreaterThan(0);
  });

  it('computer vs computer cover all weapons', () => {
    app.store.dispatch(setGameModeAction(gameModes.CVC));

    let rockPlayed = false;
    let scissorsPlayed = false;
    let paperPlayed = false;

    // random games so that the chance that both players have won is high
    for (let i = 0; i < 1000; i++) {
      app.store.dispatch(playerChoiceAction());

      if (app.store.getState().player1Choice === weaponTypes.ROCK ||
      app.store.getState().player2Choice === weaponTypes.ROCK) {
        rockPlayed = true;
      }

      if (app.store.getState().player1Choice === weaponTypes.SCISSORS ||
      app.store.getState().player2Choice === weaponTypes.SCISSORS) {
        scissorsPlayed = true;
      }

      if (app.store.getState().player1Choice === weaponTypes.PAPER ||
      app.store.getState().player2Choice === weaponTypes.PAPER) {
        paperPlayed = true;
      }

      app.store.dispatch(roundRestartAction());

      if (rockPlayed && scissorsPlayed && paperPlayed) {
        break;
      }
    }

    expect(rockPlayed).toBeTruthy();
    expect(scissorsPlayed).toBeTruthy();
    expect(paperPlayed).toBeTruthy();
  });

  it('round restart resets correctly', () => {
    app.store.dispatch(playerChoiceAction(weaponTypes.SCISSORS, weaponTypes.PAPER));

    app.store.dispatch(roundRestartAction());

    const newState = app.store.getState();
    expect(newState.outcome).toEqual(initialState.outcome);
    expect(newState.outcomeMessage).toEqual(initialState.outcomeMessage);
  });

  it('invalid move leads to error', () => {
    try {
      app.store.dispatch(playerChoiceAction("weaponTypes.SCISSORS", weaponTypes.PAPER));
    } catch (error) {
      expect(error).toBeDefined();
      return;
    }
    expect({}).toBeUndefined();
  });

  it('invalid round end leads to error', () => {
    try {
      app.store.dispatch(roundEndAction());
    } catch (error) {
      expect(error).toBeDefined();
      return;
    }
    expect({}).toBeUndefined();
  });

  it('is not possible for player 1 to change its choice', () => {
    app.store.dispatch(playerChoiceAction(weaponTypes.PAPER, weaponTypes.ROCK));
    expect(app.store.getState().player1Choice).toEqual(weaponTypes.PAPER);
  });

  it('player 2 causes game end', () => {
    app.store.dispatch(playerChoiceAction(weaponTypes.SCISSORS, weaponTypes.PAPER));
    expect(app.store.getState().outcome).toBeDefined();
  });

  it('set game mode when game is running not possible', () => {
    app.store.dispatch(setGameModeAction(gameModes.CVC));
    app.store.dispatch(setGameModeAction(gameModes.PVC));
    expect(app.store.getState().gameMode).toEqual(gameModes.CVC);
  });

  it('set game mode after new game', () => {
    app.store.dispatch(setGameModeAction(gameModes.PVC));
    app.store.dispatch(newGameAction());
    app.store.dispatch(setGameModeAction(gameModes.CVC));
    expect(app.store.getState().gameMode).toEqual(gameModes.CVC);
  });

  it('player have the correct points', () => {
    // win
    app.store.dispatch(playerChoiceAction(weaponTypes.ROCK, weaponTypes.SCISSORS));

    app.store.dispatch(roundRestartAction());

    // win
    app.store.dispatch(playerChoiceAction(weaponTypes.ROCK, weaponTypes.SCISSORS));

    app.store.dispatch(roundRestartAction());

    // lost
    app.store.dispatch(playerChoiceAction(weaponTypes.SCISSORS, weaponTypes.ROCK));

    app.store.dispatch(roundRestartAction());

    // lost
    app.store.dispatch(playerChoiceAction(weaponTypes.SCISSORS, weaponTypes.ROCK));

    expect(app.store.getState().player1Count).toEqual(2);
    expect(app.store.getState().player2Count).toEqual(2);
    expect(app.store.getState().currentWinner).toEqual(players.NONE);
  });

  it('stats are reset with new game action after game has been played', () => {
    // tie
    app.store.dispatch(playerChoiceAction(weaponTypes.SCISSORS, weaponTypes.SCISSORS));

    app.store.dispatch(roundRestartAction());

    // tie
    app.store.dispatch(playerChoiceAction(weaponTypes.SCISSORS, weaponTypes.SCISSORS));

    app.store.dispatch(roundRestartAction());

    // lost
    app.store.dispatch(playerChoiceAction(weaponTypes.SCISSORS, weaponTypes.ROCK));

    expect(app.store.getState().outcome).toEqual(outcomes.LOST);
    expect(app.store.getState().player1Count).toEqual(0);
    expect(app.store.getState().currentWinner).toEqual(players.TWO);

    app.store.dispatch(newGameAction());

    expect(app.store.getState().player1Count).toEqual(initialState.player1Count);
    expect(app.store.getState().player2Count).toEqual(initialState.player2Count);
    expect(app.store.getState().currentWinner).toEqual(players.NONE);
  });
});

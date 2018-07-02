import { App } from "../js/index";
import { player1ChoiceAction, player2ChoiceAction, roundEndAction, roundRestartAction, newGameAction, setGameMode } from "../js/actions/actions";
import { weaponTypes } from "../js/config/weapons";
import { outcomes } from "../js/config/outcomes";
import { initialState } from "../js/config/initialState";
import { gameModes } from "../js/config/gameModes";

let app = new App();

describe('Game of', () => {
  beforeEach(() => {
    app.store.dispatch(newGameAction());
  });

  it('paper vs scissor leads to lost', () => {
    app.store.dispatch(player1ChoiceAction(weaponTypes.PAPER));
    app.store.dispatch(player2ChoiceAction(weaponTypes.SCISSORS));
    expect(app.store.getState().outcome).toEqual(outcomes.LOST);
  });

  it('paper vs rock leads to win', () => {
    app.store.dispatch(player1ChoiceAction(weaponTypes.PAPER));
    app.store.dispatch(player2ChoiceAction(weaponTypes.ROCK));
    expect(app.store.getState().outcome).toEqual(outcomes.WON);
  });

  it('paper vs paper leads to tie', () => {
    app.store.dispatch(player1ChoiceAction(weaponTypes.PAPER));
    app.store.dispatch(player2ChoiceAction(weaponTypes.PAPER));
    expect(app.store.getState().outcome).toEqual(outcomes.TIE);
  });

  
  it('rock vs scissor leads to won', () => {
    app.store.dispatch(player1ChoiceAction(weaponTypes.ROCK));
    app.store.dispatch(player2ChoiceAction(weaponTypes.SCISSORS));
    expect(app.store.getState().outcome).toEqual(outcomes.WON);
  });

  it('rock vs rock leads to tie', () => {
    app.store.dispatch(player1ChoiceAction(weaponTypes.ROCK));
    app.store.dispatch(player2ChoiceAction(weaponTypes.ROCK));
    expect(app.store.getState().outcome).toEqual(outcomes.TIE);
  });

  it('rock vs paper leads to lost', () => {
    app.store.dispatch(player1ChoiceAction(weaponTypes.ROCK));
    app.store.dispatch(player2ChoiceAction(weaponTypes.PAPER));
    expect(app.store.getState().outcome).toEqual(outcomes.LOST);
  });


  it('scissor vs scissor leads to tie', () => {
    app.store.dispatch(player1ChoiceAction(weaponTypes.SCISSORS));
    app.store.dispatch(player2ChoiceAction(weaponTypes.SCISSORS));
    expect(app.store.getState().outcome).toEqual(outcomes.TIE);
  });

  it('scissor vs rock leads to lost', () => {
    app.store.dispatch(player1ChoiceAction(weaponTypes.SCISSORS));
    app.store.dispatch(player2ChoiceAction(weaponTypes.ROCK));
    expect(app.store.getState().outcome).toEqual(outcomes.LOST);
  });

  it('scissor vs paper leads to win', () => {
    app.store.dispatch(player1ChoiceAction(weaponTypes.SCISSORS));
    app.store.dispatch(player2ChoiceAction(weaponTypes.PAPER));
    expect(app.store.getState().outcome).toEqual(outcomes.WON);
  });

  it('computer vs computer game works', () => {
    app.store.dispatch(player1ChoiceAction());
    app.store.dispatch(player2ChoiceAction());
    expect(app.store.getState().outcome).toBeDefined();
  });

  it('round restart resets correctly', () => {
    // random game
    app.store.dispatch(player1ChoiceAction(weaponTypes.SCISSORS));
    app.store.dispatch(player2ChoiceAction(weaponTypes.PAPER));

    app.store.dispatch(roundRestartAction());

    const newState = app.store.getState();
    expect(newState.outcome).toBe(initialState.outcome);
    expect(newState.outcomeMessage).toBe(initialState.outcomeMessage);
    expect(newState.outcomeMessage).toBe(initialState.outcomeMessage);
  });

  it('invalid move leads to error', () => {
    try {
      app.store.dispatch(player1ChoiceAction("weaponTypes.SCISSORS"));
      app.store.dispatch(player2ChoiceAction(weaponTypes.PAPER));
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
    app.store.dispatch(player1ChoiceAction(weaponTypes.PAPER));
    app.store.dispatch(player1ChoiceAction(weaponTypes.ROCK));
    expect(app.store.getState().player1Choice).toEqual(weaponTypes.PAPER);
  });

  it('player 2 causes game end', () => {
    app.store.dispatch(player1ChoiceAction(weaponTypes.SCISSORS));
    app.store.dispatch(player2ChoiceAction(weaponTypes.PAPER));
    expect(app.store.getState().outcome).toBeDefined();
  });

  it('set game mode when game is running not possible', () => {
    app.store.dispatch(setGameMode(gameModes.CVC));
    app.store.dispatch(setGameMode(gameModes.PVC));
    expect(app.store.getState().gameMode).toEqual(gameModes.CVC);
  });

  it('set game mode after new game', () => {
    app.store.dispatch(setGameMode(gameModes.PVC));
    app.store.dispatch(newGameAction());
    app.store.dispatch(setGameMode(gameModes.CVC));
    expect(app.store.getState().gameMode).toEqual(gameModes.CVC);
  });

  it('player 1 has the correct points', () => {
    // win
    app.store.dispatch(player1ChoiceAction(weaponTypes.ROCK));
    app.store.dispatch(player2ChoiceAction(weaponTypes.SCISSORS));

    app.store.dispatch(roundRestartAction());

    // win
    app.store.dispatch(player1ChoiceAction(weaponTypes.ROCK));
    app.store.dispatch(player2ChoiceAction(weaponTypes.SCISSORS));

    app.store.dispatch(roundRestartAction());

    // lost
    app.store.dispatch(player1ChoiceAction(weaponTypes.SCISSORS));
    app.store.dispatch(player2ChoiceAction(weaponTypes.ROCK));

    expect(app.store.getState().player1Count).toEqual(2);
    expect(app.store.getState().player2Count).toEqual(1);
  });
});

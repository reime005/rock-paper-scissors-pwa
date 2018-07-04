import * as types from './actions/actionTypes';
import { compareWeapons } from './lib/compareWeapons';
import { getMessageForOutcome } from './lib/getMessageForOutcome';
import { initialState } from './config/initialState';
import { getRandomChoice } from './lib/getRandomChoice';
import { outcomes } from './config/outcomes';
import { getCurrentWinningPlayer } from './lib/getCurrentWinningPlayer';
import { gameModes } from './config/gameModes';

export default (state, action) => {
  let nextState = state;

  switch (action.type) {
    case types.PLAYER_CHOICE:
      if (nextState.player1Choice !== initialState.player1Choice || 
        nextState.player2Choice !== initialState.player2Choice) {
        break;
      }

      // "AI" player 1
      let player1Choice = action.player1Choice;
      if (player1Choice === initialState.player1Choice ||
        nextState.gameMode === gameModes.CVC) {
        player1Choice = getRandomChoice();
      }

      // "AI" player 2
      let player2Choice = action.player2Choice;
      if (player2Choice === initialState.player2Choice ||
         nextState.gameMode === gameModes.CVC) {
        player2Choice = getRandomChoice();
      }

      nextState = {
        ...nextState,
        player1Choice,
        player2Choice,
      }
    case types.ROUND_END:
      if (nextState.outcome !== initialState.outcome) {
        break;
      }

      const outcome = compareWeapons(nextState.player1Choice, nextState.player2Choice);

      if (outcome === outcomes.WON) {
        nextState = {
          ...nextState,
          player1Count: nextState.player1Count + 1
        }
      } else if (outcome === outcomes.LOST) {
        nextState = {
          ...nextState,
          player2Count: nextState.player2Count + 1
        }
      }

      nextState = getCurrentWinningPlayer(nextState);
      
      nextState = {
        ...nextState,
        outcome: outcome,
        outcomeMessage: getMessageForOutcome(outcome),
        started: true,
      }
      break;
    case types.SET_GAME_MODE:
      if (nextState.started === true) {
        break;
      }

      nextState = {
        ...nextState,
        gameMode: action.gameMode,
        started: true,
      }
      break;
    case types.NEW_GAME:
      nextState = {
        ...nextState,
        player1Count: initialState.player1Count,
        player2Count: initialState.player2Count,
        started: initialState.started,
        currentWinner: initialState.currentWinner,
        gameMode: initialState.gameMode,
      }
    case types.ROUND_RESTART:
      nextState = {
        ...nextState,
        outcome: initialState.outcome,
        outcomeMessage: initialState.outcomeMessage,
        player1Choice: initialState.player1Choice,
        player2Choice: initialState.player2Choice,
      }
      break;
    default:
  }

  return nextState;
}

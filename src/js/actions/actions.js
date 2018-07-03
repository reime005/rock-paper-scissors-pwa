import * as types from './actionTypes';

export function playerChoiceAction(player1Choice, player2Choice) {
  return {
    type: types.PLAYER_CHOICE,
    player1Choice,
    player2Choice
  }
}

export function roundEndAction() {
  return {
    type: types.ROUND_END
  }
}

export function roundRestartAction() {
  return {
    type: types.ROUND_RESTART
  }
}

export function newGameAction() {
  return {
    type: types.NEW_GAME
  }
}

export function setGameModeAction(gameMode) {
  return {
    type: types.SET_GAME_MODE,
    gameMode
  }
}
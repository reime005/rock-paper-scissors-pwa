import * as types from './actionTypes';

export function player1ChoiceAction(player1Choice) {
  return {
    type: types.PLAYER1_CHOICE,
    player1Choice
  }
}

export function player2ChoiceAction(player2Choice) {
  return {
    type: types.PLAYER2_CHOICE,
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

export function setGameMode(gameMode) {
  return {
    type: types.SET_GAME_MODE,
    gameMode
  }
}
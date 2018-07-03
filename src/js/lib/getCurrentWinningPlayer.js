import { players } from "../config/players";

export function getCurrentWinningPlayer(state) {
  const { player1Count, player2Count } = state;
  let nextState = state;

  if (player1Count < player2Count) {
    nextState = {
      ...nextState,
      currentWinner: players.TWO
    }
  } else if (player1Count > player2Count) {
    nextState = {
      ...nextState,
      currentWinner: players.ONE
    }
  } else if (player1Count === player2Count) {
    nextState = {
      ...nextState,
      currentWinner: players.NONE
    }
  }

  return nextState;
}
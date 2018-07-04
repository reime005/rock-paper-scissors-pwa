import { gameModes } from "./gameModes";
import { players } from "./players";

export const initialState = {
  player1Choice: undefined,
  player2Choice: undefined,
  outcome: undefined,
  outcomeMessage: " ",
  player1Count: 0,
  player2Count: 0,
  started: false,
  gameMode: gameModes.PVC,
  currentWinner: players.NONE,
}

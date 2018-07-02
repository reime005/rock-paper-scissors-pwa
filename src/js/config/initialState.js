import { gameModes } from "./gameModes";

export const initialState = {
  player1Choice: undefined,
  player2Choice: undefined,
  outcome: undefined,
  outcomeMessage: undefined,
  player1Count: 0,
  player2Count: 0,
  started: false,
  gameMode: gameModes.PVC,
}

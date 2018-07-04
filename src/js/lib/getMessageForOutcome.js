import { outcomes } from "../config/outcomes";
import { Exception } from "./exception";

export function getMessageForOutcome(outcome) {
  switch (outcome) {
    case outcomes.LOST:
      return "Player 1 has lost!";
    case outcomes.WON:
      return "Player 1 has won!";
    case outcomes.TIE:
      return "It's a tie!";
    default:
      throw new Exception(`Invalid outcome: ${outcome}`);
  }
}

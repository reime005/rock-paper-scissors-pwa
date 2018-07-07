import { weaponTypes } from "../config/weapons";

export function getRandomChoice() {
  return Math.floor((Math.random() * (weaponTypes.SCISSORS + 1)) + 0)
}
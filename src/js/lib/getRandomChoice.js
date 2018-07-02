import { weaponTypes } from "../config/weapons";

export function getRandomChoice() {
  console.log("BAAA");
  return Math.floor((Math.random() * weaponTypes.SCISSORS + 1) + 0)
}
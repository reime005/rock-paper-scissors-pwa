import { outcomes } from "../config/outcomes";
import { weapons } from "../config/weapons";
import { Exception } from "./exception";

export function compareWeapons(weaponP1, weaponP2) {
  if (weaponP2 >= 0 && 
    weaponP1 >= 0 && 
    weaponP1 === weaponP2) {
    return outcomes.TIE;
  } else if (weapons[weaponP1] && 
    weapons[weaponP1].beats.includes(weaponP2)) {
    return outcomes.WON;
  } else if (weapons[weaponP2] && 
    weapons[weaponP2].beats.includes(weaponP1)) {
    return outcomes.LOST;
  }

  throw new Exception(`Not a valid type: ${weaponP1}, ${weaponP2}`);
}

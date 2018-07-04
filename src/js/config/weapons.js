export const weaponTypes = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2,
}

export const weapons = {
  [weaponTypes.ROCK]: {
    beats: [
      weaponTypes.SCISSORS
    ]
  },
  [weaponTypes.SCISSORS]: {
    beats: [
      weaponTypes.PAPER
    ]
  },
  [weaponTypes.PAPER]: {
    beats: [
      weaponTypes.ROCK
    ]
  },
}

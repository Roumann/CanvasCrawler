export const playerAnimations = new Map([
  [
    "idle-right",
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
  ],
  [
    "idle-left",
    [
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
    ],
  ],
  [
    "walk-right",
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ],
  ],
  [
    "walk-left",
    [
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
      [4, 2],
      [5, 2],
      [6, 2],
      [7, 2],
    ],
  ],
  [
    "walk-up-r",
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ],
  ],
  [
    "walk-up-l",
    [
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
      [4, 2],
      [5, 2],
      [6, 2],
      [7, 2],
    ],
  ],
  [
    "walk-down-r",
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
  ],
  [
    "walk-down-l",
    [
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
    ],
  ],
  [
    "damage",
    [
      [0, 8],
      [1, 8],
      [2, 8],
      [3, 8],
    ],
  ],
  [
    "death",
    [
      [0, 9],
      [1, 9],
      [2, 9],
      [3, 9],
    ],
  ],
]);
// TODO READ THE FILE IN FOLDER WITH IMAGES
export type PlayerAnimations =
  | "idle-right"
  | "idle-left"
  | "walk-right"
  | "walk-left"
  | "walk-up"
  | "walk-down"
  | "damage"
  | "death";

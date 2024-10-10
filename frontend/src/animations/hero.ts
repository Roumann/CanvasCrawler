export const charOneAnimations = new Map([
  [
    "idle-down",
    [
      [0, 0],
      [1, 0],
    ],
  ],
  [
    "walk-down",
    [
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 3],
    ],
  ],
  [
    "walk-up",
    [
      [0, 5],
      [1, 5],
      [2, 5],
      [3, 5],
    ],
  ],
  [
    "walk-right",
    [
      [0, 4],
      [1, 4],
      [2, 4],
      [3, 4],
    ],
  ],
  [
    "walk-left",
    [
      [0, 11],
      [1, 11],
      [2, 11],
    ],
  ],
]);

export type CharOneAnimations =
  | "idle-down"
  | "walk-down"
  | "walk-up"
  | "walk-right"
  | "walk-left";

export const charTwoAnimations = new Map([
  [
    "idle-right",
    [
      [0, 0],
      [1, 0],
    ],
  ],
  [
    "idle-left",
    [
      [4, 0],
      [5, 0],
    ],
  ],
  [
    "walk-right",
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
  ],
  [
    "walk-left",
    [
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
    ],
  ],
  [
    "walk-up-r",
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
  ],
  [
    "walk-up-l",
    [
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
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
export type CharTwoAnimations =
  | "idle-right"
  | "idle-left"
  | "walk-right"
  | "walk-left"
  | "walk-up"
  | "walk-down"
  | "damage"
  | "death";

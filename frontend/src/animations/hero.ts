export const heroAnimations = new Map([
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

export type HeroAnimations =
  | "idle-down"
  | "walk-down"
  | "walk-up"
  | "walk-right"
  | "walk-left";

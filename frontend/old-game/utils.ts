import { Vector2 } from "./vector2";

export function withGrid(n: number) {
  return n * 16;
}

export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  else if (value > max) return max;
  return value;
}

export function normalizeVec2(v: Vector2): Vector2 {
  const f = Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
  v.x /= f;
  v.y /= f;
  return v;
}

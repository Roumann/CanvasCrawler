export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  else if (value > max) return max;
  return value;
}

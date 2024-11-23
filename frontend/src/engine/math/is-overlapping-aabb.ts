import { Vector2 } from "./vector2";

export function isOverlappingAABB(
  pos1: Vector2,
  size1: { w: number; h: number },
  pos2: Vector2,
  size2: { w: number; h: number }
) {
  return (
    pos1.x < pos2.x + size2.w &&
    pos1.x + size1.w > pos2.x &&
    pos1.y < pos2.y + size2.h &&
    pos1.y + size1.h > pos2.y
  );
}

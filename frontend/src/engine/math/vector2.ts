export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector2) {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  sub(vector: Vector2) {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  mult(n: number) {
    return new Vector2(this.x * n, this.y * n);
  }

  unit() {
    if (this.mag() === 0) {
      return new Vector2(0, 0);
    } else {
      return new Vector2(this.x / this.mag(), this.y / this.mag());
    }
  }

  normal() {
    return new Vector2(-this.y, this.x).unit();
  }

  static dot(v1: Vector2, v2: Vector2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
}

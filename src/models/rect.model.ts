import { Circle } from './circle.model';
import { distanceBetween, Point, Shape, Type } from './shape.model';

const getRectVertices = (rectangle: Rect) => {
  const { center, width, height } = rectangle;
  const point1: Point = {
    x: center.x - width / 2,
    y: center.y + height / 2,
  };
  const point2: Point = {
    x: center.x + width / 2,
    y: center.y + height / 2,
  };
  const point3: Point = {
    x: center.x + width / 2,
    y: center.y - height / 2,
  };
  const point4: Point = {
    x: center.x - width / 2,
    y: center.y - height / 2,
  };
  return { point1, point2, point3, point4 };
};

export class Rect implements Shape {
  readonly center: Point;
  readonly width: number;
  readonly height: number;
  readonly type: Type;

  constructor(x: number, y: number, width: number, height: number) {
    this.center = <Point>{ x, y };
    this.type = Type.RECT;
    this.width = width;
    this.height = height;
  }

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.CIRCLE:
        // throw new Error('Implement Rectangle to Circle collision checking');
        const circle: Circle = Circle.fromShape(other);
        const rect = getRectVertices(this);
        const nearestPoint: Point = {
          x: Math.max(rect.point4.x, Math.min(circle.center.x, rect.point2.x)),
          y: Math.max(rect.point4.y, Math.min(circle.center.y, rect.point2.y)),
        };

        return distanceBetween(nearestPoint, circle.center) <= circle.radius;
      case Type.RECT:
        const _other = <Rect>(<any>other);
        const rect1 = getRectVertices(this);
        const rect2 = getRectVertices(_other);
        if (
          // (rect2.point1.x <= rect1.point2.x &&
          //   rect2.point1.x >= rect1.point4.x &&
          //   rect2.point1.y <= rect1.point2.y &&
          //   rect2.point1.y >= rect1.point4.y) ||
          (rect2.point2.x <= rect1.point2.x &&
            rect2.point2.x >= rect1.point4.x &&
            rect2.point2.y <= rect1.point2.y &&
            rect2.point2.y >= rect1.point4.y) ||
          // (rect2.point3.x <= rect1.point2.x &&
          //   rect2.point3.x >= rect1.point4.x &&
          //   rect2.point3.y <= rect1.point2.y &&
          //   rect2.point3.y >= rect1.point4.y) ||
          (rect2.point4.x <= rect1.point2.x &&
            rect2.point4.x >= rect1.point4.x &&
            rect2.point4.y <= rect1.point2.y &&
            rect2.point4.y >= rect1.point4.y)
        ) {
          return true;
        }
        return false;
      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Rect object
   */
  static fromShape(other: Shape): Rect {
    const polymorph = <any>other;
    if (!polymorph.width || !polymorph.height) {
      throw new Error('Shape is invalid! Cannot convert to a Rectangle');
    }

    return new Rect(
      polymorph.center.x,
      polymorph.center.y,
      polymorph.width,
      polymorph.height,
    );
  }
}

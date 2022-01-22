import { Line } from './line.model';
import { Rect } from './rect.model';
import { Point, Shape, Type, distanceBetween } from './shape.model';

export const circleAndCircleCollision = (
  circle1: Circle,
  circle2: Circle,
): boolean => {
  const distance = distanceBetween(circle1.center, circle2.center);
  return distance <= circle1.radius + circle2.radius;
};

export const circleAndRectangleCollision = (
  circle1: Circle,
  rect1: Rect,
): boolean => {
  const target: Point = rect1.center;
  const pointDistance: Point = <Point>{
    x: Math.abs(circle1.center.x - target.x),
    y: Math.abs(circle1.center.y - target.y),
  };

  if (pointDistance.x > rect1.width / 2 + circle1.radius) {
    return false;
  } else if (pointDistance.y > rect1.height / 2 + circle1.radius) {
    return false;
  } else if (pointDistance.x <= rect1.width / 2) {
    return true;
  } else if (pointDistance.y <= rect1.height / 2) {
    return true;
  }

  const circleToRectDistance =
    Math.pow(pointDistance.x - rect1.width / 2, 2) +
    Math.pow(pointDistance.y - rect1.height / 2, 2);

  return circleToRectDistance <= Math.pow(circle1.radius, 2);
};

export const circleAndLineCollision = (
  circle1: Circle,
  line1: Line,
): boolean => {
  const {
    center: { x: x1, y: y1 },
    point2: { x: x2, y: y2 },
  } = line1;

  const { x: a, y: b } = circle1.center;
  //If center collides with the line
  if (!((y1 - y2) * a + (x2 - x1) * b + x1 * (y2 - y1) + y1 * (x1 - x2))) {
    const distance1 = distanceBetween(line1.center, line1.center);
    const distance2 = distanceBetween(line1.point2, circle1.center);

    return distance1 <= circle1.radius || distance2 <= circle1.radius;
  }
  const distanceBetweenLineAndCircle = Math.abs(
    ((y1 - y2) * a + (x2 - x1) * b + x1 * (y2 - y1) + y1 * (x1 - x2)) /
      Math.sqrt((y1 - y2) * (y1 - y2) + (x2 - x1) * (x2 - x1)),
  );
  return distanceBetweenLineAndCircle <= circle1.radius;
};

export class Circle implements Shape {
  readonly center: Point;
  readonly radius: number;
  readonly type: Type;

  constructor(x: number, y: number, radius: number) {
    this.center = <Point>{ x, y };
    this.type = Type.CIRCLE;
    this.radius = radius;
  }

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.CIRCLE:
        const circle2 = <Circle>(<any>other);
        return circleAndCircleCollision(this, circle2);
      case Type.RECT:
        const rect1 = <Rect>(<any>other);
        return circleAndRectangleCollision(this, rect1);
      case Type.LINE:
        const line1 = <Line>(<any>other);
        return circleAndLineCollision(this, line1);
      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Circle object
   */
  static fromShape(other: Shape): Circle {
    const polymorph = <any>other;
    if (!polymorph.radius) {
      throw new Error('Shape is invalid! Cannot convert to a Circle');
    }

    return new Circle(polymorph.center.x, polymorph.center.y, polymorph.radius);
  }
}

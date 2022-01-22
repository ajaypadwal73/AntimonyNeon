import { Circle } from './circle.model';
import { circleAndRectangleCollision } from './circle.model';
import { Line, lineWithLine } from './line.model';
import { Point, Shape, Type } from './shape.model';

export const getRectVertices = (rectangle: Rect) => {
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

export const rectAndRectCollision = (rect1: Rect, rect2: Rect) => {
  const rect1Vertices = getRectVertices(rect1);
  const rect2Vertices = getRectVertices(rect2);
  if (
    (rect2Vertices.point1.x <= rect1Vertices.point2.x &&
      rect2Vertices.point1.x >= rect1Vertices.point4.x &&
      rect2Vertices.point1.y <= rect1Vertices.point2.y &&
      rect2Vertices.point1.y >= rect1Vertices.point4.y) ||
    (rect2Vertices.point2.x <= rect1Vertices.point2.x &&
      rect2Vertices.point2.x >= rect1Vertices.point4.x &&
      rect2Vertices.point2.y <= rect1Vertices.point2.y &&
      rect2Vertices.point2.y >= rect1Vertices.point4.y) ||
    (rect2Vertices.point3.x <= rect1Vertices.point2.x &&
      rect2Vertices.point3.x >= rect1Vertices.point4.x &&
      rect2Vertices.point3.y <= rect1Vertices.point2.y &&
      rect2Vertices.point3.y >= rect1Vertices.point4.y) ||
    (rect2Vertices.point4.x <= rect1Vertices.point2.x &&
      rect2Vertices.point4.x >= rect1Vertices.point4.x &&
      rect2Vertices.point4.y <= rect1Vertices.point2.y &&
      rect2Vertices.point4.y >= rect1Vertices.point4.y)
  ) {
    return true;
  }
  return false;
};

export const rectAndLineCollision = (rect1: Rect, line: Line): boolean => {
  const { point1, point2, point3, point4 } = getRectVertices(this);
  const line1: Line = new Line(point1.x, point1.y, point2.x, point2.y);
  const line2: Line = new Line(point2.x, point2.y, point3.x, point3.y);
  const line3: Line = new Line(point3.x, point3.y, point4.x, point4.y);
  const line4: Line = new Line(point4.x, point4.y, point1.x, point1.y);

  return (
    lineWithLine(line1, line) ||
    lineWithLine(line2, line) ||
    lineWithLine(line3, line) ||
    lineWithLine(line4, line)
  );
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
        const circle1: Circle = <Circle>(<any>other);
        return circleAndRectangleCollision(circle1, this);
      case Type.RECT:
        const rect2 = <Rect>(<any>other);
        return rectAndRectCollision(this, rect2);
      case Type.LINE:
        const line: Line = <Line>(<any>other);
        return rectAndLineCollision(this, line);
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

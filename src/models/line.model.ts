import { Circle, circleAndLineCollision } from './circle.model';
import { Rect, rectAndLineCollision } from './rect.model';
import { distanceBetween, Point, Shape, Type } from './shape.model';

export const lineWithLine = (line1: Line, line2: Line): boolean => {
  const { x: x1, y: y1 } = line1.center;
  const { x: x2, y: y2 } = line1.point2;
  const { x: a1, y: b1 } = line2.center;
  const { x: a2, y: b2 } = line2.point2;

  let val1: any = (y1 - y2) / (x1 - x2);
  let val2: any = (b1 - b2) / (a1 - a2);

  val1 = !Number.isFinite(val1) ? 0 : val1;
  val2 = !Number.isFinite(val2) ? 0 : val2;

  const intersectionX: number =
    val1 - val2 === 0 ? 0 : (val1 * x1 - y1 - val2 * a1 + b1) / (val1 - val2);
  const intersectionY: number =
    x1 - x2 === 0 ? 0 : ((y1 - y2) * (intersectionX - x1)) / (x1 - x2) + y1;

  const intersectionPoint: Point = <Point>{
    x: intersectionX,
    y: intersectionY,
  };

  const distance1 = parseFloat(
    distanceBetween(line1.center, intersectionPoint).toFixed(2),
  );
  const distance2 = parseFloat(
    distanceBetween(line1.point2, intersectionPoint).toFixed(2),
  );
  const distance3 = parseFloat(
    distanceBetween(line2.center, intersectionPoint).toFixed(2),
  );
  const distance4 = parseFloat(
    distanceBetween(line2.point2, intersectionPoint).toFixed(2),
  );

  const lengthOfLine1 = parseFloat(
    distanceBetween(line1.center, line1.point2).toFixed(2),
  );
  const lengthOfLine2 = parseFloat(
    distanceBetween(line2.center, line2.point2).toFixed(2),
  );

  console.log(distance1, distance2, distance3, distance4);
  console.log(lengthOfLine1, lengthOfLine2);

  const flag: boolean =
    lengthOfLine1 === distance1 + distance2 &&
    lengthOfLine2 === distance3 + distance4;

  return flag;
};

export class Line implements Shape {
  readonly center: Point;
  readonly point2: Point;
  readonly type: Type;

  constructor(x: number, y: number, x1: number, y1: number) {
    this.center = <Point>{ x, y };
    this.type = Type.LINE;
    this.point2 = <Point>{ x: x1, y: y1 };
  }

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.CIRCLE:
        const circle: Circle = <Circle>(<any>other);
        return circleAndLineCollision(circle, this);
      case Type.RECT:
        const rect: Rect = Rect.fromShape(other);
        return rectAndLineCollision(rect, this);
      case Type.LINE:
        const line = <Line>(<any>other);
        return lineWithLine(this, line);
      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Rect object
   */
  static fromShape(other: Shape): Line {
    const polymorph = <any>other;
    if (!polymorph.center || !polymorph.point2) {
      throw new Error('Shape is invalid! Cannot convert to a Line');
    }

    return new Line(
      polymorph.center.x,
      polymorph.center.y,
      polymorph.point2.x,
      polymorph.point2.y,
    );
  }
}

import {
  doesCircleAndLineCollide,
  doesLineAndLineCollide,
  rectAndLineCollision,
} from '../controllers/collisionHandler';
import { Circle } from './circle.model';
import { Rect } from './rect.model';
import { Point, Shape, Type } from './shape.model';

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
        return doesCircleAndLineCollide(circle, this);
      case Type.RECT:
        const rect: Rect = Rect.fromShape(other);
        return rectAndLineCollision(rect, this);
      case Type.LINE:
        const line = <Line>(<any>other);
        return doesLineAndLineCollide(this, line);
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

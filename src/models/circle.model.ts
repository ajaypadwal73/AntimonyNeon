import {
  doesCircleAndCircleCollide,
  doesCircleAndLineCollide,
  doesCircleandRectangleCollide,
} from '../controllers/collisionHandler';
import { Line } from './line.model';
import { Rect } from './rect.model';
import { Point, Shape, Type } from './shape.model';

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
        return doesCircleAndCircleCollide(this, circle2);
      case Type.RECT:
        const rect1 = <Rect>(<any>other);
        return doesCircleandRectangleCollide(this, rect1);
      case Type.LINE:
        const line1 = <Line>(<any>other);
        return doesCircleAndLineCollide(this, line1);
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

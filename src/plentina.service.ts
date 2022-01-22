import { Injectable } from '@nestjs/common';
import { Circle } from './models/circle.model';
import { Line } from './models/line.model';
import { Rect } from './models/rect.model';
import {
  CollideShapesRequest,
  CollideShapesResponse,
} from './plentina.controller';

@Injectable()
export class PlentinaService {
  /**
   * Simple health check
   * @returns the applicant's name
   */
  healthCheck(): string {
    return 'Ajay Padwal';
  }

  doShapesCollide(request: CollideShapesRequest): CollideShapesResponse {
    console.log('--2', request);
    let result = false;
    if (request.firstShape.radius && request.secondShape.radius) {
      console.log('--a');
      result = this.doesCircleAndCircleCollide(
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.radius,
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.radius,
      );
    } else if (
      request.firstShape.radius &&
      request.secondShape.width &&
      request.secondShape.height
    ) {
      console.log('--b');
      result = this.doesCircleAndRectCollide(
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.radius,
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.width,
        request.secondShape.height,
      );
    } else if (
      request.firstShape.width &&
      request.firstShape.height &&
      request.secondShape.radius
    ) {
      console.log('--c');
      result = this.doesCircleAndRectCollide(
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.radius,
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.width,
        request.firstShape.height,
      );
    } else if (
      request.firstShape.width &&
      request.firstShape.height &&
      request.secondShape.width &&
      request.secondShape.height
    ) {
      console.log('--d');
      result = this.doesRectAndRectCollide(
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.width,
        request.firstShape.height,
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.width,
        request.secondShape.height,
      );
    } else if (
      request.firstShape.x !== undefined &&
      request.firstShape.y !== undefined &&
      request.firstShape.a !== undefined &&
      request.firstShape.b !== undefined &&
      request.secondShape.x !== undefined &&
      request.secondShape.y !== undefined &&
      request.secondShape.a !== undefined &&
      request.secondShape.b !== undefined
    ) {
      console.log('---e');
      console.log('--loine line');
      result = this.doesLineAndLineCollide(
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.a,
        request.firstShape.b,
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.a,
        request.secondShape.b,
      );
    } else if (
      request.firstShape.x !== undefined &&
      request.firstShape.y !== undefined &&
      request.firstShape.a !== undefined &&
      request.firstShape.b !== undefined &&
      request.secondShape.x !== undefined &&
      request.secondShape.y !== undefined &&
      request.secondShape.width !== undefined &&
      request.secondShape.height !== undefined
    ) {
      console.log('---e');
      console.log('--123');
      result = this.doesLineAndRectCollide(
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.a,
        request.firstShape.b,
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.width,
        request.secondShape.height,
      );
    } else if (
      request.firstShape.x !== undefined &&
      request.firstShape.y !== undefined &&
      request.firstShape.a !== undefined &&
      request.firstShape.b !== undefined &&
      request.secondShape.x !== undefined &&
      request.secondShape.y !== undefined &&
      request.secondShape.radius !== undefined
    ) {
      console.log('---e');
      console.log('--123');
      result = this.doesLineAndCircleCollide(
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.a,
        request.firstShape.b,
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.radius,
      );
    } else {
      throw new Error('Invalid shapes!');
    }

    return <CollideShapesResponse>{
      collides: result,
      firstShape: request.firstShape,
      secondShape: request.secondShape,
    };
  }

  /**
   * Checks if a circle and a rectangle collide
   * @param x1 x-coordinate of the circle
   * @param y1 y-coordinate of the circle
   * @param r radius of the circle
   * @param x2 x-coordinate of the rectangle
   * @param y2 y-coordinate of the rectangle
   * @param w width of the rectangle
   * @param h height of the rectangle
   * @returns a boolean if they collide or not
   */
  doesCircleAndRectCollide(
    x1: number,
    y1: number,
    r: number,
    x2: number,
    y2: number,
    w: number,
    h: number,
  ): boolean {
    const circle = new Circle(x1, y1, r);
    const rect = new Rect(x2, y2, w, h);

    return rect.collides(circle);
  }

  /**
   * Checks if a circle and another circle collide
   * @param x1 x-coordinate of the circle
   * @param y1 y-coordinate of the circle
   * @param r1 radius of the circle
   * @param x2 x-coordinate of the second circle
   * @param y2 y-coordinate of the second circle
   * @param r2 radius of the second circle
   * @returns a boolean if they collide or not
   */
  doesCircleAndCircleCollide(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number,
  ): boolean {
    const circle1 = new Circle(x1, y1, r1);
    const circle2 = new Circle(x2, y2, r2);

    return circle1.collides(circle2);
  }

  /**
   * Checks if a rectangle and a second rectangle collide
   * @param x1 x-coordinate of the rectangle
   * @param y1 y-coordinate of the rectangle
   * @param w1 width of the rectangle
   * @param h1 height of the rectangle
   * @param x2 x-coordinate of the second rectangle
   * @param y2 y-coordinate of the second rectangle
   * @param w2 width of the second rectangle
   * @param h2 height of the second rectangle
   * @returns a boolean if they collide or not
   */
  doesRectAndRectCollide(
    x1: number,
    y1: number,
    w1: number,
    h1: number,
    x2: number,
    y2: number,
    w2: number,
    h2: number,
  ): boolean {
    const rect1 = new Rect(x1, y1, w1, h1);
    const rect2 = new Rect(x2, y2, w2, h2);

    return rect1.collides(rect2);
  }

  doesLineAndLineCollide(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    a1: number,
    b1: number,
    a2: number,
    b2: number,
  ): boolean {
    const line1 = new Line(x1, y1, x2, y2);
    const line2 = new Line(a1, b1, a2, b2);

    return line1.collides(line2);
  }

  doesLineAndRectCollide(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    a1: number,
    b1: number,
    w1: number,
    h1: number,
  ): boolean {
    const line = new Line(x1, y1, x2, y2);
    const rect = new Rect(a1, b1, w1, h1);

    return line.collides(rect);
  }

  doesLineAndCircleCollide(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    a1: number,
    b1: number,
    r: number,
  ): boolean {
    const line = new Line(x1, y1, x2, y2);
    const circle = new Circle(a1, b1, r);

    return line.collides(circle);
  }
}

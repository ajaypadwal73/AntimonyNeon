import { Injectable } from '@nestjs/common';
import { Circle } from './models/circle.model';
import { Line } from './models/line.model';
import { Rect } from './models/rect.model';
import { getGeometry } from './controllers/helpers';
import {
  CollideShapesRequest,
  CollideShapesResponse,
  ShapeDTO,
} from './plentina.controller';
import { Type } from './models/shape.model';

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
    let result = false;
    const { firstShape, secondShape } = request;
    const geometryType1 = getGeometry(firstShape);
    const geometryType2 = getGeometry(secondShape);
    console.log(`Input Geometry \n1: ${geometryType1} \n2: ${geometryType2} `);

    // Circle-Circle
    if (geometryType1 === Type.CIRCLE && geometryType2 === Type.CIRCLE) {
      result = this.doesCircleAndCircleCollide(firstShape, secondShape);
    }
    // Circle-Rect
    else if (geometryType1 === Type.CIRCLE && geometryType2 === Type.RECT) {
      result = this.doesCircleAndRectCollide(firstShape, secondShape);
    }
    // Circle-Line
    else if (geometryType1 === Type.CIRCLE && geometryType2 === Type.LINE) {
      result = this.doesLineAndCircleCollide(secondShape, firstShape);
    }

    // Rect-Rect
    else if (geometryType1 === Type.RECT && geometryType2 === Type.RECT) {
      result = this.doesRectAndRectCollide(firstShape, secondShape);
    }
    // Rect-Circle
    else if (geometryType1 === Type.RECT && geometryType2 === Type.CIRCLE) {
      result = this.doesCircleAndRectCollide(secondShape, firstShape);
    }
    // Rect-Line
    else if (geometryType1 === Type.RECT && geometryType2 === Type.LINE) {
      result = this.doesLineAndRectCollide(secondShape, firstShape);
    }

    // Line-Line
    else if (geometryType1 === Type.LINE && geometryType2 === Type.LINE) {
      result = this.doesLineAndLineCollide(firstShape, secondShape);
    }
    // Line-Circle
    else if (geometryType1 === Type.LINE && geometryType2 === Type.CIRCLE) {
      result = this.doesLineAndCircleCollide(firstShape, secondShape);
    }
    // Line-Rect
    else if (geometryType1 === Type.LINE && geometryType2 === Type.RECT) {
      result = this.doesLineAndRectCollide(firstShape, secondShape);
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
    firstShape: ShapeDTO,
    secondShape: ShapeDTO,
  ): boolean {
    const circle1 = new Circle(firstShape.x, firstShape.y, firstShape.radius);
    const rect1 = new Rect(
      secondShape.x,
      secondShape.y,
      secondShape.width,
      secondShape.height,
    );

    return rect1.collides(circle1);
  }

  doesCircleAndCircleCollide(
    firstShape: ShapeDTO,
    secondShape: ShapeDTO,
  ): boolean {
    const circle1 = new Circle(firstShape.x, firstShape.y, firstShape.radius);
    const circle2 = new Circle(
      secondShape.x,
      secondShape.y,
      secondShape.radius,
    );

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
  doesRectAndRectCollide(firstShape: ShapeDTO, secondShape: ShapeDTO): boolean {
    const rect1 = new Rect(
      firstShape.x,
      firstShape.y,
      firstShape.width,
      firstShape.height,
    );
    const rect2 = new Rect(
      secondShape.x,
      secondShape.y,
      secondShape.width,
      secondShape.height,
    );

    return rect1.collides(rect2);
  }

  doesLineAndLineCollide(firstShape: ShapeDTO, secondShape: ShapeDTO): boolean {
    const line1 = new Line(
      firstShape.x,
      firstShape.y,
      firstShape.a,
      firstShape.b,
    );
    const line2 = new Line(
      secondShape.x,
      secondShape.y,
      secondShape.a,
      secondShape.b,
    );

    return line1.collides(line2);
  }

  doesLineAndRectCollide(firstShape: ShapeDTO, secondShape: ShapeDTO): boolean {
    const line = new Line(
      firstShape.x,
      firstShape.y,
      firstShape.a,
      firstShape.b,
    );
    const rect = new Rect(
      secondShape.x,
      secondShape.y,
      secondShape.width,
      secondShape.height,
    );

    return line.collides(rect);
  }

  doesLineAndCircleCollide(
    firstShape: ShapeDTO,
    secondShape: ShapeDTO,
  ): boolean {
    const line = new Line(
      firstShape.x,
      firstShape.y,
      firstShape.a,
      firstShape.b,
    );
    const circle = new Circle(secondShape.x, secondShape.y, secondShape.radius);

    return line.collides(circle);
  }
}

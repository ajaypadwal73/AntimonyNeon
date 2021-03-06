import { Circle } from '../models/circle.model';
import { Line } from '../models/line.model';
import { Rect } from '../models/rect.model';
import { distanceBetween, Point } from '../models/shape.model';
import { getRectVertices } from './helpers';

export const doesCircleAndCircleCollide = (
  circle1: Circle,
  circle2: Circle,
): boolean => {
  console.log('in doesCircleAndCircleCollide handler');
  const distance = distanceBetween(circle1.center, circle2.center);
  return distance <= circle1.radius + circle2.radius;
};

export const doesCircleandRectangleCollide = (
  circle1: Circle,
  rect1: Rect,
): boolean => {
  console.log('in doesCircleandRectangleCollide handler');
  const { point1, point2, point3, point4 } = getRectVertices(rect1);
  const line1: Line = new Line(point1.x, point1.y, point2.x, point2.y);
  const line2: Line = new Line(point2.x, point2.y, point3.x, point3.y);
  const line3: Line = new Line(point3.x, point3.y, point4.x, point4.y);
  const line4: Line = new Line(point4.x, point4.y, point1.x, point1.y);

  //Check if circle lies inside the rectangle
  const { x, y } = circle1.center;
  if (x >= point4.x && y >= point4.y && x <= point2.x && y <= point2.y)
    return true;

  return (
    doesCircleAndLineCollide(circle1, line1) ||
    doesCircleAndLineCollide(circle1, line2) ||
    doesCircleAndLineCollide(circle1, line3) ||
    doesCircleAndLineCollide(circle1, line4)
  );
};

export const doesCircleAndLineCollide = (
  circle1: Circle,
  line1: Line,
): boolean => {
  const {
    center: { x: x1, y: y1 },
    point2: { x: x2, y: y2 },
  } = line1;
  console.log('in doesCircleAndLineCollide handler');
  const { x: a, y: b } = circle1.center;
  //If center collides with the line
  if (!((y1 - y2) * a + (x2 - x1) * b + x1 * (y2 - y1) + y1 * (x1 - x2))) {
    const distance1 = distanceBetween(line1.center, circle1.center);
    const distance2 = distanceBetween(line1.point2, circle1.center);
    return distance1 <= circle1.radius || distance2 <= circle1.radius;
  }
  const distanceBetweenLineAndCircle = Math.abs(
    ((y1 - y2) * a + (x2 - x1) * b + x1 * (y2 - y1) + y1 * (x1 - x2)) /
      Math.sqrt((y1 - y2) * (y1 - y2) + (x2 - x1) * (x2 - x1)),
  );
  console.log(
    `Shortest distance: ${distanceBetweenLineAndCircle} Radius: ${circle1.radius}`,
  );
  return distanceBetweenLineAndCircle <= circle1.radius;
};

export const doesRectAndRectCollide = (rect1: Rect, rect2: Rect) => {
  console.log('in doesRectAndRectCollide handler');
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
  console.log('in doesRectAndLineCollide handler');
  const { point1, point2, point3, point4 } = getRectVertices(rect1);
  const line1: Line = new Line(point1.x, point1.y, point2.x, point2.y);
  const line2: Line = new Line(point2.x, point2.y, point3.x, point3.y);
  const line3: Line = new Line(point3.x, point3.y, point4.x, point4.y);
  const line4: Line = new Line(point4.x, point4.y, point1.x, point1.y);

  return (
    doesLineAndLineCollide(line1, line) ||
    doesLineAndLineCollide(line2, line) ||
    doesLineAndLineCollide(line3, line) ||
    doesLineAndLineCollide(line4, line)
  );
};

export const doesLineAndLineCollide = (line1: Line, line2: Line): boolean => {
  console.log('in doesLineAndLineCollide handler');
  const { x: x1, y: y1 } = line1.center;
  const { x: x2, y: y2 } = line1.point2;
  const { x: a1, y: b1 } = line2.center;
  const { x: a2, y: b2 } = line2.point2;

  const lengthOfLine1 = parseFloat(
    distanceBetween(line1.center, line1.point2).toFixed(2),
  );
  const lengthOfLine2 = parseFloat(
    distanceBetween(line2.center, line2.point2).toFixed(2),
  );

  let slope1: any = (y1 - y2) / (x1 - x2);
  let slope2: any = (b1 - b2) / (a1 - a2);

  slope1 = !Number.isFinite(slope1) ? 0 : slope1;
  slope2 = !Number.isFinite(slope2) ? 0 : slope2;

  // Slopes are equal, then line is collinear
  if (slope1 === slope2) {
    const distanceA = parseFloat(
      distanceBetween(line1.center, line2.center).toFixed(2),
    );
    const distanceB = parseFloat(
      distanceBetween(line1.center, line2.point2).toFixed(2),
    );
    return distanceA <= lengthOfLine1 || distanceB <= lengthOfLine2;
  }

  const intersectionX: number =
    slope1 - slope2 === 0
      ? 0
      : (slope1 * x1 - y1 - slope2 * a1 + b1) / (slope1 - slope2);
  const intersectionY: number =
    x1 - x2 === 0 ? 0 : ((y1 - y2) * (intersectionX - x1)) / (x1 - x2) + y1;

  const intersectionPoint: Point = <Point>{
    x: intersectionX,
    y: intersectionY,
  };
  console.log(
    `Intersection point: ${intersectionPoint.x}, ${intersectionPoint.y}`,
  );
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

  console.log(
    `Length of line ${lengthOfLine1}, Sum: ${
      distance1 + distance2
    } Broken Lengths ${distance1} ${distance2}`,
  );
  console.log(
    `Length of line ${lengthOfLine2}, Sum: ${
      distance3 + distance4
    } Broken Lengths ${distance3} ${distance4}`,
  );

  const flag: boolean =
    lengthOfLine1 === distance1 + distance2 &&
    lengthOfLine2 === distance3 + distance4;

  return flag;
};

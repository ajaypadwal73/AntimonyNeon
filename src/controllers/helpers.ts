import { Rect } from '../models/rect.model';
import { Point, Type } from '../models/shape.model';

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

export const getGeometry = (geometry: any): string => {
  let geometryType: string;
  if (geometry.radius) {
    geometryType = Type.CIRCLE;
  } else if (geometry.width && geometry.height) {
    geometryType = Type.RECT;
  } else {
    geometryType = Type.LINE;
  }

  return geometryType;
};

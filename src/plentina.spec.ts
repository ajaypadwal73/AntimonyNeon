import { Test, TestingModule } from '@nestjs/testing';
import { Circle } from './models/circle.model';
import { Rect } from './models/rect.model';
import { PlentinaController } from './plentina.controller';
import { PlentinaService } from './plentina.service';
import { response } from 'express';
import { Line } from './models/line.model';

describe('PlentinaController', () => {
  let plentinaController: PlentinaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlentinaController],
      providers: [PlentinaService],
    }).compile();

    plentinaController = app.get<PlentinaController>(PlentinaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(plentinaController.healthCheck(response).name).toBe('Ajay Padwal');
    });
  });
});

describe('PlentinaService', () => {
  let plentinaService: PlentinaService;

  beforeEach(async () => {
    plentinaService = new PlentinaService();
  });

  // Circle-Circle
  describe('doesCircleAndCircleCollide', () => {
    const circle1 = new Circle(10, 10, 1);

    describe('two colliding circles', () => {
      [
        new Circle(12, 10, 1),
        new Circle(10, 12, 1),
        new Circle(11, 11, 1),
      ].forEach((circle2) => {
        it(`should return true for ${JSON.stringify(circle2)}`, () => {
          expect(circle1.collides(circle2)).toBeTruthy;
        });
      });
    });

    describe('two non-colliding circles', () => {
      const circle2 = new Circle(5, 5, 1);

      it(`should return false for ${JSON.stringify(circle2)}`, () => {
        expect(circle1.collides(circle2)).toBeFalsy;
      });
    });
  });
  // Circle-Rect
  describe('doesCircleAndRectCollide', () => {
    const circle = new Circle(10, 10, 2);

    describe('a colliding circle and rectangle', () => {
      const rectangle = new Rect(9, 9, 1, 1);

      it('should return true', () => {
        expect(circle.collides(rectangle)).toBeTruthy;
      });

      it('should return true', () => {
        expect(rectangle.collides(circle)).toBeTruthy;
      });
    });

    describe('a non-colliding circle and rectangle', () => {
      const rectangle = new Rect(5, 5, 2, 2);

      it('should return false', () => {
        expect(circle.collides(rectangle)).toBeFalsy;
      });

      it('should return false', () => {
        expect(rectangle.collides(circle)).toBeFalsy;
      });
    });
  });
  // Circle-Line
  describe('doesCircleAndLineCollide', () => {
    const circle = new Circle(10, 10, 2);

    describe('a colliding circle and line', () => {
      const line = new Line(10, 10, 0, 0);

      it('should return true', () => {
        expect(circle.collides(line)).toBeTruthy;
      });

      it('should return true', () => {
        expect(line.collides(circle)).toBeTruthy;
      });
    });

    describe('a non-colliding circle and rectangle', () => {
      const rectangle = new Rect(5, 5, 2, 2);

      it('should return false', () => {
        expect(circle.collides(rectangle)).toBeFalsy;
      });

      it('should return false', () => {
        expect(rectangle.collides(circle)).toBeFalsy;
      });
    });
  });
  // Rect-Rect
  describe('doesRectAndRectCollide', () => {
    const rectangle1 = new Rect(9, 9, 1, 1);

    describe('two colliding rectangles', () => {
      const rectangle2 = new Rect(10, 10, 2, 2);
      it('should return true', () => {
        expect(rectangle1.collides(rectangle2)).toBeTruthy;
      });
    });

    describe('two non-colliding rectangles', () => {
      const rectangle2 = new Rect(4, 4, 2, 2);
      it('should return false', () => {
        expect(rectangle1.collides(rectangle2)).toBeFalsy;
      });
    });
  });
  //Rect-Line
  describe('doesRectAndLineCollide', () => {
    const rectangle1 = new Rect(9, 9, 1, 1);

    describe('Colliding line and rectangle', () => {
      const line = new Line(9, 9, 1, 1);
      it('should return true', () => {
        expect(rectangle1.collides(line)).toBeTruthy;
      });
    });

    describe('two non-colliding rectangles', () => {
      const line = new Line(99, 99, 99, 1);
      it('should return false', () => {
        expect(rectangle1.collides(line)).toBeFalsy;
      });
    });
  });
  // Line-Line
  describe('doesLineAndLineCollide', () => {
    const line1 = new Line(0, 0, 4, 0);

    describe('Colliding line and line', () => {
      const line = new Line(1, 4, 1, -1);
      it('should return true', () => {
        expect(line1.collides(line)).toBeTruthy;
      });
    });

    describe('two non-colliding rectangles', () => {
      const line = new Line(99, 99, 99, 1);
      it('should return false', () => {
        expect(line1.collides(line)).toBeFalsy;
      });
    });
  });
});

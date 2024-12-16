export {};

/* SOLID - Open Close Principle */

/* Bad */
class BadRectangle {
  constructor(public width: number, public height: number) {}
}

class BadCircle {
  constructor(public radius: number) {}
}

class BadAreaCalculator {
  // public calculate(rectangle: BadRectangle): number {
  //   return rectangle.width * rectangle.height;
  // }

  /* We needed to modify existing implementation to support new Type of Circle. */
  public calculate(shape: BadRectangle | BadCircle): number {
    if (shape instanceof BadRectangle) {
      return shape.width * shape.height;
    } else if (shape instanceof BadCircle) {
      return Math.PI * shape.radius * shape.radius;
    } // ...if triangle. if XYZ...

    throw new Error("Unsupported shape");
  }
}

const badCalc = new BadAreaCalculator();

console.log("BadRectangle Area:", badCalc.calculate(new BadRectangle(10, 10)));

/* Ooopsie */
console.log("BadCircle area:", badCalc.calculate(new BadCircle(10)));
/* What if we want to add a triangle? We need to modify existing code. */

/* Good */
interface Shape {
  calculateArea(): number;
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}

  calculateArea(): number {
    return this.width * this.height;
  }
}

class AreaCalculator {
  public calculate(shape: Shape): number {
    return shape.calculateArea();
  }
}

class Circle implements Shape {
  constructor(public radius: number) {}

  calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

const calculator = new AreaCalculator();

console.log("Rectangle area:", calculator.calculate(new Rectangle(10, 10)));
console.log("Circle area:", calculator.calculate(new Circle(10)));
/* What if we want to add a triangle? We only need to add a new shape, without modyfing existing code. */

class Triangle implements Shape {
  constructor(public base: number, public height: number) {}

  calculateArea(): number {
    return 0.5 * this.base * this.height;
  }
}

console.log("Triangle area:", calculator.calculate(new Triangle(10, 10)));

class TotalArea {
  calculateTotalArea(shapes: Shape[]): number {
    return shapes.reduce((acc, shape) => acc + shape.calculateArea(), 0);
  }
}

const totalArea = new TotalArea().calculateTotalArea([
  new Rectangle(10, 10),
  new Circle(10),
  new Triangle(10, 10),
]);

console.log("Total area:", totalArea);

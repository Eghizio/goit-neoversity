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
  public calculate(rectangle: BadRectangle): number {
    return rectangle.width * rectangle.height;
  }
}

const badCalc = new BadAreaCalculator();

console.log("BadRectangle Area:", badCalc.calculate(new BadRectangle(10, 10)));

/* Ooopsie */
// console.log("BadCircle area:", badCalc.calculate(new BadCircle(10)));

// /* Good */
// interface Shape {
//   calculateArea(): number;
// }

// class Rectangle implements Shape {
//   public width: number;
//   public height: number;

//   constructor(width: number, height: number) {
//     this.width = width;
//     this.height = height;
//   }

//   calculateArea(): number {
//     return this.width * this.height;
//   }
// }

// class AreaCalculator {
//   public calculate(shape: Shape): number {
//     return shape.calculateArea();
//   }
// }

// class Circle implements Shape {
//   public radius: number;

//   constructor(radius: number) {
//     this.radius = radius;
//   }

//   calculateArea(): number {
//     return Math.PI * Math.pow(this.radius, 2);
//   }
// }

// const calculator = new AreaCalculator();

// console.log("Rectangle area:", calculator.calculate(new Rectangle(10, 10)));
// console.log("Circle area:", calculator.calculate(new Circle(10)));

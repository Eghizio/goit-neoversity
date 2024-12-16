import { Colors } from "./colors";

export {};

/* SOLID - Dependency Inversion Principle */

/* Bad */

class Driver {
  constructor(public name: string) {}
}

class BadTaxi {
  readonly plate: string;
  private driver: Driver;

  constructor() {
    this.plate = crypto.randomUUID().slice(0, 12);
    this.driver = new Driver("John Doe");
  }

  drive() {
    console.log(
      Colors.Red,
      `[${this.plate}] ${this.driver.name} will be your driver!`
    );
  }
}

const adam = new Driver("Adam");
const beth = new Driver("Beth");

const badTaxi = new BadTaxi();

badTaxi.drive();

/* Good */
class MaleDriver extends Driver {
  constructor(name: string) {
    super(name);
  }
}

class FemaleDriver extends Driver {
  constructor(name: string) {
    super(name);
  }
}

class Taxi {
  readonly plate: string;
  private driver: Driver;

  constructor(driver: Driver) {
    this.plate = crypto.randomUUID().slice(0, 12);
    this.driver = driver;
  }

  drive() {
    console.log(`[${this.plate}] ${this.driver.name} will be your driver!`);
  }

  changeDriver(driver: Driver) {
    this.driver = driver;
  }
}

const man = new MaleDriver("Adam");
const woman = new FemaleDriver("Beth");

const taxi = new Taxi(man);

taxi.drive();
taxi.changeDriver(woman);
taxi.drive();

import { Colors } from "./colors";

export {};

/* SOLID - Liskov Substitution Principle */

abstract class Vehicle {
  abstract startEngine(): void;
  abstract accelerate(): void;
}

class Car extends Vehicle {
  constructor(private name: string) {
    super();
  }

  startEngine(): void {
    console.log(Colors.Magenta, `[${this.name}] Car Engine started.`);
  }
  accelerate(): void {
    console.log(Colors.Magenta, `[${this.name}] Car accelerating.`);
  }
}

class Airplane extends Vehicle {
  constructor(private name: string) {
    super();
  }

  startEngine(): void {
    console.log(Colors.Cyan, `[${this.name}] Airplane Engine started.`);
  }
  accelerate(): void {
    console.log(Colors.Cyan, `[${this.name}] Airplane accelerating.`);
  }
}

class Traveler {
  travel(vehicle: Vehicle): void {
    vehicle.startEngine();
    vehicle.accelerate();
  }
}

const adam = new Traveler();

const taxiToAirport = new Car("Uber to Airport");
adam.travel(taxiToAirport);

const airplaneToSingapore = new Airplane("Airplane to Singapore");
adam.travel(airplaneToSingapore);

const taxiToHotel = new Car("Bolt to Hotel");
adam.travel(taxiToHotel);

import { Colors } from "./colors";

export {};

/* SOLID - Liskov Substitution Principle */

abstract class Vehicle {
  constructor(protected name: string) {}

  getName(): string {
    return this.name;
  }

  abstract startEngine(): void;
  abstract accelerate(): void;
}

class Car extends Vehicle {
  constructor(name: string) {
    super(name);
  }

  startEngine(): void {
    console.log(Colors.Magenta, `[${this.name}] Car Engine started.`);
  }
  accelerate(): void {
    console.log(Colors.Magenta, `[${this.name}] Car accelerating.`);
  }
}

class Airplane extends Vehicle {
  constructor(name: string) {
    super(name);
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

// adam.travel(new Car("Uber to Airport"));
// adam.travel(new Airplane("Airplane to Singapore"));
// adam.travel(new Car("Bolt to Hotel"));

/* OCP example */
class Motorbike extends Vehicle {
  constructor(name: string) {
    super(name);
  }

  startEngine(): void {
    console.log(Colors.Yellow, `[${this.name}] Motorbike Engine started.`);
  }
  accelerate(): void {
    console.log(Colors.Yellow, `[${this.name}] Motorbike accelerating.`);
  }
}

const tuktuk = new Motorbike("Tuktuk");

adam.travel(tuktuk);

const vehiclesHistory: Vehicle[] = [
  taxiToAirport,
  airplaneToSingapore,
  taxiToHotel,
  tuktuk,
];

const generateVehiclesUsageHistory = (vehicles: Vehicle[]): string[] => {
  return vehicles.map((vehicle) => vehicle.getName());
};

console.log(
  `Traveler has been traveling by following vehicles: ${generateVehiclesUsageHistory(
    vehiclesHistory
  )}`
);

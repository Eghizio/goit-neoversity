export {};

/* Custom type */
type User = {
  name: string;
  age: number;
};

let users: User[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

type Point = { x: number; y: number };

const moveUserTo = ({ x, y }: Point) => {
  console.log(`Moving user to coordinates (${x}, ${y})`);
};

moveUserTo({ x: 10, y: 20 });

type Player = User & Point;

const playerOne: Player = { name: "Parzival", age: 18, x: -42, y: 1337 };

moveUserTo(playerOne); /* Type Player satisfies Point requirements */

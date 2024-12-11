export {};

/* Custom type */
type User = {
  name: string;
  age: number;
  friends: User[];
};

let users: User[] = [
  { name: "Alice", age: 25, friends: [] },
  { name: "Bob", age: 30, friends: [{ name: "Cecil", age: 42, friends: [] }] },
];

type Point = { x: number; y: number };

const moveUserTo = ({ x, y }: Point) => {
  console.log(`Moving user to coordinates (${x}, ${y})`);
};

moveUserTo({ x: 10, y: 20 });

type Player = User & Point;

const playerOne: Player = {
  name: "Parzival",
  age: 18,
  friends: [],
  x: -42,
  y: 1337,
};

moveUserTo(playerOne); /* Type Player satisfies Point requirements */

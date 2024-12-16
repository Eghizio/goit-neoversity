import { Colors } from "./colors";

export {};

// Object interfaces.
interface Point {
  x: number;
  y: number;
}

const start: Point = { x: 0, y: 0 };

type Destination = Point;

const end: Destination = { x: 10, y: 10 };

const makePathFromStartToFinish = (
  start: Destination,
  { x, y }: Destination
): Point[] => {
  const path = [start];

  let currentPosition = start;

  while (currentPosition.x !== x || currentPosition.y !== y) {
    const nextPosition = { x: currentPosition.x + 1, y: currentPosition.y + 1 };

    currentPosition = nextPosition;

    path.push(nextPosition);
  }

  return path;
};

const path = makePathFromStartToFinish(start, end);
console.log(path);

// Class interfaces.
// Instance functions interfaces.
interface Position {
  x: number;
  y: number;

  move(dx: number, dy: number): Position;
}

interface FightingEntity {
  health: number;
  attack: number;

  hit(enemy: FightingEntity): void;
  heal: () => void;
}

// Extending interfaces
interface GameEntity extends Position, FightingEntity {}

// Interface merging.
interface GameEntity {
  level: number;
}

// class Player implements Position, FightingEntity {
class Player implements GameEntity {
  x: number;
  y: number;
  health: number;
  attack: number;
  level: number;

  constructor(x: number, y: number, health: number, attack: number) {
    this.x = x;
    this.y = y;

    this.health = health;
    this.attack = attack;

    this.level = 1;
  }

  move(dx: number, dy: number): Position {
    this.x += dx;
    this.y += dy;
    return this;
  }

  hit(enemy: FightingEntity): void {
    enemy.health -= this.attack;
  }
  heal() {
    this.health += Math.round(Math.random() * this.level);
  }
}

class Enemy implements GameEntity {
  x: number;
  y: number;
  health: number;
  attack: number;
  level: number;

  constructor(x: number, y: number, health: number, attack: number) {
    this.x = x;
    this.y = y;

    this.health = health;
    this.attack = attack;

    this.level = 1;
  }

  move(dx: number, dy: number): Position {
    this.x += dx;
    this.y += dy;
    return this;
  }

  hit(enemy: FightingEntity): void {
    enemy.health -= this.attack;
  }
  heal() {
    this.health++;
  }
}

const link = new Player(0, 0, 10, 2);
const monster = new Enemy(0, 0, 3, 2);

class Fight {
  constructor(player: GameEntity, monster: GameEntity) {
    while (player.health > 0 && monster.health > 0) {
      player.hit(monster);
      monster.hit(player);
    }

    console.log(Colors.Gray, "Fight has ended!");

    if (player.health <= 0) {
      console.log(Colors.Red, "Player defeated!");
    } else {
      console.log(Colors.Green, "Enemy defeated!");
    }
  }
}

new Fight(link, monster);

console.log(link, monster);

// Optional fields.
interface Item {
  name: string;
  attack?: number;
  defense?: number;
}

const getItemStat = (item: Item, stat: keyof Omit<Item, "name">): number =>
  item[stat] ?? 0;

const calculateInventoryStats = (inventory: Item[]): Omit<Item, "name"> => {
  const totalAttack = inventory.reduce(
    (sum, item) => sum + getItemStat(item, "attack"),
    0
  );
  const totalDefense = inventory.reduce(
    (sum, item) => sum + getItemStat(item, "defense"),
    0
  );

  return { attack: totalAttack, defense: totalDefense };
};

const sword: Item = {
  name: "Sword",
  attack: 2,
};

const armor: Item = {
  name: "Leather armor",
  defense: 1,
};

const inventory: Item[] = [sword, armor];

console.log("Inventory stats:");
console.log(Colors.Cyan, calculateInventoryStats(inventory));

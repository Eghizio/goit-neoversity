export {};

/* Optional */

type Player = {
  id: string;
  name?: string;
};

const playerOne: Player = {
  id: "player1",
};

const greetPlayer = (player: Player) => {
  console.log(`Hello, ${player.name ?? "Guest"}!`);
};

greetPlayer(playerOne);

const upper = (text: string) => text.toUpperCase();

// upper(playerOne.name); /* Ooopsie */

if (playerOne.name) {
  upper(playerOne.name); /* Ok */
}

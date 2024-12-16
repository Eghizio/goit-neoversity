import { Colors } from "./colors";

export {};

/* UML - Unified Modeling Language */

// https://app.diagrams.net
// https://refactoring.guru/design-patterns/catalog

const randomColor = (): Colors => {
  const colors = Object.values(Colors).slice(1); // Exclude Black.
  return colors[Math.floor(Math.random() * colors.length)];
};

const printAllColors = (text: string): void => {
  const colors = Object.values(Colors);

  colors.forEach((color) => {
    console.log(color, text);
  });

  console.log("\n");
};

const umls = "https://app.diagrams.net";
const designPatterns = "https://refactoring.guru/design-patterns/catalog";

console.log("Ctrl+Click link 🔗", "\n");

console.log(randomColor(), umls);
printAllColors(umls);

console.log(randomColor(), designPatterns);
printAllColors(designPatterns);

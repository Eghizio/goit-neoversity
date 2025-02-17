export const sleep = async (ms = 1_000) =>
  new Promise((r) => setTimeout(r, ms));

export const simulateError = (errorChance = 0.5) => {
  if (errorChance > Math.random()) throw new Error("Random error. hehe xd");
};

export const rndBool = () => Math.random() > 0.5;

export const randomElement = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

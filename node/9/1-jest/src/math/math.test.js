const math = require("./math.js");
/* For ESM https://jestjs.io/docs/ecmascript-modules */

const MAGENTA = "\x1b[35m%s\x1b[0m";
const BLUE = "\x1b[34m%s\x1b[0m";
const YELLOW = "\x1b[33m%s\x1b[0m";

const debug = true;
const log = (...text) => debug && console.log(...text);

describe("math.plus", () => {
  /* Hooks, Setup & Teardown */
  beforeAll(() => log(MAGENTA, "Before all!"));
  afterAll(() => log(MAGENTA, "After all!"));
  beforeEach(() => log(BLUE, "Before each!"));
  afterEach(() => log(BLUE, "After each!"));

  // const a = 2;

  // test("should add 2 and 2 returning 4", () => {
  //   log(YELLOW, "\n 2 + 2 = 4 \n");
  //   // Given
  //   const a = 2;
  //   const b = 2;

  //   // When
  //   const result = math.plus(a, b);

  //   // Then
  //   expect(result).toBe(4);
  // });

  // test("should add 2 and -2 returning 0", () => {
  //   log(YELLOW, "\n 2 + -2 = 0 \n");
  //   const result = math.plus(2, -2);

  //   expect(result).toBe(0);
  // });

  // test("should add 2 and -44 returning -42", () => {
  //   log(YELLOW, "\n 2 + -44 = -42 \n");
  //   const result = math.plus(2, -44);

  //   expect(result).toBe(-42);
  // });

  test.each([
    { a: 2, b: 2, expected: 4 },
    { a: 2, b: -2, expected: 0 },
    { a: 2, b: -44, expected: -42 },
  ])("should add $a and $b returning $expected", ({ a, b, expected }) => {
    log(YELLOW, `\n ${a} + ${b} = ${expected} \n`);

    const result = math.plus(a, b);

    expect(result).toBe(expected);
  });
});

// Todo: Implement remaining tests for math methods.

describe("math.substract", () => {
  test.each([
    [2, 2, 0],
    [2, -2, 4],
    [2, -44, 46],
    [0, 0, 0],
    [-2, -2, 0],
  ])("should add %i and %i returning %i", (a, b, expected) => {
    log(YELLOW, `\n ${a} - ${b} = ${expected} \n`);

    const result = math.substract(a, b);

    expect(result).toBe(expected);
  });
});

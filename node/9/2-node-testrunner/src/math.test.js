import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { plus, substract, multiply, divide } from "./math.js";

/* Given, When, Then - https://martinfowler.com/bliki/GivenWhenThen.html */
/* AAA - Arrange, Act, Assert -  https://xp123.com/3a-arrange-act-assert */
/* TDD - https://pl.wikipedia.org/wiki/Test-driven_development */
/* BDD - https://pl.wikipedia.org/wiki/Behavior-driven_development */

describe("plus", () => {
  it("should add 2 & 2", () => {
    // Given
    const expectedResult = 4;
    const a = 2;
    const b = 2;

    // When
    const actualResult = plus(a, b);

    // Then
    assert.strictEqual(actualResult, expectedResult);
  });

  [
    { a: 2, b: 2, expected: 4 },
    { a: 2, b: -2, expected: 0 },
    { a: 2, b: -44, expected: -42 },
  ].forEach(({ a, b, expected }) =>
    it(`should add ${a} and ${b} returning ${expected}`, () => {
      const result = plus(a, b);

      assert.strictEqual(result, expected);
    })
  );
});

// Todo: Implement remaining tests for math methods.

describe("substract", () => {
  [
    { a: 2, b: 2, expected: 0 },
    { a: 2, b: -2, expected: 4 },
    { a: 2, b: -44, expected: 46 },
    { a: 0, b: 0, expected: 0 },
    { a: -2, b: -2, expected: 0 },
  ].forEach(({ a, b, expected }) =>
    it(`should substract ${a} and ${b} returning ${expected}`, () => {
      const result = substract(a, b);

      assert.strictEqual(result, expected);
    })
  );
});

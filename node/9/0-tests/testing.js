/* Let's test some of our code! */
/* npm test */

// const capitalize = (text) =>
//   text.slice(0, 1).toUpperCase() + text.slice(1, text.length);

// /* Let's refactor our code */
// const capitalize = (text) =>
//   text.charAt(1).toUpperCase() + text.slice(0); /* this is bugged! x2 */

/* Debugging... It works! */
const capitalize = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1); /* Refactored */

/* Unit Tests - https://martinfowler.com/articles/practical-test-pyramid.html */
/* Testing Pyramid - https://martinfowler.com/articles/practical-test-pyramid/testPyramid.png /*

// /* Using our code */
// const result = capitalize("dupa");
// /* DDD aka Dupa Driven Development */
// console.log(result);
// /* Single test case (specific single scenario) */
// console.log({ result, isOk: result === "Dupa" });

/* Parametrized test cases (multiple scenarios) */
const testCases = [
  { label: "Should capitalize adam", input: "adam", expected: "Adam" },
  { label: "Should capitalize beth", input: "beth", expected: "Beth" },
  {
    label: "Should return the same output for numbers",
    input: "321",
    expected: "321",
  },
  // {
  //   label: "Should return all upper case",
  //   input: "KUBA",
  //   expected: "faulty_result",
  // },
  {
    label: "Should return a name with first letter capitalized",
    input: "Kuba",
    expected: "Kuba",
  },
  {
    label: "Should return output matching the input",
    input: "KUBA",
    expected: "KUBA",
  },
];

const testSuiteResult = testCases
  .map(({ input, expected, label }, i) => {
    const result = capitalize(input);

    const isOk = result === expected;

    console.log(`${i + 1} ${isOk ? "✅" : "❌"} ${label}`);

    if (!isOk) {
      console.table({ input, expected, result, isOk });
    }

    return isOk;
  })
  .every(Boolean);

console.log(
  "=".repeat(21),
  `\n${testSuiteResult ? "✅" : "❌"} ${
    testSuiteResult ? "All tests passing!" : "Some of the tests failed :("
  }\n`,
  "=".repeat(21)
);

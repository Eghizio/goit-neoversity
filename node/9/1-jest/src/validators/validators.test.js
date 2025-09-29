const validators = require("./validators.js");
const { reportResult } = require("./analytics.js");
/* Jest globals: describe, test, it, expect etc. */

/*
Result reported is not important in scope of this tests.
So we can mimick its behaviour to our wishes.
Because we only test validators logic here.
And not the analytics module stuff that is coupled to that module.
*/

jest.mock("./analytics.js", () => ({
  reportResult: jest.fn(() => {
    console.log("\x1b[90m%s\x1b[0m", "Mocked analytics");
  }),
}));

describe("validators", () => {
  test.each`
    username                                  | expected
    ${"Kuba"}                                 | ${true}
    ${"Adam"}                                 | ${true}
    ${"Bo"}                                   | ${false}
    ${"AbcdefghiAbcdefghiAbcdefghiAbcdefghi"} | ${false}
  `("should validate name '$username' length", ({ username, expected }) => {
    const result = validators.nameValidator(username);

    expect(result).toBe(expected);
  });

  test.each([0, 1, 18, 42, 99, 105, 142])(
    "should validate age %i to be within certain range",
    (age) => {
      const result = validators.ageValidator(age);

      expect(result).not.toBeFalsy();
    }
  );

  test.each([
    { email: "test@test.test", expected: true },
    { email: "kuba@mail.pl", expected: true },
    { email: "user@com", expected: false },
    { email: "dupacom", expected: false },
    { email: "", expected: false },
  ])(
    `should validate email %s to be containt certain characters`,
    ({ email, expected }) => {
      const result = validators.emailValidator(email);

      expect(result).toBe(expected);
    }
  );

  test.each([321, null, undefined, NaN, Infinity, true])(
    "email validator should throw error for non string value %p",
    (value) => {
      expect(() => {
        validators.emailValidator(value);
      }).toThrow(Error);
    }
  );

  afterEach(() => {
    /* Reset mocks between tests */
    jest.resetAllMocks(); // cleanup
  });

  test.each`
    name            | age    | email
    ${"Kuba"}       | ${42}  | ${"kuba@user.com"}
    ${"Małgorzata"} | ${120} | ${"malgo@user.pl"}
    ${"Mateusz"}    | ${140} | ${"mati@mail.test"}
    ${"Gugu"}       | ${0}   | ${"gugugaga@dupa.dupa"}
  `("should validate user with correct data", ({ name, age, email }) => {
    /* Given */
    const user = { name, age, email };

    /* When */
    const result = validators.userValidator(user);

    /* Then */
    // expect(result).toBeTruthy(); /* Redundant assertion. */
    expect(result).toBe(true);

    expect(reportResult).toHaveBeenCalled();
    expect(reportResult).toHaveBeenCalledTimes(1); /* Requires mock reset */
    expect(reportResult).toHaveBeenCalledWith(user, result);
  });

  test.each`
    user
    ${{ name: "Dupa", age: -1, email: "dupa@dupa.com" }}
    ${{ name: "Dupa", age: 42, email: "dupa@dupa" }}
    ${{ name: "Dupa", age: 9999, email: "dupa@dupa.com" }}
    ${{ name: "Dupa", age: -42, email: "dupa" }}
    ${{ name: "WielkaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaDupa", age: -42, email: "dupa" }}
    ${{ name: "Du", age: -42, email: "dupa" }}
    ${{ name: null, age: null, email: null }}
  `("should throw for invalid user $user", ({ user }) => {
    expect(() => {
      validators.userValidator(user);
    }).toThrow(Error);
  });
});

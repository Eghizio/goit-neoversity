const { reportResult } = require("./analytics.js");

const nameValidator = (name) => name.length >= 3 && name.length <= 32;

const ageValidator = (age) => age >= 0 && age <= 142;

const emailValidator = (email) => {
  if (typeof email !== "string") throw new Error("Email must be a string!");
  return email.includes("@") && email.includes(".");
};

const userValidator = ({ name, age, email }) => {
  const isValid =
    nameValidator(name) && ageValidator(age) && emailValidator(email);

  /* sending results to some analytics API (external dependency) */
  reportResult({ name, age, email }, isValid);

  if (!isValid) throw new Error("Invalid user data!");

  return isValid;
};

module.exports = {
  nameValidator,
  ageValidator,
  emailValidator,
  userValidator,
};

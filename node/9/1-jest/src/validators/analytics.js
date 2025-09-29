const YELLOW = "\x1b[33m%s\x1b[0m";

const reportResult = async (user, result) => {
  console.log(YELLOW, "Sending analytics", user);
  await fetch("http:localhost:3000/analytics", {
    method: "POST",
    body: JSON.stringify({ user, result }),
  });
  console.log(YELLOW, `Sent with result: ${result}`);
};

module.exports = {
  reportResult,
};

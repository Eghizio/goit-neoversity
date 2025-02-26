const registeredUsers = [
  {
    id: crypto.randomUUID(),
    email: "user@user.com",
    password: "user123",
    name: "User",
  },
  {
    id: crypto.randomUUID(),
    email: "kuba@koduj.se",
    password: "kuba123",
    name: "Kuba",
  },
];

const sleep = (ms = 3_000) => new Promise((r) => setTimeout(r, ms));

/* Simulating API calls. */
export class UserApi {
  async login(email, password) {
    await sleep();

    const user = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user === undefined) {
      throw new Error("Invalid credentials.");
    }

    /* DTO = Data Transfer Object. */
    const { password: thisWillBeOmitted, ...userDto } = user;

    return userDto;
  }
}

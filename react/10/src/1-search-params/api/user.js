import registeredUsers from "../data/users.json";
import { sleep } from "./utils";

/* Simulating API calls. */
export class UserApi {
  async login(email, password) {
    await sleep(3_000);

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

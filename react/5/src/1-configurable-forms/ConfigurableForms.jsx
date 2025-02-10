import { useState } from "react";

const RegisterForm = ({ uponSubmission }) => {
  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const { username, password } = form.elements;

    const user = {
      username: username.value.trim(),
      password: password.value,
    };

    alert(`Registering user: ${JSON.stringify(user, null, 2)}`);

    if (uponSubmission) uponSubmission(user);

    form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="col border" autoComplete="off">
      <label htmlFor="register-username">
        Username:
        <input type="text" name="username" id="register-username" />
      </label>

      <label htmlFor="register-password">
        Password:
        <input type="password" name="password" id="register-password" />
      </label>

      <button className="orange" type="submit">
        Register
      </button>
    </form>
  );
};

const LoginForm = ({ uponSubmission }) => {
  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const { username, password } = form.elements;

    const user = {
      username: username.value.trim(),
      password: password.value,
    };

    alert(`Logging in user: ${JSON.stringify(user, null, 2)}`);

    if (uponSubmission) uponSubmission(user);

    form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="col border" autoComplete="off">
      <label htmlFor="login-username">
        Username:
        <input type="text" name="username" id="login-username" />
      </label>

      <label htmlFor="login-password">
        Password:
        <input type="password" name="password" id="login-password" />
      </label>

      <button className="green" type="submit">
        Login
      </button>
    </form>
  );
};

const AuthForms = () => {
  const [registeredUsers, setRegisteredUsers] = useState([
    { id: crypto.randomUUID(), username: "Kuba", password: "admin" },
  ]);

  const [loggedInUser, setLoggedInUser] = useState(null);

  console.log(registeredUsers);

  const register = (user) => {
    if (user.username.length === 0) {
      /* This could belong to Form component. */
      return console.error("Username cannot be empty!");
    }

    const id = crypto.randomUUID();
    setRegisteredUsers((prev) => [...prev, { id, ...user }]);
  };

  const login = (user) => {
    const foundUser = registeredUsers.find(
      ({ username }) => username === user.username
    );

    if (!foundUser) {
      return console.error(
        `No user registered with username: "${user.username}"`
      );
    }

    const isCorrectPassword = foundUser.password === user.password;

    if (!isCorrectPassword) {
      return console.error(
        `Invalid credentials for username: "${user.username}"`
      );
    }

    alert("Logged in successfully!");

    setLoggedInUser(foundUser);
  };

  const logout = () => {
    console.log(`Logging out user: ${loggedInUser.username}`);
    setLoggedInUser(null);
  };

  return (
    <>
      <RegisterForm uponSubmission={register} />

      <LoginForm uponSubmission={login} />

      {loggedInUser === null ? null : (
        <div className="col border">
          <p>Logged in as {loggedInUser.username}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </>
  );
};

const ConditionalAuthForms = () => {
  console.log(
    "Error with non unique input fields id and name. We will solve that later."
  );

  const [registeredUsers, setRegisteredUsers] = useState([
    { id: crypto.randomUUID(), username: "Kuba", password: "admin" },
  ]);

  const [loggedInUser, setLoggedInUser] = useState(null);

  console.log(registeredUsers);

  const register = (user) => {
    const id = crypto.randomUUID();
    setRegisteredUsers((prev) => [...prev, { id, ...user }]);
  };

  const login = (user) => {
    const foundUser = registeredUsers.find(
      ({ username }) => username === user.username
    );

    if (!foundUser) {
      return console.error(
        `No user registered with username: "${user.username}"`
      );
    }

    const isCorrectPassword = foundUser.password === user.password;

    if (!isCorrectPassword) {
      return console.error(
        `Invalid credentials for username: "${user.username}"`
      );
    }

    alert("Logged in successfully!");

    setLoggedInUser(foundUser);
  };

  const logout = () => {
    console.log(`Logging out user: ${loggedInUser.username}`);
    setLoggedInUser(null);
  };

  return (
    <section id="Conditional rendered UI" className="col">
      {loggedInUser === null ? (
        <>
          <RegisterForm uponSubmission={register} />

          <LoginForm uponSubmission={login} />
        </>
      ) : (
        <div className="col border">
          <p>Logged in as {loggedInUser.username}</p>
          <p>Have fun!</p>

          <button
            className="blue"
            type="button"
            onClick={() => console.log(new Date())}
          >
            Get current date
          </button>

          <button className="red" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </section>
  );
};

export const ConfigurableForms = () => (
  <main className="col wide-gap">
    <h1>Configurable Uncontrolled Forms</h1>

    <section className="col">
      <h2>Configurable Form</h2>

      <AuthForms />
    </section>

    <section className="col">
      {/* <h2>Conditional Forms</h2>

      <ConditionalAuthForms /> */}
    </section>
  </main>
);

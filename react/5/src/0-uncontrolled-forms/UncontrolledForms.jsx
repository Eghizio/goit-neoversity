const RegisterForm = ({ uponSubmission }) => {
  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
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

const CallbackAuthForms = () => {
  console.log(
    "Error with non unique input fields id and name. We will solve that later."
  );

  const register = (user) => {
    console.log(`Registered successfully:`, user);
  };

  const login = (user) => {
    console.log("Logged in successfully:", user);
  };

  return (
    <>
      <RegisterForm uponSubmission={register} />

      <LoginForm uponSubmission={login} />
    </>
  );
};

export const UncontrolledForms = () => (
  <main className="col wide-gap">
    <h1>Uncontrolled Forms</h1>

    <section id="Simple" className="col">
      <h2>Simple</h2>
      <RegisterForm />

      <LoginForm
        uponSubmission={(user) => console.log(`Hello ${user.username}`)}
      />
    </section>

    <section id="Non unique form field id & name" className="col">
      {/* <h2>With Callbacks</h2>

      <CallbackAuthForms /> */}
    </section>
  </main>
);

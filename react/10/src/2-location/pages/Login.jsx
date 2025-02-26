import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Spinner } from "../components/Spinner";
import { useUser } from "../context/UserContext";

export const Login = () => {
  const { user, login } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  /* Still can enter /login via URL. Need to persist state. */
  if (user !== null) return <Navigate to="/profile" replace />;

  const loginUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const email = event.target.elements["email"].value.trim();
    const password = event.target.elements["password"].value;

    console.log({ email, password });

    try {
      await login(email, password);
      /* navigate to <Profile />, already handled in <UserProvider /> and above */
    } catch (error) {
      alert(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="col">
      <h2>Login</h2>

      <form className="row" onSubmit={loginUser} autoComplete="off">
        <Input type="email" name="email" label="Email" required />
        <Input type="password" name="password" label="Password" required />

        <button className="hoverable" type="submit" disabled={isLoading}>
          Login
        </button>
      </form>

      {isLoading ? <Spinner /> : null}
    </main>
  );
};

import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const TopBar = () => {
  const { user, logout } = useUser();

  return (
    <header>
      {user ? (
        <div className="row">
          <p className="green">Logged in as "{user.name}"</p>

          <button className="hoverable red" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="row">
          <p className="red">Not logged in.</p>

          <Link className="hoverable blue" to="/login">
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

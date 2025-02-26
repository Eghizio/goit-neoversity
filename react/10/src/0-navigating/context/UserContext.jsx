import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../api/user";

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("User Context must be used within Provider.");
  }

  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const api = useMemo(() => new UserApi(), []);

  useEffect(() => {
    console.log({ user });

    if (user === null) {
      navigate("/login", { replace: true });
    } else {
      navigate("/profile");
    }
  }, [user]);

  const login = async (email, password) => {
    const user = await api.login(email, password);

    console.log("%cLogging in.", "color:dodgerblue;");
    setUser(user);
  };

  const logout = () => {
    console.log("%cLogging out.", "color:dodgerblue;");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

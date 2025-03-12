import { useEffect } from "react";
import { Router } from "./router/Router";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/operations/user";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return <Router />;
};

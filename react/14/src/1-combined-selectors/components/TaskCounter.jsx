import { useSelector } from "react-redux";
import { selectTaskCount } from "../redux/selectors";

export const TaskCounter = () => {
  const { active, completed } = useSelector(selectTaskCount);

  return (
    <div>
      <p>Active: {active}</p>
      <p>Completed: {completed}</p>
    </div>
  );
};

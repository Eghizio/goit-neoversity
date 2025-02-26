import { Bar } from "../components/Bar";
import { useUser } from "../context/UserContext";

export const Profile = () => {
  const { user } = useUser();

  return (
    <main>
      <h2>Profile</h2>

      <Bar>
        <p className="red">Only logged in users allowed!</p>

        <p className="blue">
          Good thing that you are already logged in{" "}
          <span style={{ textDecoration: "underline" }}>{user.name}</span>
        </p>
      </Bar>
    </main>
  );
};

import { HiMenu } from "react-icons/hi";
import { VscNewFolder } from "react-icons/vsc";
import { IoMdBeer } from "react-icons/io";

const Icon = ({ type }) => {
  const size = 256;
  switch (type) {
    case "hamburger":
      return <HiMenu size={size} color="red" />;
    case "folder":
      return <VscNewFolder size={size} color="dodgerblue" />;
    case "beer":
      return <IoMdBeer size={size} color="goldenrod" />;
    default:
      return <IoMdBeer size={size} color="goldenrod" />;
  }
};

export const ReactIcons = () => {
  return (
    <main>
      <h1>ReactIcons</h1>

      <div>
        <HiMenu size={64} color="red" />

        <VscNewFolder size={128} color="dodgerblue" />

        <IoMdBeer size={256} color="goldenrod" />
      </div>

      <div>
        <Icon />
        <Icon type="folder" />
      </div>
    </main>
  );
};

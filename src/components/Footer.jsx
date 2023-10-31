import * as RiIcon from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="gap-x-4 max-w-7xl w-full mx-auto flex items-center justify-center py-3 border-t-2 border-gray-400">
      <Link to={"/"}>
        <RiIcon.RiGithubFill
          size={30}
          className="text-indigo-700 transition-all duration-300 hover:text-blue-700"
        />
      </Link>
      <Link to={"/"}>
        <RiIcon.RiLinkedinFill
          size={30}
          className="text-indigo-700 transition-all duration-300 hover:text-blue-700"
        />
      </Link>
      <Link to={"/"}>
        <RiIcon.RiDiscordFill
          size={30}
          className="text-indigo-700 transition-all duration-300 hover:text-blue-700"
        />
      </Link>
    </footer>
  );
};

export default Footer;

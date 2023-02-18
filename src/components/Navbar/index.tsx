import AuthService from "@services/Auth";
import { ReactElement, FC } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { PropsTypes } from "./types";

const Navbar: FC<PropsTypes> = ({ city = "Sidoarjo" }): ReactElement => {
  return (
    <header
      data-testid="navbar"
      className="bg-nav-primary h-full sticky flex items-center justify-between max-w-auto w-full p-4"
    >
      <figure>
        <FaBars className="text-white" />
      </figure>
      <nav className="items-center flex gap-x-4">
        <span className="text-white font-medium uppercase">{city}</span>
        <FaUser onClick={() => AuthService.Logout()} className="text-white" />
      </nav>
    </header>
  );
};

export default Navbar;

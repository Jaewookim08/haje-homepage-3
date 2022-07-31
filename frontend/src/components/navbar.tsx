import { Link } from "gatsby";
import React from "react";

type Props = {
  isFrontPage: boolean;
};

const Navbar = ({ isFrontPage }: Props) => {
  return (
    <header
      className={`fixed z-50 h-20 w-full ${
        isFrontPage ? "bg-transparent text-white" : "bg-neutral-50 text-black"
      } `}
    >
      <nav className="container flex flex-row flex-nowrap items-baseline justify-between py-6">
        <Link to="/" className="w-16 text-center text-xl font-medium">
          HAJE
        </Link>
        <div className="flex flex-row items-baseline justify-between gap-x-20">
          <Link className="font-medium" to="/games">
            Games
          </Link>
          <Link className="font-medium" to="/news">
            News
          </Link>
          <Link className="font-medium" to="/about">
            About
          </Link>
          <Link className="font-medium" to="/recruiting">
            Recruiting
          </Link>
        </div>
        <div className="flex w-16" />
      </nav>
    </header>
  );
};

export default Navbar;

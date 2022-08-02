import { Link } from "gatsby";
import React from "react";

type Props = {
  isFrontPage: boolean;
};

const Navbar = ({ isFrontPage }: Props) => {
  const links = [
    {
      to: "/games",
      inner: "Games",
    },
    {
      to: "/news",
      inner: "News",
    },
    {
      to: "/about",
      inner: "About",
    },
    {
      to: "/recruitment",
      inner: "Recruitment",
    },
  ];

  return (
    <header
      className={`fixed z-50 h-20 w-full transition-colors duration-300 ease-in-out ${
        isFrontPage
          ? "bg-transparent text-white hover:bg-neutral-50 hover:text-black"
          : "bg-neutral-50 text-black"
      } `}
    >
      <nav className="container flex h-full flex-row flex-nowrap items-center justify-between">
        <Link
          to="/"
          className="w-16 items-center text-center text-xl font-medium"
        >
          HAJE
        </Link>
        <div className="flex h-full flex-row items-baseline items-stretch justify-between gap-x-20">
          {links.map(({ to, inner }) => (
            <Link className="medium flex items-center" to={to}>
              {inner}
            </Link>
          ))}
        </div>
        <div className="flex w-16" />
      </nav>
    </header>
  );
};

export default Navbar;

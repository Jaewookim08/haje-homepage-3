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
      className={`z-50 h-20 w-full transition-colors duration-300 ease-in-out ${
        isFrontPage
          ? "fixed bg-transparent text-white hover:bg-neutral-50 hover:text-black"
          : "sticky top-0 bg-neutral-50 text-black"
      } `}
    >
      <nav className="container flex h-full flex-row flex-nowrap items-center justify-between">
        <Link
          to="/"
          className="w-16 items-center text-center text-xl font-medium"
        >
          HAJE
        </Link>
        <div className="flex h-full flex-row items-baseline items-stretch justify-between">
          {links.map(({ to, inner }) => (
            <Link
              className="medium inline-block flex items-center px-12 [&>*]:hover:text-primary [&>*]:hover:after:origin-bottom-left [&>*]:hover:after:scale-x-100"
              to={to}
            >
              <span
                className={`relative inline-block transition-colors duration-200 ease-out after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:origin-bottom-right 
                after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out after:content-['']`}
              >
                {inner}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex w-16" />
      </nav>
    </header>
  );
};

export default Navbar;

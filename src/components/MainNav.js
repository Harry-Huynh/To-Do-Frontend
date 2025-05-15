import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoLogOut } from "react-icons/io5";

export default function MainNav() {
  const [shown, setShown] = useState(true);
  const [lastPosition, setLastPosition] = useState(0);
  const [backgroundTransparent, setBackgroundTransparent] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setShown(true);
        setBackgroundTransparent(true);
      } else if (currentScrollY > lastPosition) {
        setShown(false); // scrolling down
        setBackgroundTransparent(true);
      } else {
        setShown(true); // scrolling up
        setBackgroundTransparent(false);
      }

      setLastPosition(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastPosition]);

  return (
    <nav
      className={`w-full fixed top-0 left-0 transition-all duration-300 ${
        shown ? "translate-y-0" : "-translate-y-full"
      } z-30 ${
        backgroundTransparent ? "bg-transparent" : "bg-[#a9b2ac]"
      } border-none px-0`}
    >
      <div className="navbar py-0">
        <div className="navbar-start relative">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-100 mt-3 w-fit p-2 shadow bg-white"
            >
              <li>
                <Link href="/register" className="text-lg">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-lg">
                  Log In
                </Link>
              </li>
              <li>
                <span className="text-lg">Logout</span>
              </li>
            </ul>
          </div>

          <Image
            src="/favicon.ico"
            alt="Logo"
            width={35}
            height={35}
            className="my-auto lg:absolute lg:top-1/2 lg:left-1/18 lg:-translate-x-1/2 lg:-translate-y-1/2"
          />
        </div>

        <div className="navbar-end">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-xl">
              <li className="transition-all duration-300 bg-gradient-to-r from-white to-white bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] rounded-xl m-1">
                <Link href="/register">Register</Link>
              </li>
              <li className="transition-all duration-300 bg-gradient-to-r from-white to-white bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] rounded-xl m-1">
                <Link href="/login">Log In</Link>
              </li>
              <li className="transition-all duration-300 bg-gradient-to-r from-white to-white bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] rounded-xl m-1">
                <span>Log Out</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

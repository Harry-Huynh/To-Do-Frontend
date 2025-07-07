import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoLogOut } from "react-icons/io5";
import { getToken, removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function MainNav() {
  const [shown, setShown] = useState(true);
  const [lastPosition, setLastPosition] = useState(0);
  const [backgroundTransparent, setBackgroundTransparent] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const token = getToken();

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

  function handleLogout() {
    removeToken();
    router.push("/login");
  }

  return (
    <nav
      className={`w-full fixed top-0 left-0 transition-all duration-300 ${
        shown ? "translate-y-0" : "-translate-y-full"
      } z-30 bg-transparent px-0`}
    >
      <div className="navbar py-0">
        <div className="navbar-start  relative">
          {!token && (
            <div className="dropdown" onClick={() => setExpanded(!expanded)}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
              {expanded && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content rounded-box z-100 mt-3 w-fit p-2 shadow bg-white rounded-xl"
                >
                  <li onClick={() => setExpanded(false)}>
                    <Link href="/register" className="text-lg">
                      Register
                    </Link>
                  </li>
                  <li onClick={() => setExpanded(false)}>
                    <Link href="/login" className="text-lg">
                      Sign In
                    </Link>
                  </li>

                  {token && (
                    <li
                      onClick={() => {
                        setExpanded(false);
                      }}
                    >
                      <span className="text-lg" onClick={handleLogout}>
                        <IoLogOut />
                        Sign out
                      </span>
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}

          <Image
            src="/favicon.ico"
            alt="Logo"
            width={35}
            height={35}
            className="my-auto lg:absolute lg:top-1/2 lg:left-1/12 lg:-translate-x-1/2 lg:-translate-y-1/2"
          />
        </div>

        {token && (
          <div className="navbar-end">
            <div className="flex">
              <ul className="menu menu-horizontal px-1 text-lg font-semibold">
                <li
                  className="transition-all duration-300 bg-gradient-to-r from-black to-black bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] rounded-xl m-1 border-3 border-black hover:text-white"
                  onClick={handleLogout}
                >
                  <span>
                    <IoLogOut className="inline-block -mr-1" />
                    Sign out
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {!token && (
          <div className="navbar-end px-10">
            <div className="hidden lg:flex text-[#1f2937]">
              <ul className="menu menu-horizontal px-1 text-lg font-semibold">
                <li className="transition-all duration-300 bg-gradient-to-r from-black to-black bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] rounded-xl m-2 border-3 border-black hover:text-white">
                  <Link href="/register">Register</Link>
                </li>
                <li className="transition-all duration-300 bg-gradient-to-r from-black to-black bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] rounded-xl m-2 border-3 border-black hover:text-white">
                  <Link href="/login">Sign In</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

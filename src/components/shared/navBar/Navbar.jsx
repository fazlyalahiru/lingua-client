import { Link, NavLink } from "react-router-dom";
import Container from "../Container";
import { FaCookieBite } from "react-icons/fa";
import { GrInsecure } from "react-icons/gr";
import { AiOutlineCaretDown, AiOutlineUserAdd } from "react-icons/ai";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { useState } from "react";
import NavLogo from "./NavLogo";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  return (
    <div className="shadow-sm py-2 ">
      <Container>
        <div className="py-2 ">
          <div className="relative flex items-center justify-between">
            {/* nav items */}
            <ul className="items-center hidden space-x-8 lg:flex  font-semibold">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-[#42CBA8] #ff5722" : "text-black"
                  }>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    isActive ? "text-[#42CBA8]" : "text-black"
                  }>
                  Blog
                </NavLink>
              </li>
            </ul>
            {/* Logo Section */}
            <Link to="/" className="inline-flex items-center">
              <NavLogo></NavLogo>
            </Link>
            {/* login */}
            <div className="hidden lg:block">
              {/* <Link to="/login">
                <button className="bg-[#ff5722] text-white px-6 py-1 md:py-2 rounded">
                  Login
                </button>
              </Link> */}

              {/* <div className="dropdown dropdown-hover">
                <label tabIndex={0}>Get started for free</label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div> */}
              <div className="relative ">
                <Link
                  className="flex justify-center items-center gap-2 bg-[#42CBA8] text-white px-2 md:px-6 py-1 md:py-2 rounded"
                  onClick={() => setIsGetStartedOpen(!isGetStartedOpen)}>
                  <p>Get Started</p>
                  <AiOutlineCaretDown></AiOutlineCaretDown>
                </Link>
                {isGetStartedOpen && (
                  <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-10">
                    <div className="flex  flex-col cursor-pointer p-2">
                      <NavLink
                        to="/login"
                        className="hover:bg-gray-100 transition-opacity p-2">
                        <span className="flex justify-center items-center gap-1">
                          <GrInsecure></GrInsecure> <p>Login</p>
                        </span>
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="hover:bg-gray-100 transition-opacity p-2">
                        <span className="flex justify-center  items-center gap-1">
                          <AiOutlineUserAdd></AiOutlineUserAdd> <p>Register</p>
                        </span>
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile nav section */}
            <div className="lg:hidden z-20">
              <button>
                <HiOutlineBars3BottomRight
                  className="w-5 text-gray-600"
                  onClick={() =>
                    setIsNavOpen(true)
                  }></HiOutlineBars3BottomRight>
              </button>
              {isNavOpen && (
                <div className="absolute top-0 left-0 w-full z-10">
                  <div className="p-5 bg-white border rounded shadow-sm">
                    {/* Logo & Button section */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="z-10">
                        <Link to="/" className="inline-flex items-center">
                          <FaCookieBite className="h-6 w-6 text-[#42CBA8]" />
                          <span className="ml-2 text-base font-bold  text-gray-800 uppercase">
                            Chef Yard
                          </span>
                        </Link>
                      </div>
                      {/* Dropdown menu close button */}
                      <div>
                        <button
                          aria-label="Close Menu"
                          title="Close Menu"
                          onClick={() => setIsNavOpen(false)}>
                          <p className="w-5 text-gray-600">X</p>
                        </button>
                      </div>
                    </div>
                    {/* Mobile Nav Items Section */}

                    <div>
                      <Link to="/login">
                        <button className="bg-[#42CBA8] text-white px-6 py-1 md:py-2 rounded">
                          Login
                        </button>
                      </Link>
                      <nav>
                        <ul className="space-y-4">
                          <li onClick={() => setIsNavOpen(false)}>
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => setIsNavOpen(false)}
                              to="/blog">
                              Blog
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

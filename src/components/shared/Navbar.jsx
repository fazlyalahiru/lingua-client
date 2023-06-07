import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import { FaCookieBite } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { useState } from "react";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  return (
    <div>
      <Container>
        <div className="py-2">
          <div className="relative flex items-center justify-between">
            {/* nav items */}
            <ul className="items-center hidden space-x-8 lg:flex  font-semibold">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-[#ff5722] #ff5722" : "text-black"
                  }>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    isActive ? "text-[#ff5722]" : "text-black"
                  }>
                  Blog
                </NavLink>
              </li>
            </ul>
            {/* Logo Section */}
            <Link to="/" className="inline-flex items-center">
              <FaCookieBite className="h-6 w-6 text-[#ff5722]" />
              <span className="ml-2  text-base md:text-2xl font-bold text-gray-800 uppercase">
                Chef yard
              </span>
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
                <div
                  className="flex justify-center items-center gap-2 bg-[#42CBA8] text-white px-2 md:px-6 py-1 md:py-2 rounded cursor-pointer"
                  onClick={() => setIsGetStartedOpen(!isGetStartedOpen)}>
                  <p>Get Started</p>
                  <AiOutlineCaretDown></AiOutlineCaretDown>
                </div>
                {isGetStartedOpen && (
                  <p className="absolute top-12 right-0 w-full z-10">
                    This is drop down
                  </p>
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
                          <FaCookieBite className="h-6 w-6 text-[#ff5722]" />
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
                        <button className="bg-[#ff5722] text-white px-6 py-1 md:py-2 rounded">
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

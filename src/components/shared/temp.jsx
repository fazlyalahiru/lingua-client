import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Bars3BottomRightIcon,
  XMarkIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
import { FaCookieBite } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProviders";
import "./Header.css";
import { toast } from "react-hot-toast";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(user);

  const handleLogOut = () => {
    logout();
    return toast
      .error("You are logged out")
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className=" px-4 py-5 mx-auto md:px-24 lg:px-10 border z-10">
      <div className="relative flex items-center justify-between my-container">
        {/* Logo Section */}
        <Link to="/" className="inline-flex items-center">
          <FaCookieBite className="h-6 w-6 text-[#ff5722]" />
          <span className="ml-2  text-base md:text-2xl font-bold text-gray-800 uppercase">
            Chef yard
          </span>
        </Link>

        {/* Nav Items Section */}
        <ul className="items-center hidden space-x-8 lg:flex  font-semibold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#ff5722]" : "text-black"
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
        <div className="flex gap-1">
          {user && (
            <span
              className="tooltip tooltip-bottom flex justify-center items-center"
              data-tip={`${user.displayName}`}>
              <img className="profile-img" src={user.photoURL} alt="" />
            </span>
          )}

          {user ? (
            <button
              onClick={handleLogOut}
              className="bg-[#ff5722] text-white px-2 md:px-6 py-1 md:py-2 rounded">
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-[#ff5722] text-white px-6 py-1 md:py-2 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
        {/* Mobile Navbar Section */}
        <div className="lg:hidden z-10">
          {/* Dropdown Open Button */}
          <button
            aria-label="Open Menu"
            title="Open Menu"
            onClick={() => setIsMenuOpen(true)}>
            <Bars3BottomRightIcon className="w-5 text-gray-600" />
          </button>
          {isMenuOpen && (
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
                      onClick={() => setIsMenuOpen(false)}>
                      <XMarkIcon className="w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                {/* Mobile Nav Items Section */}
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/blog">Blog</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

import { Link, NavLink } from "react-router-dom";
import Container from "../Container";
import { GrInsecure } from "react-icons/gr";
import { AiOutlineCaretDown, AiOutlineUserAdd } from "react-icons/ai";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { useContext, useState } from "react";
import NavLogo from "./NavLogo";
import { AuthContext } from "../../../providerders/AuthProviders";
import UserProfile from "./UserProfile";
import { BiHomeSmile, BiBookBookmark } from "react-icons/bi";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdOutlineLogout, MdOutlineSpaceDashboard } from "react-icons/md";
import { toast } from "react-hot-toast";
import { Transition } from "@headlessui/react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  // click dropdown to close nav
  const handleMobileNavDropdown = () => {
    setIsGetStartedOpen(false);
    setIsNavOpen(false);
  };
  // handle logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("You successfully logout");
      })
      .then((error) => {
        console.log(error);
      });
  };
  return (
    <div className="shadow-sm py-2 ">
      <Container>
        <div className="py-2 ">
          <div>
            <div className="relative grid grid-cols-3 justify-center items-center">
              {/* nav items */}
              <div>
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
                      to="/instructors"
                      className={({ isActive }) =>
                        isActive ? "text-[#42CBA8]" : "text-black"
                      }>
                      Instructors
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/classes"
                      className={({ isActive }) =>
                        isActive ? "text-[#42CBA8]" : "text-black"
                      }>
                      Classes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive ? "text-[#42CBA8]" : "text-black"
                      }>
                      Dashboard
                    </NavLink>
                  </li>
                </ul>
              </div>
              {/* Logo Section */}
              <div className=" m-auto hidden md:block">
                <Link to="/" className="inline-flex items-center">
                  <NavLogo></NavLogo>
                </Link>
              </div>
              {/* login */}
              <div className="flex justify-end">
                {user ? (
                  <div className="hidden lg:block">
                    <UserProfile></UserProfile>
                  </div>
                ) : (
                  <div className="hidden lg:block">
                    <div className="relative ">
                      <p
                        className="flex justify-center items-center gap-2 bg-[#42CBA8] text-white px-2 md:px-6 py-1 md:py-2 rounded cursor-pointer"
                        onClick={() => setIsGetStartedOpen(!isGetStartedOpen)}>
                        <span>Get Started</span>
                        <AiOutlineCaretDown></AiOutlineCaretDown>
                      </p>
                      {isGetStartedOpen && (
                        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-10">
                          <div className="flex  flex-col cursor-pointer p-2">
                            <NavLink
                              to="/login"
                              onClick={() => setIsGetStartedOpen(false)}
                              className="hover:bg-gray-100 transition-opacity p-2">
                              <span className="flex justify-center items-center gap-1">
                                <GrInsecure></GrInsecure> <p>Login</p>
                              </span>
                            </NavLink>
                            <NavLink
                              to="/register"
                              onClick={() => setIsGetStartedOpen(false)}
                              className="hover:bg-gray-100 transition-opacity p-2">
                              <span className="flex justify-center  items-center gap-1">
                                <AiOutlineUserAdd></AiOutlineUserAdd>{" "}
                                <p>Register</p>
                              </span>
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile nav section */}
            <div className="lg:hidden z-20 ">
              <div className="flex justify-between">
                <div>
                  <NavLogo></NavLogo>
                </div>
                <div>
                  <button>
                    <HiOutlineBars3BottomRight
                      className="w-5 text-gray-600"
                      onClick={() =>
                        setIsNavOpen(true)
                      }></HiOutlineBars3BottomRight>
                  </button>
                </div>{" "}
              </div>
              <Transition
                show={isNavOpen}
                enter="transition-transform ease-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform ease-in duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
                className="absolute top-0 left-0 w-full h-full z-30	">
                <div className="absolute top-0 left-0 w-3/4">
                  <div className=" bg-white border rounded shadow-sm ">
                    {/* Logo & Button section */}
                    <div className="flex flex-col min-h-[calc(100vh-6rem)]">
                      <div className="grow bg-gray-50">
                        <div className="flex items-center justify-between mb-4 bg-gray-100 p-4">
                          <div className="z-10 ">
                            <Link to="/">
                              <NavLogo></NavLogo>
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

                        <div className="px-4">
                          <div className="felx flex-col">
                            {user ? (
                              <div>
                                <img
                                  className="rounded h-14 w-14"
                                  src={user?.photoURL}
                                  alt="profile"
                                  title={user?.displayName}
                                />
                                <p className="text-gray-500 pt-2">
                                  {user?.email}
                                </p>
                                <p className="capitalize text-xl font-semibold">
                                  {user?.displayName}
                                </p>
                              </div>
                            ) : (
                              <div className="flex justify-start">
                                <div className="relative ">
                                  <p
                                    className="flex justify-center items-center gap-2 bg-[#42CBA8] text-white px-2 py-1 rounded cursor-pointer"
                                    onClick={() =>
                                      setIsGetStartedOpen(!isGetStartedOpen)
                                    }>
                                    <span>Get Started</span>
                                    <AiOutlineCaretDown></AiOutlineCaretDown>
                                  </p>
                                  {isGetStartedOpen && (
                                    <div className="absolute rounded-xl shadow-md w-full bg-white overflow-hidden right-0 top-10">
                                      <div className="flex  flex-col cursor-pointer p-2">
                                        <NavLink
                                          to="/login"
                                          onClick={handleMobileNavDropdown}
                                          className="hover:bg-gray-100 transition-opacity p-2">
                                          <span className="flex justify-center items-center gap-1">
                                            <GrInsecure></GrInsecure>{" "}
                                            <p>Login</p>
                                          </span>
                                        </NavLink>
                                        <NavLink
                                          to="/register"
                                          onClick={handleMobileNavDropdown}
                                          className="hover:bg-gray-100 transition-opacity p-2">
                                          <span className="flex justify-center  items-center gap-1">
                                            <AiOutlineUserAdd></AiOutlineUserAdd>{" "}
                                            <p>Register</p>
                                          </span>
                                        </NavLink>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                          <nav>
                            <ul className="space-y-2.5 mt-6">
                              <li
                                className="flex items-center gap-1"
                                onClick={() => setIsNavOpen(false)}>
                                <BiHomeSmile></BiHomeSmile>
                                <Link to="/">Home</Link>
                              </li>
                              <li
                                className="flex items-center gap-1"
                                onClick={() => setIsNavOpen(false)}>
                                <HiOutlineAcademicCap></HiOutlineAcademicCap>
                                <Link to="/instructors">Instructors</Link>
                              </li>
                              <li
                                className="flex items-center gap-1"
                                onClick={() => setIsNavOpen(false)}>
                                <BiBookBookmark></BiBookBookmark>
                                <Link to="/classes">Classes</Link>
                              </li>
                              {user && (
                                <li
                                  className="flex items-center gap-1"
                                  onClick={() => setIsNavOpen(false)}>
                                  <MdOutlineSpaceDashboard></MdOutlineSpaceDashboard>
                                  <Link to="/dashboard">Dashboard</Link>
                                </li>
                              )}
                            </ul>
                          </nav>
                        </div>
                      </div>
                      <div className="flex-none">
                        <div>
                          {user && (
                            <div className="z-10 bg-gray-100 p-4">
                              <li
                                className="flex items-center gap-1"
                                onClick={handleLogout}>
                                <Link to="/">
                                  <MdOutlineLogout
                                    className="text-2xl cursor-pointer"
                                    title="Logout"></MdOutlineLogout>
                                </Link>
                                <p>Sign Out</p>
                              </li>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

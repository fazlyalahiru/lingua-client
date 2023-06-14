import { useContext, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  MdOutlineLogout,
  MdOutlineSpaceDashboard,
  MdPayment,
} from "react-icons/md";
import { AuthContext } from "../../providerders/AuthProviders";
import { BiBookBookmark, BiHomeSmile } from "react-icons/bi";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineCloseSquare } from "react-icons/ai";

const Sidebar = () => {
  const { user, role, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  
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
    <>
      <div className=" text-white py-2  relative ">
        <button
          className="text-[#4285f4] w-12 h-16  md:hidden -mr-8"
          onClick={() => setIsOpen(!isOpen)}>
          <MdOutlineSpaceDashboard className="text-3xl ms-1"></MdOutlineSpaceDashboard>
        </button>

        <Transition
          show={isOpen}
          enter="transition-transform ease-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in duration-100 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="md:hidden absolute top-0 left-0 z-10">
          {/* Mobile sidebar content */}
          <div className="w-screen shadow bg-white p-5 flex flex-col justify-between h-[calc(100vh-10px)]">
            {/* Top div */}
            <div>
              <div className="flex justify-between pr-6">
                <div className="flex justify-center items-center gap-2 ">
                  <img
                    className="rounded-full h-8 w-8"
                    src={user?.photoURL}
                    alt="profile"
                    title={user?.displayName}
                  />
                  <div>
                    <p className="text-gray-700 pt-2 text-xs">{user?.email}</p>
                    <p className="capitalize text-sm text-gray-800 font-semibold">
                      {user?.displayName}
                    </p>
                  </div>
                </div>
                <button
                  className="text-[#4285f4] w-8 h-8  md:hidden -mr-8"
                  onClick={() => setIsOpen(!isOpen)}>
                  <AiOutlineCloseSquare className="text-2xl"></AiOutlineCloseSquare>
                </button>
              </div>
              {role === "instructor" ? (
                <ul className="space-y-2.5 mt-6 text-gray-800 pr-10">
                  <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                    <BiHomeSmile className="text-lg"></BiHomeSmile>
                    <Link
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-lg"
                      to="/">
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                    <HiOutlineAcademicCap className="text-lg"></HiOutlineAcademicCap>
                    <Link
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-lg"
                      to="/dashboard/add-class">
                      Add new class
                    </Link>
                  </li>
                  <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                    <BiBookBookmark className="text-lg"></BiBookBookmark>
                    <Link
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-lg"
                      to="/dashboard/instructor-classes">
                      My Classes
                    </Link>
                  </li>
                </ul>
              ) : role === "admin" ? (
                <div>
                  <ul className="space-y-2.5 mt-6 text-gray-800 pr-10">
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <BiHomeSmile className="text-lg"></BiHomeSmile>
                      <Link
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-lg"
                        to="/">
                        Home
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <BiBookBookmark className="text-lg"></BiBookBookmark>
                      <Link
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-lg"
                        to="/dashboard/manage-classes">
                        Manage Classes
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <FiUsers className="text-lg"></FiUsers>
                      <Link
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-lg"
                        to="/dashboard/manage-users">
                        Manage Users
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <ul className="space-y-2.5 mt-6 text-gray-800 pr-10">
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <BiHomeSmile></BiHomeSmile>
                      <Link onClick={() => setIsOpen(!isOpen)} to="/">
                        Home
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <BiBookBookmark></BiBookBookmark>
                      <Link
                        onClick={() => setIsOpen(!isOpen)}
                        to="/dashboard/my-selected-class">
                        My Selected Classes
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <FaUserGraduate></FaUserGraduate>
                      <Link
                        onClick={() => setIsOpen(!isOpen)}
                        to="/dashboard/my-enrolled-classes">
                        My Enrolled Classes
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <MdPayment></MdPayment>
                      <Link
                        onClick={() => setIsOpen(!isOpen)}
                        to="/dashboard/payment-history">
                        Payment History
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom div */}
            <div className=" w-full ">
              <div className="flex-none">
                <div>
                  {user && (
                    <div className="z-10  p-4">
                      <li
                        className="flex items-center gap-1"
                        onClick={handleLogout}>
                        <Link to="/" className="text-black flex justify-center">
                          <MdOutlineLogout
                            className="text-2xl cursor-pointer"
                            title="Logout"></MdOutlineLogout>
                          <p>Sign Out</p>
                        </Link>
                      </li>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      {/* Desktop sidebar content */}
      <div className="hidden md:block ">
        <div className="grid place-content-between bg-gray-100 py-2 px-4 min-h-screen">
          <div>
            {user && (
              <div className="border-b w-full flex gap-4 items-center pt-4 pb-6">
                <img
                  className="rounded-full h-8 w-8"
                  src={user?.photoURL}
                  alt="profile"
                  title={user?.displayName}
                />
                <div>
                  <p className="capitalize text-sm font-semibold text-black">
                    {user?.displayName}
                  </p>
                  <p className="text-gray-500 pt-2 text-xs -mt-2">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            <div>
              {role === "instructor" ? (
                <ul className="space-y-2.5 mt-6 text-gray-800 pr-10">
                  <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                    <BiHomeSmile className="text-lg"></BiHomeSmile>
                    <Link className="text-lg" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                    <HiOutlineAcademicCap className="text-lg"></HiOutlineAcademicCap>
                    <Link className="text-lg" to="/dashboard/add-class">
                      Add new class
                    </Link>
                  </li>
                  <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                    <BiBookBookmark className="text-lg"></BiBookBookmark>
                    <Link
                      className="text-lg"
                      to="/dashboard/instructor-classes">
                      My Classes
                    </Link>
                  </li>
                </ul>
              ) : role === "admin" ? (
                <div>
                  <ul className="space-y-2.5 mt-6 text-gray-800 pr-10">
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <BiHomeSmile className="text-lg"></BiHomeSmile>
                      <Link className="text-lg" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <BiBookBookmark className="text-lg"></BiBookBookmark>
                      <Link className="text-lg" to="/dashboard/manage-classes">
                        Manage Classes
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <FiUsers className="text-lg"></FiUsers>
                      <Link className="text-lg" to="/dashboard/manage-users">
                        Manage Users
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <ul className="space-y-2.5 mt-6 text-gray-800 pr-10">
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <BiHomeSmile></BiHomeSmile>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <BiBookBookmark></BiBookBookmark>
                      <Link to="/dashboard/my-selected-class">
                        My Selected Classes
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <FaUserGraduate></FaUserGraduate>
                      <Link to="/dashboard/my-enrolled-classes">
                        My Enrolled Classes
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black bg-gray-300 hover:bg-gray-400 py-2 rounded-md px-4">
                      <MdPayment></MdPayment>
                      <Link to="/dashboard/payment-history">
                        Payment History
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Bottom div */}
          <div className=" w-full ">
            <div className="flex-none">
              <div>
                {user && (
                  <div className="z-10 bg-gray-100 p-4">
                    <li
                      className="flex items-center gap-1"
                      onClick={handleLogout}>
                      <Link
                        to="/"
                        className="flex justify-center items-center gap-2">
                        <MdOutlineLogout
                          className="text-2xl cursor-pointer"
                          title="Logout"></MdOutlineLogout>
                        <p>Sign Out</p>
                      </Link>
                    </li>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

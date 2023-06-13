import { useContext, useState } from "react";
import { Transition } from "@headlessui/react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AuthContext } from "../../providerders/AuthProviders";
import { BiBookBookmark, BiHomeSmile } from "react-icons/bi";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { instructorRequest } from "../../apis/user";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = () => {
  const { user, role, setRole } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const toggleHandler = (event) => {
    setToggle(event.target.checked);
  };
  // become an instructor
  const handleInstructorRequest = () => {
    Swal.fire({
      title: "Become an instructor!",
      text: "You won't be able switch back to student account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4285f4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, switch it",
    }).then((result) => {
      if (result.isConfirmed) {
        instructorRequest(user)
          .then((result) => {
            setRole("instructor");
            console.log(result);
            toast.success("you are an instructor");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // Become an admin
  // const handleAdminRequest = () => {};

  return (
    <>
      <div className=" text-white py-2 min-h-screen">
        <button
          className="text-blue-500 w-8 h-8  md:hidden"
          onClick={() => setIsOpen(!isOpen)}>
          <MdOutlineSpaceDashboard></MdOutlineSpaceDashboard>
        </button>

        <Transition
          show={isOpen}
          enter="transition-transform ease-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in duration-100 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="md:hidden">
          {/* Mobile sidebar content */}
          <div className="w-screen shadow bg-white p-5 min-h-[calc(100vh-4rem)] grid place-content-between">
            {/* Top div */}
            <div className="felx flex-col">
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
              </div>
              <label className="inline-flex w-full rounded-md cursor-pointer text-gray-800">
                <input
                  onChange={toggleHandler}
                  id="Toggle3"
                  type="checkbox"
                  className="hidden peer"
                />
                <span className="px-4 py-1 rounded-l-md bg-rose-400 peer-checked:bg-gray-300">
                  Guest
                </span>
                <span className="px-4 py-1 rounded-r-md bg-gray-300 peer-checked:bg-rose-400">
                  Host
                </span>
              </label>
            </div>

            {/* Bottom div */}
            <div className=" w-full bg-green-500">
              <h2>this is heading this can be done anytime</h2>
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

            {/* <div>
              <button
                disabled={role}
                className="btn capitalize mt-4 bg-gray-200 hover:bg-gray-300 mr-2 btn-sm"
                onClick={handleInstructorRequest}>
                {" "}
                Become Instructor
              </button>

              <button
                disabled={role}
                className="btn capitalize mt-4 bg-gray-200 hover:bg-gray-300 btn-sm"
                onClick={handleAdminRequest}>
                {" "}
                Become Admin
              </button>
            </div> */}

            <div>
              {role === "instructor" ? (
                <ul className="space-y-2.5 mt-6 text-gray-600 ">
                  <li className="flex items-center gap-1 hover:text-black">
                    <BiHomeSmile></BiHomeSmile>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="flex items-center gap-1 hover:text-black">
                    <HiOutlineAcademicCap></HiOutlineAcademicCap>
                    <Link to="/dashboard/add-class">Add new class</Link>
                  </li>
                  <li className="flex items-center gap-1 hover:text-black">
                    <BiBookBookmark></BiBookBookmark>
                    <Link to="/dashboard/instructor-classes">My Classes</Link>
                  </li>
                </ul>
              ) : role === "admin" ? (
                <div>
                  <ul className="space-y-2.5 mt-6 text-gray-600 ">
                    <li className="flex items-center gap-1 hover:text-black">
                      <BiHomeSmile></BiHomeSmile>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black">
                      <BiBookBookmark></BiBookBookmark>
                      <Link to="/dashboard/manage-classes">Manage Classes</Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black">
                      <BiHomeSmile></BiHomeSmile>
                      <Link to="/dashboard/manage-users">Manage Users</Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <ul className="space-y-2.5 mt-6 text-gray-600 ">
                    <li className="flex items-center gap-1 hover:text-black">
                      <BiHomeSmile></BiHomeSmile>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black">
                      <BiBookBookmark></BiBookBookmark>
                      <Link to="/dashboard/my-selected-class">
                        My Selected Classes
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black">
                      <BiHomeSmile></BiHomeSmile>
                      <Link to="/dashboard/my-enrolled-classes">My Enrolled Classes</Link>
                    </li>
                    <li className="flex items-center gap-1 hover:text-black">
                      <BiHomeSmile></BiHomeSmile>
                      <Link to="/dashboard/payment-history">Payment History</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Bottom div */}
          <div className=" w-full bg-green-500">
            <h2>this is heading this can be done anytime</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

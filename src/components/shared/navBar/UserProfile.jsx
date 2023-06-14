import { useContext } from "react";
import { AuthContext } from "../../../providerders/AuthProviders";
import { MdOutlineLogout } from "react-icons/md";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const { user, logOut } = useContext(AuthContext);
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
    <div className="flex justify-center items-center gap-2">
      <img
        className="rounded-full h-8 w-8"
        src={user?.photoURL}
        alt="profile"
        title={user?.displayName}
      />
      <MdOutlineLogout
        onClick={handleLogout}
        className="text-2xl cursor-pointer dark:text-gray-300"
        title="Logout"></MdOutlineLogout>
    </div>
  );
};

export default UserProfile;

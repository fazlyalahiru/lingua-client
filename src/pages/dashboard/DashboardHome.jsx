import { useContext } from "react";
import { AuthContext } from "../../providerders/AuthProviders";

const DashboardHome = () => {
  const { user, role } = useContext(AuthContext);
  return (
    <div className="text-center">
      <p className="text-2xl font-semibold">
        Welcome back, {user?.displayName}
      </p>
      <p className="font-semibol">
        Your current role is: {role ? role : "User"}
      </p>
    </div>
  );
};

export default DashboardHome;

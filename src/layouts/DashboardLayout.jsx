import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen flex">
      <DashboardSidebar></DashboardSidebar>
      <div className="flex-1  ">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import AddClass from "../pages/dashboard/AddClass";
import Classes from "../pages/dashboard/Classes";
import DashboardHome from "../pages/dashboard/DashboardHome";
import PrivateRoute from "./PrivateRoute";
import MySelectedClass from "../pages/dashboard/MySelectedClass";
import InstructorClasses from "../pages/dashboard/InstructorClasses";
import MyEnrolledClasses from "../pages/dashboard/MyEnrolledClasses";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import ManageClasses from "../pages/dashboard/ManageClasses";
import ManageUsers from "../pages/dashboard/ManageUsers";
import Instructors from "../pages/Instructors";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/add-class",
        element: <AddClass></AddClass>,
      },
      {
        path: "/dashboard/my-selected-class",
        element: <MySelectedClass></MySelectedClass>,
      },
      {
        path: "/dashboard/instructor-classes",
        element: <InstructorClasses></InstructorClasses>,
      },
      {
        path: "/dashboard/my-enrolled-classes",
        element: <MyEnrolledClasses></MyEnrolledClasses>,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "/dashboard/manage-classes",
        element: <ManageClasses></ManageClasses>,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers></ManageUsers>,
      },
    ],
  },
]);

export default router;

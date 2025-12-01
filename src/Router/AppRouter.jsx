import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LoginPage from "../Page/Auth/LoginPage";

import DashboardLayout from "../Layout/DashboardLayout";
import DashboardMain from "../Page/Dashboard/DashboardMain";
import Attendance from "../Page/Dashboard/Attendance";
import Settings from "../Page/Dashboard/Settings";

import EmployeeList from "../Page/Dashboard/EmployeeCRUD/EmployeeList";
import EmployeeForm from "../Page/Dashboard/EmployeeCRUD/EmployeeForm";
import EmployeeDetail from "../Page/Dashboard/EmployeeCRUD/EmployeeDetail";

import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

 // redirect root to /dashboard
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

// dashboard + nested routes (protected)
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      // index (GET /dashboard)
      { index: true, element: <DashboardMain /> },

      // other dashboard pages
      { path: "attendance", element: <Attendance /> },
      { path: "settings", element: <Settings /> },

      // Employee CRUD
      { path: "employees", element: <EmployeeList /> },           // /dashboard/employees
      { path: "employees/add", element: <EmployeeForm /> },       // /dashboard/employees/add
      { path: "employees/edit/:id", element: <EmployeeForm /> },  // /dashboard/employees/edit/:id
      { path: "employees/:id", element: <EmployeeDetail /> },     // /dashboard/employees/:id
    ],
  },

  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);


function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LoginPage from "../Page/Auth/LoginPage";

import DashboardLayout from "../Layout/DashboardLayout";
import DashboardMain from "../Page/Dashboard/DashboardMain";
import DepartmentPage from "../Page/DepartmentPages/DepartmentPage";
import PositionPage from "../Page/PositionPages/PositionPage";
import AttendanceListPage from "../Page/AttendancePages/AttendanceListPage";
import AttendanceTodayPage from "../Page/AttendancePages/AttendanceTodayPage";
import LeaveListPage from "../Page/LeavePages/LeaveListPage";
import LeaveFormPage from "../Page/LeavePages/LeaveFormPage";
import Settings from "../Page/Dashboard/Settings";

import EmployeeList from "../Page/Dashboard/Employee/EmployeeList";
import EmployeeForm from "../Page/Dashboard/Employee/EmployeeForm";
import EmployeeDetail from "../Page/Dashboard/Employee/EmployeeDetail";

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
      { path: "settings", element: <Settings /> },
      { path: "department", element: <DepartmentPage />,},
      { path: "position", element: <PositionPage /> },
      { path: "attendance", element: <AttendanceListPage /> },
      { path: "attendance/today", element: <AttendanceTodayPage /> },
      { path: "leaves", element: <LeaveListPage /> },

      // Leave Management
      { path: "leaves/new", element: <LeaveFormPage /> },
      { path: "leaves/edit/:id", element: <LeaveFormPage /> },

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
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";

function DashboardLayout() {
  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Topbar />

        {/* Halaman yang dirender */}
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
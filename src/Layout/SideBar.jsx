import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Building2,
  Briefcase,
  CalendarX,
  Clock,
  Timer,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, hasAccess } = useAuth();

  // Ambil role dari detailUser?.roles?.name jika ada, fallback ke user metadata
  const { detailUser } = useAuth();
  const role = detailUser?.roles?.name || null;
  console.warn("User Role in Sidebar:", role);

  // Definisi menu dan mapping ke modul accessMatrix
  const menus = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, module: null },
    { label: "Employees", path: "/dashboard/employees", icon: Users, module: "Employee" },
    { label: "Department", path: "/dashboard/department", icon: Building2, module: "Department" },
    { label: "Position", path: "/dashboard/position", icon: Briefcase, module: "Position" },
    { label: "Attendance", path: "/dashboard/attendance/today", icon: Clock, module: "Attendance" },
    { label: "Work Shifts", path: "/dashboard/work-shifts", icon: Timer, module: "Work Shifts" },
    { label: "Leave Management", path: "/dashboard/leaves", icon: CalendarX, module: "Leave Management" },
    // { label: "Settings", path: "/dashboard/settings", icon: Settings, module: null },
  ];

  // Filter menu sesuai akses
  const filteredMenus = menus.filter((item) => {
    if (!item.module) return true; // Dashboard dan menu tanpa module selalu tampil
    if (!role) return false;
    // Attendance khusus employee hanya jika Attendance:own
    if (item.module === "Attendance" && role === "employee") {
      return hasAccess(role, "Attendance", { own: true });
    }
    return hasAccess(role, item.module);
  });

  return (
    <div>

      {/* DESKTOP SIDEBAR */}
      <motion.div
        animate={{ width: isOpen ? 240 : 80 }}
        className="flex h-screen bg-gray-900 text-white p-5 flex-col shadow-xl"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          {isOpen && <h1 className="text-2xl font-bold">HRIS</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white bg-gray-800 p-2 rounded"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* NAV ITEMS */}
        <nav className="flex flex-col gap-3">
          {filteredMenus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded transition ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              <item.icon size={20} />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>
      </motion.div>
    </div>
  );
}

export default Sidebar;
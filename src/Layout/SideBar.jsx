import { useState } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menus = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Attendance", path: "/dashboard/attendance", icon: CalendarCheck },
    { label: "Employees", path: "/dashboard/employees", icon: Users },
    { label: "Department", path: "/dashboard/department", icon: Building2 },
    { label: "Position", path: "/dashboard/position", icon: Briefcase },
    { label: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

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
          {menus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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
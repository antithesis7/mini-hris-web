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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menus = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Attendance", path: "/dashboard/attendance", icon: CalendarCheck },
    { label: "Employees", path: "/dashboard/employees", icon: Users },
    { label: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      {/* MOBILE TOP NAV */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold">HRIS</h1>
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 bg-gray-900 text-white w-64 h-full p-5 z-50 lg:hidden shadow-2xl"
          >
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-2xl font-bold">HRIS</h1>
              <button onClick={() => setMobileOpen(false)}>
                <X size={26} />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {menus.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
}

export default Sidebar;
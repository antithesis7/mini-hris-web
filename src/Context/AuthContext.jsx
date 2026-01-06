import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../Config/Supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [detailUser, setDetailUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const { data } = await supabase.auth.getUser();

    if (data?.user) {
      setUser(data.user);
      // Ambil auth_id dari tabel employee
      const { data: empData, error: empError } = await supabase
        .from("employee")
        .select(`*, roles:active_roles(id, name, description)`)
        .eq("auth_id", data.user.id)
        .single();

      if (empData && empData.auth_id) {
        setDetailUser(empData);
        await loadPermissions(empData.auth_id);
      } else {
        // fallback jika tidak ada employee
        await loadPermissions(data.user.id);
      }
    }

    setLoading(false);
  }

  async function loadPermissions(authId) {
    const { data, error } = await supabase
      .from("user_permissions")
      .select("permission")
      .eq("auth_id", authId);

    if (!error && data) {
      setPermissions(data.map((p) => p.permission));
    }
  }

  // Access matrix
  const accessMatrix = {
    admin: ["Employee", "Department", "Position", "Work Shifts"],
    hr: ["Attendance", "Leave Management", "Work Shifts"],
    supervisor: ["Attendance", "Leave Management"],
    employee: ["Attendance:own"], // hanya data miliknya sendiri
  };

  // Fungsi untuk cek akses
  function hasAccess(role, module, options = {}) {
    // Gunakan roles.name dari detailUser jika ada
    let effectiveRole = role;
    if (detailUser?.roles?.name) {
      effectiveRole = detailUser.roles.name;
    }
    if (!effectiveRole) return false;
    const allowed = accessMatrix[effectiveRole] || [];
    if (effectiveRole === "employee" && module === "Attendance" && options.own) {
      return allowed.includes("Attendance:own");
    }
    return allowed.includes(module);
  }

  return (
    <AuthContext.Provider value={{ user, detailUser,permissions, loading, accessMatrix, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
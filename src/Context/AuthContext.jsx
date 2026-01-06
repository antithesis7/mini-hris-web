import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../Config/Supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const { data } = await supabase.auth.getUser();

    if (data?.user) {
      setUser(data.user);
      await loadPermissions(data.user.id);
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

  return (
    <AuthContext.Provider value={{ user, permissions, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
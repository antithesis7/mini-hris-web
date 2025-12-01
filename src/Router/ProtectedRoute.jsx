import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../Config/Supabase";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // #️⃣ Ambil session pertama kali
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    init();

    // #️⃣ Listen perubahan session (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // #️⃣ Cleanup listener
    return () => subscription.unsubscribe();
  }, []);

  // #️⃣ Masih loading
  if (loading) return <div>Loading...</div>;

  // #️⃣ Jika tidak ada session → redirect ke login
  if (!session) return <Navigate to="/login" replace />;

  // #️⃣ Jika ada session → tampilkan anaknya (halaman dilindungi)
  return children;
}

export default ProtectedRoute;

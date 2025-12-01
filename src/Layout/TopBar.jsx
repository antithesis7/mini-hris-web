import { supabase } from "../Config/Supabase";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const nav = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    nav("/login");
  };

  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-5">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default TopBar;

import { supabase } from "../Config/Supabase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


function getRandomColor(name) {
  // Generate a color based on the name string
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
}

function TopBar() {
  const nav = useNavigate();
  const { detailUser } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    nav("/login");
  };

  // Ambil nama user dari detailUser
  const userName = detailUser?.first_name
    ? `${detailUser.first_name}${detailUser.last_name ? " " + detailUser.last_name : ""}`
    : "User";
  const initial = detailUser?.first_name ? detailUser.first_name[0].toUpperCase() : "U";
  const avatarColor = getRandomColor(userName);

  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-5">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        {/* User avatar & name */}
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold text-lg border"
            style={{ background: avatarColor }}
            title={userName}
          >
            {initial}
          </div>
          <span className="font-medium text-gray-700 max-w-[120px] truncate" title={userName}>{userName}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default TopBar;

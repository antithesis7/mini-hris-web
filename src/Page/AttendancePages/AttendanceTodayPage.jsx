import { useState } from "react";
import useAttendance from "../../Hooks/UseAttendance";

function AttendanceTodayPage() {
  const { doCheckInToday } = useAttendance();
  const [loading, setLoading] = useState(false);

  // contoh: sementara pakai employee_id manual
  // nanti bisa diambil dari auth user
  const EMPLOYEE_ID = 1;

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await doCheckInToday(EMPLOYEE_ID);
      alert("Check-in berhasil");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-semibold mb-2">Attendance Today</h1>
      <p className="text-gray-500 mb-6">
        Click button below to check-in today
      </p>

      <button
        onClick={handleCheckIn}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-sm transition"
      >
        {loading ? "Processing..." : "Check In"}
      </button>
    </div>
  );
}

export default AttendanceTodayPage;
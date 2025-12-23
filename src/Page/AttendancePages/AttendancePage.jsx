import { useState } from "react";
import useAttendance from "../../Hooks/UseAttendance";
import useAttendanceSummary from "../../Hooks/UseAttendanceSummary";
import StatCard from "../../Components/Cards/StatCard";

function AttendancePage() {
  const { doCheckInToday } = useAttendance();
  const [loading, setLoading] = useState(false);

  const EMPLOYEE_ID = 5;

  const { summary, loading: summaryLoading, reloadSummary } =
    useAttendanceSummary();

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await doCheckInToday(EMPLOYEE_ID);

      await reloadSummary(); // 🔥 WAJIB

      alert("Check-in berhasil");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Attendance Summary */}
      {summary && (
        <div className="grid grid-cols-5 gap-4 mb-6">
          <StatCard title="Total Employees" value={summary.totalEmployees} />
          <StatCard title="Present" value={summary.present} variant="success" />
          <StatCard title="Late" value={summary.late} variant="warning" />
          <StatCard title="Absent" value={summary.absent} variant="danger" />
          <StatCard title="On Leave" value={summary.onLeave} />
        </div>
      )}

      {/* Check-in Section */}
      <div className="max-w-md">
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
    </div>
  );
}

export default AttendancePage;
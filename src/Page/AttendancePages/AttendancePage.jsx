import { useState } from "react";
import useAttendance from "../../Hooks/UseAttendance";
import useAttendanceSummary from "../../Hooks/UseAttendanceSummary";
import StatCard from "../../Components/Cards/StatCard";
import useTodayAttendance from "../../Hooks/UseTodayAttendance";

function AttendancePage() {
  const { doCheckInToday } = useAttendance();
  const {
      data: todayAttendance,
      loading: todayLoading,
  } = useTodayAttendance();
  
  const [loading, setLoading] = useState(false);

  const EMPLOYEE_ID = 6;

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
        {/* <h1 className="text-2xl font-semibold mb-2">Attendance Today</h1>
        <p className="text-gray-500 mb-6">
          Click button below to check-in today
        </p> */}

      <div className="mt-8">
  {/* <h2 className="text-lg font-semibold mb-4">
    Attendance Today
  </h2> */}

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="text-gray-700">
              <th className="px-4 py-3 border-b">Employee</th>
              <th className="px-4 py-3 border-b">Check In</th>
              <th className="px-4 py-3 border-b">Check Out</th>
              <th className="px-4 py-3 border-b">Status</th>
            </tr>
          </thead>

          <tbody>
            {todayAttendance.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition"
              >
                {/* EMPLOYEE */}
                <td className="px-4 py-3 border-b font-medium">
                  {row.employee.first_name} {row.employee.last_name}
                </td>

                {/* CHECK IN */}
                <td className="px-4 py-3 border-b text-gray-700">
                  {row.check_in || "-"}
                </td>

                {/* CHECK OUT */}
                <td className="px-4 py-3 border-b text-gray-700">
                  {row.check_out || "-"}
                </td>

                {/* STATUS */}
                <td className="px-4 py-3 border-b capitalize">
                  {row.status}
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {!todayAttendance.length && !todayLoading && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500"
                >
                  No attendance today
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>

        {/* <button
          onClick={handleCheckIn}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-sm transition"
        >
          {loading ? "Processing..." : "Check In"}
        </button> */}
      </div>
    </div>
  );
}

export default AttendancePage;
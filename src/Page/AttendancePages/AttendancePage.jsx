import { useState, useMemo } from "react";
import useAttendance from "../../Hooks/UseAttendance";
import useAttendanceSummary from "../../Hooks/UseAttendanceSummary";
import StatCard from "../../Components/Cards/StatCard";
import useTodayAttendance from "../../Hooks/UseTodayAttendance";

function AttendancePage() {
  const { doCheckInToday } = useAttendance();

  // 🔹 FILTER DATE (DEFAULT: TODAY)
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // 🔹 PAGINATION
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: todayAttendance = [],
    loading: todayLoading,
  } = useTodayAttendance(selectedDate);

  const { summary } = useAttendanceSummary(selectedDate);

  // 🔹 PAGINATED DATA
  const paginatedAttendance = useMemo(() => {
    const start = (page - 1) * pageSize;
    return todayAttendance.slice(start, start + pageSize);
  }, [todayAttendance, page]);

  const totalPages = Math.ceil(todayAttendance.length / pageSize);

  return (
    <div className="p-6 w-full">
      {/* ================= SUMMARY ================= */}
      {summary && (
        <div className="grid grid-cols-5 gap-4 mb-6">
          <StatCard title="Total Employees" value={summary.totalEmployees} />
          <StatCard title="Present" value={summary.present} variant="success" />
          <StatCard title="Late" value={summary.late} variant="warning" />
          <StatCard title="Absent" value={summary.absent} variant="danger" />
          <StatCard title="On Leave" value={summary.onLeave} />
        </div>
      )}

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-4">
        <div>
          {/* <h1 className="text-2xl font-semibold">Attendance</h1>
          <p className="text-gray-500 text-sm">
            Daily attendance records
          </p> */}
        </div>

        {/* DATE FILTER */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setPage(1);
          }}
          className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr className="text-gray-700">
              <th className="px-4 py-3 border-b">Employee</th>
              <th className="px-4 py-3 border-b">Check In</th>
              <th className="px-4 py-3 border-b">Check Out</th>
              <th className="px-4 py-3 border-b">Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedAttendance.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 border-b font-medium">
                  {row.employee.first_name} {row.employee.last_name}
                </td>

                <td className="px-4 py-3 border-b">
                  {row.check_in || "-"}
                </td>

                <td className="px-4 py-3 border-b">
                  {row.check_out || "-"}
                </td>

                <td className="px-4 py-3 border-b capitalize">
                  {row.status}
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {!paginatedAttendance.length && !todayLoading && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500"
                >
                  No attendance found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {todayAttendance.length > pageSize && (
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => page > 1 && setPage(page - 1)}
              className="px-4 py-2 border rounded-xl hover:bg-gray-100"
            >
              Prev
            </button>

            <button
              onClick={() =>
                page < totalPages && setPage(page + 1)
              }
              className="px-4 py-2 border rounded-xl hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendancePage;
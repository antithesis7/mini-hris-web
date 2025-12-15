function AttendanceTable({ data, onCheckOut }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3">Employee</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Check In</th>
            <th className="px-4 py-3">Check Out</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a) => (
            <tr key={a.id} className="border-t">
               <td className="px-4 py-3">
                {a.employee
                  ? `${a.employee.first_name} ${a.employee.last_name || ""}`
                  : "-"}
                </td>
              <td className="px-4 py-3">{a.attendance_date}</td>
              <td className="px-4 py-3">{a.check_in || "-"}</td>
              <td className="px-4 py-3">{a.check_out || "-"}</td>
              <td className="px-4 py-3 text-center">
                {!a.check_out && (
                  <button
                    onClick={() => onCheckOut(a.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Check Out
                  </button>
                )}
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No attendance records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
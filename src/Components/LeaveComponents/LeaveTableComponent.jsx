import LeaveStatusBadge from "./LeaveStatusBadgeComponent";
import { formatDate } from "../../Utils/FormatDate";

function LeaveTable({ data, onEdit, onDelete }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50 text-gray-700">
        <tr>
          <th className="px-4 py-3 text-left">Employee</th>
          <th className="px-4 py-3 text-left">Type</th>
          <th className="px-4 py-3 text-left">Date Range</th>
          <th className="px-4 py-3 text-left">Status</th>
          <th className="px-4 py-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 && (
          <tr>
            <td
              colSpan="5"
              className="text-center py-6 text-gray-500"
            >
              No data found
            </td>
          </tr>
        )}

        {data.map((leave) => (
          <tr
            key={leave.id}
            className="border-t hover:bg-gray-50 transition"
          >
            <td className="px-4 py-3">
              {leave.employee
                ? `${leave.employee.first_name} ${leave.employee.last_name || ""}`
                : "-"}
            </td>

            <td className="px-4 py-3">
              {leave.leave_type?.name || "-"}
            </td>

            <td className="px-4 py-3">
              {formatDate(leave.start_date)} – {formatDate(leave.end_date)}
            </td>

            <td className="px-4 py-3">
              <LeaveStatusBadge status={leave.status} />
            </td>

            <td className="px-4 py-3 text-center space-x-3">
              <button
                onClick={() => onEdit(leave)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(leave.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeaveTable;
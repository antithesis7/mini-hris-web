import LeaveStatusBadge from "./LeaveStatusBadgeComponent";
import { formatDate } from "../../Utils/FormatDate";

function LeaveTable({ data, onEdit, onDelete }) {
  return (
    <table className="w-full border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Employee</th>
          <th className="p-2 border">Type</th>
          <th className="p-2 border">Date Range</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center p-4 text-gray-500">
              No data found.
            </td>
          </tr>
        )}

        {data.map((leave) => (
          <tr key={leave.id}>
            <td className="p-2 border">
              {leave.employee?.first_name} {leave.employee?.last_name}
            </td>
            <td className="p-2 border">{leave.leave_type?.name}</td>
            <td className="p-2 border">
              {formatDate(leave.start_date)} - {formatDate(leave.end_date)}
            </td>
            <td className="p-2 border">
              <LeaveStatusBadge status={leave.status} />
            </td>
            <td className="p-2 border space-x-2">
              <button
                className="text-blue-600"
                onClick={() => onEdit(leave)}
              >
                Edit
              </button>

              <button
                className="text-red-600"
                onClick={() => onDelete(leave.id)}
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
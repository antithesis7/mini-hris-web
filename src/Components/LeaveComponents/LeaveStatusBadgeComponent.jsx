import { LEAVE_STATUS_COLORS } from "../../Utils/Constants";

function LeaveStatusBadge({ status }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs border ${LEAVE_STATUS_COLORS[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default LeaveStatusBadge;
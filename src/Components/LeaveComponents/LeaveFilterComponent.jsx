import { LEAVE_STATUS } from "../../Utils/Constants";

function LeaveFilter({ filters, onChange }) {
  return (
    <div className="flex gap-3 items-end mb-4">

      {/* Status Filter */}
      <div>
        <label className="text-sm">Status</label>
        <select
          name="status"
          className="border p-2 rounded w-40"
          value={filters.status}
          onChange={(e) => onChange("status", e.target.value)}
        >
          <option value="">All</option>
          <option value={LEAVE_STATUS.PENDING}>Pending</option>
          <option value={LEAVE_STATUS.APPROVED}>Approved</option>
          <option value={LEAVE_STATUS.REJECTED}>Rejected</option>
        </select>
      </div>

      {/* Date Filter */}
      <div>
        <label className="text-sm">From</label>
        <input
          type="date"
          className="border p-2 rounded"
          value={filters.from}
          onChange={(e) => onChange("from", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm">To</label>
        <input
          type="date"
          className="border p-2 rounded"
          value={filters.to}
          onChange={(e) => onChange("to", e.target.value)}
        />
      </div>
    </div>
  );
}

export default LeaveFilter;
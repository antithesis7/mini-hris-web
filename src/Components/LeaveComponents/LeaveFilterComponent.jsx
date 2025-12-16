import { useState } from "react";
import { LEAVE_STATUS } from "../../Utils/Constants";

function LeaveFilter({ onApply }) {
  const [pending, setPending] = useState({
    status: "",
    from: "",
    to: "",
  });

  const handleChange = (field, value) => {
    setPending({ ...pending, [field]: value });
  };

  return (
    <div className="flex items-center gap-4">
      {/* STATUS */}
      <select
        value={pending.status}
        onChange={(e) => handleChange("status", e.target.value)}
        className="border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 min-w-[160px]"
      >
        <option value="">All Status</option>
        <option value={LEAVE_STATUS.PENDING}>Pending</option>
        <option value={LEAVE_STATUS.APPROVED}>Approved</option>
        <option value={LEAVE_STATUS.REJECTED}>Rejected</option>
      </select>

      {/* FROM */}
      <input
        type="date"
        value={pending.from}
        onChange={(e) => handleChange("from", e.target.value)}
        className="border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
      />

      {/* TO */}
      <input
        type="date"
        value={pending.to}
        onChange={(e) => handleChange("to", e.target.value)}
        className="border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
      />

      {/* SPACER */}
      <div className="flex-1" />

      {/* FILTER BUTTON */}
      <button
        onClick={() => onApply(pending)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-sm transition"
      >
        Filter
      </button>
    </div>
  );
}

export default LeaveFilter;
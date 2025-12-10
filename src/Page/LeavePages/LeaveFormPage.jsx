import React, { useState, useEffect } from "react";
import { LEAVE_TYPES } from "../../Utils/Constants";

function LeaveForm({ initialData, onClose, addLeave, updateLeave }) {
  const [form, setForm] = useState({
    employee_id: "",
    leave_type: "annual",
    start_date: "",
    end_date: "",
    reason: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        employee_id: initialData.employee_id,
        leave_type: initialData.leave_type,
        start_date: initialData.start_date,
        end_date: initialData.end_date,
        reason: initialData.reason,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.employee_id) return alert("Employee wajib diisi");
    if (!form.start_date || !form.end_date)
      return alert("Tanggal wajib diisi");

    if (initialData) {
      await updateLeave(initialData.id, form);
    } else {
      await addLeave(form);
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* EMPLOYEE ID */}
      <div>
        <label className="block mb-1 font-semibold">Employee ID</label>
        <input
          type="number"
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          placeholder="ex: 12"
          required
        />
      </div>

      {/* LEAVE TYPE */}
      <div>
        <label className="block mb-1 font-semibold">Leave Type</label>
        <select
          name="leave_type"
          value={form.leave_type}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          {LEAVE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* DATE RANGE */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 font-semibold">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">End Date</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>

      {/* REASON */}
      <div>
        <label className="block mb-1 font-semibold">Reason</label>
        <textarea
          name="reason"
          rows="3"
          value={form.reason}
          onChange={handleChange}
          placeholder="Explain reason..."
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end space-x-3 pt-3">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 rounded-lg"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {initialData ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default LeaveForm;
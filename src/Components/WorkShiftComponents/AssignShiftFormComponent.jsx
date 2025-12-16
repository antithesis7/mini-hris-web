import { useState } from "react";

function AssignShiftFormComponent({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    employee_id: "",
    shift_id: "",
    effective_date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assign Shift Payload:", form); // dummy dulu
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Employee */}
      <div>
        <label className="block text-sm font-medium mb-1">Employee</label>
        <select
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Employee</option>
          <option value="1">John Doe</option>
          <option value="2">Jane Smith</option>
        </select>
      </div>

      {/* Shift */}
      <div>
        <label className="block text-sm font-medium mb-1">Work Shift</label>
        <select
          name="shift_id"
          value={form.shift_id}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Shift</option>
          <option value="1">Morning Shift (08:00 - 17:00)</option>
          <option value="2">Night Shift (21:00 - 06:00)</option>
        </select>
      </div>

      {/* Effective Date */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Effective Date
        </label>
        <input
          type="date"
          name="effective_date"
          value={form.effective_date}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* ACTION */}
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Assign
        </button>
      </div>
    </form>
  );
}

export default AssignShiftFormComponent;

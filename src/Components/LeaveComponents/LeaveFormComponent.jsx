import { useState, useEffect } from "react";
import { getEmployees } from "../../Services/EmployeeService";
import { fetchLeaveTypes } from "../../Services/LeaveTypeService";

function LeaveForm({ initialData, onSubmit }) {
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);

  const [form, setForm] = useState({
    employee_id: initialData?.employee_id || "",
    leave_type_id: initialData?.leave_type_id || "",
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || "",
    reason: initialData?.reason || "",
  });

  useEffect(() => {
    loadEmployees();
    loadLeaveTypes();
  }, []);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data || []);
  };

  const loadLeaveTypes = async () => {
    const { data } = await fetchLeaveTypes();
    setLeaveTypes(data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">

      {/* Employee */}
      <div>
        <label className="text-sm font-medium">Employee</label>
        <select
          name="employee_id"
          className="form-select w-full border p-2 rounded"
          value={form.employee_id}
          onChange={handleChange}
          required
        >
          <option value="">Select employee...</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.first_name} {e.last_name}
            </option>
          ))}
        </select>
      </div>

      {/* Leave Type */}
      <div>
        <label className="text-sm font-medium">Leave Type</label>
        <select
          name="leave_type_id"
          className="form-select w-full border p-2 rounded"
          value={form.leave_type_id}
          onChange={handleChange}
          required
        >
          <option value="">Select leave type...</option>
          {leaveTypes.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      {/* Start / End Date */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="start_date"
            className="border p-2 w-full rounded"
            value={form.start_date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">End Date</label>
          <input
            type="date"
            name="end_date"
            className="border p-2 w-full rounded"
            value={form.end_date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Reason */}
      <div>
        <label className="text-sm font-medium">Reason</label>
        <textarea
          name="reason"
          className="border p-2 w-full rounded"
          rows="3"
          value={form.reason}
          onChange={handleChange}
          required
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Save
      </button>
    </form>
  );
}

export default LeaveForm;
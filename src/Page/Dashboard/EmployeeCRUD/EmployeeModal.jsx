import Modal from "../../../Components/Modal";
import { useState, useEffect } from "react";
import { createEmployee, updateEmployee, getEmployeeById } from "./Api";

function EmployeeModal({ show, onClose, employeeId, onSaved }) {
  const isEdit = !!employeeId;

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    department_id: "",
    position_id: "",
  });

  // Load data jika edit
  useEffect(() => {
    if (isEdit) {
      getEmployeeById(employeeId).then((data) => {
        setForm(data);
      });
    }
  }, [employeeId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    try {
      if (isEdit) {
        await updateEmployee(employeeId, form);
      } else {
        await createEmployee(form);
      }

      onSaved(); // refresh list
      onClose(); // tutup modal
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <Modal
      show={show}
      title={isEdit ? "Edit Employee" : "Add Employee"}
      onClose={onClose}
      width="max-w-xl"
    >
      <div className="grid grid-cols-2 gap-3">
        <input
          name="first_name"
          placeholder="First Name"
          className="border p-2 rounded"
          value={form.first_name}
          onChange={handleChange}
        />
        <input
          name="last_name"
          placeholder="Last Name"
          className="border p-2 rounded"
          value={form.last_name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-2 rounded col-span-2"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="border p-2 rounded col-span-2"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

export default EmployeeModal;
import { useEffect, useState } from "react";
import { createEmployee, updateEmployee, supabase } from "./Api";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // param edit
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    position: "",
    department: "",
    join_date: "",
  });

  // LOAD DATA IF EDIT MODE
  useEffect(() => {
    if (!isEdit) return;

    async function load() {
      const { data } = await supabase
        .from("employees")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setForm(data);
    }

    load();
  }, [id]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateEmployee(id, form);
      } else {
        await createEmployee(form);
      }

      navigate("/dashboard/employees");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Employee" : "Add New Employee"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Position</label>
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Department</label>
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Join Date</label>
          <input
            name="join_date"
            type="date"
            value={form.join_date || ""}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {isEdit ? "Update Employee" : "Create Employee"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
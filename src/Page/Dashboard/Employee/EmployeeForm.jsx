import { useEffect, useState } from "react";
import { createEmployee, updateEmployee } from "./Api";
import { useNavigate, useParams } from "react-router-dom";

/* form employee sanitizer */
function cleanEmployeeRecord(record) {
  if (!record) return {};

  return {
    name: record.name || "",
    email: record.email || "",
    position_id: record.position_id || "",
    department_id: record.department_id || "",
    hire_date: record.hire_date || "",
  };
}

function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEdit = id !== "new";

  const [form, setForm] = useState({
    name: "",
    email: "",
    position_id: "",
    department_id: "",
    hire_date: "",
  });

   // Options
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

   // Load dropdown data (position, dept, employee list)
  useEffect(() => {
    async function loadDropdowns() {
      const [{ data: pos }, { data: dep }, { data: emp }] = await Promise.all([
        supabase.from("position").select("id, name"),
        supabase.from("department").select("id, name"),
        supabase.from("employee").select("id, name"),
      ]);

      setPositions(pos || []);
      setDepartments(dep || []);
      setEmployees(emp || []);
    }

    loadDropdowns();
  }, []);

  // LOAD DATA IF EDIT MODE
    useEffect(() => {
    if (id === "new") return;

    async function load() {
      const { data, error } = await supabase
        .from("employee")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setForm(cleanEmployeeRecord(data));
      if (error) console.error(error);
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
    // ------------------------------------------
    // 1️⃣ Pecah full name → first_name, last_name
    // ------------------------------------------
    const fullName = form.name.trim();
    const parts = fullName.split(" ");

    const firstName = parts[0];
    const lastName = parts.slice(1).join(" "); // bisa kosong kalau 1 kata

    // ------------------------------------------
    // 2️⃣ Payload untuk Supabase
    // ------------------------------------------
    const payload = {
      email: form.email,
      position_id: form.position_id,
      department_id: form.department_id,
      hire_date: form.hire_date,
      first_name: firstName,
      last_name: lastName,
    };

    // ================================
    //  EDIT MODE
    // ================================
    if (isEdit) {
      await updateEmployee(id, payload);

    // ================================
    //  CREATE MODE
    // ================================
    } else {
      await createEmployee({
        ...payload,
        hire_date: new Date().toISOString().split("T")[0],
      });
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

        {/* NAME DROPDOWN */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        {/* EMAIL */}
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

        {/* POSITION DROPDOWN */}
        <div>
          <label className="block mb-1">Position</label>
          <select
            name="position_id"
            value={form.position_id}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          >
            <option value="">Select Position</option>
            {positions.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* DEPARTMENT DROPDOWN */}
        <div>
          <label className="block mb-1">Department</label>
          <select
            name="department_id"
            value={form.department_id}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* HIRE DATE - jika create → otomatis hari ini */}
        <div>
          <label className="block mb-1">Hire Date</label>
          <input
            name="hire_date"
            type="date"
            value={form.hire_date || ""}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            disabled={!isEdit} // hanya bisa diubah jika edit
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
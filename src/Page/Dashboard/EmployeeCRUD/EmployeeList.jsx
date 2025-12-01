import { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "./Api";
import { Link } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  async function load() {
    const data = await fetchEmployees(search);
    setEmployees(data);
  }

  useEffect(() => {
    load();
  }, []);

  const onSearchEnter = (e) => {
    if (e.key === "Enter") load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure deleting this employee?")) return;
    await deleteEmployee(id);
    load();
  };

  return (
    <div className="p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <input
          className="border px-3 py-2 rounded w-64"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={onSearchEnter}
        />

        <Link
          to="/dashboard/employees/new"
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          + Add Employee
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Position</th>
            <th className="border px-3 py-2">Department</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td className="border px-3 py-2">{`${e.first_name} ${e.last_name}`}</td>
              <td className="border px-3 py-2">{e.position?.name}</td>
              <td className="border px-3 py-2">{e.department?.name}</td>
              <td className="border px-3 py-2 flex gap-2">
                <Link
                  to={`/dashboard/employees/${e.id}`}
                  className="text-blue-600"
                >
                  Detail
                </Link>

                <Link
                  to={`/dashboard/employees/edit/${e.id}`}
                  className="text-green-600"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(e.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {employees.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
import { useEffect, useState, useMemo } from "react";
import { fetchEmployees, deleteEmployee, 
        searchEmployees, fetchDepartments, fetchPositions } from "./Api";
import { Link } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [filterPos, setFilterPos] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  // =========================
  // LOAD EMPLOYEES
  // =========================
  async function load() {
    let data;

    if (search.trim() !== "") {
      data = await searchEmployees(search);
    } else {
      data = await fetchEmployees();
    }

    // filter by department
    if (departmentFilter) {
      data = data.filter((e) => e.department?.name === departmentFilter);
    }

    if (filterPos) {
      data = data.filter((e) => e.position?.name === filterPos);
    }

    setEmployees(data);
    setPage(1); // reset ke halaman 1 saat search/filter berubah
  }

  // =========================
  // REALTIME SEARCH + DEBOUNCE
  // =========================
  useEffect(() => {
    const handler = setTimeout(() => {
      load();
    }, 400);

    return () => clearTimeout(handler);
  }, [search, departmentFilter]);

  // =========================
  // LOAD FIRST TIME + DEPARTMENTS
  // =========================
  useEffect(() => {
    load();
    fetchDepartments().then(setDepartments);
    fetchPositions().then(setPositions);
  }, []);

  // =========================
  // PAGINATION
  // =========================
  const paginatedEmployees = useMemo(() => {
    const start = (page - 1) * pageSize;
    return employees.slice(start, start + pageSize);
  }, [employees, page]);

  const totalPages = Math.ceil(employees.length / pageSize);

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    await deleteEmployee(id);
    load();
  };

  // =========================
  // HIGHLIGHT SEARCH RESULT
  // =========================
  const highlight = (text) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, (match) => `<mark class="bg-yellow-200">${match}</mark>`);
  };

  return (
    <div className="p-6 w-full">

      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
        
        {/* Search */}
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 w-full sm:w-72"
            placeholder="Search employee by name, email, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={load}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-sm transition"
          >
            Search
          </button>
        </div>

        {/* Add Employee */}
        <Link
          to="/dashboard/employees/new"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-sm transition ml-auto sm:ml-0"
        >
          + Add Employee
        </Link>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-4 mb-4">
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border px-3 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </select>

         <select
          value={filterPos}
          onChange={(e) => setFilterPos(e.target.value)}
          className="border px-3 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Positions</option>
          {positions.map((p) => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">

        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="text-gray-700">
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Email</th>
              <th className="px-4 py-3 border-b">Position</th>
              <th className="px-4 py-3 border-b">Department</th>
              <th className="px-4 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedEmployees.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50 transition">
                
                {/* NAME */}
                <td
                  className="px-4 py-3 border-b font-medium"
                  dangerouslySetInnerHTML={{
                    __html: highlight(`${e.first_name} ${e.last_name}`),
                  }}
                />

                {/* EMAIL */}
                <td
                  className="px-4 py-3 border-b text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: highlight(e.email || "-"),
                  }}
                />

                {/* POSITION */}
                <td className="px-4 py-3 border-b">{e.position?.name || "-"}</td>

                {/* DEPARTMENT */}
                <td
                  className="px-4 py-3 border-b"
                  dangerouslySetInnerHTML={{
                    __html: highlight(e.department?.name || "-"),
                  }}
                />

                {/* ACTIONS */}
                <td className="px-4 py-3 border-b">
                  <div className="flex justify-center gap-3">
                    <Link to={`/dashboard/employees/${e.id}`} className="text-blue-600 hover:underline">
                      Detail
                    </Link>
                    <Link to={`/dashboard/employees/edit/${e.id}`} className="text-green-600 hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {employees.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => page > 1 && setPage(page - 1)}
              className="px-4 py-2 border rounded-xl hover:bg-gray-100"
            >
              Prev
            </button>

            <button
              onClick={() => page < totalPages && setPage(page + 1)}
              className="px-4 py-2 border rounded-xl hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
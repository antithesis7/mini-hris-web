import { useEffect, useState } from "react";
import { getEmployeeById } from "./Api";
import { useParams, useNavigate } from "react-router-dom";

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD DETAIL DATA
  useEffect(() => {
    async function load() {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (err) {
        alert("Error loading employee: " + err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!employee) {
    return (
      <div className="p-4">
        <p>Employee not found.</p>
        <button
          className="mt-3 bg-gray-600 text-white px-3 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Employee Detail</h1>

      <div className="space-y-2 border p-4 rounded shadow">
        <p><b>Full Name:</b> {employee.first_name} {employee.last_name}</p>
        <p><b>Email:</b> {employee.email}</p>
        <p><b>Position:</b> {employee.position?.name || "-"}</p>
        <p><b>Department:</b> {employee.department?.name || "-"}</p>
        <p><b>Join Date:</b> {employee.hire_date || "-"}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/dashboard/employees/edit/${id}`)}
        >
          Edit
        </button>

        <button
          className="bg-gray-600 text-white px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default EmployeeDetail;
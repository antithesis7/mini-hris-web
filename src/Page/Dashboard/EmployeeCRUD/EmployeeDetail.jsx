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
    return <div className="p-6 text-gray-600">Loading...</div>;
  }

  if (!employee) {
    return (
      <div className="p-6">
        <p className="text-gray-700 text-lg">Employee not found.</p>
        <button
          className="mt-4 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Employee Detail
      </h1>

      {/* CARD DETAIL */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <DetailItem label="Full Name" value={`${employee.first_name} ${employee.last_name}`} />
          <DetailItem label="Date of Birth" value={employee.date_of_birth || "-"} />
          <DetailItem label="Email" value={employee.email} />
          <DetailItem label="Phone" value={employee.phone || "-"} />
          <DetailItem label="Department" value={employee.department?.name || "-"} />
          <DetailItem label="Position" value={employee.position?.name || "-"} />
          <DetailItem label="Hire Date" value={employee.hire_date || "-"} />
          <DetailItem label="Salary" value={employee.salary || "-"} />

          {/* STATUS BADGE */}
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm font-medium mb-1">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-sm w-fit
                ${employee.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {employee.status || "-"}
            </span>
          </div>

        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-3 mt-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-xl shadow-sm"
          onClick={() => navigate(`/dashboard/employees/edit/${id}`)}
        >
          Edit Employee
        </button>

        <button
          className="bg-gray-600 hover:bg-gray-700 transition text-white px-5 py-2.5 rounded-xl shadow-sm"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default EmployeeDetail;


// Small reusable component
function DetailItem({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm font-medium">{label}</span>
      <span className="text-gray-800 text-md font-semibold mt-0.5">{value}</span>
    </div>
  );
}
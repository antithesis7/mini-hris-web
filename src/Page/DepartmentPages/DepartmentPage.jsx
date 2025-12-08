import { useEffect, useState } from "react";
import {
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../Services/DepartmentApi";

import DepartmentModal from "../../Components/DepartmentComponent/DepartmentModal";
import ConfirmDeleteModal from "../../Components/DepartmentComponent/DepartmentConfirmDelete";

function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Load data
  async function load() {
    setLoading(true);
    try {
      const data = await fetchDepartments();
      setDepartments(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (payload) => {
    try {
      if (editData) {
        await updateDepartment(editData.id, payload);
      } else {
        await createDepartment(payload);
      }
      setShowModal(false);
      setEditData(null);
      load();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDepartment(selectedItem.id);
      setConfirmDelete(false);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Department</h1>
        <button
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Tambah Department
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border w-32">Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="p-3 border">{d.id}</td>
                <td className="p-3 border">{d.name}</td>
                <td className="p-3 border">{d.description}</td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => {
                      setEditData(d);
                      setShowModal(true);
                    }}
                    className="px-2 py-1 bg-yellow-400 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItem(d);
                      setConfirmDelete(true);
                    }}
                    className="px-2 py-1 bg-red-600 text-white rounded ml-2 text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      <DepartmentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        data={editData}
        />

      {/* Confirm Delete */}
      <ConfirmDeleteModal
        show={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        item={selectedItem}
        />
    </div>
  );
}

export default DepartmentPage;
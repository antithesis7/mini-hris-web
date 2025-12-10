import { useState } from "react";
import Modal from "../../Components/Modal";
import LeaveForm from "../../Components/LeaveComponents/LeaveFormComponent";
import LeaveTable from "../../Components/LeaveComponents/LeaveTableComponent";
import LeaveFilter from "../../Components/LeaveComponents/LeaveFilterComponent";
import useLeaves  from "../../Hooks/UseLeaves";
import { deleteLeave } from "../../Services/LeaveService";

function LeaveListPage() {
  const {
    leaves,
    loading,
    addLeave,
    editLeave,
    loadLeaves,
  } = useLeaves();

  const [showModal, setShowModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null); // for edit
  const [modalTitle, setModalTitle] = useState("Add Leave");

  // Filters
  const [filters, setFilters] = useState({
    status: "",
    from: "",
    to: "",
  });

  const openAddModal = () => {
    setSelectedLeave(null);
    setModalTitle("Add Leave");
    setShowModal(true);
  };

  const openEditModal = (leave) => {
    setSelectedLeave(leave);
    setModalTitle("Edit Leave");
    setShowModal(true);
  };

  const handleFormSubmit = async (formData) => {
    if (selectedLeave) {
      await editLeave(selectedLeave.id, formData);
    } else {
      await addLeave(formData);
    }
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await deleteLeave(id);
    loadLeaves();
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  // Filter logic (frontend)
  const filteredLeaves = leaves.filter((leave) => {
    const statusMatch = filters.status
      ? leave.status === filters.status
      : true;

    const fromMatch = filters.from
      ? leave.start_date >= filters.from
      : true;

    const toMatch = filters.to
      ? leave.end_date <= filters.to
      : true;

    return statusMatch && fromMatch && toMatch;
  });

  return (
    <div className="p-5">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Leave Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Leave
        </button>
      </div>

      {/* Filters */}
      <LeaveFilter filters={filters} onChange={handleFilterChange} />

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LeaveTable
          data={filteredLeaves}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      <Modal
        show={showModal}
        title={modalTitle}
        onClose={() => setShowModal(false)}
        width="max-w-xl"
      >
        <LeaveForm initialData={selectedLeave} onSubmit={handleFormSubmit} />
      </Modal>

    </div>
  );
}

export default LeaveListPage;
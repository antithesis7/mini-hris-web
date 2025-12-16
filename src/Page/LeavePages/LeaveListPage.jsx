import { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import LeaveForm from "../../Components/LeaveComponents/LeaveFormComponent";
import LeaveTable from "../../Components/LeaveComponents/LeaveTableComponent";
import LeaveFilter from "../../Components/LeaveComponents/LeaveFilterComponent";
import useLeaves from "../../Hooks/UseLeaves";
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
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [modalTitle, setModalTitle] = useState("Add Leave");

  /* ================= FILTER ================= */
  const [filters, setFilters] = useState({
    status: "",
    from: "",
    to: "",
  });

  /* ================= PAGINATION ================= */
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  /* ================= MODAL HANDLER ================= */
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
    loadLeaves();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this leave?")) return;
    await deleteLeave(id);
    loadLeaves();
  };

  /* ================= FILTER DATA ================= */
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

  /* ================= PAGINATED DATA ================= */
  const totalPages = Math.ceil(filteredLeaves.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedLeaves = filteredLeaves.slice(startIndex, endIndex);

  return (
    <div className="p-6 w-full">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Leave Management</h1>
          <p className="text-gray-500 text-sm">
            Manage employee leave requests
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-sm transition"
        >
          + Add Leave
        </button>
      </div>

      {/* ================= FILTER ================= */}
      <div className="w-full bg-white p-4 rounded-xl shadow-sm border mb-6">
        <LeaveFilter onApply={setFilters} />
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : (
          <LeaveTable
            data={paginatedLeaves}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* ================= PAGINATION ================= */}
      {filteredLeaves.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() =>
                currentPage > 1 && setCurrentPage(currentPage - 1)
              }
              className="px-4 py-2 border rounded-xl hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <button
              onClick={() =>
                currentPage < totalPages &&
                setCurrentPage(currentPage + 1)
              }
              className="px-4 py-2 border rounded-xl hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL ================= */}
      <Modal
        show={showModal}
        title={modalTitle}
        onClose={() => setShowModal(false)}
        width="max-w-xl"
      >
        <LeaveForm
          initialData={selectedLeave}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
}

export default LeaveListPage;
import { useEffect, useState } from "react";
import Modal from "../../Components/Modal";
import WorkShiftForm from "../../Components/WorkShiftComponents/WorkShiftFormComponent";
import WorkShiftTable from "../../Components/WorkShiftComponents/WorkShiftTableComponent";
import AssignShiftFormComponent from "../../Components/WorkShiftComponents/AssignShiftFormComponent";
import {
  fetchWorkShifts,
  createWorkShift,
  updateWorkShift,
  deleteWorkShift,
} from "../../Services/WorkShiftService";


function WorkShiftListPage() {
  const [shifts, setShifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  
  const loadShifts = async () => {
    const data = await fetchWorkShifts();
    setShifts(data);
  };

  useEffect(() => {
    loadShifts();
  }, []);

  // ========================
  // MODAL HANDLER
  // ========================
  const openAddModal = () => {
    setSelectedShift(null);
    setShowModal(true);
  };

  const openEditModal = (shift) => {
    setSelectedShift(shift);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedShift(null);
  };

  // ========================
  // FORM SUBMIT
  // ========================
  const handleSubmit = async (formData) => {
    if (selectedShift) {
      await updateWorkShift(selectedShift.id, formData);
    } else {
      await createWorkShift(formData);
    }

    closeModal();
    loadShifts();
  };

  // ========================
  // DELETE
  // ========================
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this shift?")) return;
    await deleteWorkShift(id);
    loadShifts();
  };

  return (
    <div className="p-6 w-full">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Work Shifts</h1>
          <p className="text-sm text-gray-500">
            Manage employee working shifts
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
        >
          + Add Shift
        </button>

        <button
          onClick={() => setShowAssignModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
        >
          Assign Shift
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <WorkShiftTable
          data={shifts}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>

      {/* MODAL */}
      <Modal
        show={showModal}
        title={selectedShift ? "Edit Work Shift" : "Add Work Shift"}
        onClose={closeModal}
        width="max-w-md"
      >
        <WorkShiftForm
          initialData={selectedShift}
          onSubmit={handleSubmit}
        />
      </Modal>

      <Modal
        show={showAssignModal}
        title="Assign Work Shift"
        onClose={() => setShowAssignModal(false)}
        width="max-w-lg"
      >
        <AssignShiftFormComponent
          onCancel={() => setShowAssignModal(false)}
          onSubmit={() => setShowAssignModal(false)}
        />
      </Modal>
    </div>
  );
}

export default WorkShiftListPage;
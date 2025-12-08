import { useState, useEffect } from "react";
import Modal from "../Modal";

function DepartmentModal({ show, onClose, onSubmit, data }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Reset or fill data
  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [data]);

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={data ? "Edit Department" : "Tambah Department"}
      width="max-w-md"
    >
      <div className="space-y-4">

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="border p-2 rounded w-full"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit({
                name,
                description: description || null,
              })
            }
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {data ? "Update" : "Tambah"}
          </button>
        </div>

      </div>
    </Modal>
  );
}

export default DepartmentModal;
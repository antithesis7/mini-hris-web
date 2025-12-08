import { useState, useEffect } from "react";
import Modal from "../Modal";

function PositionModal({ show, onClose, onSubmit, data }) {
  const [form, setForm] = useState({
    name: "",
    level: "",
    description: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
        level: data.level || "",
        description: data.description || "",
      });
    } else {
      setForm({ name: "", level: "", description: "" });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Modal show={show} onClose={onClose} title={data ? "Edit Position" : "Add Position"} width="max-w-md">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            className="border px-3 py-2 rounded w-full"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Level</label>
          <input
            name="level"
            className="border px-3 py-2 rounded w-full"
            value={form.level}
            onChange={handleChange}
            placeholder="Misal: Senior, Junior..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows="3"
            className="border p-2 rounded w-full"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit({
              name: form.name,
              level: form.level || null,
              description: form.description || null,
            })}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
          >
            {data ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default PositionModal;
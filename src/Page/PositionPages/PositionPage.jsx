import { useEffect, useMemo, useState } from "react";
import {
  fetchPositions,
  createPosition,
  updatePosition,
  deletePosition,
} from "../../Services/PositionApi";

import PositionModal from "../../Components/PositionComponents/PositionModal";
import PositionConfirmDelete from "../../Components/PositionComponents/PositionConfirmDelete";

function PositionPage() {
  const [positions, setPositions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [pendingSearch, setPendingSearch] = useState("");

  async function load() {
    const data = await fetchPositions();

    let filtered = data;
    if (search.trim() !== "") {
      filtered = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setPositions(filtered);
    setPage(1);
  }

  useEffect(() => {
    load();
  }, [search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return positions.slice(start, start + pageSize);
  }, [positions, page]);

  const totalPages = Math.ceil(positions.length / pageSize);

  const handleDelete = async () => {
    if (!selectedItem) return;
    await deletePosition(selectedItem.id);
    setConfirmDelete(false);
    load();
  };

  const highlight = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, (match) => `<mark class="bg-yellow-200">${match}</mark>`);
  };

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Positions</h1>
          <p className="text-gray-500 text-sm">
            Manage company positions
          </p>
        </div>

        <button
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-sm transition"
        >
          + Add Position
        </button>
      </div>

      <div className="w-full bg-white p-4 rounded-xl shadow-sm border flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
         <input
            className="border border-gray-300 pl-10 pr-3 py-2 rounded-xl w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Search departments..."
            value={pendingSearch}
            onChange={(e) => setPendingSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearch(pendingSearch); // baru trigger search saat Enter ditekan
              }
            }}
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="text-gray-700">
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Level</th>
              <th className="px-4 py-3 border-b">Description</th>
              <th className="px-4 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td
                  className="px-4 py-3 border-b font-medium"
                  dangerouslySetInnerHTML={{ __html: highlight(p.name) }}
                />
                <td className="px-4 py-3 border-b">{p.level || "-"}</td>
                <td className="px-4 py-3 border-b">{p.description || "-"}</td>
                <td className="px-4 py-3 border-b">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setEditData(p);
                        setShowModal(true);
                      }}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItem(p);
                        setConfirmDelete(true);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {positions.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No positions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {positions.length > 0 && (
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

      <PositionModal
        show={showModal}
        data={editData}
        onClose={() => setShowModal(false)}
        onSubmit={async (payload) => {
          if (editData) await updatePosition(editData.id, payload);
          else await createPosition(payload);
          setShowModal(false);
          setEditData(null);
          load();
        }}
      />

      <PositionConfirmDelete
        show={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        item={selectedItem}
      />
    </div>
  );
}

export default PositionPage;
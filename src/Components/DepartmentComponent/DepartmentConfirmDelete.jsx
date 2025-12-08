import Modal from "../Modal";

function ConfirmDeleteModal({ show, onClose, onConfirm, item }) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Konfirmasi Hapus"
      width="max-w-sm"
    >
      <div className="space-y-4">

        <p className="text-gray-700">
          Apakah kamu yakin ingin menghapus{" "}
          <span className="font-semibold">{item?.name}</span>?
        </p>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
          >
            Hapus
          </button>
        </div>

      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
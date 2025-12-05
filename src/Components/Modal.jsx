import React from "react";

function Modal({ show, title, children, onClose, width = "max-w-lg" }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`bg-white p-5 rounded-xl shadow-xl w-full ${width}`}>
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ×
          </button>
        </div>

        {/* CONTENT */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
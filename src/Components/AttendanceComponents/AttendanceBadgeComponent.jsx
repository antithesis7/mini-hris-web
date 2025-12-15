function AttendanceBadge({ status }) {
  if (!status) return null;

  const map = {
    present: "bg-green-100 text-green-700",
    late: "bg-yellow-100 text-yellow-700",
    absent: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        map[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
}

export default AttendanceBadge;
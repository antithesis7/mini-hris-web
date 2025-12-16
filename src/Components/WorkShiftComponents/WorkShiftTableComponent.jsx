function WorkShiftTable({ data, onEdit, onDelete }) {
  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Start</th>
          <th className="px-4 py-3">End</th>
          <th className="px-4 py-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((shift) => (
          <tr key={shift.id} className="border-t hover:bg-gray-50">
            <td className="px-4 py-3">{shift.name}</td>
            <td className="px-4 py-3">{shift.start_time}</td>
            <td className="px-4 py-3">{shift.end_time}</td>
            <td className="px-4 py-3 text-center space-x-3">
              <button
                onClick={() => onEdit(shift)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(shift.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}

        {data.length === 0 && (
          <tr>
            <td colSpan="4" className="text-center py-6 text-gray-500">
              No shifts found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default WorkShiftTable;
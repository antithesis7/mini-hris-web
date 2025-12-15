import useAttendance from "../../Hooks/UseAttendanceHooks";
import AttendanceTable from "../../Components/AttendanceComponents/AttendanceTableComponent";

function AttendanceListPage() {
  const { attendance, loading, doCheckOut } = useAttendance();

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Attendance</h1>
        <p className="text-gray-500 text-sm">
          Daily employee attendance records
        </p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <AttendanceTable
          data={attendance}
          onCheckOut={doCheckOut}
        />
      )}
    </div>
  );
}

export default AttendanceListPage;
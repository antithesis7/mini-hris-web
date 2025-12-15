import { useEffect, useState } from "react";
import {
  fetchAttendance,
  checkInToday,
  checkOutByAttendanceId,
} from "../Services/AttendanceService";

export default function useAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const data = await fetchAttendance();
      setAttendance(data || []);
    } finally {
      setLoading(false);
    }
  };

  // ✅ CHECK-IN HARI INI (SATU-SATUNYA YANG DIPAKAI UI)
  const doCheckInToday = async (employeeId, note) => {
    await checkInToday(employeeId, note);
    loadAttendance();
  };

  // ✅ CHECK-OUT BERDASARKAN ATTENDANCE ID
  const doCheckOut = async (attendanceId) => {
    await checkOutByAttendanceId(attendanceId);
    loadAttendance();
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  return {
    attendance,
    loading,
    doCheckInToday,
    doCheckOut,
    loadAttendance,
  };
}
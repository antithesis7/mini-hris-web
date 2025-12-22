import { useEffect, useState } from "react";
import { fetchAttendanceSummary } from "../Services/AttendanceService";

export default function useAttendanceSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadSummary = async () => {
    setLoading(true);
    try {
      const data = await fetchAttendanceSummary();
      setSummary(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  return {
    summary,
    loading,
    reloadSummary: loadSummary,
  };
}
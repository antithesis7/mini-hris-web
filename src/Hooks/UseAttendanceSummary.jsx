import { useEffect, useState } from "react";
import { fetchAttendanceSummary } from "../Services/AttendanceService";

export default function useAttendanceSummary(date) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadSummary = async () => {
    setLoading(true);
    try {
      const data = await fetchAttendanceSummary(date);
      setSummary(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!date) return;
    loadSummary();
  }, [date]);

  return {
    summary,
    loading,
    reloadSummary: loadSummary,
  };
}
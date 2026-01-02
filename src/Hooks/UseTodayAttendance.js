import { useEffect, useState } from "react";
import { fetchTodayAttendance } from "../Services/AttendanceService";

export default function useTodayAttendance(date) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const result = await fetchTodayAttendance(date);
      setData(result || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [date]);

  return {
    data,
    loading,
    reload: load,
  };
}
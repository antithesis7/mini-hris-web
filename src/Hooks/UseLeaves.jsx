import { useState, useEffect } from "react";
import {
  fetchLeaves,
  createOrUpdateLeave,
  approveLeave,
  rejectLeave,
  updateLeave,
  deleteLeave,
} from "../Services/LeaveService";

function useLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadLeaves = async () => {
    try {
      setLoading(true);
      const result = await fetchLeaves(); // langsung array
      setLeaves(result || []);
    } catch (err) {
      console.error("Leave load error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addLeave = async (formData) => {
    const { data, error } = await createOrUpdateLeave(formData);
    if (!error) loadLeaves();
    return { data, error };
  };

  const editLeave = async (id, formData) => {
    const { data, error } = await updateLeave(id, formData);
    if (!error) loadLeaves();
    return { data, error };
  };

  const removeLeave = async (id) => {
    const { error } = await deleteLeave(id);
    if (!error) loadLeaves();
    return { error };
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const approve = async (id) => {
  await approveLeave(id);
  loadLeaves();
  };

  const reject = async (id) => {
  await rejectLeave(id);
  loadLeaves();
  };

  return {
    leaves,
    loading,
    error,
    loadLeaves,
    addLeave,
    editLeave,
    removeLeave,
    approve,
    reject,
  };
}

export default useLeaves;
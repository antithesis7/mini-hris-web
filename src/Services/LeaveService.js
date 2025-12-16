import { supabase } from "../Config/Supabase";
import { LEAVE_STATUS } from "../Utils/Constants";

export async function approveLeave(id) {
  return supabase
    .from("leaves")
    .update({ status: LEAVE_STATUS.APPROVED })
    .eq("id", id);
}

export async function rejectLeave(id) {
  return supabase
    .from("leaves")
    .update({ status: LEAVE_STATUS.REJECTED })
    .eq("id", id);
}

// 🔹 Fetch all leaves
const fetchLeaves = async () => {
  const { data, error } = await supabase
    .from("employee_leaves")
    .select(`
      *,
      employee:employee_id (
        id,
        first_name,
        last_name
      ),
      leave_type:leave_type_id (
        id,
        name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// 🔹 Fetch by ID
const fetchLeaveById = async (id) => {
  const { data, error } = await supabase
    .from("employee_leaves")
    .select(`
      *,
      employee:employee_id ( full_name ),
      leave_types:leave_type_id ( name )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

// 🔹 Create
const createLeave = async (payload) => {
  const { data, error } = await supabase
    .from("employee_leaves")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 🔹 Update
const updateLeave = async (id, payload) => {
  const { data, error } = await supabase
    .from("employee_leaves")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 🔹 Delete
const deleteLeave = async (id) => {
  const { error } = await supabase
    .from("employee_leaves")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
};

export {
  fetchLeaves,
  fetchLeaveById,
  createLeave,
  updateLeave,
  deleteLeave,
};
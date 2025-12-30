import { supabase } from "../Config/Supabase";
import { LEAVE_STATUS } from "../Utils/Constants";

export async function approveLeave(id) {
  return supabase
    .from("employee_leaves")
    .update({ status: LEAVE_STATUS.APPROVED })
    .eq("id", id);
}

export async function rejectLeave(id) {
  return supabase
    .from("employee_leaves")
    .update({ status: LEAVE_STATUS.REJECTED })
    .eq("id", id);
}

export const checkActiveLeave = async (employeeId) => {
  const { data, error } = await supabase
    .from("employee_leaves")
    .select("id")
    .eq("employee_id", employeeId)
    .in("status", ["pending", "approved"])
    .limit(1);

  if (error) throw error;
  return data.length > 0;
};

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

// ✅ CREATE ATAU UPDATE (ANTI DUPLIKASI)
const createOrUpdateLeave = async (payload) => {
  const { employee_id } = payload;
  // 1️⃣ Cek leave aktif (pending / approved)
  const { data: existingLeave, error: fetchError } = await supabase
    .from("employee_leaves")
    .select("id")
    .eq("employee_id", employee_id)
    .in("status", [
      LEAVE_STATUS.PENDING,
      LEAVE_STATUS.APPROVED,
    ])
    .maybeSingle();

  if (fetchError) throw fetchError;

  // 2️⃣ Jika sudah ada → UPDATE
  if (existingLeave) {
    const { data, error } = await supabase
      .from("employee_leaves")
      .update({
        ...payload,
        status: LEAVE_STATUS.PENDING,
        updated_at: new Date(),
      })
      .eq("id", existingLeave.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // 3️⃣ Jika belum ada → INSERT
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
  createOrUpdateLeave,
  updateLeave,
  deleteLeave,
};
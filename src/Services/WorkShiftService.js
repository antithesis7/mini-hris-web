import { supabase } from "../Config/Supabase";

export async function fetchWorkShifts() {
  const { data, error } = await supabase
    .from("work_shifts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createWorkShift(payload) {
  return supabase.from("work_shifts").insert(payload);
}

export async function updateWorkShift(id, payload) {
  return supabase.from("work_shifts").update(payload).eq("id", id);
}

export async function deleteWorkShift(id) {
  return supabase.from("work_shifts").delete().eq("id", id);
}
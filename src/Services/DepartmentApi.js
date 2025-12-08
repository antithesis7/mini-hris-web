import { supabase } from "../Config/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_APIKEY;

// GET all
async function fetchDepartments() {
  const { data, error } = await supabase
    .from("department")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

// CREATE
async function createDepartment(payload) {
  const { data, error } = await supabase
    .from("department")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// UPDATE
async function updateDepartment(id, payload) {
  const { data, error } = await supabase
    .from("department")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// DELETE
async function deleteDepartment(id) {
  const { error } = await supabase
    .from("department")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

export { fetchDepartments, 
          createDepartment,
          updateDepartment, 
          deleteDepartment,
};
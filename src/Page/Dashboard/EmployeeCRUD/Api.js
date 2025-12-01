import { createClient } from "@supabase/supabase-js";



// ===============================
// 🔧 Supabase Init
// ===============================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_APIKEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// ===============================
// 📌 GET ALL EMPLOYEES
// ===============================
async function fetchEmployees() {
  const { data, error } = await supabase
    .from("employee")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

// ===============================
// 📌 GET EMPLOYEE BY ID
// ===============================
async function getEmployeeById(id) {
  const { data, error } = await supabase
    .from("employee")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// ===============================
// 📌 CREATE EMPLOYEE
// ===============================
async function createEmployee(payload) {
  const { data, error } = await supabase
    .from("employee")
    .insert([payload])
    .select();

  if (error) throw error;
  return data[0];
}

// ===============================
// 📌 UPDATE EMPLOYEE
// ===============================
async function updateEmployee(id, payload) {
  const { data, error } = await supabase
    .from("employee")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

// ===============================
// 📌 DELETE EMPLOYEE
// ===============================
async function deleteEmployee(id) {
  const { error } = await supabase
    .from("employee")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}

export {
  fetchEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
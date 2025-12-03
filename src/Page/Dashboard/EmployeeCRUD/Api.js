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
    .select(`*,
      position:position_id ( id, name ),
      department:department_id ( id, name )`)
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

// ===============================
// 📌 SEARCH EMPLOYEES (RPC)
// ===============================
async function searchEmployees(keyword) {
  const { data, error } = await supabase.rpc("search_employees", {
    keyword: keyword || "",
  });

  if (error) {
    console.error("RPC Search Error:", error);
    return [];
  }

  return data;
}

// ===============================
// 📌 GET EMPLOYEE BY ID
// ===============================
async function getEmployeeById(id) {
  const { data, error } = await supabase
    .from("employee")
    .select(`
      *,
      position:position_id ( id, name ),
      department:department_id ( id, name )
    `)
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
// 📌 GET ALL DEPARTMENTS
// ===============================
async function fetchDepartments() {
  const { data, error } = await supabase
    .from("department")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data;
}

// ===============================
// 📌 GET ALL POSITION
// ===============================
async function fetchPositions() {
  const { data, error } = await supabase
    .from("position")
    .select("*")
    .order("level", { ascending: true });

  if (error) throw error;
  return data;
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
  searchEmployees,
  fetchDepartments,
  fetchPositions
};
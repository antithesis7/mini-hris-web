import { supabase } from "../../../Config/Supabase";


// ===============================
// 🧹 SANITIZER — hanya ambil kolom asli employee
// ===============================
function cleanEmployeePayload(data) {
  if (!data) return {};

  return {
    first_name: data.first_name || "",
    last_name: data.last_name || "",
    email: data.email || "",
    position_id: data.position_id || null,
    department_id: data.department_id || null,
    hire_date: data.hire_date || null,
    active_roles: data.active_roles || null,
  };
}

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
  const body = cleanEmployeePayload(payload);

  /**
   * 1. AUTH SIGN UP
   * Gunakan email & password dari payload
   */
  const { data: authData, error: authError } =
    await supabase.auth.signUp({
      email: body.email,
      password: payload.password, // password TIDAK disimpan ke employee
    });

  if (authError) throw authError;

  const user = authData.user;
  if (!user) throw new Error("Auth user not created");

  /**
   * 2. INSERT EMPLOYEE
   */
  const { data, error } = await supabase
    .from("employee")
    .insert({
      ...body,
      auth_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// ===============================
// 📌 UPDATE EMPLOYEE
// ===============================
async function updateEmployee(id, payload) {
  const body = cleanEmployeePayload(payload);
  const { data, error } = await supabase
    .from("employee")
    .update(body)
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
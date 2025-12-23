import { supabase } from "../Config/Supabase";

// ==============================
// GET ALL EMPLOYEES
// ==============================
async function getEmployees() {
  const { data, error } = await supabase
    .from("employee")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

// ==============================
// GET EMPLOYEE BY ID
// ==============================
async function getEmployeeById(id) {
  const { data, error } = await supabase
    .from("employee")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// ==============================
// INSERT EMPLOYEE
// ==============================
async function addEmployee(employeeData) {
  const { data, error } = await supabase
    .from("employee")
    .insert([employeeData])
    .select();

  if (error) throw error;
  return data;
}

// ==============================
// UPDATE EMPLOYEE
// ==============================
async function updateEmployee(id, updatedData) {
  const { data, error } = await supabase
    .from("employee")
    .update(updatedData)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
}

// ==============================
// DELETE EMPLOYEE
// ==============================
async function deleteEmployee(id) {
  const { error } = await supabase
    .from("employee")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

async function testEmployeeService() {
  const { data, error } = await supabase.from("employee").select("*").limit(1);

  console.log("TEST DATA:", data);
  console.log("TEST ERROR:", error);
}

export {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  testEmployeeService,
};
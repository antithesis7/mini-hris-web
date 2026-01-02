import { supabase } from "../Config/Supabase";


/**
 * ===========================
 * GET ATTENDANCE LIST
 * ===========================
 */
export const fetchAttendance = async () => {
  const { data, error } = await supabase
    .from("attendance")
    .select(`
      *,
      employee:employee_id ( first_name, last_name )
    `)
    .order("attendance_date", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * ===========================
 * CHECK-IN TODAY
 * ===========================
 */
export const checkInToday = async (employee_id, note = null) => {
  const today = new Date().toISOString().split("T")[0];
  const now = new Date();

  // 1️⃣ Ambil attendance hari ini
  const { data: attendance, error } = await supabase
    .from("attendance")
    .select("id, check_in")
    .eq("employee_id", employee_id)
    .eq("attendance_date", today)
    .maybeSingle();

  if (error) throw error;

  // 2️⃣ Jika sudah check-in → STOP
  if (attendance?.check_in) {
    throw new Error("Already checked in today");
  }

  // 3️⃣ Cek cuti
  const { data: leave } = await supabase
    .from("employee_leaves")
    .select("id")
    .eq("employee_id", employee_id)
    .lte("start_date", today)
    .gte("end_date", today)
    .eq("status", "approved")
    .maybeSingle();

  if (leave) {
    throw new Error("Employee is on leave today");
  }

  // 4️⃣ Ambil work schedule
  const { data: employee } = await supabase
    .from("employee")
    .select(`
      work_schedule (
        start_time,
        late_tolerance_minutes
      )
    `)
    .eq("id", employee_id)
    .single();

  const schedule = employee?.work_schedule;
  if (!schedule) {
    throw new Error("Work schedule not set");
  }

  // 5️⃣ Hitung status
  const [h, m] = schedule.start_time.split(":");
  const start = new Date();
  start.setHours(h, m, 0);

  const lateLimit = new Date(start);
  lateLimit.setMinutes(lateLimit.getMinutes() + schedule.late_tolerance_minutes);
  console.warn(`check logic`,{
    now,
    lateLimit
  });
  const status = now > lateLimit ? "late" : "present";

  // 6️⃣ UPDATE jika record sudah ada (scheduler)
  if (attendance) {
    const { data, error } = await supabase
      .from("attendance")
      .update({
        check_in: now.toTimeString().slice(0, 5),
        status,
        note,
      })
      .eq("id", attendance.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // 7️⃣ INSERT fallback
  const { data, error: insertError } = await supabase
    .from("attendance")
    .insert({
      employee_id,
      attendance_date: today,
      check_in: now.toTimeString().slice(0, 5),
      status,
      note,
    })
    .select()
    .single();

  if (insertError) throw insertError;
  return data;
};

/**
 * ===========================
 * CHECK-OUT
 * ===========================
 */
export const checkOutByAttendanceId = async (attendance_id) => {
  const now = new Date();

  const { data, error } = await supabase
    .from("attendance")
    .update({
      check_out: now.toTimeString().slice(0, 5),
    })
    .eq("id", attendance_id)
    .is("check_out", null)
    .select()
    .single();

  if (error) throw error;
  return data;
};


 // Attendance Summary
  
//  @param {string | null} date - format YYYY-MM-DD, default hari ini

export async function fetchAttendanceSummary(date = null) {
  const targetDate =
  typeof date === "string" && date.length
    ? date
    : new Date().toISOString().split("T")[0];

  const { count: onLeaveCount, error: leaveError } = await supabase
    .from("employee_leaves")
    .select("id", { count: "exact", head: true })
    .eq("status", "approved")
    .lte("start_date", targetDate)
    .gte("end_date", targetDate);

  if (leaveError) throw leaveError;

  // 1️⃣ TOTAL EMPLOYEE (INI KUNCI)
  const { count: totalEmployees, error: empError } = await supabase
    .from("employee")
    .select("id", { count: "exact", head: true });

  if (empError) throw empError;

  // 2️⃣ ATTENDANCE HARI INI
  const { data: attendance, error } = await supabase
    .from("attendance")
    .select("status")
    .eq("attendance_date", targetDate);

  if (error) throw error;

  let present = 0;
  let late = 0;
  let onLeave = 0;

  attendance.forEach(({ status }) => {
    if (status === "present") present++;
    if (status === "late") late++;
    if (status === "leave") onLeave++;
  });

  const absent =
    totalEmployees - (present + late + onLeave);  

  return {
    totalEmployees,
    present,
    late,
    absent,
    onLeave: onLeaveCount,
    absent: Math.max(absent, 0),
  };
}

export async function fetchTodayAttendance(date) {
  const targetDate =
    typeof date === "string" && date.length === 10
      ? date
      : new Date().toISOString().split("T")[0];

  console.log("ADMIN ATTENDANCE DATE:", targetDate);

  const { data, error } = await supabase
    .from("attendance")
    .select(`
      id,
      attendance_date,
      check_in,
      check_out,
      status,
      note,
      employee:employee_id (
        id,
        first_name,
        last_name,
        email
      )
    `)
    .eq("attendance_date", targetDate)
    .order("employee_id", { ascending: true });

  if (error) throw error;
  return data || [];
}
import { supabase } from "../Config/supabase";

export const fetchLeaveTypes = async () => {
  const { data, error } = await supabase
    .from("leave_types")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return { data };
};
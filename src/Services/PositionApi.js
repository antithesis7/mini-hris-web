import { supabase } from "../Config/supabase";

async function fetchPositions() {
  const { data, error } = await supabase
    .from("position")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

async function createPosition(payload) {
  const { data, error } = await supabase
    .from("position")
    .insert([
      {
        name: payload.name,
        level: payload.level || null,
        description: payload.description || null,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

async function updatePosition(id, payload) {
  const { data, error } = await supabase
    .from("position")
    .update({
      name: payload.name,
      level: payload.level || null,
      description: payload.description || null,
    })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

async function deletePosition(id) {
  const { error } = await supabase.from("position").delete().eq("id", id);
  if (error) throw error;
}

export { fetchPositions, 
    createPosition, 
    updatePosition, 
    deletePosition 
};
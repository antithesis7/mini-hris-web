export function formatTime(value) {
  if (!value) return "-";

  // jika format sudah "HH:mm" atau "HH:mm:ss"
  if (typeof value === "string") {
    return value.slice(0, 5);
  }

  return "-";
}
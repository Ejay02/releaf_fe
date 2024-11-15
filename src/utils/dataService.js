export async function fetchMillData() {
  const response = await fetch("/milljson.json");
  if (!response.ok) throw new Error("Failed to load mill data");
  const data = await response.json();
  console.log("data:", data);
  return data;
}

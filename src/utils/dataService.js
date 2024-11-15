export async function fetchMillData() {
  const response = await fetch("/src/assets/milljson.json");
  if (!response.ok) throw new Error("Failed to load mill data");
  const data = await response.json();
  return data;
}

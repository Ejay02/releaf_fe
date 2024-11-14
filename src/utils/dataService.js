export async function fetchMillData() {
  try {
    const response = await fetch("/src/assets/milljson.json");
    if (!response.ok) throw new Error("Failed to load mill data");
    const data = await response.json();
    return data;
  } catch (error) {
    notify("Error loading mill data", "error");
    throw error;
  }
}

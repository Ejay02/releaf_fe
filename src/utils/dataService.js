

export async function fetchMillData() {
  try {
    const response = await fetch("/src/assets/milljson.json");
    if (!response.ok) throw new Error("Failed to load mill data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading mill data:", error);
    throw error;
  }
}

export async function savePKSDumpsite(dumpsiteData) {
  try {
    // For development, log the data
    console.log("Saving PKS dumpsite:", dumpsiteData);
    return true;
  } catch (error) {
    console.error("Error saving PKS dumpsite:", error);
    throw error;
  }
}

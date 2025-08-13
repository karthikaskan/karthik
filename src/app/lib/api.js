export async function getSiteData() {
  try {
    const response = await fetch("https://boomimart.com/wp-json/wp/v2/pages/5");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
  return data.acf;
  } catch (error) {
    console.error("Error fetching site data:", error.message);
    return null;
  }
  
}

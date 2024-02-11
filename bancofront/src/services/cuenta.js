import axios from "axios";

const API_URL = "https://localhost:7141";

export async function getCuentas(dni) {
  try {
    const response = await axios.get(`${API_URL}/Cuenta/${dni}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

import axios from "axios";

const API_URL = "https://localhost:7141";

export async function getTransferencias(id) {
  try {
    const response = await axios.get(`${API_URL}/Transferencia/Get=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

import axios from "axios";

const API_URL = "https://colosal.duckdns.org:15001/BancoGeneracion";

export async function getTransferencias(id) {
  try {
    const response = await axios.get(`${API_URL}/Transferencia/Get=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

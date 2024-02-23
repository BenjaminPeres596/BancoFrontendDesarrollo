import axios from "axios";

const API_URL = "https://colosal.duckdns.org:15001/BancoGeneracion";

export async function GetMotivos() {
  try {
    const response = await axios.get(`${API_URL}/Motivo/Get`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

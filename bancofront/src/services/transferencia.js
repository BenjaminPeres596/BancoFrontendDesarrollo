import axios from "axios";

const API_URL = "https://localhost:7141";

export async function getTransferencias(nroCuenta) {
  try {
    const response = await axios.get(
      `${API_URL}/Transferencia?nroCuenta=${nroCuenta}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

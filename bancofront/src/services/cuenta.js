import axios from "axios";

const API_URL = "https://colosal.duckdns.org:15001/BancoGeneracion";

export async function GetCuentas(dni) {
  try {
    const response = await axios.get(
      `${API_URL}/Cuenta/GetCuentasPorDni=${dni}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function PostCuenta(cuenta, dni) {
  try {
    const response = await axios.post(`${API_URL}/Cuenta/Post=${dni}`, cuenta, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

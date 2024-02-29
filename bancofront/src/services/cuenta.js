import axios from "axios";

const API_URL = "https://colosal.duckdns.org:15001/BancoGeneracion";

export async function GetCuentas(cuil) {
  try {
    const response = await axios.get(
      `${API_URL}/Cuenta/GetCuentasPorCuil=${cuil}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function PostCuenta(cuil) {
  try {
    const response = await axios.post(`${API_URL}/Cuenta/Post`, { cuil }, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}




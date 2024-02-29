import axios from "axios";

const API_URL = "https://colosal.duckdns.org:15001/BancoGeneracion";

export async function LoginAuth(dni, usuario, contraseña, authCode) {
  try {
    const response = await axios.post(
      `${API_URL}/Cliente/LoginAuth=${dni},${usuario},${contraseña},${authCode}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function PostCliente(cliente) {
  try {
    const response = await axios.post(`${API_URL}/Cliente/Post`, cliente, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

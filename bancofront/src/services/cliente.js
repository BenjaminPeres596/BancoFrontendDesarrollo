import axios from "axios";

const API_URL = "https://localhost:7141";

export async function LoginAuth(dni, usuario, contraseña) {
  try {
    const response = await axios.post(
      `${API_URL}/Cliente/${dni},${usuario},${contraseña}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

import axios from "axios";

const API_URL = "https://colosal.duckdns.org:15001/BancoGeneracion";
const API_URL_EXTERNA = "https://colosal.duckdns.org:15001/MilagroFinanciero"

export async function getTransferencias(id) {
  try {
    const response = await axios.get(`${API_URL}/Transferencia/Get=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function postTransferencia(
  transferencia,
  cbuOrigen,
  cbuDestino,
  monto,
  motivoId
) {
  try {
    const response = await axios.post(
      `${API_URL}/Transferencia/Post=${cbuOrigen},${cbuDestino},${monto},${motivoId}`,
      transferencia,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function postTransferenciaExterna(
  transferencia,
  cbuOrigen,
  cbuDestino,
  monto,
  motivoNombre
) {
  try {
    const response = await axios.post(
      `${API_URL_EXTERNA}/Transferencia/Post=${cbuOrigen},${cbuDestino},${monto},${motivoNombre}`,
      transferencia,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  } 
}
import React, { useState, useEffect } from "react";
import * as APICuenta from "../services/cuenta";
import * as APITransferencia from "../services/transferencia";
import { Desplegable } from "../Components/desplegable";
import { Boton } from "../Components/boton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./principal.css";
import { useNavigate } from "react-router-dom";

const Transferencia = ({ cuentaId, cliente }) => {
  const [monto, setMonto] = useState("");
  const [cuentasDestino, setCuentasDestino] = useState([]);
  const [cuentaDestino, setCuentaDestino] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener cuentas para transferencia
    APICuenta.GetCuentas(cliente.dni)
      .then((data) => {
        const cuentas = data.datos.filter((c) => c.id !== cuentaId);
        setCuentasDestino(cuentas);
      })
      .catch((error) => {
        console.error("Error al obtener las cuentas:", error);
      });
  }, [cliente.dni, cuentaId]);

  return (
    <div>
      <h3>Realizar Transferencia</h3>
      <p>Monto:</p>
      <input
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />
      <p>Cuenta destino:</p>
      <Desplegable
        array={cuentasDestino}
        atributoAMostrar={"id"}
        textoAMostrar={"Seleccione una cuenta destino"}
        onSelect={(id) => {
          console.log("Cuenta destino seleccionada:", id);
          setCuentaDestino(id);
        }}
      />
      {mensajeError && <p style={{ color: "red" }}>{mensajeError}</p>}
      <Boton nombreAccion="Realizar Transferencia" />
      <button type="button" onClick={() => navigate("/principal")}>
        Volver
      </button>
    </div>
  );
};

export default Transferencia;

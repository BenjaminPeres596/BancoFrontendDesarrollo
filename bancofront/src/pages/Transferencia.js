import React, { useState, useEffect } from "react";
import * as APICuenta from "../services/cuenta";
import * as APIMotivo from "../services/motivo";
import { Boton } from "../Components/boton";
import { useNavigate } from "react-router-dom";

const Transferencia = ({ cuentaId, cliente }) => {
  const [monto, setMonto] = useState("");
  const [motivos, setMotivos] = useState([]);
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

  useEffect(() => {
    APIMotivo.GetMotivos()
      .then((data) => {
        const motivos = data.datos;
        setMotivos(motivos);
      })
      .catch((error) => {
        console.error("Error al obtener los motivos:", error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <h3>Realizar Transferencia</h3>

        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Ingrese el monto a transferir
          </label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="$0"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Ingrese el CBU de destino
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="00000000000000000000"
            value={cuentaDestino}
            onChange={(e) => setCuentaDestino(e.target.value)}
          />
          {mensajeError && <p style={{ color: "red" }}>{mensajeError}</p>}
        </div>
        <div className="col-md-4">
          <label 
            htmlFor="inputState" 
            className="form-label">
            Motivo
          </label>
          <select 
            id="inputState" 
            className="form-select">
            <option value="">Seleccionar Motivo</option>
            {motivos.map((motivo) => (
              <option key={motivo.id} value={motivo.id}>
                {motivo.Nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Boton nombreAccion="Realizar Transferencia" />
        <button type="button" onClick={() => navigate("/principal")}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default Transferencia;


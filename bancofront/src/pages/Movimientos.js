import React, { useState, useEffect } from "react";
import * as APITransferencia from "../services/transferencia";
import { ListarArrays } from "../Components/listarArrays";
import "./Movimiento.css";
import * as APICuenta from "../services/cuenta";
import { Desplegable } from "../Components/desplegable";
import { Boton } from "../Components/boton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Movimientos = () => {
  const [cuentas, setCuentas] = useState([]);
  const [userData, setUserData] = useState(null);
  const [transferencias, setTransferencias] = useState([]);
  const [id, setId] = useState(null);
  const [mostrarTransferencias, setMostrarTransferencias] = useState(false);

  useEffect(() => {
    const cookieData = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("userData="));
    if (cookieData) {
      const userData = JSON.parse(decodeURIComponent(cookieData.split("=")[1]));
      setUserData(userData);
      console.log("Datos del usuario:", userData);
    }

    const cuentaSeleccionadaCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("cuentaSeleccionada="));
    if (cuentaSeleccionadaCookie) {
      const cuentaSeleccionada = JSON.parse(
        decodeURIComponent(cuentaSeleccionadaCookie.split("=")[1])
      );
      setId(cuentaSeleccionada.id);
    }
  }, []);

  useEffect(() => {
    if (id) {
      APITransferencia.getTransferencias(id)
        .then((data) => {
          setTransferencias(formatTransferencias(data.datos));
          setMostrarTransferencias(true);
        })
        .catch((error) => {
          console.error("Error al obtener las transferencias:", error);
        });
    }
  }, [id]);

  const formatTransferencias = (transferencias) => {
    return transferencias.map((transferencia) => {
      const fecha = new Date(transferencia.fecha);
      const fechaFormateada = fecha.toLocaleDateString();
      const horaFormateada = fecha.toLocaleTimeString();
      return {
        ...transferencia,
        fecha: `${fechaFormateada} ${horaFormateada}`,
      };
    });
  };

  const handleVolverClick = () => {
    window.history.back();
  };

  return (
    <div className="Movimiento container-fluid">
      <div className="row">
        <div className="p-4 col-md-7">
          <h2>¡Movimientos de {userData ? userData.nombre : ""}!</h2>
        </div>
        <div className="Seleccion p-4 col-md-3">
          <u className="fs-5">Cuenta N°:</u>
          <strong className="fs-5">{id}</strong>
        </div>
      </div>

      <Boton
        accion={handleVolverClick}
        nombreAccion="Volver"
        clases={["text-truncate", "col-4"]}
      />
      {mostrarTransferencias && (
        <>
          <ListarArrays
            nombre="Prueba"
            array={transferencias}
            atributos={["monto", "fecha", "cuentaDestino.cbu"]}
          />
          <ListarArrays
            nombre="Transferencias realizadas"
            array={transferencias.filter(
              (transferencia) =>
                transferencia.cuentaOrigen.id.toString() === id.toString()
            )}
            atributos={["monto", "fecha", "cuentaDestino.cbu"]}
          />
          <br />
          <ListarArrays
            nombre="Transferencias recibidas"
            array={transferencias.filter(
              (transferencia) =>
                transferencia.cuentaDestino.id.toString() === id.toString()
            )}
            atributos={["monto", "fecha", "cuentaOrigen.cbu"]}
          />
        </>
      )}
    </div>
  );
};

export default Movimientos;

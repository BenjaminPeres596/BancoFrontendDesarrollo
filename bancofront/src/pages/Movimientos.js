// Movimientos.js
import React, { useState, useEffect } from "react";
import * as APITransferencia from "../services/transferencia";
import { ListarArrays } from "../Components/listarArrays";
import "./Movimiento.css";
import * as APICuenta from "../services/cuenta";
import { Desplegable } from "../Components/desplegable";
import { Boton } from "../Components/boton";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importa FaEyeSlash también
import "bootstrap/dist/css/bootstrap.min.css";

const Movimientos = () => {
  const [cuentas, setCuentas] = useState([]);
  const [userData, setUserData] = useState(null);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);
  const [transferencias, setTransferencias] = useState([]);
  const [id, setIdDesplegable] = useState("");
  const [mostrarTransferencias, setMostrarTransferencias] = useState(false);
  const [mostrarSaldo, setMostrarSaldo] = useState(true);

  useEffect(() => {
    const cookieData = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("userData="));
    if (cookieData) {
      const userData = JSON.parse(decodeURIComponent(cookieData.split("=")[1]));
      setUserData(userData);
      console.log("Datos del usuario:", userData);
    }
  }, []);

  const handleClickTransferencia = () => {
    if (!mostrarTransferencias && id) {
      APITransferencia.getTransferencias(id)
        .then((data) => {
          setTransferencias(formatTransferencias(data.datos));
          setMostrarTransferencias(true);
        })
        .catch((error) => {
          console.error("Error al obtener las transferencias:", error);
        });
    } else {
      setMostrarTransferencias(false);
    }
  };

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

  useEffect(() => {
    if (userData) {
      APICuenta.GetCuentas(userData.dni)
        .then((data) => {
          setCuentas(data.datos);
        })
        .catch((error) => {
          console.error("Error al obtener las cuentas:", error);
        });
    }
  }, [userData]);

  useEffect(() => {
    if (id) {
      const cuentaSeleccionada = cuentas.find(
        (cuenta) => cuenta.id.toString() === id.toString()
      );
      setCuentaSeleccionada(cuentaSeleccionada);
    }
  }, [cuentas, id]);

  const toggleMostrarSaldo = () => {
    setMostrarSaldo(!mostrarSaldo);
  };

  const handleVolverClick = () => {
    window.history.back();
  };

  return (
    <div className="Movimiento container-fluid">
      <div className="row">
        <div className="p-4 col-md-7">
          {" "}
          <h2>¡Movimientos de {userData ? userData.nombre : ""}!</h2>{" "}
        </div>
        <div className="Seleccion p-4 col-md-3">
          <Desplegable
            array={cuentas}
            atributoAMostrar={"id"}
            textoAMostrar={"Seleccione una cuenta"}
            onSelect={(id) => {
              console.log("Id:", id);
              setIdDesplegable(id);
            }}
          />
        </div>
      </div>
      <Boton accion={handleClickTransferencia} nombreAccion="Ver actividad" clases={["text-truncate", "col-4"]}/>
      <Boton accion={handleVolverClick} nombreAccion="Volver" clases={["text-truncate", "col-4"]}/>
      {mostrarTransferencias && (
        <>
          <ListarArrays
            nombre="Transferencias realizadas"
            array={transferencias.filter(
              (transferencia) => transferencia.cuentaOrigen.id.toString() === id
            )}
            atributos={["monto", "fecha", "cuentaDestino.cbu"]}
          />
          <br></br>
          <ListarArrays
            nombre="Transferencias recibidas"
            array={transferencias.filter(
              (transferencia) =>
                transferencia.cuentaDestino.id.toString() === id
            )}
            atributos={["monto", "fecha", "cuentaOrigen.cbu"]}
          />
        </>
      )}
    </div>
  );
};

export default Movimientos;

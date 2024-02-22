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

const Movimientos = ({ cliente }) => {
  const [cuentas, setCuentas] = useState([]);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);
  const [transferencias, setTransferencias] = useState([]);
  const [id, setIdDesplegable] = useState("");
  const [mostrarTransferencias, setMostrarTransferencias] = useState(false);
  const [mostrarSaldo, setMostrarSaldo] = useState(true);

  const handleClickTransferencia = () => {
    console.log("Id cuenta:", id);
    console.log("Cliente:", cliente);
    console.log("Cuenta:", cuentas);
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
    APICuenta.GetCuentas(cliente.dni)
      .then((data) => {
        setCuentas(data.datos);
      })
      .catch((error) => {
        console.error("Error al obtener las cuentas:", error);
      });
  }, [cliente.dni]);

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
    <div className="Movimiento">
      <div>
        {" "}
        <h2>¡Transferencias de {cliente.nombre}!</h2>{" "}
      </div>
      <div className="Seleccion">
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
      <Boton accion={handleClickTransferencia} nombreAccion="Ver actividad" />
      {mostrarTransferencias && (
        <>
          <ListarArrays
            nombre="Transferencias realizadas"
            array={transferencias.filter(
              (transferencia) => transferencia.cuentaOrigen.id.toString() === id
            )}
            atributos={["monto", "fecha"]}
          />
          <br></br>
          <ListarArrays
            nombre="Transferencias recibidas"
            array={transferencias.filter(
              (transferencia) =>
                transferencia.cuentaDestino.id.toString() === id
            )}
            atributos={["monto", "fecha"]}
          />
        </>
      )}
      <button type="button" onClick={handleVolverClick}>
        {" "}
        Volver{" "}
      </button>
    </div>
  );
};

export default Movimientos;

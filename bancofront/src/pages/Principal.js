import React, { useState, useEffect } from "react";
import * as APICuenta from "../services/cuenta";
import { Desplegable } from "../Components/desplegable";
import { ListarArrays } from "../Components/listarArrays";
import { Boton } from "../Components/boton";
import * as APITransferencia from "../services/transferencia";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importa FaEyeSlash también
import "bootstrap/dist/css/bootstrap.min.css";
import "./principal.css";

const Principal = ({ cliente }) => {
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
    <div className="container-fluid">
      <div className="row justify-content-between p-5 px-5">
        <div className="col-lg-6 col-md-6 col-sm-12 m-3">
          <h2>¡Hola {cliente.nombre}!</h2>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12 m-3">
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
      {cuentaSeleccionada && (
        <>
          <p>
            Saldo {mostrarSaldo ? `$${cuentaSeleccionada.saldo}` : "$***"}
            {mostrarSaldo ? (
              <FaEye onClick={toggleMostrarSaldo} />
            ) : (
              <FaEyeSlash onClick={toggleMostrarSaldo} />
            )}
          </p>
        </>
      )}
      <Boton accion={handleClickTransferencia} nombreAccion="Ver actividad" />
      <button type="button" onClick={handleVolverClick}>Volver</button>
      {mostrarTransferencias && (
        <>
          <ListarArrays
            nombre="Transferencias realizadas"
            array={transferencias.filter(
              (transferencia) => transferencia.cuentaOrigen.id.toString() === id
            )}
            atributos={["monto", "fecha"]}
          />
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
    </div>
  );
};

export default Principal;

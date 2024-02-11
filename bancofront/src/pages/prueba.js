import React, { useState, useEffect } from "react";
import * as APICuenta from "../services/cuenta";
import { Desplegable } from "../Components/desplegable";
import { ListarArrays } from "../Components/listarArrays";
import { Boton } from "../Components/boton";
import * as APITransferencia from "../services/transferencia";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importa FaEyeSlash también

const Prueba = ({ cliente }) => {
  const [cuentas, setCuentas] = useState([]);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);
  const [transferencias, setTransferencias] = useState([]);
  const [numeroCuenta, setNumeroCuentaDesplegable] = useState("");
  const [mostrarTransferencias, setMostrarTransferencias] = useState(false);
  const [mostrarSaldo, setMostrarSaldo] = useState(true);

  const handleClickTransferencia = () => {
    console.log("Numero cuenta:", numeroCuenta);
    if (!mostrarTransferencias && numeroCuenta) {
      APITransferencia.getTransferencias(numeroCuenta)
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
    APICuenta.getCuentas(cliente.dni)
      .then((data) => {
        setCuentas(data.datos);
      })
      .catch((error) => {
        console.error("Error al obtener las cuentas:", error);
      });
  }, [cliente.dni]);

  useEffect(() => {
    if (numeroCuenta) {
      const cuentaSeleccionada = cuentas.find(
        (cuenta) => cuenta.nroCuenta.toString() === numeroCuenta.toString()
      );
      setCuentaSeleccionada(cuentaSeleccionada);
    }
  }, [cuentas, numeroCuenta]);

  const toggleMostrarSaldo = () => {
    setMostrarSaldo(!mostrarSaldo);
  };

  return (
    <div>
      <h2>¡Hola {cliente.nombre}!</h2>
      <Desplegable
        array={cuentas}
        atributoAMostrar={"nroCuenta"}
        textoAMostrar={"Seleccione una cuenta"}
        onSelect={(numeroCuenta) => {
          console.log("Numero cuenta:", numeroCuenta);
          setNumeroCuentaDesplegable(numeroCuenta);
        }}
      />
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
      {mostrarTransferencias && (
        <>
          <ListarArrays
            nombre="Transferencias realizadas"
            array={transferencias.filter(
              (transferencia) =>
                transferencia.cuentaOrigen.nroCuenta.toString() === numeroCuenta
            )}
            atributos={["monto", "fecha"]}
          />
          <ListarArrays
            nombre="Transferencias recibidas"
            array={transferencias.filter(
              (transferencia) =>
                transferencia.cuentaDestino.nroCuenta.toString() ===
                numeroCuenta
            )}
            atributos={["monto", "fecha"]}
          />
        </>
      )}
    </div>
  );
};

export default Prueba;

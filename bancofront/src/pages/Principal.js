import React, { useState, useEffect } from "react";
import * as APICuenta from "../services/cuenta";
import { Desplegable } from "../Components/desplegable";
import { Boton } from "../Components/boton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./principal.css";
import { useNavigate } from "react-router-dom";

const Principal = () => {
  const [cuentas, setCuentas] = useState([]);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);
  const [id, setIdDesplegable] = useState("");
  const [userData, setUserData] = useState(null);
  const [mostrarSaldo, setMostrarSaldo] = useState(true);

  useEffect(() => {
    const cookieData = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("userData="));
    if (cookieData) {
      const userData = JSON.parse(decodeURIComponent(cookieData.split("=")[1]));
      setUserData(userData);
      console.log("Datos del usuario:", userData);
      console.log("Id", id);
    }
  }, []);

  const navigate = useNavigate();

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
    console.log(cuentaSeleccionada);
  }, [cuentas, id]);

  const toggleMostrarSaldo = () => {
    setMostrarSaldo(!mostrarSaldo);
  };

  const handleSalir = () => {
    window.history.back();
  };
  const VerMov = () => {
    navigate("/Movimientos");
  };

  const VerTrans = () => {
    navigate("/Transferencia");
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-between p-5 px-5">
        <div className="col-lg-6 col-md-6 col-sm-12 m-3">
          <h2>¡Hola {userData?.nombre || ""}!</h2>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12 m-3">
          <Desplegable
            array={cuentas}
            atributoAMostrar={"id"}
            textoAMostrar={"Seleccione una cuenta"}
            textoQueAcompaña={"Cuenta N°:"}
            onSelect={(id) => {
              console.log("Id:", id.split(":")[1]);
              setIdDesplegable(id.split(":")[1]);
            }}
          />
        </div>
      </div>
      <div className="container-fluid text-center">
        <div className="row justify-content-between">
          {cuentaSeleccionada && (
            <>
              <p className="col-md-3">
                Saldo {mostrarSaldo ? `$${cuentaSeleccionada.saldo}` : "$***"}
                {mostrarSaldo ? (
                  <FaEye onClick={toggleMostrarSaldo} />
                ) : (
                  <FaEyeSlash onClick={toggleMostrarSaldo} />
                )}
              </p>
              <p className="col-md-4">Cbu: {cuentaSeleccionada.cbu}</p>
            </>
          )}
        </div>
      </div>
      <Boton accion={VerMov} nombreAccion="Ver actividad" />
      <Boton accion={VerTrans} nombreAccion="Realizar transferencia" />
      <Boton
        accion={handleSalir}
        nombreAccion="Salir"
        onClick={() => navigate("/")}
      ></Boton>

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

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
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas cerrar sesión?"
    );
    if (confirmacion) {
      document.cookie =
        "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      document.cookie =
        "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/Registro";
      navigate("/LoginForm");
    }
  };
  const VerMov = () => {
    console.log("Datos:", userData);
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
              if (id === "") {
                // Si se selecciona "Seleccione una cuenta", resetea la cuenta seleccionada a null
                setCuentaSeleccionada(null);
              } else {
                const cuentaSeleccionada = cuentas.find(
                  (cuenta) =>
                    cuenta.id.toString() === id.split(":")[1].toString()
                );
                setIdDesplegable(id.split(":")[1]);
                setCuentaSeleccionada(cuentaSeleccionada);
              }
            }}
          />
        </div>
      </div>
      <div className="container-fluid text-center">
        <div className="row justify-content-between">
          {cuentaSeleccionada ? (
            <>
              <p className="col-md-3 textoP">
                Saldo {mostrarSaldo ? `$${cuentaSeleccionada.saldo}` : "$***"}
                {mostrarSaldo ? (
                  <FaEye className="ms-3" onClick={toggleMostrarSaldo} />
                ) : (
                  <FaEyeSlash className="ms-3" onClick={toggleMostrarSaldo} />
                )}
              </p>
              <p className="col-md-4 textoP">Cbu: {cuentaSeleccionada.cbu}</p>
            </>
          ) : (
            <p className="col-md-3 textoP">
              Seleccione una cuenta para ver el saldo y el CBU.
            </p>
          )}
        </div>
      </div>
      <div className="justify-content-between">
        <Boton
          accion={VerMov}
          nombreAccion="Ver actividad"
          clases={["col-5"]}
        />
        <Boton
          accion={VerTrans}
          nombreAccion="Realizar transferencia"
          clases={["col-5", "text-truncate"]}
        />
      </div>
      <Boton
        accion={handleSalir}
        nombreAccion="Cerrar Sesion"
        onClick={() => navigate("/")}
        clases={[
          "fixed-bottom",
          "justify-content-end",
          "mb-3",
          "mr-3",
          "col-3",
        ]}
      />
    </div>
  );
};

export default Principal;

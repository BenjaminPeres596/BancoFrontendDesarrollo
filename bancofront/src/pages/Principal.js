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
  const [userData, setUserData] = useState({});
  const [mostrarSaldo, setMostrarSaldo] = useState(true);



  const cuenta = useState({
    id: 0,
    cbu: 0,
    fechaAlta: "string",
    saldo: 0,
    clienteId: 0,
    cliente: {
      id: 0,
      nombre: "string",
      apellido: "string",
      usuario: "string",
      clave: "string",
      sal: "string",
      dni: 0,
      mail: "string",
      bancoId: 0,
      banco: {
        id: 0,
        razonSocial: "string",
        telefono: 0,
        calle: "string",
        numero: 0,
      },
    },
    tipoCuentaId: 1,
    tipoCuenta: {
      id: 0,
      nombre: "string",
    },
  })

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
        APICuenta.GetCuentas(userData.cuil)
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

  useEffect(() => {
    if (userData && cuentas.length > 0) {
      setCuentaSeleccionada(cuentas[0]); // Selecciona automáticamente la primera cuenta
      setIdDesplegable(cuentas[0].id); // Establece automáticamente el ID de la primera cuenta
      document.cookie = `cuentaSeleccionada=${encodeURIComponent(JSON.stringify(cuentas[0]))}; expires=Thu, 31 Dec 2024 23:59:59 UTC; path=/;`;
    }
  }, [userData, cuentas]);


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

  const handleCrearCuenta = async () => {
    try {
      // Lógica para crear una nueva cuenta utilizando la API
      const nuevaCuenta = await APICuenta.PostCuenta(cuenta, userData.cuil);
      console.log("Nueva cuenta creada:", nuevaCuenta);
      // Puedes realizar acciones adicionales después de crear la cuenta si es necesario
    } catch (error) {
      console.error("Error al crear una nueva cuenta:", error);
    }
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
            textoQueAcompaña={"Cuenta N°:"}
            onSelect={(id) => {

                const cuentaSeleccionada = cuentas.find(
                  (cuenta) =>
                    cuenta.id.toString() === id.split(":")[1].toString()
                );
                setIdDesplegable(id.split(":")[1]);
                setCuentaSeleccionada(cuentaSeleccionada);

                setIdDesplegable(id.split(":")[1]);
                setCuentaSeleccionada(cuentaSeleccionada);
                 document.cookie = `cuentaSeleccionada=${encodeURIComponent(JSON.stringify(cuentaSeleccionada))}; expires=Thu, 31 Dec 2024 23:59:59 UTC; path=/;`;

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
      <div className="d-flex justify-content-center">
        <Boton
          accion={VerMov}
          nombreAccion="Ver actividad"
          clases={["col-3"]}
        />
        <Boton
          accion={VerTrans}
          nombreAccion="Realizar transferencia"
          clases={["col-3", "text-truncate"]}
        />
        <Boton
        accion={handleCrearCuenta}
        nombreAccion="Crear nueva cuenta"
        clases={["col-3", "text-truncate"]}
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

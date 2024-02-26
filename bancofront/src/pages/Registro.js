import React, { useEffect, useState } from "react";
import "./LoginForm/LoginForm.css";
import { CiUser } from "react-icons/ci";
import {
  FaLock,
  FaRegNewspaper,
  FaEnvelopeOpen,
  FaUserCircle,
} from "react-icons/fa";
import * as APICliente from "../services/cliente";
import { useNavigate, useLocation } from "react-router-dom";
import * as APICuenta from "../services/cuenta";

export const Registro = ({ cliente, setCliente }) => {
  const location = useLocation();
  const [valido, setValido] = useState(true);

  const [cuenta, setCuenta] = useState({
    id: 0,
    cbu: "string",
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
  });

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("queryparameter");
    document.cookie = `authCode=${encodeURIComponent(
      JSON.stringify(code)
    )}; Secure=true; SameSite=Strict; path=/`;
    const cookieData = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("renaper"));
    if (cookieData) {
      const renaper = JSON.parse(decodeURIComponent(cookieData.split("=")[1]));
      if (renaper == true) {
        navigate("/LoginForm");
      }
    }
    console.log(code);
    if (code == null) {
      window.location.href =
        "https://colosal.duckdns.org:15001/SRVP/?client=Bancogeneracion";
    } else {
    }
  }, [location.search, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
    console.log(cliente);
  };

  const handleVolverClick = () => {
    navigate("/LoginForm");
  };

  const handleRegistro = async (event) => {
    event.preventDefault();
    try {
      if (valido) {
        const cookieData = document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("authCode="));

        if (cookieData) {
          const authCode = JSON.parse(
            decodeURIComponent(cookieData.split("=")[1])
          );
          const responseRenaper = await APICliente.AuthRenaper(authCode);
          if (responseRenaper.exito === true) {
            setValido(false);
            if (responseRenaper.datos.estado === true) {
              console.log(cliente);
              if (
                responseRenaper.datos.cuil.substring(
                  responseRenaper.datos.cuil.length - 9,
                  responseRenaper.datos.cuil.length - 1
                ) === cliente.dni
              ) {
                const responseCliente = await APICliente.PostCliente(cliente);
                console.log("Rcliente:", responseCliente);
                console.log("Cliente:", cliente);
                const responseCuenta = await APICuenta.PostCuenta(
                  cuenta,
                  cliente.dni
                );
                console.log("Rcuenta:", responseCuenta);
                if (responseCliente.exito && responseCuenta.exito) {
                  if (responseCliente.datos && responseCliente.datos.id) {
                    const { id, nombre, apellido, usuario, clave, dni, mail } =
                      responseCliente.datos;
                    setCliente((prevCliente) => ({
                      ...prevCliente,
                      id,
                      nombre,
                      apellido,
                      usuario,
                      clave,
                      dni,
                      mail,
                    }));
                  }
                  document.cookie = `userData=${encodeURIComponent(
                    JSON.stringify(cliente)
                  )}; Secure; SameSite=Strict; path=/`;

                  navigate("/Principal");
                  console.log("Registro exitoso");
                } else {
                  console.log(
                    "Registro fallido cliente:",
                    responseCliente.mensaje
                  );
                  console.log(
                    "Registro fallido cuenta:",
                    responseCuenta.mensaje
                  );
                }
              } else {
                console.log(
                  "El dni del usuario del Renaper no coincide con el ingresado en el registro."
                );
              }
            }
          }
        }
      } else {
        console.log("Vuelva a validarse con el renaper");
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };

  return (
    <div className="container ">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-8 pt-5 mt-5">
          <div className="bg-white p-5 mt-5 rounded">
            <form className="row g-3">
              <div className="col-12">
                <h1 className="registroTitulo">Registro</h1>
              </div>
              <div className="col-md-6">
                <div className="input-box">
                  <input
                    type="text"
                    className="form-control"
                    id="inputNombre"
                    placeholder="Nombre"
                    required
                    name="nombre"
                    value={cliente.nombre}
                    onChange={handleChange}
                  />
                  <FaRegNewspaper className="icon" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-box">
                  <input
                    type="text"
                    className="form-control"
                    id="inputApellido"
                    placeholder="Apellido"
                    required
                    name="apellido"
                    value={cliente.apellido}
                    onChange={handleChange}
                  />
                  <CiUser className="icon" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-box">
                  <input
                    type="text"
                    className="form-control"
                    id="inputDocumento"
                    placeholder="Documento"
                    pattern="[0-9]*"
                    required
                    name="dni"
                    value={cliente.dni}
                    onChange={handleChange}
                  />
                  <FaRegNewspaper className="icon" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-box">
                  <input
                    type="text"
                    className="form-control"
                    id="inputUsuario"
                    placeholder="Usuario"
                    required
                    name="usuario"
                    value={cliente.usuario}
                    onChange={handleChange}
                  />
                  <FaUserCircle className="icon" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-box">
                  <input
                    type="password"
                    className="form-control"
                    id="inputClave"
                    placeholder="Clave"
                    required
                    name="clave"
                    value={cliente.clave}
                    onChange={handleChange}
                  />
                  <FaLock className="icon" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-box">
                  <input
                    type="email"
                    className="form-control"
                    id="inputMail"
                    placeholder="Mail"
                    required
                    name="mail"
                    value={cliente.mail}
                    onChange={handleChange}
                  />
                  <FaEnvelopeOpen className="icon" />
                </div>
              </div>
              <div className="col-12">
                <div className="button-row justify-content-evenly mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary text-truncate"
                    onClick={handleVolverClick}
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary text-truncate"
                    onClick={handleRegistro}
                  >
                    Registrarse
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginForm.css";
import { CiUser } from "react-icons/ci";
import { FaLock, FaRegNewspaper } from "react-icons/fa";
import * as APICliente from "../../services/cliente";

const LoginForm = ({ cliente, setCliente }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authorizationCode, setAuthorizationCode] = useState(null);
  const [valido, setValido] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (valido) {
        const cookieData3 = document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("authCode="));

        if (cookieData3) {
          const authCode = JSON.parse(
            decodeURIComponent(cookieData3.split("=")[1])
          );

          console.log("Valido:", valido);

          const respuestaRenaper = await APICliente.AuthRenaper(authCode);
          console.log(
            respuestaRenaper.datos.cuil.substring(
              respuestaRenaper.datos.cuil.length - 9,
              respuestaRenaper.datos.cuil.length - 1
            ),
            cliente.dni
          );
          if (respuestaRenaper.exito === true) {
            setValido(false);
            if (respuestaRenaper.datos.estado === true) {
              if (
                respuestaRenaper.datos.cuil.substring(
                  respuestaRenaper.datos.cuil.length - 9,
                  respuestaRenaper.datos.cuil.length - 1
                ) === cliente.dni
              ) {
                const response = await APICliente.LoginAuth(
                  cliente.dni,
                  cliente.usuario,
                  cliente.clave
                );
                if (response.exito) {
                  const { id, nombre, apellido, mail } = response.datos;
                  setCliente((prevCliente) => ({
                    ...prevCliente,
                    id,
                    nombre,
                    apellido,
                    mail,
                  }));
                  document.cookie = `userData=${encodeURIComponent(
                    JSON.stringify(response.datos)
                  )}; Secure; SameSite=Strict; path=/`;

                  console.log("Inicio de sesión exitoso");
                  navigate("/Principal");
                } else {
                  console.log("Inicio de sesión fallido:", response.mensaje);
                }
              } else {
                console.log(
                  "El dni ingresado en el formulario no coincide con el del usuario del Renaper."
                );
              }
            } else {
              console.log(
                "Inicio de sesión fallido:",
                respuestaRenaper.mensaje
              );
            }
          }
        } else {
          console.log("Debes validarte con el renaper");
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  useEffect(() => {
    const cookieData = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("userData="));
    const cookieData2 = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("renaper="));
    if (cookieData2) {
      document.cookie = `renaper=${encodeURIComponent(
        JSON.stringify(false)
      )}; Secure=true; SameSite=Strict; path=/Registro`;
    }
    if (cookieData) {
      navigate("/Principal");
    }
  }, [navigate]);

  const handleRenaper = () => {
    document.cookie = `renaper=${encodeURIComponent(
      JSON.stringify(true)
    )}; Secure=true; SameSite=Strict; path=/Registro`;
  };

  return (
    <div className="wrapper rounded bg-white position-absolute top-50 start-50 translate-middle">
      <form onSubmit={handleLogin}>
        <h1>Iniciá sesión</h1>
        <div className="d-flex justify-content-center align-items-center">
          <a
            href="https://colosal.duckdns.org:15001/SRVP/?client=Bancogeneracion"
            onClick={handleRenaper}
          >
            Validacion con Renaper
          </a>
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Documento"
            required
            name="dni"
            value={cliente.dni}
            onChange={handleChange}
          />
          <FaRegNewspaper className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Usuario"
            name="usuario"
            value={cliente.usuario}
            onChange={handleChange}
            required
          />
          <CiUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Clave"
            name="clave"
            value={cliente.clave}
            onChange={handleChange}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="button-row justify-content-center">
          <button type="submit">Iniciar Sesión</button>
        </div>
        <div className="Register-link">
          <p> ¿No está registrado? </p>
          <a href="http://localhost:3000/Registro">Registrarse</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

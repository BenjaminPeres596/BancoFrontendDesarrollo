import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginForm.css";
import { CiUser } from "react-icons/ci";
import { FaLock, FaRegNewspaper } from "react-icons/fa";
import * as APICliente from "../../services/cliente";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

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

        const cookieData3 = document.cookie //si existe la cookie de authCode, declaro authCode que parsea el codigo
          .split(";")
          .find((cookie) => cookie.trim().startsWith("authCode="));

        if (cookieData3) {
          const authCode = JSON.parse(
            decodeURIComponent(cookieData3.split("=")[1])
          );
      
          const response = await APICliente.LoginAuth(
            cliente.dni,
            cliente.usuario,
            cliente.clave,
            authCode
          );
  
          if (response.exito === true) {
            setValido(false);

            const { id, nombre, apellido, mail } = response.datos;
                  setCliente((prevCliente) => ({
                    ...prevCliente,
                    id,
                    nombre,
                    apellido,
                    mail,
                  }));
              document.cookie = `userData=${encodeURIComponent( //cookie con data del usuario
              JSON.stringify(response.datos)
          )}; Secure; SameSite=Strict; path=/`;

          console.log("Inicio de sesión exitoso");
          navigate("/Principal");

          } else {
              console.log(
                "Inicio de sesión fallido:",
                response.mensajePublico
              );
              show_alerta('Inicio de sesion fallido','info');
            }
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { CiUser } from "react-icons/ci";
import { FaLock, FaRegNewspaper } from "react-icons/fa";
import * as APICliente from "../../services/cliente";

const LoginForm = ({ cliente, setCliente }) => {
  const navigate = useNavigate();

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
        navigate("/prueba");
        console.log("Inicio de sesión exitoso");
      } else {
        console.log("Inicio de sesión fallido:", response.mensaje);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="wrapper bg-white position-absolute top-50 start-50 translate-middle">
      <form onSubmit={handleLogin}>
        <h1>Iniciá sesión</h1>
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
        {/*<div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Recuerdame
          </label>
          <a href="#">Olvide mi contraseña</a>
        </div>*/}
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

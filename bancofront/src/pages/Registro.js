import React from "react";
import "./LoginForm/LoginForm.css";
import { CiUser } from "react-icons/ci";
import { FaLock, FaRegNewspaper, FaEnvelopeOpen, FaUserCircle } from "react-icons/fa";

export const Registro = () => {
  const handleVolverClick = () => {
    window.history.back();
  };
  return (
    <div className="wrapper">
      <form action="" className="registro-form">
        <h1>Registro</h1>
        <div className="input-box">
          <input type="text" placeholder="Nombre" required />
          <FaRegNewspaper className="icon" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Apellido" required />
          <CiUser className="icon" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Documento" pattern="[0-9]*" required />
          <FaRegNewspaper className="icon" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Usuario" required />
          <FaUserCircle className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Clave" required />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input type="email" placeholder="Mail" required />
          <FaEnvelopeOpen className="icon" />
        </div>
        <div className="button-row">
          <button type="button" onClick={handleVolverClick}>Volver</button>
          <button type="submit">Registrarse</button>
        </div>
      </form>
    </div>
  );
};

export default Registro;

import React from "react";
import "./LoginForm.css";
import { CiUser } from "react-icons/ci";
import { FaLock, FaRegNewspaper } from "react-icons/fa";

export const LoginForm = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Iniciá sesión</h1>
        <div className="input-box">
          <input type="text" placeholder="Documento" required />
          <FaRegNewspaper className="icon" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Usuario" required />
          <CiUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Clave" required />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Recuerdame
          </label>
          <a href="#">Olvide mi contraseña</a>
        </div>
        <button type="submit">Iniciar Sesión</button>
        <div className="Register-link">
          <p> ¿No está registrado? </p>
          <a href="http://localhost:3000/Registro">Registrarse</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

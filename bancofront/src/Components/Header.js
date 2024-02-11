import React from "react";
import "./Header.css"; // Importa el archivo CSS para el estilo del header
import imagen from "../assets/imgevolucion.png";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">BANCO GENERACIÓN</h1>
        <img src={imagen} alt="Evolucion" className="logo-evolucion" />
      </div>
    </header>
  );
};

export default Header;

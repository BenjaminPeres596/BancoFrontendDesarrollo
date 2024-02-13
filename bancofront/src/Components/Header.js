import React from "react";
import "./Header.css"; // Importa el archivo CSS para el estilo del header
import imagen from "../assets/imgevolucion.png";
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
  return (
    <header className="container-fluid colorcito">
      <div className="row justify-content-between">
        <h1 className="col-lg-10 texto">BANCO GENERACIÓN</h1>
        <img src={imagen} alt="Evolucion" className="col-lg-2 img" />
      </div>
    </header>
  );
};

export default Header;

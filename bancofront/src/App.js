import React, { useState, useEffect } from "react";
import "./App.css";
import { Boton } from "./components/boton";
import * as APITransferencia from "./services/transferencia";
import LoginForm from "./components/LoginForm/LoginForm";
import { ListarArrays } from "./components/listarArrays";

function App() {
  const [transferencias, setTransferencias] = useState([]);
  const [mostrarTransferencias, setMostrarTransferencias] = useState(false);

  const handleClick = () => {
    if (!mostrarTransferencias) {
      APITransferencia.getTransferencias(1)
        .then((data) => {
          setTransferencias(data.datos);
          setMostrarTransferencias(true);
        })
        .catch((error) => {
          console.error("Error al obtener las transferencias:", error);
        });
    } else {
      setMostrarTransferencias(false);
    }
  };

  return (
    <div>
      <Boton
        className="boton-grande"
        accion={handleClick}
        nombreAccion="Ver actividad"
      />
      {mostrarTransferencias && (
        <ListarArrays
          nombre="Transferencias"
          array={transferencias}
          atributos={["monto", "fecha"]}
        />
      )}
      <LoginForm />
    </div>
  );
}

export default App;

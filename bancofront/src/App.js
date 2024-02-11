import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registro from "./pages/Registro";
import Prueba from "./pages/prueba";
import LoginForm from "./pages/LoginForm/LoginForm";
import Header from "./Components/Header";
import { Desplegable } from "./Components/desplegable";
import { Boton } from "./Components/boton";
import { ListarArrays } from "./Components/listarArrays";
import * as APITransferencia from "./services/transferencia";
import * as APICuenta from "./services/cuenta";

function App() {
  const [transferencias, setTransferencias] = useState([]);
  const [mostrarTransferencias, setMostrarTransferencias] = useState(false);
  const [cuentas, setCuentas] = useState([]);
  const [cliente, setCliente] = useState({
    id: "",
    nombre: "",
    apellido: "",
    usuario: "",
    clave: "",
    dni: "",
    mail: "",
  });

  useEffect(() => {
    APICuenta.getCuentas(44320093)
      .then((data) => {
        setCuentas(data.datos);
      })
      .catch((error) => {
        console.error("Error al obtener las cuentas:", error);
      });
  }, []);

  const handleClickTransferencia = () => {
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
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={<LoginForm cliente={cliente} setCliente={setCliente} />}
            />
            <Route
              path="/LoginForm"
              element={<LoginForm cliente={cliente} setCliente={setCliente} />}
            />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/prueba" element={<Prueba cliente={cliente} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

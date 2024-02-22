import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registro from "./pages/Registro";
import Principal from "./pages/Principal";
import LoginForm from "./pages/LoginForm/LoginForm";
import Header from "./Components/Header";
import Movimientos from "./pages/Movimientos";
import Transferencia from "./pages/Transferencia";

function App() {
  const [cliente, setCliente] = useState({
    id: 0,
    nombre: "",
    apellido: "",
    usuario: "",
    clave: "",
    sal: "",
    dni: "",
    mail: "",
    bancoId: 1,
    banco: {
      id: 0,
      razonSocial: "string",
      telefono: 0,
      calle: "string",
      numero: 0,
    },
  });

  return (
    <div className="h-100">
      <div className="bg-light h-100">
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
            <Route
              path="/Registro"
              element={<Registro cliente={cliente} setCliente={setCliente} />}
            />
            <Route
              path="/Principal"
              element={<Principal cliente={cliente} />}
            />
            <Route
              path="/Movimientos"
              element={
                <Movimientos cliente={cliente} setCliente={setCliente} />
              }
            />
            <Route
              path="/Transferencia"
              element={<Transferencia cliente={cliente} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

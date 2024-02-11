import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registro from "./pages/Registro";
import Prueba from "./pages/prueba";
import LoginForm from "./pages/LoginForm/LoginForm";
import Header from "./Components/Header";

function App() {
  const [cliente, setCliente] = useState({
    id: "",
    nombre: "",
    apellido: "",
    usuario: "",
    clave: "",
    dni: "",
    mail: "",
  });

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

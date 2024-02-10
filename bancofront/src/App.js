import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registro from "./pages/Registro";
import Prueba from "./pages/prueba";
import LoginForm from "./pages/LoginForm/LoginForm";
import Header from './Components/Header'

function App() {
  return (
    <div>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route index element={<LoginForm />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/prueba" element={<Prueba />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

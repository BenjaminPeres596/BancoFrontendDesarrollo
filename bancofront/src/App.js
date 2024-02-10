import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pagina2 from "./pages/pagina2";
import Prueba from "./pages/prueba";
import LoginForm from "./pages/LoginForm/LoginForm";

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<LoginForm />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/Pagina2" element={<Pagina2 />} />
            <Route path="/prueba" element={<Prueba />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

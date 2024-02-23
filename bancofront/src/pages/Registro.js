import React, { useState } from "react";
import "./LoginForm/LoginForm.css";
import { CiUser } from "react-icons/ci";
import {
  FaLock,
  FaRegNewspaper,
  FaEnvelopeOpen,
  FaUserCircle,
} from "react-icons/fa";
import * as APICliente from "../services/cliente";
import { useNavigate } from "react-router-dom";
import * as APICuenta from "../services/cuenta";

export const Registro = ({ cliente, setCliente }) => {
  const [cuenta, setCuenta] = useState({
    id: 0,
    cbu: "string",
    fechaAlta: "string",
    saldo: 0,
    clienteId: 0,
    cliente: {
      id: 0,
      nombre: "string",
      apellido: "string",
      usuario: "string",
      clave: "string",
      sal: "string",
      dni: 0,
      mail: "string",
      bancoId: 0,
      banco: {
        id: 0,
        razonSocial: "string",
        telefono: 0,
        calle: "string",
        numero: 0,
      },
    },
    tipoCuentaId: 1,
    tipoCuenta: {
      id: 0,
      nombre: "string",
    },
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleVolverClick = () => {
    window.history.back();
  };

  const handleRegistro = async (event) => {
    event.preventDefault();
    try {
      console.log(cliente);
      const responseCliente = await APICliente.PostCliente(cliente);
      console.log("Rcliente:", responseCliente);
      console.log("Cliente:", cliente);
      const responseCuenta = await APICuenta.PostCuenta(cuenta, cliente.dni);
      console.log("Rcuenta:", responseCuenta);
      if (responseCliente.exito && responseCuenta.exito) {
        if (responseCliente.datos && responseCliente.datos.id) {
          const { id, nombre, apellido, usuario, clave, dni, mail } =
            responseCliente.datos;
          setCliente((prevCliente) => ({
            ...prevCliente,
            id,
            nombre,
            apellido,
            usuario,
            clave,
            dni,
            mail,
          }));
        }
        navigate("/Principal");
        console.log("Registro exitoso");
      } else {
        console.log("Registro fallido cliente:", responseCliente.mensaje);
        console.log("Registro fallido cuenta:", responseCuenta.mensaje);
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };

  return (
    <div className="container ">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-8 pt-5 mt-5">
          <div className="bg-white p-5 mt-5 rounded">
            <form className="row g-3">
              <div className="col-12">
                <h1 className="registroTitulo">Registro</h1>
              </div>
              <div className="col-md-6">
                <div className="input-box">
                  <input
                    type="text"
                    className="form-control"
                    id="inputNombre"
                    placeholder="Nombre"
                    required
                    name="nombre"
                    value={cliente.nombre}
                    onChange={handleChange}
                  />
                  <FaRegNewspaper className="icon"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-box">
                  <input
                    type="text"
                    className="form-control"
                    id="inputApellido"
                    placeholder="Apellido"
                    required
                    name="apellido"
                    value={cliente.apellido}
                    onChange={handleChange}
                  />
                  <CiUser className="icon"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-box">
                  <input
                    type="text"
                    className="form-control"
                    id="inputDocumento"
                    placeholder="Documento"
                    pattern="[0-9]*"
                    required
                    name="dni"
                    value={cliente.dni}
                    onChange={handleChange}
                  />
                  <FaRegNewspaper className="icon"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-box">
                  <input
                    type="text"
                    className="form-control"
                    id="inputUsuario"
                    placeholder="Usuario"
                    required
                    name="usuario"
                    value={cliente.usuario}
                    onChange={handleChange}
                  />
                  <FaUserCircle className="icon" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-box">
                  <input
                    type="password"
                    className="form-control"
                    id="inputClave"
                    placeholder="Clave"
                    required
                    name="clave"
                    value={cliente.clave}
                    onChange={handleChange}
                  />
                  <FaLock className="icon"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-box">
                  <input
                    type="email"
                    className="form-control"
                    id="inputMail"
                    placeholder="Mail"
                    required
                    name="mail"
                    value={cliente.mail}
                    onChange={handleChange}
                  />
                  <FaEnvelopeOpen className="icon"/>
                </div>
              </div>
              <div className="col-12">
                <div className="button-row justify-content-evenly mt-3">
                  <button type="button" className="btn btn-secondary text-truncate" onClick={handleVolverClick}>
                    Volver
                  </button>
                  <button type="submit" className="btn btn-primary text-truncate" onClick={handleRegistro}>
                    Registrarse
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
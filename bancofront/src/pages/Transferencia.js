import React, { useState, useEffect } from "react";
import * as APICuenta from "../services/cuenta";
import * as APIMotivo from "../services/motivo";
import { Boton } from "../Components/boton";
import { useNavigate } from "react-router-dom";
import "./Transferencia.css";
import { Desplegable } from "../Components/desplegable";
import * as APITransferencia from "../services/transferencia";

const Transferencia = ({ cuentaId, cliente }) => {
  const [OrigenId, setOrigenId] = useState(null);
  const [monto, setMonto] = useState("");
  const [motivos, setMotivos] = useState([]);
  const [cuentas, setCuentas] = useState([]);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);
  const [id, setIdDesplegable] = useState(null);
  const [cbuDestino, setcbuDestino] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [userData, setUserData] = useState(null);
  const [motivoId, setMotivoId] = useState(null);
  const [transferencia, setTransferencia] = useState({
    id: 0,
    monto: 0,
    fecha: "2024-02-23T22:27:37.428Z",
    cuentaOrigenId: 0,
    cuentaOrigen: {
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
        cuil: 0,
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
      tipoCuentaId: 0,
      tipoCuenta: {
        id: 0,
        nombre: "string",
      },
    },
    cuentaDestinoId: 0,
    cuentaDestino: {
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
        cuil: 0,
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
      tipoCuentaId: 0,
      tipoCuenta: {
        id: 0,
        nombre: "string",
      },
    },
    tipoMotivoId: 0,
    tipoMotivo: {
      id: 0,
      nombre: "string",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Leer la cookie cuando la ventana se carga
    const cookieData = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("cuentaSeleccionada="));
  
    if (cookieData) {
      const cuentaSeleccionada = JSON.parse(decodeURIComponent(cookieData.split("=")[1]));
      const id = cuentaSeleccionada.id;
      setOrigenId(id); // Establecer el ID de la cuenta en el estado
      setCuentaSeleccionada(cuentaSeleccionada);
    }
  }, []);
  
  useEffect(() => {
    const cookieData = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("userData="));
    if (cookieData) {
      const userData = JSON.parse(decodeURIComponent(cookieData.split("=")[1]));
      setUserData(userData);
      console.log("Datos del usuario:", userData);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      APICuenta.GetCuentas(userData.cuil)
        .then((data) => {
          setCuentas(data.datos);
        })
        .catch((error) => {
          console.error("Error al obtener las cuentas:", error);
        });
    }
  }, [userData]);
  useEffect(() => {
    APIMotivo.GetMotivos()
      .then((data) => {
        setMotivos(data.datos);
      })
      .catch((error) => {
        console.error("Error al obtener los motivos:", error);
      });
  }, []);
  
  useEffect(() => {
    if (motivos.length > 0) {
      const ultimoMotivoId = motivos[motivos.length - 1].id;
      document.getElementById('floatingSelect').value = ultimoMotivoId;
      setMotivoId(ultimoMotivoId);
    }
  }, [motivos]);
  

  const handleTransferir = async (event) => {
    event.preventDefault();
    let response;
    try {
      if (!monto || !cbuDestino || !motivoId) {
        alert("Complete todos los campos");
        return;
      }
     
      if (monto <= 0) {
        alert("El monto no puede ser menor a 0.");
      } else {
          if (cbuDestino.substring(0, 10) === "0000000003"){
          const response = await APITransferencia.postTransferencia(
            transferencia,
            cuentaSeleccionada.cbu,
            cbuDestino,
            monto,
            motivos.find((motivo) => motivo.nombre === motivoId).id
          );
        } else if (cbuDestino.substring(0, 10) === "0000000001"){
          const response = await APITransferencia.postTransferenciaExterna(
            transferencia,
            cuentaSeleccionada.cbu,
            cbuDestino,
            monto,
            motivos.find((motivo) => motivo.nombre === motivoId).id
          );
        }
        if (response.exito) {
          // eslint-disable-next-line no-restricted-globals
          const result = confirm(
            "¿Estás seguro de que deseas continuar con la transferencia?"
          );
          if (result) {
            alert("¡Transferencia Exitosa!");
            console.log("Transferencia exitosa");
            window.location.reload();
          } else {
            console.log("El usuario canceló la transferencia.");
            alert("Transferencia no realizada");
          }
        } else {
          console.log("Transferencia fallida:", response.mensaje);
        }
      }
    } catch (error) {
      console.error("Error al transferir:", error);
    }
  };

  return (
    <div className="container-fluid wrapper wrapper-custom">
      <div className="row">
        <h3>Realizar Transferencia</h3>
        <div className="mb-3">
        <div>
            <u>Cuenta origen N°:</u><strong> {OrigenId}</strong>
        </div>
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Ingrese el monto a transferir
          </label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="$0"
            value={monto}
            onChange={(e) => {
              const value = e.target.value;
              if (value <= 0) {
                setMonto(0);
              } else {
                setMonto(value);
              }
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Ingrese el CBU de destino
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="00000000000000000000"
            value={cbuDestino}
            onChange={(e) => setcbuDestino(e.target.value)}
          />
          {mensajeError && <p style={{ color: "red" }}>{mensajeError}</p>}
        </div>
        <div className="col-md-4 mb-3">
          Seleccione un motivo
          <Desplegable
            array={motivos}
            atributoAMostrar={"nombre"}
            textoQueAcompaña={""}
            onSelect={(motivoId) => {
              console.log("Motivo seleccionado:", motivoId);
              setMotivoId(motivoId);
              console.log("Cuenta origen:", cuentaSeleccionada?.cbu);
              console.log("CBU destino:", cbuDestino);
              console.log("Monto:", monto);
            }}
          />
        </div>
      </div>
      <Boton accion={handleTransferir} nombreAccion="Transferir" clases={['col-6']}/>
      <Boton accion={() => navigate("/principal")} nombreAccion={"Volver"} clases={['col-3']}/>
    </div>
  );
};

export default Transferencia;

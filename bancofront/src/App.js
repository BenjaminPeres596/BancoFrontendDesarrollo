import logo from "./logo.svg";
import "./App.css";
import { Boton } from "./components/boton";
import * as APITransferencia from "./services/transferencia";
import LoginForm from "./Components/LoginForm/LoginForm";

function App() {
  return (
    <div>
      <LoginForm />
      <div>
        <Boton
          className="boton-grande"
          accion={APITransferencia.getTransferencias(1)}
          nombreAccion="Ver actividad"
        />
      </div>
    </div>
  );
}

export default App;

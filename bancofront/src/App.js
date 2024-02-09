import "./App.css";
import { Boton } from "./components/boton";
import * as APITransferencia from "./services/transferencia";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  const handleClick = () => {
    APITransferencia.getTransferencias(1);
  };

  return (
    <div>
      <Boton
        className="boton-grande"
        accion={handleClick}
        nombreAccion="Ver actividad"
      />
      <LoginForm />
    </div>
  );
}

export default App;

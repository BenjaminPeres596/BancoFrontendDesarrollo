import "./boton.css";

export const Boton = ({ accion, nombreAccion }) => {
  return (
    <button className="Boton" onClick={accion}>
      {nombreAccion}
    </button>
  );
};

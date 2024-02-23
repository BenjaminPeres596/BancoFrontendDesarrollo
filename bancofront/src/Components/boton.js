import "./boton.css";

export const Boton = ({ accion, nombreAccion, clases }) => {
  const clasesBoton = Array.isArray(clases) ? clases.join(' ') : '';

  return (
    <button className={`Boton ${clasesBoton}`} onClick={accion}>
      {nombreAccion}
    </button>
  );
};
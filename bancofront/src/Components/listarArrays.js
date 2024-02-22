import React from "react";
import "./listarArrays.css";
import "bootstrap/dist/css/bootstrap.min.css";
export const ListarArrays = ({ nombre, array, atributos }) => {
  return (
    <div className="Grilla">
      <h1>{nombre}</h1>
      <div className="TransferenciaItem">
        <ul>
          {array.map((elemento) => (
            <li key={elemento.id}>
              {atributos.map((atributo, i) => (
                <p key={i}>
                  {atributo.charAt(0).toUpperCase() + atributo.slice(1)}:{" "}
                  {elemento[atributo]}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

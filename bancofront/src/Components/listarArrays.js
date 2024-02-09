import React from "react";

export const ListarArrays = ({ nombre, array, atributos }) => {
  return (
    <div>
      <h1>{nombre}</h1>
      <ul>
        {array.map((elemento) => (
          <li key={elemento.id}>
            {atributos.map((atributo, i) => (
              <p key={i}>
                {atributo}: {elemento[atributo]}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

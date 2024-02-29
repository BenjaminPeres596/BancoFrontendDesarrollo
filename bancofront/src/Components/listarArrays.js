import React from "react";
import "./listarArrays.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const ListarArrays = ({ nombre, array, atributos }) => {
  return (
    <div className="container-fluid">
      <div className="grilla row">
        <h1 className="col-md-3 text-wrap">{nombre}</h1>
        <div className="transferenciaItem col-md-8">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  {atributos.map((atributo, index) => (
                    <th key={index}>
                      {atributo.split(".").pop().charAt(0).toUpperCase() +
                        atributo.split(".").pop().slice(1)}
                      :{" "}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {array
                  .slice()
                  .reverse()
                  .map((elemento, index) => (
                    <tr key={index}>
                      {atributos.map((atributo, index) => (
                        <td key={index}>
                          {atributo.includes(".")
                            ? parseNestedProperty(elemento, atributo)
                            : elemento[atributo]}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Función para acceder a propiedades anidadas
const parseNestedProperty = (obj, prop) => {
  const props = prop.split(".");
  return props.reduce((accumulator, currentValue) => {
    return accumulator && accumulator[currentValue];
  }, obj);
};

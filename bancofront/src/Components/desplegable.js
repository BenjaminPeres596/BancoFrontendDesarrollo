export const Desplegable = ({
  array,
  atributoAMostrar,
  textoQueAcompaña,
  onSelect,
}) => {
  const handleNroCuentaChange = (event) => {
    const nroCuenta = event.target.value;
    onSelect(nroCuenta);
  };

  return (
    <div>
      <select
        className="form-select"
        id="floatingSelect"
        aria-label="Floating label select example"
        name="elementoArrayId"
        onChange={handleNroCuentaChange}
      >
        {array
          .sort((a, b) => a.id - b.id)
          .map((elementoArray) => (
            <option key={elementoArray.id} value={elementoArray.nroCuenta}>
              {textoQueAcompaña}
              {elementoArray[atributoAMostrar]}
            </option>
          ))}
      </select>
    </div>
  );
};

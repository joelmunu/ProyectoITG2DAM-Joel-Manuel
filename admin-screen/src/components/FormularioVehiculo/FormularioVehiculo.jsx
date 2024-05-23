// FormularioVehiculo.js
import React, { useState } from "react";

const FormularioVehiculo = ({ onAddVehicle }) => {
  const [datos, setDatos] = useState({
    matriculaCar: "",
    fabricante: "",
    modelo: "",
    motorizacion: "",
    antiguedad: "",
    descripcion: "",
    tipoVehiculo: "",
    precioDia: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVehicle = { ...datos, enMantenimiento: false };
      await onAddVehicle(newVehicle);
      console.log("Vehículo añadido correctamente");
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="matriculaCar">Matrícula del coche:</label>
        <input
          type="text"
          id="matriculaCar"
          name="matriculaCar"
          value={datos.matriculaCar}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="fabricante">Fabricante:</label>
        <input
          type="text"
          id="fabricante"
          name="fabricante"
          value={datos.fabricante}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="modelo">Modelo:</label>
        <input
          type="text"
          id="modelo"
          name="modelo"
          value={datos.modelo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="motorizacion">Motorización:</label>
        <input
          type="text"
          id="motorizacion"
          name="motorizacion"
          value={datos.motorizacion}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="antiguedad">Antigüedad:</label>
        <input
          type="text"
          id="antiguedad"
          name="antiguedad"
          value={datos.antiguedad}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={datos.descripcion}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="tipoVehiculo">Tipo de vehículo:</label>
        <input
          type="text"
          id="tipoVehiculo"
          name="tipoVehiculo"
          value={datos.tipoVehiculo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="precioDia">Precio por día:</label>
        <input
          type="text"
          id="precioDia"
          name="precioDia"
          value={datos.precioDia}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default FormularioVehiculo;

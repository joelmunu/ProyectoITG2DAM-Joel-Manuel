import React, { useState } from "react";
import "../../styles/FormularioVehiculo.css";

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
      alert(`Se ha añadido el vehículo ${datos.matriculaCar}`)
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="title">Añadir Vehículo</h2>
        <div className="input-container">
          <label className="label" htmlFor="matriculaCar">
            Matrícula del coche:
          </label>
          <input
            className="input"
            type="text"
            id="matriculaCar"
            name="matriculaCar"
            value={datos.matriculaCar}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="fabricante">
            Fabricante:
          </label>
          <input
            className="input"
            type="text"
            id="fabricante"
            name="fabricante"
            value={datos.fabricante}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="modelo">
            Modelo:
          </label>
          <input
            className="input"
            type="text"
            id="modelo"
            name="modelo"
            value={datos.modelo}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="motorizacion">
            Motorización:
          </label>
          <input
            className="input"
            type="text"
            id="motorizacion"
            name="motorizacion"
            value={datos.motorizacion}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="antiguedad">
            Antigüedad:
          </label>
          <input
            className="input"
            type="text"
            id="antiguedad"
            name="antiguedad"
            value={datos.antiguedad}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="descripcion">
            Descripción:
          </label>
          <input
            className="input"
            type="text"
            id="descripcion"
            name="descripcion"
            value={datos.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="tipoVehiculo">
            Tipo de vehículo:
          </label>
          <input
            className="input"
            type="text"
            id="tipoVehiculo"
            name="tipoVehiculo"
            value={datos.tipoVehiculo}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="precioDia">
            Precio por día:
          </label>
          <input
            className="input"
            type="text"
            id="precioDia"
            name="precioDia"
            value={datos.precioDia}
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
          <button className="button" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioVehiculo;

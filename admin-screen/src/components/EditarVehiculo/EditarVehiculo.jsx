import React, { useState, useEffect } from "react";
import "../../styles/EditarVehiculo.css";

const EditarVehiculo = ({ selectedVehicle, editVehicleHandler }) => {
  const [vehicle, setVehicle] = useState({
    fabricante: "",
    modelo: "",
    motorizacion: "",
    antiguedad: "",
    descripcion: "",
    tipoVehiculo: "",
    precioDia: "",
  });

  useEffect(() => {
    if (selectedVehicle) {
      setVehicle({
        fabricante: selectedVehicle.Fabricante || "",
        modelo: selectedVehicle.Modelo || "",
        motorizacion: selectedVehicle.Motorizacion || "",
        antiguedad:
          selectedVehicle.Antigüedad !== undefined
            ? selectedVehicle.Antigüedad.toString()
            : "",
        descripcion: selectedVehicle.Descripcion || "",
        tipoVehiculo: selectedVehicle.TipoVehiculo || "",
        precioDia:
          selectedVehicle.PrecioDia !== undefined
            ? selectedVehicle.PrecioDia.toString()
            : "",
      });
    }
  }, [selectedVehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prevVehicle) => ({ ...prevVehicle, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos están completos
    const {
      fabricante,
      modelo,
      motorizacion,
      antiguedad,
      descripcion,
      tipoVehiculo,
      precioDia,
    } = vehicle;
    if (
      !fabricante ||
      !modelo ||
      !motorizacion ||
      !antiguedad ||
      !descripcion ||
      !tipoVehiculo ||
      !precioDia
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    editVehicleHandler(selectedVehicle.MatriculaCar, vehicle);
  };

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="title">Editar Vehiculo</h2>
        <div className="input-container">
          <label className="label" htmlFor="fabricante">
            Fabricante:
          </label>
          <input
            className="input"
            type="text"
            id="fabricante"
            name="fabricante"
            value={vehicle.fabricante}
            onChange={handleChange}
            required
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
            value={vehicle.modelo}
            onChange={handleChange}
            required
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
            value={vehicle.motorizacion}
            onChange={handleChange}
            required
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
            value={vehicle.antiguedad}
            onChange={handleChange}
            required
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
            value={vehicle.descripcion}
            onChange={handleChange}
            required
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
            value={vehicle.tipoVehiculo}
            onChange={handleChange}
            required
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
            value={vehicle.precioDia}
            onChange={handleChange}
            required
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

export default EditarVehiculo;

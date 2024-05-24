import React from "react";
import "../../styles/Vehicle.css";
import { Link } from "react-router-dom";

const Vehicle = ({ selectedVehicle }) => {
  return (
    <div className="vehicle-container">
      <div className="column">
        <h2>Detalles del Vehículo</h2>
        <h3>
          {selectedVehicle.Fabricante} {selectedVehicle.Modelo}{" "}
        </h3>
        <p>
          <strong>Matrícula</strong>: {selectedVehicle.MatriculaCar}
        </p>
        <p>
          <strong>Fabricante</strong>: {selectedVehicle.Fabricante}
        </p>
        <p>
          <strong>Modelo</strong>: {selectedVehicle.Modelo}
        </p>
        <p>
          <strong>Motorización</strong>: {selectedVehicle.Motorizacion}
        </p>
        <p>
          <strong>Antigüedad</strong>: {selectedVehicle.Antiguedad}
        </p>
        <p>
          <strong>En Mantenimiento</strong>: {selectedVehicle.EnMantenimiento}
        </p>
        <p>
          <strong>Descripción</strong>: {selectedVehicle.Descripcion}
        </p>
        <p>
          <strong>Tipo de vehiculo</strong>: {selectedVehicle.TipoVehiculo}
        </p>
        <p>
          <strong>Precio/dia</strong>: {selectedVehicle.PrecioDia} €
        </p>
        <Link className="button" to="/Vehiculos">
          Volver
        </Link>
      </div>
    </div>
  );
};

export default Vehicle;

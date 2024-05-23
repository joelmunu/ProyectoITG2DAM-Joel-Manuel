import React from "react";
import "../../styles/Vehicle.css";
import ibizaImage from "../../assets/ibiza.png";
import { Link } from "react-router-dom";

const Vehicle = ({ selectedVehicle }) => {

  const imageMap = {
    focus: '../../assets/focus.png',
    corolla: '../../assets/corolla.png',
    Arona: '../../assets/aronafr.png',
    Ibiza: ibizaImage,
    formentor: '../../assets/formentor.png',
    gladiator: '../../assets/gladiator.png',
  };

  const obtenerImagen = (Modelo) => {
    console.log(Modelo)
    return imageMap[Modelo] || '../../assets/default.png';
  };

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
          <strong>En Mantenimiento</strong>: Sí
        </p>
        <p>
          <strong>Descripción</strong>: {selectedVehicle.Descripcion}
        </p>
        <p>
          <strong>Tipo de vehiculo</strong>: {selectedVehicle.TipoVehiculo}
        </p>
        <p>
          <strong>Precio/dia</strong>: 75€
        </p>
        <image src={"../../assets/default.png"}></image>
        <Link className="button" to="/Vehiculos">
          Volver
        </Link>
      </div>
    </div>
  );
};

export default Vehicle;

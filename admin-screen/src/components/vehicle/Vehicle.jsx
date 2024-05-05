import React from "react";
import "../../styles/Vehicle.css";

const Vehicle = () => {
  return (
    <div className="vehicle-container">
      <div className="column">
        <h2>Detalles del Vehículo</h2>
        <p>Marca: Toyota</p>
        <p>Modelo: Corolla</p>
        <p>Matrícula: ABC123</p>
        {/* Agrega más detalles del vehículo según sea necesario */}
      </div>
      <div className="column">
        <p>pito</p>
        {/* Aquí puedes agregar componentes adicionales o información relacionada con el vehículo */}
      </div>
    </div>
  );
};

export default Vehicle;

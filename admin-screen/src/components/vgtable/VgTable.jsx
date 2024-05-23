import React from "react";
import VGRow from "../vgrow/VGRow";
import "../../styles/VgTable.css";

const VgTable = ({ vehicles }) => {
  return (
    <div className="container">
      <h2 className="table-title">Vista general</h2>
      <div
        className={`table-container ${
          vehicles.length > 10 ? "scrollable" : ""
        }`}
      >
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">Matricula</th>
              <th scope="col">Modelo</th>
              <th scope="col">Alquilado</th>
              <th scope="col">En Mantenimiento</th>
              <th scope="col">DNI Inquilino</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <VGRow key={vehicle.MatriculaCar} vehicle={vehicle} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VgTable;

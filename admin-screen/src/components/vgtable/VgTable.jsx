import React from "react";
import VGRow from "../vgrow/VGRow";
import "../../styles/VgTable.css";

const VgTable = ({ vehicles }) => {
  return (
    <div className="container">
      <h1 className="table-title">Vista general</h1>
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
            {vehicles &&
              vehicles.map((vehicle) => (
                <VGRow vehicle={vehicle} key={vehicle.matricula} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VgTable;
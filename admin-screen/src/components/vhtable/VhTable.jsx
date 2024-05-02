import React from "react";
import VHRow from "../vhrow/VHRow";
import "../../styles/VhTable.css";

const VhTable = ({ vehicles }) => {
  return (
    <div className="container-vh">
      <button className="add-vehicle-button"> + Añadir Vehiculo</button>
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
              <th scope="col">Motor</th>
              <th scope="col">Alquilado</th>
              <th scope="col">Precio</th>
              <th scope="col">En Mantenimiento</th>
            </tr>
          </thead>
          <tbody>
            {vehicles &&
              vehicles.map((vehicle) => (
                <VHRow vehicle={vehicle} key={vehicle.matricula} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VhTable;

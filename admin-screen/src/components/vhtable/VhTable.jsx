import React from "react";
import { Link } from "react-router-dom";
import VHRow from "../vhrow/VHRow";
import "../../styles/VhTable.css";

const VhTable = ({
  vehicles,
  deleteVehicleHandler,
  editVehicleHandler,
  setSelectedVehicle,
  setVehicles
}) => {
  return (
    <div className="container-vh">
      <Link className="add-vehicle-button" to="/addVehicle">
        {" "}
        + Añadir Vehiculo
      </Link>
      <div
        className={`table-container ${
          vehicles.length > 13 ? "scrollable" : ""
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
              <th scope="col">Accion</th>
              <th scope="col">Ver</th>
            </tr>
          </thead>
          <tbody>
            {vehicles &&
              vehicles.map((vehicle) => (
                <VHRow
                  vehicle={vehicle}
                  key={vehicle.MatriculaCar}
                  deleteVehicleHandler={deleteVehicleHandler}
                  editVehicleHandler={editVehicleHandler}
                  setSelectedVehicle={setSelectedVehicle}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VhTable;
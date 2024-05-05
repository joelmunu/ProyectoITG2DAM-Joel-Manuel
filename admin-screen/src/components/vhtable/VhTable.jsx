import React from "react";
import VHRow from "../vhrow/VHRow";
import "../../styles/VhTable.css";

const VhTable = ({
  vehicles,
  deleteVehicleHandler,
  editVehicleHandler,
  setSelectedVehicle,
}) => {
  return (
    <div className="container-vh">
      <button className="add-vehicle-button"> + Añadir Vehiculo</button>
      <div
        className={`table-container ${
          vehicles.length > 15 ? "scrollable" : ""
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
                  key={vehicle.matricula}
                  deleteVehicleHandler={deleteVehicleHandler}
                  editVehicleHandler={editVehicleHandler}
                  setSelectedVehicle={setSelectedVehicle}
                />
                // CREAR NUEVA PAGINA PARA LA EDICION DE LOS VEHICULOS :) UWU
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VhTable;

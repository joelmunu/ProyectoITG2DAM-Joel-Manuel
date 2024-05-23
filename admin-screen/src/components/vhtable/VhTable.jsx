import React from "react";
import VHRow from "../vhrow/VHRow";
import "../../styles/VhTable.css";

const VhTable = ({
  vehicles,
  deleteVehicleHandler,
  editVehicleHandler,
  setSelectedVehicle,
  setVehicles,
  setVehicleData, // Agrega setVehicleData como prop
}) => {
  const handleDeleteVehicle = async (matriculaParam) => {
    await deleteVehicleHandler(matriculaParam); // Llama al método para eliminar el vehículo
    // Filtra los vehículos para eliminar el que corresponde a matriculaParam
    const updatedVehicles = vehicles.filter(
      (vehicle) => vehicle.MatriculaCar !== matriculaParam
    );
    setVehicles(updatedVehicles); // Actualiza el estado local de los vehículos
  };

  return (
    <div className="container-vh">
      <button className="add-vehicle-button"> + Añadir Vehiculo</button>
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
                  key={vehicle.matricula}
                  deleteVehicleHandler={handleDeleteVehicle}
                  editVehicleHandler={editVehicleHandler}
                  setVehicleData={setVehicleData}
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

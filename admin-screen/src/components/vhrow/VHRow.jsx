import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/VhTable.css";
import { Link } from "react-router-dom";

const VHRow = ({ vehicle, deleteVehicleHandler, setSelectedVehicle }) => {
  const deleteVehicle = (matriculaParam) => {
    const deleteConfirmation = window.confirm(
      `¿Está seguro de eliminar el registro con matrícula ${matriculaParam}?`
    );
    if (deleteConfirmation) {
      deleteVehicleHandler(matriculaParam);
    }
  };

  const selectVehicle = () => {
    setSelectedVehicle({
      MatriculaCar: vehicle.MatriculaCar,
      Fabricante: vehicle.Fabricante,
      Modelo: vehicle.Modelo,
      Antiguedad: vehicle.Antigüedad,
      Motorizacion: vehicle.Motorizacion,
      Alquilado: vehicle.Alquilado,
      PrecioDia: vehicle.PrecioDia,
      EnMantenimiento: vehicle.EnMantenimiento,
      Descripcion: vehicle.Descripcion,
      TipoVehiculo: vehicle.TipoVehiculo,
    });
  };

  return (
    <tr>
      <th scope="row">{vehicle.MatriculaCar}</th>
      <td>{vehicle.Modelo}</td>
      <td>{vehicle.Motorizacion}</td>
      <td>{vehicle.Alquilado}</td>
      <td>{vehicle.PrecioDia}</td>
      <td>{vehicle.EnMantenimiento}</td>
      <td>
        <FontAwesomeIcon icon={faPenToSquare} className="btn-edit" />
        <FontAwesomeIcon
          icon={faTrash}
          className="btn-delete"
          onClick={() => deleteVehicle(vehicle.MatriculaCar)}
        />
      </td>
      <td>
        <Link onClick={selectVehicle} to="/Vehicle">
          <FontAwesomeIcon icon={faEye} className="btn-view" />
        </Link>
      </td>
    </tr>
  );
};

export default VHRow;
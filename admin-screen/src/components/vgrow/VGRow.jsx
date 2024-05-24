import React from "react";

const VGRow = ({ vehicle }) => {
  return (
    <tr>
      <th scope="row">{vehicle.MatriculaCar}</th>
      <td>{vehicle.Modelo}</td>
      <td>{vehicle.Alquilado ? "Sí" : "No"}</td>
      <td>{vehicle.EnMantenimiento ? "Sí" : "No"}</td>
      <td>{vehicle.dniinquilino}</td>
    </tr>
  );
};

export default VGRow;

import React from "react";

const VGRow = ({ vehicle }) => {
  return (
    <tr>
      <th scope="row">{vehicle.MatriculaCar}</th>
      <td>{vehicle.Modelo}</td>
      <td>{vehicle.Motorizacion}</td>
      <td>{vehicle.Alquilado ? "Sí" : "No"}</td>
      <td>{vehicle.PrecioDia}</td>
      <td>{vehicle.EnMantenimiento ? "Sí" : "No"}</td>
    </tr>
  );
};

export default VGRow;

import React from "react";

const VGRow = ({ vehicle }) => {
  return (
    <tr>
      <th scope="row">{vehicle.Matricula}</th>
      <td>{vehicle.Modelo}</td>
      <td>{vehicle.Alquilado}</td>
      <td>{vehicle.EnMantenimiento}</td>
      <td>{vehicle.DniInquilino}</td>
    </tr>
  );
};

export default VGRow;

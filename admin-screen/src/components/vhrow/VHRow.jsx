import React from "react";

const VHRow = ({ vehicle }) => {
  return (
    <tr>
      <th scope="row">{vehicle.MatriculaCar}</th>
      <td>{vehicle.Modelo}</td>
      <td>{vehicle.Motorizacion}</td>
      <td>{vehicle.Alquilado}</td>
      <td>{vehicle.PrecioDia}</td>
      <td>{vehicle.EnMantenimiento}</td>
    </tr>
  );
};

export default VHRow;

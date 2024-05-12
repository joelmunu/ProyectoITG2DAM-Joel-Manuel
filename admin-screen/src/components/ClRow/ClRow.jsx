import React from "react";

const ClRow = ({ client }) => {
  return (
    <tr>
      <th scope="row">{client.DNI}</th>
      <td>{client.Nombre}</td>
      <td>{client.Apellidos}</td>
      <td>{client.email}</td>
      <td>{client.Saldo}</td>
      <td>{client.InicioAlquiler}</td>
      <td>{client.FinAlquiler}</td>
      <td>{client.MatriculaAlq}</td>
    </tr>
  );
};

export default ClRow;

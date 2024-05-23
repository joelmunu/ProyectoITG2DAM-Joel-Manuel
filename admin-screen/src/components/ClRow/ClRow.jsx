import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ClRow = ({ client }) => {
  return (
    <tr>
      <th scope="row">{client.dni}</th>
      <td>{client.nombre}</td>
      <td>{client.apellidos}</td>
      <td>{client.email}</td>
      <td>{client.saldo}</td>
      <td>{client.inicioAlquiler}</td>
      <td>{client.finAlquiler}</td>
      <td>{client.matriculaAlq}</td>
      <td>
        <FontAwesomeIcon icon={faTrash} className="btn-delete" />
      </td>
    </tr>
  );
};

export default ClRow;

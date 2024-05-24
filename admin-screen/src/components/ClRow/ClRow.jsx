import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ClRow = ({ client, deleteClientHandler }) => {
  const deleteClient = (dni) => {
    const deleteConfirmation = window.confirm(
      `¿Está seguro de eliminar el registro con id ${dni}`
    );
    // If the user clicks on Confirm the actor will be eliminated by using the method deleteActorHandler
    if (deleteConfirmation) {
      deleteClientHandler(dni);
    }
  };
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
        <FontAwesomeIcon
          icon={faTrash}
          className="btn-delete"
          onClick={() => deleteClient(client.dni)}
        />
      </td>
    </tr>
  );
};

export default ClRow;

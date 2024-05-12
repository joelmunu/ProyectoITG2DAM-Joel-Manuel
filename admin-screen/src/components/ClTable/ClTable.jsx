import React from "react";
import ClRow from "../ClRow/ClRow";
import "../../styles/ClTable.css";

const ClTable = ({ clients }) => {
  return (
    <div className="container-cl">
      <h1 className="table-title-cl">Vista general</h1>
      <div
        className={`table-container ${clients.length > 10 ? "scrollable" : ""}`}
      >
        <table className="table-cl">
          <thead>
            <tr>
              <th scope="col">DNI</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Email</th>
              <th scope="col">Saldo</th>
              <th scope="col">Inicio Alquiler</th>
              <th scope="col">Fin Alquiler</th>
              <th scope="col">Matricula</th>
            </tr>
          </thead>
          <tbody>
            {clients &&
              clients.map((client) => (
                <ClRow client={client} key={client.DNI} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClTable;

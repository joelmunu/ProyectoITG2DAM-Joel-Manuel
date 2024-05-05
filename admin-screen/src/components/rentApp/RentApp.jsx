import RentService from "../../services/rent.service";
import "../../styles/RentApp.css";
import { useState, useEffect } from "react";
import VgTable from "../vgtable/VgTable";
import VhTable from "../vhtable/VhTable";
import ClTable from "../ClTable/ClTable";
import { Routes, Route } from "react-router-dom";
import Vehicle from "../vehicle/Vehicle";

const RentApp = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({});

  useEffect(() => {
    async function getVistaGeneral() {
      try {
        const data = await RentService.getVistaGeneral();
        setVehicles(data);
      } catch (error) {
        console.log(error);
      }
    }
    getVistaGeneral();
  }, []);

  useEffect(() => {
    async function getVehicles() {
      try {
        const data = await RentService.getVehicles();
        setVehicleData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getVehicles();
  }, []);

  useEffect(() => {
    async function getClients() {
      try {
        const data = await RentService.getClients();
        setClientsData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getClients();
  }, []);

  const deleteVehicleHandler = async (matriculaParam) => {
    const newArray = [
      ...vehicleData.filter(
        (vehicle) => vehicle.matriculaCar !== matriculaParam
      ),
    ];
    setVehicleData(newArray);
    await RentService.deleteVehicle(matriculaParam);
  };

  const editVehicleHandler = async (
    matriculaParam,
    Fabricante,
    Modelo,
    Motorizacion,
    Antiguedad,
    EnMantenimiento,
    Descripcion,
    TipoVehiculo,
    PrecioDia
  ) => {
    const newVehicle = {
      Fabricante,
      Modelo,
      Motorizacion,
      Antiguedad,
      EnMantenimiento,
      Descripcion,
      TipoVehiculo,
      PrecioDia,
    };

    const index = vehicleData.findIndex(
      (vehicle) => vehicle.MatriculaCar === matriculaParam
    );
    const newArray = [
      ...vehicleData.slice(0, index),
      newVehicle,
      ...vehicleData.slice(index + 1),
    ];
    setVehicleData(newArray);
    await RentService.editVehicle(matriculaParam, {
      Fabricante,
      Modelo,
      Motorizacion,
      Antiguedad,
      EnMantenimiento,
      Descripcion,
      TipoVehiculo,
      PrecioDia,
    });
  };

  return (
    <div className="ContainerImagen">
      <Routes>
        <Route
          path="/VistaGeneral"
          element={<VgTable vehicles={vehicles} />}
        ></Route>

        <Route
          path="/Vehiculos"
          element={
            <VhTable
              vehicles={vehicleData}
              deleteVehicleHandler={deleteVehicleHandler}
              editVehicleHandler={editVehicleHandler}
              setSelectedVehicle={setSelectedVehicle}
            />
          }
        ></Route>
        <Route
          path="/Clientes"
          element={<ClTable clients={clientsData} />}
        ></Route>
        <Route
          path="/Vehicle"
          element={<Vehicle selectedVehicle={selectedVehicle} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default RentApp;

import RentService from "../../services/rent.service";
import "../../styles/RentApp.css";
import { useState, useEffect } from "react";
import VgTable from "../vgtable/VgTable";
import VhTable from "../vhtable/VhTable";
import ClTable from "../ClTable/ClTable";
import { Routes, Route } from "react-router-dom";

const RentApp = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [clientsData, setClientsData] = useState([]);

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

  return (
    <div className="ContainerImagen">
      <Routes>
        <Route
          path="/VistaGeneral"
          element={<VgTable vehicles={vehicles} />}
        ></Route>

        <Route
          path="/Vehiculos"
          element={<VhTable vehicles={vehicleData} />}
        ></Route>
        <Route
          path="/Clientes"
          element={<ClTable clients={clientsData} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default RentApp;

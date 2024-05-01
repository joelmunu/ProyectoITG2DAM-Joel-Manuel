import RentService from "../../services/rent.service";
import "../../styles/RentApp.css";
import { useState, useEffect } from "react";
import VgTable from "../vgtable/VgTable";
import VhTable from "../vhtable/VhTable";
import { Routes, Route } from "react-router-dom";

const RentApp = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);

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
      </Routes>
    </div>
  );
};

export default RentApp;

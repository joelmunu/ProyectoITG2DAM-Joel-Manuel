import RentService from "../../services/rent.service";
import "../../styles/RentApp.css";
import { useState, useEffect } from "react";
import VgTable from "../vgtable/VgTable";

const RentApp = () => {
  const [vehicles, setVehicles] = useState([]);

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

  return (
    <div className="ContainerImagen">
      <VgTable vehicles={vehicles}></VgTable>
    </div>
  );
};

export default RentApp;

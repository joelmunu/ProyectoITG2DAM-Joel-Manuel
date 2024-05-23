import RentService from "../../services/rent.service";
import "../../styles/RentApp.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import VgTable from "../vgtable/VgTable";
import VhTable from "../vhtable/VhTable";
import ClTable from "../ClTable/ClTable";
import Vehicle from "../vehicle/Vehicle";
import Login from "../login/Login";
import { adminLogin } from "../../services/auth.service";

const RentApp = ({ isLoggedIn, setIsLoggedIn }) => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const navigate = useNavigate();

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
    const newArray = vehicleData.filter(
      (vehicle) => vehicle.MatriculaCar !== matriculaParam
    );
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
      MatriculaCar: matriculaParam,
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

  const handleLogin = async (username, password) => {
    try {
      await adminLogin(username, password);
      setIsLoggedIn(true);
      navigate("/VistaGeneral");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ContainerImagen">
      {isLoggedIn ? (
        <Routes>
          <Route
            path="/VistaGeneral"
            element={<VgTable vehicles={vehicleData} />}
          />
          <Route
            path="/Vehiculos"
            element={
              <VhTable
                vehicles={vehicleData}
                deleteVehicleHandler={deleteVehicleHandler}
                editVehicleHandler={editVehicleHandler}
                setSelectedVehicle={setSelectedVehicle}
                setVehicles={setVehicleData}
              />
            }
          />
          <Route path="/Clientes" element={<ClTable clients={clientsData} />} />
          <Route
            path="/Vehicle"
            element={<Vehicle selectedVehicle={selectedVehicle} />}
          />
        </Routes>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default RentApp;

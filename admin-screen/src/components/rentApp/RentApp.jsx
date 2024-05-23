// RentApp.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RentService from "../../services/rent.service";
import VgTable from "../vgtable/VgTable";
import VhTable from "../vhtable/VhTable";
import ClTable from "../ClTable/ClTable";
import Vehicle from "../vehicle/Vehicle";
import Login from "../login/Login";
import FormularioVehiculo from "../FormularioVehiculo/FormularioVehiculo";
import { adminLogin } from "../../services/auth.service";
import "../../styles/RentApp.css";

const RentApp = ({ isLoggedIn, setIsLoggedIn }) => {
  const [vehicles, setVehicles] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getVehicles() {
      try {
        const data = await RentService.getVehicles();
        setVehicles(data);
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
    try {
      await RentService.deleteVehicle(matriculaParam);
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.matriculaCar !== matriculaParam)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const editVehicleHandler = async (matriculaParam, updatedVehicle) => {
    try {
      await RentService.editVehicle(matriculaParam, updatedVehicle);
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.matriculaCar === matriculaParam ? updatedVehicle : vehicle
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddVehicle = async (newVehicle) => {
    try {
      await RentService.addVehicle(newVehicle);
      setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
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
          <Route path="/VistaGeneral" element={<VgTable vehicles={vehicles} />} />
          <Route
            path="/Vehiculos"
            element={
              <VhTable
                vehicles={vehicles}
                deleteVehicleHandler={deleteVehicleHandler}
                editVehicleHandler={editVehicleHandler}
                setSelectedVehicle={setSelectedVehicle}
              />
            }
          />
          <Route path="/Clientes" element={<ClTable clients={clientsData} />} />
          <Route path="/Vehicle" element={<Vehicle selectedVehicle={selectedVehicle} />} />
          <Route
            path="/addVehicle"
            element={<FormularioVehiculo onAddVehicle={handleAddVehicle} />}
          />
        </Routes>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default RentApp;

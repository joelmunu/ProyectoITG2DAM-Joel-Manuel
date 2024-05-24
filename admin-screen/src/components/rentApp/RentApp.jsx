import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RentService from "../../services/rent.service";
import VgTable from "../vgtable/VgTable";
import VhTable from "../vhtable/VhTable";
import ClTable from "../ClTable/ClTable";
import Vehicle from "../vehicle/Vehicle";
import Login from "../login/Login";
import FormularioVehiculo from "../FormularioVehiculo/FormularioVehiculo";
import EditarVehiculo from "../EditarVehiculo/EditarVehiculo"; // Importar el componente de ediciÃ³n
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
        prevVehicles.filter(
          (vehicle) => vehicle.MatriculaCar !== matriculaParam
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClientHandler = async (dni) => {
    try {
      await RentService.deleteClient(dni);
      setClientsData((prevClients) =>
        prevClients.filter((client) => client.dni !== dni)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const editVehicleHandler = async (matriculaParam, updatedVehicle) => {
    try {
      const vehicleData = {
        fabricante: updatedVehicle.fabricante,
        modelo: updatedVehicle.modelo,
        motorizacion: updatedVehicle.motorizacion,
        antiguedad: updatedVehicle.antiguedad !== undefined ? updatedVehicle.antiguedad.toString() : '',
        descripcion: updatedVehicle.descripcion,
        tipoVehiculo: updatedVehicle.tipoVehiculo,
        precioDia: updatedVehicle.precioDia !== undefined ? updatedVehicle.precioDia.toString() : ''
      };
      await RentService.editVehicle(matriculaParam, vehicleData);
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.MatriculaCar === matriculaParam ? { ...vehicle, ...vehicleData } : vehicle
        )
      );
    } catch (error) {
      console.error("Error editing vehicle:", error);
    }
  };

  const handleAddVehicle = async (newVehicle) => {
    try {
      const addedVehicle = await RentService.addVehicle(newVehicle);
      setVehicles((prevVehicles) => [...prevVehicles, addedVehicle]);
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
          <Route
            path="/VistaGeneral"
            element={<VgTable vehicles={vehicles} />}
          />
          <Route
            path="/Vehiculos"
            element={
              <VhTable
                vehicles={vehicles}
                deleteVehicleHandler={deleteVehicleHandler}
                editVehicleHandler={editVehicleHandler}
                setSelectedVehicle={setSelectedVehicle}
                setVehicles={setVehicles}
              />
            }
          />
          <Route
            path="/Clientes"
            element={
              <ClTable
                clients={clientsData}
                deleteClientHandler={deleteClientHandler}
                setClientsData={setClientsData}
              />
            }
          />
          <Route
            path="/Vehicle"
            element={<Vehicle selectedVehicle={selectedVehicle} />}
          />
          <Route
            path="/addVehicle"
            element={<FormularioVehiculo onAddVehicle={handleAddVehicle} />}
          />
          <Route
            path="/editVehicle"
            element={<EditarVehiculo selectedVehicle={selectedVehicle} editVehicleHandler={editVehicleHandler} />}
          />
        </Routes>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default RentApp;
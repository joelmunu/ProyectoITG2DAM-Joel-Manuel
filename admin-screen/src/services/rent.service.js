import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/rentacartf";

const getVistaGeneral = async () => {
  const response = await axios.get(`${API_URL}/vistageneral`);
  const vgData = response.data;
  return vgData.data;
};

const getVehicles = async () => {
  const response = await axios.get(`${API_URL}/vehiculos`);
  const vehicleData = response.data;
  return vehicleData.data;
};

const getClients = async () => {
  const response = await axios.get(`${API_URL}/clientes`);
  const clientsData = response.data;
  return clientsData.data;
};

const deleteVehicle = async (matriculaParam) => {
  const response = axios.delete(`${API_URL}/vehiculo/${matriculaParam}`);
  return (await response).data.data;
};

const editVehicle = async (matriculaParam, data) => {
  const response = axios.put(`${API_URL}/vehiculo/${matriculaParam}`, data);
  return (await response).data.data;
};

const addVehicle = async (vehicleData) => {
  const response = await axios.post(`${API_URL}/vehiculos/`, vehicleData);
  return response.data;
};

const deleteClient = async (dni) => {
  const response = axios.delete(`${API_URL}/cliente/${dni}`);
  return (await response).data.data;
};

const RentService = {
  getVistaGeneral,
  getVehicles,
  getClients,
  deleteVehicle,
  editVehicle,
  addVehicle,
  deleteClient,
};

export default RentService;

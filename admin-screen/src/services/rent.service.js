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

const RentService = {
  getVistaGeneral,
  getVehicles,
};

export default RentService;

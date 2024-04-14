import axios from "axios";
const API_URL = "http://localhost:8000/api/v1/rentacartf";

const getVistaGeneral = async () => {
  const response = await axios.get(`${API_URL}/vistageneral`);
  const vgData = response.data;

  console.log("getVg: ", vgData.data);
  return vgData.data;
};

const RentService = {
  getVistaGeneral,
};

export default RentService;

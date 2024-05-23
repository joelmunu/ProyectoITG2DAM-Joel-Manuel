import axios from "axios";

const API_URL = "http://192.168.0.21:8000/api/v1/auth";

export const adminLogin = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/adminlogin`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export default adminLogin;

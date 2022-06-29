import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const register = async (data) => {
  const response = await axios.post(`${BASE_URL}/users`, data);
  return response.data;
};

const login = async (data) => {
  const response = await axios.post(`${BASE_URL}/users/login`, data);
  return response.data;
};

const authService = { register, login };

export default authService;

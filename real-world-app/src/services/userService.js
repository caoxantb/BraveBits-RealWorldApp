import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getCurrentUser = async (token) => {
  const response = await axios.get(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

const updateCurrentUser = async (data, token) => {
  const response = await axios.put(`${BASE_URL}/user`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

const userService = { getCurrentUser, updateCurrentUser };

export default userService;

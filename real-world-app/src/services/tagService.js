import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getTags = async () => {
  const response = await axios.get(`${BASE_URL}/tags`);
  return response.data;
};

const tagService = {
  getTags,
};

export default tagService;

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getProfile = async (username) => {
  const response = await axios.get(`${BASE_URL}/profiles/${username}`);

  return response.data;
};

const followProfile = async (username, token) => {
  const response = await axios.post(
    `${BASE_URL}/profiles/${username}/follow`,
    { user: username },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};

const unfollowProfile = async (username, token) => {
  const response = await axios.delete(
    `${BASE_URL}/profiles/${username}/follow`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};

const profileService = { getProfile, followProfile, unfollowProfile };

export default profileService;

import axios from "axios";
const baseUrl = "https://frontend-mentor-fxchecker.onrender.com/api/favorites";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  console.log('Config: ', config)

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const deleteFavorite = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};


export default { getAll, create, setToken, deleteFavorite };
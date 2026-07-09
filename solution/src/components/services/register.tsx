import axios from "axios";
const baseUrl = "https://frontend-mentor-fxchecker.onrender.com/api/users";

const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

export default { create };

import axios from "axios";
const baseUrl = "https://frontend-mentor-fxchecker.onrender.com/api/login";

const login = async (credentials) => {
    console.log('creds: ', credentials)
  const response = await axios.post(baseUrl, credentials);
  console.log(response)
  return response.data;
};

export default { login };
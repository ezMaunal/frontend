import axios from "axios";

const getManualById = async (manualId) => {
  const accessToken = localStorage.getItem("accessToken");
  const serverURL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const response = await axios.get(`${serverURL}/api/manual/${manualId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export default getManualById;

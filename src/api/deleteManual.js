import axios from "axios";

const deleteManual = async (manualId) => {
  const accessToken = localStorage.getItem("accessToken");
  const serverURL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const response = await axios.delete(`${serverURL}/api/manual/${manualId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export default deleteManual;

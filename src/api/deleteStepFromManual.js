import axios from "axios";

const deleteStepFromManual = async (manualId, imageId) => {
  const accessToken = localStorage.getItem("accessToken");
  const serverURL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const response = await axios.delete(`${serverURL}/api/manual/${manualId}/images/${imageId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export default deleteStepFromManual;

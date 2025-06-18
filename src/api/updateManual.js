import axios from "axios";

const updateManual = async (manualId, { name }) => {
  const accessToken = localStorage.getItem("accessToken");
  const serverURL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const response = await axios.patch(
    `${serverURL}/api/manual/${manualId}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

export default updateManual;

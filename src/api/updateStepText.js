import axios from "axios";

const updateStepText = async (manualId, imageId, newText) => {
  const accessToken = localStorage.getItem("accessToken");
  const serverURL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const response = await axios.patch(
    `${serverURL}/api/manual/${manualId}/images/${imageId}`,
    { text: newText },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

export default updateStepText;

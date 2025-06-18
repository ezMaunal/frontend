import axios from "axios";

import { dataURLtoFile } from "@/utils/dataURLtoFile";

const createManual = async (data) => {
  const accessToken = localStorage.getItem("accessToken");
  const serverURL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const formData = new FormData();
  data.steps.forEach((step, i) => {
    formData.append("image", dataURLtoFile(step.image, `step-${i}.png`));
    formData.append("text", step.text);
  });
  const response = await axios.post(serverURL + "/api/manual", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export default createManual;

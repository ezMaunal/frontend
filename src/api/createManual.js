import axios from "axios";

import { dataURLtoFile } from "@/utils/dataURLtoFile";

const createManual = async (data) => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMTQ5NmJmMy1mNDZjLTQ3ZTMtOGMwMC0xOTUxYzZiMGIzMzQiLCJrYWthb0lkIjoiNDI5NzE2NDcwMSIsImlhdCI6MTc1MDA0OTc0NSwiZXhwIjoxNzUwMDUzMzQ1fQ.7ljMWS9ZCCAjCr-zbMve-eS8j3NHp00istnh-Hh1jyo";
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

import axios from "axios";

import { dataURLtoFile } from "@/utils/dataURLtoFile";

const postManual = async (data) => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMTQ5NmJmMy1mNDZjLTQ3ZTMtOGMwMC0xOTUxYzZiMGIzMzQiLCJrYWthb0lkIjoiNDI5NzE2NDcwMSIsImlhdCI6MTc0OTk3Nzg2OCwiZXhwIjoxNzQ5OTk5NDY4fQ.GawUumgPYIBD2yLPoendI3OEVXKKDQXYTxqla7JZpPA";
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

export default postManual;

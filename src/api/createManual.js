import axios from "axios";

import { dataURLtoFile } from "@/utils/dataURLtoFile";

const createManual = async (data) => {
  const accessToken = localStorage.getItem("accessToken");
  const serverURL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const formData = new FormData();
  const hasValidImage = data.steps.some((step) => step.image?.startsWith("data:image/"));

  if (!hasValidImage) {
    alert("업로드할 이미지가 하나도 없습니다.");
    return;
  }

  data.steps.forEach((step, i) => {
    const imageData = step.image || step.url;

    if (!imageData || !imageData.startsWith("data:image/")) {
      console.warn(`step[${i}]는 base64 아님 → image 제외됨`, imageData);
      return;
    }

    const imageFile = dataURLtoFile(imageData, `step-${i}.png`);
    formData.append("image", imageFile);

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

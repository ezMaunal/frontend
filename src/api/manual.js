import axios from "axios";

export const postManual = async (data, token) => {
  return await axios.post("/api/manual", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

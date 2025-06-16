import axios from "axios";

const getManual = async () => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMTQ5NmJmMy1mNDZjLTQ3ZTMtOGMwMC0xOTUxYzZiMGIzMzQiLCJrYWthb0lkIjoiNDI5NzE2NDcwMSIsImlhdCI6MTc1MDA0OTc0NSwiZXhwIjoxNzUwMDUzMzQ1fQ.7ljMWS9ZCCAjCr-zbMve-eS8j3NHp00istnh-Hh1jyo";
  const serverURL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const response = await axios.get(serverURL + "/api/manual_list", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export default getManual;

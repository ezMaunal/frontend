import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";

const LoginPopup = () => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.token) {
        localStorage.setItem("accessToken", event.data.token);
        window.close();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return <div>로그인 처리 중입니다...</div>;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<LoginPopup />);

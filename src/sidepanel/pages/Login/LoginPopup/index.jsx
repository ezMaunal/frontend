import axios from "axios";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";

const LoginPopup = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      axios
        .post("http://localhost:8000/api/auth/kakao/login", { code }, { withCredentials: true })
        .then((res) => {
          const { token } = res.data;
          if (token) {
            window.opener.postMessage({ token }, "*");
            window.close();
          }
        })
        .catch(() => {
          alert("로그인 중 오류가 발생했습니다.");
        });
    }
  }, []);

  return <div>로그인 처리 중입니다...</div>;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<LoginPopup />);

export default LoginPopup;

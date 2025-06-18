import "@/styles/index.css";
import "@/styles/styles.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import WarningModal from "@/sidepanel/components/WarningModal";

const LoginPopup = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/auth/kakao/login`,
          { code },
          { withCredentials: true },
        )
        .then((res) => {
          const { token } = res.data;
          if (token) {
            window.opener.postMessage({ token }, "*");
            window.close();
          }
        })
        .catch(() => {
          setShowModal(true);
        });
    }
  }, []);

  return (
    <>
      <div>로그인 처리 중입니다...</div>
      {showModal && (
        <WarningModal
          title="로그인 실패"
          message="로그인 중 오류가 발생했습니다."
          onClose={() => {
            setShowModal(false);
            window.close();
          }}
        />
      )}
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<LoginPopup />);

export default LoginPopup;

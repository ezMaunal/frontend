import "@/styles/styles.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "@/sidepanel/components/BackButton";
import WarningModal from "@/sidepanel/components/WarningModal";

const DeleteAccount = () => {
  const [agree, setAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      localStorage.removeItem("accessToken");
      navigate("/noticedeleteaccount");
    } catch {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="flex min-h-screen flex-col bg-white">
          <div className="flex items-center bg-orange-500 px-4 py-3">
            <BackButton />
            <h1 className="text-lg font-bold text-white">탈퇴하기</h1>
          </div>

          <div className="mt-20 flex flex-col items-center">
            <div className="w-64 rounded-xl bg-gray-200 px-4 py-6 text-center">
              <p className="mb-2 text-xl font-bold text-stone-900">공지사항</p>
              <p className="mb-4 text-sm text-stone-700">...............</p>

              <div className="mb-4 text-sm font-bold text-stone-900">
                <label className="text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                  />
                  안내사항에 동의합니다.
                </label>
              </div>

              <button
                className={`w-full rounded-xl py-3 font-bold text-white ${
                  agree ? "bg-gray-700 hover:bg-gray-800" : "bg-gray-400"
                }`}
                disabled={!agree}
                onClick={handleDeleteAccount}
              >
                탈 퇴 하 기
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <WarningModal
          title="회원탈퇴 실패"
          message="회원탈퇴 중 오류가 발생했습니다."
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default DeleteAccount;

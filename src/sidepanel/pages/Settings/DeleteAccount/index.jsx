import "@/styles/styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "@/sidepanel/components/BackButton";

const DeleteAccount = () => {
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  return (
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
              onClick={agree ? () => navigate("/noticedeleteaccount") : undefined}
            >
              탈 퇴 하 기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;

import "@/styles/styles.css";
import axios from "axios";
import { useState, useEffect } from "react";

import BackButton from "@/sidepanel/components/BackButton";
import WarningModal from "@/sidepanel/components/WarningModal";

const Option = () => {
  const [squareColor, setSquareColor] = useState("#ff0000");
  const [showModal, setShowModal] = useState(false);

  const saveColorToServer = async (color) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/users/me`,
        { highlightColor: color },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
    } catch {
      setShowModal(true);
    }
  };

  const fetchColorFromServer = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      const serverColor = res.data?.data?.highlightColor;
      if (serverColor) {
        setSquareColor(serverColor);
        chrome.storage.local.set({ selectedColor: serverColor });
      } else {
        await saveColorToServer(squareColor);
      }
    } catch {
      setShowModal(true);
    }
  };

  useEffect(() => {
    const loadHighlightColor = async () => {
      try {
        const result = await new Promise((resolve) => {
          chrome.storage.local.get("selectedColor", resolve);
        });

        if (result.selectedColor) {
          setSquareColor(result.selectedColor);
        }

        await fetchColorFromServer();
      } catch {
        setShowModal(true);
      }
    };

    loadHighlightColor();
  }, []);

  const handleChange = (e) => {
    const selected = e.target.value;
    setSquareColor(selected);
    chrome.storage.local.set({ selectedColor: selected });
    saveColorToServer(selected);
  };

  useEffect(() => {
    chrome.runtime.sendMessage({
      type: "SEND_COLOR",
      data: squareColor,
    });
  }, [squareColor]);

  return (
    <div className="flex min-h-screen flex-col bg-white px-4 pt-10 pb-12">
      <BackButton />

      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-stone-900">옵 션</h1>
      </div>

      <div className="mt-24 flex flex-col items-center">
        <p className="mb-2 text-3xl font-bold text-stone-900">강조표시 색상</p>
        <input
          id="colorInput"
          type="color"
          value={squareColor}
          onChange={handleChange}
          className="h-32 w-32 cursor-pointer rounded border border-black"
        />
      </div>

      {showModal && (
        <WarningModal
          title="서버 통신 오류"
          message="서버와 통신 중 오류가 발생했습니다."
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Option;

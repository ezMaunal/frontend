import "@/styles/styles.css";
import { useState, useEffect } from "react";

import BackButton from "@/sidepanel/components/BackButton";

const Option = () => {
  const [squareColor, setSquareColor] = useState("#ff0000");

  const handleChange = (e) => {
    const selected = e.target.value;
    setSquareColor(selected);
    chrome.storage.local.set({ selectedColor: selected });
  };

  useEffect(() => {
    chrome.storage.local.get("selectedColor", (result) => {
      if (result.selectedColor) {
        setSquareColor(result.selectedColor);
      }
    });
  }, []);

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
          onChange={handleChange}
          className="h-32 w-32 cursor-pointer rounded border border-black"
          defaultValue={squareColor}
        />
      </div>
    </div>
  );
};

export default Option;

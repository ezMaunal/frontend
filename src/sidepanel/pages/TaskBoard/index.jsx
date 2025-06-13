import { useEffect, useState } from "react";

import TaskCard from "./TaskCard";

const TaskBoard = () => {
  const [images, setImages] = useState([]);
  const [elementData, setElementData] = useState([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "START_CAPTURE" }, () => {
      if (chrome.runtime.lastError) {
        console.error("START_CAPTURE 에러:", chrome.runtime.lastError);
        return;
      }
    });

    const handleMessage = (message) => {
      if (message.type === "CAPTURED_IMAGE") {
        setImages((prev) => [...prev, message.image]);
        setElementData((prev) => [...prev, message.elementData]);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        {images.map((image, index) => (
          <TaskCard
            key={index}
            index={index}
            element={elementData[index]}
            image={image}
            onTitleChange={(newTitle) => {
              const updated = [...elementData];
              updated[index].textContent = newTitle;
              setElementData(updated);
            }}
          />
        ))}
      </div>

      <div className="flex justify-around bg-orange-500 py-4 text-white">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 hover:bg-green-500">
            ✓
          </div>
          <span className="mt-1 text-sm">캡쳐완료</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 hover:bg-yellow-500">
            Ⅱ
          </div>
          <span className="mt-1 text-sm">일시중지</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 hover:bg-red-500">
            ✕
          </div>
          <span className="mt-1 text-sm">끄기</span>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;

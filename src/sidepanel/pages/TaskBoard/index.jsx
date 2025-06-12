import { useEffect, useState } from "react";

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
          <div
            key={index}
            className="space-y-2"
          >
            <div className="flex items-center justify-between rounded-md bg-gray-200 px-3 py-2">
              <div className="flex items-center space-x-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {index + 1}
                </div>
                <div>
                  {elementData[index].textContent === "" ? (
                    <div className="font-bold">"여기"를 클릭해주세요!!</div>
                  ) : (
                    <div className="font-bold">{`"${elementData[index].textContent.trim().substring(0, 13)}"을 클릭해주세요!!`}</div>
                  )}
                </div>
              </div>
              <button className="text-lg text-red-500">⋯</button>
            </div>
            <div className="flex h-32 items-center justify-center rounded-md bg-gray-300 text-gray-600">
              <img
                src={image}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            {index !== images.length - 1 && (
              <div className="flex justify-center text-2xl text-gray-400">↓</div>
            )}
          </div>
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

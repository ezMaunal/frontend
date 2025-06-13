import "@/styles/styles.css";

import { useEffect, useState, useRef } from "react";

import TaskCard from "./TaskCard";

const TaskBoard = () => {
  const [images, setImages] = useState([]);
  const [elementData, setElementData] = useState([]);
  const [isCapturing, setIsCapturing] = useState(true);

  const isCapturingRef = useRef(isCapturing);

  const handlePauseClick = () => {
    console.log(isCapturing);
    isCapturing === true ? setIsCapturing(false) : setIsCapturing(true);
  };

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "START_CAPTURE" }, () => {
      if (chrome.runtime.lastError) {
        console.error("START_CAPTURE 에러:", chrome.runtime.lastError);
        return;
      }
    });

    const handleMessage = (message) => {
      if (message.type === "CAPTURED_IMAGE" && isCapturingRef.current) {
        setImages((prev) => [...prev, message.image]);
        setElementData((prev) => [...prev, message.elementData]);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  useEffect(() => {
    isCapturingRef.current = isCapturing;
  }, [isCapturing]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex justify-around bg-orange-500 py-4 text-white">
        <div className="flex flex-col items-center">
          {isCapturing === true ? (
            <div className="flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center bg-white">
                <div className="flex h-6 w-6 animate-pulse rounded-full bg-orange-500" />
              </div>
              <div className="ml-3 flex animate-pulse text-3xl text-white">캡쳐중...</div>
            </div>
          ) : (
            <div>
              <div className="ml-3 flex text-3xl text-white">캡쳐 일시중단</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        {images.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xl text-gray-400">
            캡쳐된 내용이 없습니다.
          </div>
        ) : (
          images.map((image, index) => (
            <div
              key={index}
              className="space-y-2"
            >
              <div className="flex items-center justify-between rounded-md bg-gray-200 px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    {index + 1}
                  </div>

                  <TaskCard
                    element={elementData[index]}
                    onTitleChange={(newTitle) => {
                      const updated = [...elementData];
                      updated[index].textContent = newTitle;
                      setElementData(updated);
                    }}
                  />
                </div>
              </div>

              <div className="flex h-32 items-center justify-center rounded-md bg-gray-300 text-gray-600">
                <img
                  src={image}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {index !== images.length - 1 && (
                <div className="flex justify-center text-2xl text-gray-400">↓</div>
              )}
            </div>
          ))
        )}

        {isCapturing === true ? (
          <div>
            <div className="ml-3 flex animate-pulse text-3xl text-white">캡쳐중...</div>
          </div>
        ) : (
          <div>
            <div className="ml-3 flex text-3xl text-white">캡쳐 일시중단</div>
          </div>
        )}
      </div>
      <div />

      <div className="flex justify-around bg-orange-500 py-4 text-white">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 hover:bg-gray-200 hover:text-3xl">
            ✓
          </div>
          <span className="mt-1 text-sm">캡쳐완료</span>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 hover:bg-gray-200 hover:text-3xl"
              onClick={handlePauseClick}
            >
              {isCapturing ? "ǁ" : <div className="ml-[2px]">▶</div>}
            </div>
            <span className="mt-1 text-sm">{isCapturing ? "일시중지" : "캡쳐 계속진행"}</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 hover:bg-gray-200 hover:text-3xl">
            ✕
          </div>
          <span className="mt-1 text-sm">끄기</span>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;

import "@/styles/styles.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import TaskCard from "./TaskCard";

const TaskBoard = () => {
  const [steps, setSteps] = useState([]);
  const [isCapturing, setIsCapturing] = useState(true);

  const navigate = useNavigate();
  const isCapturingRef = useRef(isCapturing);

  const goBack = () => {
    navigate(-1);
  };

  const handlePauseClick = () => {
    setIsCapturing((prev) => !prev);
  };

  const handleCleanupClick = () => {
    chrome.runtime.sendMessage({ type: "CLEANUP_ALL" }, () => {
      if (chrome.runtime.lastError) {
        console.error("CLEANUP_ALL 전송 오류:", chrome.runtime.lastError.message);
      } else {
        console.log("📨 CLEANUP_ALL 메시지 전송됨");
      }
    });
  };

  const handleMessage = useCallback((message) => {
    if (message.type === "CAPTURED_IMAGE" && isCapturingRef.current) {
      setSteps((prev) => [
        ...prev,
        {
          id: uuidv4(),
          image: message.image,
          elementData: message.elementData,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "START_CAPTURE" }, () => {
      if (chrome.runtime.lastError) {
        console.error("START_CAPTURE 에러:", chrome.runtime.lastError);
        return;
      }
    });

    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [handleMessage]);

  useEffect(() => {
    isCapturingRef.current = isCapturing;
  }, [isCapturing]);

  const handleDeleteStep = (taskId) => {
    setSteps((prev) => prev.filter((step) => step.id !== taskId));
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <div className="flex justify-around bg-orange-500 py-4 text-white">
        <div className="flex flex-col items-center">
          {isCapturing ? (
            <div className="flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center bg-white">
                <div className="flex h-6 w-6 animate-pulse rounded-full bg-orange-500" />
              </div>
              <div className="ml-3 flex animate-pulse text-3xl text-white">캡쳐중...</div>
            </div>
          ) : (
            <div className="ml-3 flex text-3xl text-white">캡쳐 일시중단</div>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        {steps.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xl text-gray-400">
            캡쳐된 내용이 없습니다.
          </div>
        ) : (
          steps.map((step, index) => (
            <div
              key={step.id}
              className="space-y-2"
            >
              <TaskCard
                index={index}
                element={step.elementData}
                image={step.image}
                onDeleteStep={() => handleDeleteStep(step.id)}
                onTitleChange={(newTitle) => {
                  const updated = [...step.elementData];
                  updated[index].textContent = newTitle;
                }}
              />
              {index !== steps.length - 1 && (
                <div className="flex justify-center text-2xl text-gray-400">↓</div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex justify-around bg-orange-500 py-4 text-white">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 hover:bg-gray-200 hover:text-3xl">
            ✓
          </div>
          <span className="mt-1 text-sm">캡쳐완료</span>
        </div>

        <div className="flex flex-col items-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 hover:bg-gray-200 hover:text-3xl"
            onClick={handlePauseClick}
          >
            {isCapturing ? "ǁ" : <div className="ml-[2px]">▶</div>}
          </div>
          <span className="mt-1 text-sm">{isCapturing ? "일시중지" : "캡쳐 계속진행"}</span>
        </div>

        <div className="flex flex-col items-center">
          <div
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 hover:bg-gray-200 hover:text-3xl"
            onClick={() => {
              goBack();
              handleCleanupClick();
            }}
          >
            ✕
          </div>
          <span className="mt-1 text-sm">끄기</span>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;

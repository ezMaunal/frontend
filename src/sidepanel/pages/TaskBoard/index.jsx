import "@/styles/styles.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import createManual from "@/api/createManual";
import LoadingModal from "@/sidepanel/components/LoadingModal";
import WarningModal from "@/sidepanel/components/WarningModal";
import { getCaptureStatus, resetCapturedSteps } from "@/utils/storage";

import TaskCard from "./TaskCard";
import TaskControlBar from "./TaskControlBar";
import TaskStatusHeader from "./TaskStatusHeader";

const TaskBoard = () => {
  const navigate = useNavigate();

  const [steps, setSteps] = useState([]);
  const [isCapturing, setIsCapturing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isCapturingRef = useRef(isCapturing);

  const goBack = () => {
    navigate("/");
  };
  const handleTitleChange = (index, newTitle) => {
    setSteps((prev) => {
      const updated = [...prev];
      updated[index].elementData.textContent = newTitle;

      chrome.storage.local.set({ CapturedSteps: updated });
      return updated;
    });
  };
  const handleCleanupClick = async () => {
    chrome.runtime.sendMessage({ type: "CLEANUP_ALL" }, async () => {
      if (chrome.runtime.lastError) {
        console.error("CLEANUP_ALL 전송 오류:", chrome.runtime.lastError.message);
      } else {
        console.log("📨 CLEANUP_ALL 메시지 전송됨");
        await chrome.storage.local.set({ isCapturing: false });

        const status = await getCaptureStatus();
        setIsCapturing(status);

        goBack();
      }
    });
    resetCapturedSteps();
  };

  useEffect(() => {
    chrome.storage.local.get("CapturedSteps").then(({ CapturedSteps }) => {
      if (CapturedSteps && Array.isArray(CapturedSteps)) {
        setSteps(CapturedSteps);
      }
    });
    chrome.runtime.sendMessage({ type: "START_CAPTURE" }, () => {
      if (chrome.runtime.lastError) {
        console.error("START_CAPTURE 에러:", chrome.runtime.lastError);
        return;
      }
    });

    const handleStorageChange = (changes, areaName) => {
      if (areaName === "local" && changes.CapturedSteps && isCapturingRef.current) {
        const newSteps = changes.CapturedSteps.newValue;
        const oldSteps = changes.CapturedSteps.oldValue || [];

        const addedStep = newSteps.length > oldSteps.length ? newSteps[newSteps.length - 1] : null;
        if (!addedStep) return;

        setSteps((prev) => [
          ...prev,
          {
            id: uuidv4(),
            image: addedStep.image,
            elementData: addedStep.elementData,
          },
        ]);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  useEffect(() => {
    isCapturingRef.current = isCapturing;
  }, [isCapturing]);

  const handleDeleteStep = (taskId) => {
    setSteps((prev) => {
      const updatedSteps = prev.filter((step) => step.id !== taskId);
      chrome.storage.local.set({ CapturedSteps: updatedSteps });
      return updatedSteps;
    });
  };

  const handlePauseClick = () => {
    setIsCapturing((prev) => {
      chrome.storage.local.set({ isCapturing: !prev });
      return !prev;
    });
  };

  const handleFinishClick = async () => {
    const stepData = steps.map((step) => ({
      text: step.elementData.textContent,
      image: step.image,
    }));
    const body = {
      steps: stepData,
    };

    setIsLoading(true);
    try {
      await createManual(body);
      resetCapturedSteps();
      navigate("/repository");
    } catch (error) {
      console.error("매뉴얼 생성 에러:", error);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      {isLoading && <LoadingModal />}
      {showModal && (
        <WarningModal
          title="실패"
          message="매뉴얼을 생성하는 중 오류가 발생했습니다."
          onClose={() => setShowModal(false)}
        />
      )}

      <TaskStatusHeader isCapturing={isCapturing} />

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
                onTitleChange={(newTitle) => handleTitleChange(index, newTitle)}
              />
              {index !== steps.length - 1 && (
                <div className="flex justify-center text-2xl text-gray-400">↓</div>
              )}
            </div>
          ))
        )}
      </div>

      <TaskControlBar
        isCapturing={isCapturing}
        onFinishClick={handleFinishClick}
        onPauseClick={handlePauseClick}
        onCleanupClick={handleCleanupClick}
      />
    </div>
  );
};

export default TaskBoard;

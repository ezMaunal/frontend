import "@/styles/styles.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import createManual from "@/api/createManual";
import { MESSAGE_TYPES } from "@/constants/chromeMessageType";
import useTaskHandlers from "@/hooks/useTaskHandlers";
import LoadingModal from "@/sidepanel/components/LoadingModal";
import WarningModal from "@/sidepanel/components/WarningModal";
import { getCaptureStatus, resetCapturedSteps } from "@/utils/storage";

import TaskControlBar from "./TaskControlBar";
import TaskStatusHeader from "./TaskStatusHeader";
import TaskStepsRenderer from "./TaskStepsRenderer";

const TaskBoard = () => {
  const [steps, setSteps] = useState([]);
  const [isCapturing, setIsCapturing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { handleDeleteStep, handleTitleChange, handlePauseClick, handleCleanupClick } =
    useTaskHandlers({
      steps,
      setSteps,
      setIsCapturing,
      setIsLoading,
      setShowModal,
    });

  const navigate = useNavigate();

  const isCapturingRef = useRef(isCapturing);

  useEffect(() => {
    chrome.storage.local.get("CapturedSteps").then(({ CapturedSteps }) => {
      if (CapturedSteps && Array.isArray(CapturedSteps)) {
        setSteps(CapturedSteps);
      }
    });

    chrome.runtime.sendMessage({ type: MESSAGE_TYPES.START_CAPTURE });

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

  const handleFinishClick = async () => {
    const stepData = steps.map((step) => ({
      text: step.elementData?.textContent || "",
      image: step.image,
    }));

    const body = { steps: stepData };

    setIsLoading(true);
    try {
      await createManual(body);
      await chrome.storage.local.set({ isCapturing: false });

      const status = await getCaptureStatus();
      setIsCapturing(status);
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

      <TaskStepsRenderer
        steps={steps}
        handleDeleteStep={handleDeleteStep}
        handleTitleChange={handleTitleChange}
      />

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

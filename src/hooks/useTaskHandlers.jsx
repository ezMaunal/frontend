import { useNavigate } from "react-router-dom";

import createManual from "@/api/createManual";
import { resetCapturedSteps } from "@/utils/storage";
import { getCaptureStatus } from "@/utils/storage";

const useTaskHandlers = ({ steps, setSteps, setIsCapturing, setIsLoading, setShowModal }) => {
  const navigate = useNavigate();
  const goToMain = () => {
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
  const handleCleanupClick = async () => {
    chrome.runtime.sendMessage({ type: "CLEANUP_ALL" }, async () => {
      if (chrome.runtime.lastError) {
        console.error("CLEANUP_ALL 전송 오류:", chrome.runtime.lastError.message);
      } else {
        console.log("📨 CLEANUP_ALL 메시지 전송됨");
        await chrome.storage.local.set({ isCapturing: false });

        const status = await getCaptureStatus();
        setIsCapturing(status);
        resetCapturedSteps();
        goToMain();
      }
    });
  };

  return {
    handleTitleChange,
    handleDeleteStep,
    handlePauseClick,
    handleFinishClick,
    handleCleanupClick,
  };
};

export default useTaskHandlers;

import { useNavigate } from "react-router-dom";

import { MESSAGE_TYPES } from "@/constants/chromeMessageType";
import { resetCapturedSteps, getCaptureStatus } from "@/utils/storage";

const useTaskHandlers = ({ setSteps, setIsCapturing }) => {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/");
  };
  const handleTitleChange = (index, newTitle) => {
    setSteps((prev) => {
      const updated = [...prev];
      updated[index].text = newTitle.trim();

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
      if (prev === false) {
        chrome.runtime.sendMessage({ type: MESSAGE_TYPES.START_CAPTURE });
      }
      return !prev;
    });
  };

  const handleCleanupClick = async () => {
    chrome.runtime.sendMessage({ type: MESSAGE_TYPES.CLEANUP_ALL }, async () => {
      if (chrome.runtime.lastError) {
        console.error("CLEANUP_ALL 전송 오류:", chrome.runtime.lastError.message);
      } else {
        console.log("CLEANUP_ALL 메시지 전송됨");
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
    handleCleanupClick,
  };
};

export default useTaskHandlers;

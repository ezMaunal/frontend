import { MESSAGE_TYPES } from "../constants/chromeMessageType.js";

export const startCapture = (sendResponse) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const tabId = tab?.id;

    if (!tabId) {
      sendResponse({ status: "no tab" });
      return;
    }

    chrome.storage.local.set({ isCaptureStopped: false, isCapturing: true });

    chrome.tabs.sendMessage(tabId, { type: MESSAGE_TYPES.START_CAPTURE });
    chrome.tabs.sendMessage(tabId, { type: MESSAGE_TYPES.SHOW_CAPTURE_MESSAGE });

    sendResponse({ status: "started" });
  });

  return true;
};

export const stopCaptureAllTabs = (sendResponse) => {
  chrome.tabs.query({}, (tabs) => {
    if (!tabs || tabs.length === 0) {
      sendResponse({ success: false });
      return;
    }

    let completed = 0;

    tabs.forEach((tab) => {
      if (!tab.id) return;

      chrome.tabs.sendMessage(tab.id, { type: "STOP_CAPTURE" }, () => {
        completed++;

        if (completed === tabs.length) {
          sendResponse({ success: true });
        }
      });
    });
  });

  return true;
};

export const sendColor = (colorData) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "SEND_COLOR",
      data: colorData,
    });
  });
};

export const captureAndStoreStep = (elementData, sendResponse) => {
  const rawText = elementData.textContent?.trim() || "여기";

  const maxLen = 13;
  let processedText = rawText;
  if (rawText.length > maxLen) {
    processedText = rawText.slice(0, maxLen) + "...";
  }

  if (!processedText.endsWith("를 클릭했습니다")) {
    processedText = `"${processedText}"를 클릭했습니다`;
  }

  const newElementData = { ...elementData, textContent: processedText };

  chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
    chrome.storage.local.get("CapturedSteps", (result) => {
      const currentSteps = Array.isArray(result.CapturedSteps) ? result.CapturedSteps : [];

      const updatedSteps = [
        ...currentSteps,
        {
          image: dataUrl,
          elementData: newElementData,
        },
      ];

      chrome.storage.local.set({ CapturedSteps: updatedSteps }, () => {
        sendResponse({ status: "captured" });
      });
    });
  });

  return true;
};

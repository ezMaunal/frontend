import { MESSAGE_TYPES } from "../constants/chromeMessageType.js";

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (tab.id && /^https?:/.test(tab.url)) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content/clickListener.js"],
        });
      }
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && /^https?:/.test(tab.url)) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content/clickListener.js"],
    });
  }
});

const startCapture = (sendResponse) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const tabId = tab?.id;

    if (!tabId) {
      sendResponse({ status: "no tab" });
      return;
    }

    chrome.storage.local.set({ isCaptureStopped: false });
    chrome.tabs.sendMessage(tabId, { type: MESSAGE_TYPES.START_CAPTURE });

    chrome.scripting
      .insertCSS({
        target: { tabId },
        files: ["style/style.css"],
      })
      .then(() => {
        return chrome.scripting.executeScript({
          target: { tabId },
          files: ["content/showCaptureStartMessage.js"],
        });
      })
      .then(() => {
        sendResponse({ status: "started" });
      })
      .catch((error) => {
        console.error("startCapture error:", error);
        sendResponse({ status: "error", error: error.message });
      });
  });

  chrome.storage.local.set({ isCapturing: true });
  return true;
};

const stopCaptureAllTabs = (sendResponse) => {
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

const sendColor = (colorData) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "SEND_COLOR",
      data: colorData,
    });
  });
};

const captureAndStoreStep = (elementData, sendResponse) => {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
    chrome.storage.local.get("CapturedSteps", (result) => {
      const currentSteps = Array.isArray(result.CapturedSteps) ? result.CapturedSteps : [];

      const updatedSteps = [
        ...currentSteps,
        {
          image: dataUrl,
          elementData,
        },
      ];

      chrome.storage.local.set({ CapturedSteps: updatedSteps }, () => {
        sendResponse({ status: "captured" });
      });
    });
  });

  return true;
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === MESSAGE_TYPES.START_CAPTURE) {
    return startCapture(sendResponse);
  }

  if (message.type === MESSAGE_TYPES.CLEANUP_ALL) {
    return stopCaptureAllTabs(sendResponse);
  }

  if (message.type === MESSAGE_TYPES.SEND_COLOR) {
    sendColor(message.data);
  }

  if (message.type === MESSAGE_TYPES.CLICKED) {
    return captureAndStoreStep(message.elementData, sendResponse);
  }
});

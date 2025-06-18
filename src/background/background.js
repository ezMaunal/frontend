import {
  startCapture,
  stopCaptureAllTabs,
  sendColor,
  captureAndStoreStep,
} from "./backgroundUtils.js";
import { MESSAGE_TYPES } from "../constants/chromeMessageType.js";

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (tab.id && /^https?:/.test(tab.url)) {
        chrome.scripting.insertCSS({
          target: { tabId: tab.id },
          files: ["style/style.css"],
        });
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content/clickListener.js", "content/showCaptureStartMessage.js"],
        });
      }
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && /^https?:/.test(tab.url)) {
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["style/style.css"],
    });
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content/clickListener.js", "content/showCaptureStartMessage.js"],
    });
  }
});

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

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

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "START_CAPTURE") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const tabId = tab.id;

      if (!tab?.id) return;

      chrome.storage.local.set({ isCaptureStopped: false });
      chrome.tabs.sendMessage(tabId, { type: "START_CAPTURE" });
      chrome.scripting
        .insertCSS({
          target: { tabId: tab.id },
          files: ["style/style.css"],
        })
        .then(() => {
          return chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content/showCaptureStartMessage.js"],
          });
        });
    });

    chrome.storage.local.set({ isCapturing: true });
    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CLEANUP_ALL") {
    chrome.tabs.query({}, (tabs) => {
      if (!tabs || tabs.length === 0) {
        sendResponse({ success: false });
        return;
      }

      let completed = 0;

      tabs.forEach((tab) => {
        if (!tab.id) return;

        chrome.tabs.sendMessage(tab.id, { type: "STOP_CAPTURE" }, () => {
          if (chrome.runtime.lastError) {
            console.log("IGNORE ERROR from background.js - STOP_CAPTURE");
          }
          completed++;

          if (completed === tabs.length) {
            sendResponse({ success: true });
          }
        });
      });
    });

    return true;
  }

  if (message.type === "SEND_COLOR") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "SEND_COLOR",
        data: message.data,
      });
    });
  }

  if (message.type === "CLICKED") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      chrome.runtime.sendMessage({
        type: "CAPTURED_IMAGE",
        image: dataUrl,
        elementData: message.elementData,
      });

      sendResponse({ status: "captured" });
    });

    return true;
  }
});

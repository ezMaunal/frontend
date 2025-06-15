chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
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

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sendResponse) => {
  if (message.type === "CLEANUP_ALL") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) return;
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "STOP_CAPTURE",
      });
    });
    return;
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

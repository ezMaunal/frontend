chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_CAPTURE") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

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

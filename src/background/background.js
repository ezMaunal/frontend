chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_CAPTURE") {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ["style/style.css"],
          });

          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["captureOverlay.js"],
          });
        }
      });

      sendResponse({ status: "content scripts injected to all tabs" });
    });
    return true;
  }

  if (message.type === "CLICKED") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        console.error("Capture error:", chrome.runtime.lastError);
        return;
      }

      chrome.runtime.sendMessage({
        type: "CAPTURED_IMAGE",
        image: dataUrl,
      });
    });
  }
});

let currentOverlay = null;
let targetElementInfo = null;

let selectedColor = "#bf0000";

chrome.storage.local.get("isCaptureStopped", (result) => {
  const stopped = result.isCaptureStopped;

  if (!stopped) {
    window.addEventListener("mousedown", handleClick);
  }
});

chrome.storage.local.get("selectedColor", (result) => {
  if (result.selectedColor) {
    selectedColor = result.selectedColor;
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SEND_COLOR") {
    selectedColor = message.data;
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "STOP_CAPTURE") {
    chrome.storage.local.set({ isCaptureStopped: true });
    window.removeEventListener("mousedown", handleClick);

    if (currentOverlay) {
      currentOverlay.remove();
      currentOverlay = null;
    }

    targetElementInfo = null;
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "START_CAPTURE") {
    chrome.storage.local.set({ isCaptureStopped: false });
    window.addEventListener("mousedown", handleClick);
  }
});

function handleClick(event) {
  const target = event.target;
  const rect = target.getBoundingClientRect();

  if (currentOverlay) currentOverlay.remove();

  const overlay = document.createElement("div");
  overlay.id = "red-outline-box";
  overlay.style.position = "absolute";
  overlay.style.top = `${window.scrollY + rect.top - 6}px`;
  overlay.style.left = `${window.scrollX + rect.left - 6}px`;
  overlay.style.width = `${rect.width + 12}px`;
  overlay.style.height = `${rect.height + 12}px`;
  overlay.style.border =
    selectedColor === undefined ? "5px solid #bf0000" : `5px solid ${selectedColor}`;
  overlay.style.zIndex = "999999";
  overlay.style.pointerEvents = "none";
  document.body.appendChild(overlay);
  currentOverlay = overlay;

  targetElementInfo = {
    tagName: target.tagName,
    textContent: target.textContent,
  };

  if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
    setTimeout(() => {
      chrome.runtime.sendMessage(
        {
          type: "CLICKED",
          elementData: targetElementInfo,
        },
        (res) => {
          if (res && res.status === "captured") {
            if (currentOverlay) {
              currentOverlay.remove();
              currentOverlay = null;
            }
            targetElementInfo = null;
          } else {
            console.warn("캡처 실패:", res);
          }
        },
      );
    }, 100);
  }
}

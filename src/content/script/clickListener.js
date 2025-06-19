if (!window.ezmanual_click_listener_injected) {
  window.ezmanual_click_listener_injected = true;

  const MESSAGE_TYPES = {
    START_CAPTURE: "START_CAPTURE",
    STOP_CAPTURE: "STOP_CAPTURE",
    CLEANUP_ALL: "CLEANUP_ALL",
    SEND_COLOR: "SEND_COLOR",
    CLICKED: "CLICKED",
    SHOW_CAPTURE_MESSAGE: "SHOW_CAPTURE_MESSAGE",
  };

  let currentOverlay = null;
  let targetElementInfo = null;

  let selectedColor = "#bf0000";
  let isCapturing = false;

  chrome.storage.local.get("isCapturing", (result) => {
    if (result.isCapturing !== undefined) {
      isCapturing = result.isCapturing;

      if (isCapturing) {
        window.addEventListener("mousedown", handleClick);
      }
    }
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.isCapturing) {
      isCapturing = changes.isCapturing.newValue;

      if (isCapturing) {
        window.addEventListener("mousedown", handleClick);
      } else {
        window.removeEventListener("mousedown", handleClick);
      }
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === MESSAGE_TYPES.SEND_COLOR) {
      selectedColor = message.data;
    } else if (message.type === MESSAGE_TYPES.STOP_CAPTURE) {
      chrome.storage.local.set({ isCapturing: false });
      window.removeEventListener("mousedown", handleClick);

      if (currentOverlay) {
        currentOverlay.remove();
        currentOverlay = null;
      }
      targetElementInfo = null;
    } else if (message.type === MESSAGE_TYPES.START_CAPTURE) {
      chrome.storage.local.set({ isCapturing: true });
      window.addEventListener("mousedown", handleClick);
    }
  });

  function handleClick(event) {
    if (!isCapturing) return;

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
            type: MESSAGE_TYPES.CLICKED,
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
}

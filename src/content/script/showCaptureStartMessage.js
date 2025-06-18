if (!window.haveCaptureStartMessage) {
  const MESSAGE_TYPES = {
    START_CAPTURE: "START_CAPTURE",
    STOP_CAPTURE: "STOP_CAPTURE",
    CLEANUP_ALL: "CLEANUP_ALL",
    SEND_COLOR: "SEND_COLOR",
    CLICKED: "CLICKED",
    SHOW_CAPTURE_MESSAGE: "SHOW_CAPTURE_MESSAGE",
  };
  window.haveCaptureStartMessage = true;

  const showStartCaptureMessage = () => {
    if (document.getElementById("capture-start-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "capture-start-overlay";
    overlay.textContent = "녹화가 시작되었습니다";
    overlay.className = "recording-overlay";
    document.body.appendChild(overlay);

    setTimeout(() => overlay.remove(), 1500);
  };

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === MESSAGE_TYPES.SHOW_CAPTURE_MESSAGE) {
      showStartCaptureMessage();
    }
  });
}

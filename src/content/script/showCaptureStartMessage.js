if (!window.haveCaptureStartMessage) {
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
    if (message.type === "SHOW_CAPTURE_MESSAGE") {
      showStartCaptureMessage();
    }
  });
}

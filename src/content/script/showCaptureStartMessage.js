if (!window.captureOverlayExist) {
  window.captureOverlayExist = true;

  const notifyCaptureStart = () => {
    const overlay = document.createElement("div");
    overlay.textContent = "녹화가 시작되었습니다";
    overlay.className = "recording-overlay";
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1500);
  };

  notifyCaptureStart();
}

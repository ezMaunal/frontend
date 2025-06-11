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

  window.addEventListener("click", (event) => {
    const target = event.target;

    const tagName = target.tagName;
    const textContent = target.textContent;
    const rect = target.getBoundingClientRect();

    const targetElementInfo = {
      tagName: tagName,
      textContent: textContent,
      rect: rect,
    };

    chrome.runtime.sendMessage({ type: "CLICKED", elementData: targetElementInfo });
  });
}

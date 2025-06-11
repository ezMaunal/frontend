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

    const overlay = document.createElement("div");
    overlay.id = "red-outline-box";
    overlay.style.position = "absolute";
    overlay.style.top = `${window.scrollY + rect.top - 6}px`;
    overlay.style.left = `${window.scrollX + rect.left - 6}px`;
    overlay.style.width = `${rect.width + 12}px`;
    overlay.style.height = `${rect.height + 12}px`;
    overlay.style.border = "5px solid rgb(174, 191, 0)";
    overlay.style.zIndex = "999999";
    overlay.style.pointerEvents = "none";
    document.body.appendChild(overlay);

    const targetElementInfo = {
      tagName: tagName,
      textContent: textContent,
      rect: rect,
    };

    chrome.runtime.sendMessage({ type: "CLICKED", elementData: targetElementInfo });
  });
}

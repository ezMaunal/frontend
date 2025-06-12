let currentOverlay = null;
let targetElementInfo = null;

window.addEventListener("mousedown", (event) => {
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
  overlay.style.border = "5px solid rgb(174, 191, 0)";
  overlay.style.zIndex = "999999";
  overlay.style.pointerEvents = "none";
  document.body.appendChild(overlay);
  currentOverlay = overlay;

  targetElementInfo = {
    tagName: target.tagName,
    textContent: target.textContent,
  };
  chrome.runtime
    .sendMessage({
      type: "CLICKED",
      elementData: targetElementInfo,
    })
    .then((res) => {
      if (res.status === "captured") {
        if (currentOverlay) {
          currentOverlay.remove();
          currentOverlay = null;
        }
        targetElementInfo = null;
      } else {
        console.warn("캡처 실패 또는 응답 이상:", res);
      }
    });
});

// window.addEventListener("mouseup", () => {
//   setTimeout(() => {
//     if (currentOverlay) {
//       currentOverlay.remove();
//       currentOverlay = null;
//     }
//     targetElementInfo = null;
//   }, 300);
// });

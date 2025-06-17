export const setCaptureStatus = (value) => {
  chrome.storage.local.set({ isCapturing: value });
};

export const getCaptureStatus = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get("isCapturing", (result) => {
      resolve(result.isCapturing || false);
    });
  });
};

export function resetCapturedSteps(callback) {
  chrome.storage.local.set({ CapturedSteps: [] }, () => {
    if (chrome.runtime.lastError) {
      console.error("CapturedSteps 리셋 실패", chrome.runtime.lastError);
    }
    if (callback) callback();
  });
}

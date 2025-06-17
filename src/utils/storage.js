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

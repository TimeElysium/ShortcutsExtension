let color = "#2b87d3";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
});
chrome.storage.sync.get("shortcutExtensionData", function(data) {
    if (!data) {
        chrome.storage.sync.set({"shortcutExtensionData": {}}, function() {});
    }
});

loadDataToPage();
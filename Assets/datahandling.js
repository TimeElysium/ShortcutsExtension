const scd = {"Manga": ["https://proxer.me/", "https://www.asurascans.com/", "https://reaperscans.com/", "https://kunmanga.com/", "https://mangarockteam.com/home/", "https://flamescans.org/", "https://gogoscans.com/", "https://lhtranslation.net/"],
    "Testing": ["https://www.youtube.com/", "https://www.google.com/"],
    "Tester": []};


//chrome.storage.sync.set({"shortcutExtensionData": scd}, function() {});

function loadDataToPage() {
  chrome.storage.sync.get("shortcutExtensionData", function(data) {
    const shortcuts = data["shortcutExtensionData"];
    
    // Read shortcut data and create needed buttons and shortcuts
    let shortcutsContainer = document.getElementById("container");
    shortcutsContainer.innerHTML = "";

    for (let shortcutName in shortcuts) {
        let shortcutRow = document.createElement("div");
        shortcutRow.className = "shortcutRow";
        shortcutRow.id = shortcutName;
        let content = shortcuts[shortcutName];

        // Create shortcut button
        let shortcutButton = document.createElement("button");
        shortcutButton.innerHTML = shortcutName;
        shortcutButton.className = "shortcutBtn";
        shortcutButton.onclick = function() {
            for (let j = 0; j < content.length; j++) {
            chrome.tabs.create({
                url: content[j]
            });
            }
        }
        shortcutRow.appendChild(shortcutButton);
        // Create shortcut edit button
        let shortcutEditButton = document.createElement("button");
        shortcutEditButton.className = "shortcutEdit";
        shortcutEditButton.innerHTML = "Edit";
        shortcutRow.appendChild(shortcutEditButton);

        // Create shortcut delete button
        let shortcutDeleteButton = document.createElement("button");
        shortcutDeleteButton.className = "shortcutDelete";
        shortcutDeleteButton.innerHTML = "X";
        shortcutDeleteButton.onclick = function() {
            if (confirm("Do you really want to delete this shortcut?")) {
            document.getElementById(shortcutName).remove();
            delete shortcuts[shortcutName]; 
            chrome.storage.sync.set({"shortcutExtensionData": shortcuts}, function() {});
                loadDataToPage();
            } 
        }
        shortcutRow.appendChild(shortcutDeleteButton);

        shortcutsContainer.appendChild(shortcutRow);

        let shortcutRowContent = document.createElement("div");
        shortcutRowContent.className = "shortcutRowContent";
        for (let j = 0; j < content.length; j++) {
            let shortcutAddressInput = document.createElement("input");
            shortcutAddressInput.className = "shortcutAddressInput";
            shortcutAddressInput.type = "text";
            shortcutAddressInput.value = content[j];
            shortcutAddressInput.id = shortcutName + ":" + j.toString();
            shortcutRowContent.appendChild(shortcutAddressInput);

            let shortcutAddressSaver = document.createElement("button");
            shortcutAddressSaver.className = "shortcutAddressSaver";
            shortcutAddressSaver.innerHTML = "&#10003";
            shortcutAddressSaver.onclick = function() {
                shortcuts[shortcutName][j] = document.getElementById(shortcutName + ":" + j.toString()).value;
                chrome.storage.sync.set({"shortcutExtensionData": shortcuts}, function() {});
                loadDataToPage();
            }
            shortcutRowContent.appendChild(shortcutAddressSaver);

            let shortcutAddressDelete = document.createElement("button");
            shortcutAddressDelete.className = "shortcutAddressDelete";
            shortcutAddressDelete.innerHTML = "x";
            shortcutAddressDelete.onclick = function() {
                shortcuts[shortcutName].splice(j, 1);
                chrome.storage.sync.set({"shortcutExtensionData": shortcuts}, function() {});
                loadDataToPage();
            }
            shortcutRowContent.appendChild(shortcutAddressDelete);
        }
        shortcutsContainer.appendChild(shortcutRowContent);

        let newShortcutAddressButton = document.createElement("button");
        newShortcutAddressButton.className = "shortcutAddressAdder";
        newShortcutAddressButton.innerHTML = "Create new Shortcut";
        newShortcutAddressButton.onclick = function() {
            shortcuts[shortcutName].push("");
            chrome.storage.sync.set({"shortcutExtensionData": shortcuts}, function() {});
            loadDataToPage();
        }
        shortcutsContainer.appendChild(newShortcutAddressButton);
    }
    
    let newShortcutButton = document.createElement("button");
    newShortcutButton.id = "newShortcutButton";
    newShortcutButton.innerHTML = "Create new Shortcut";
    newShortcutButton.onclick = function() {
        let newShortcut = prompt("Enter name of new shortcut:", "shortcutName");
        if (!(newShortcut in shortcuts)) {
            shortcuts[newShortcut] = [];
            chrome.storage.sync.set({"shortcutExtensionData": shortcuts}, function() {});
            loadDataToPage();
        }
    }
    shortcutsContainer.appendChild(newShortcutButton);
  });
}
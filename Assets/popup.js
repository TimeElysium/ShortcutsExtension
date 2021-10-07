const scd = {"Manga": ["https://proxer.me/", "https://www.asurascans.com/", "https://reaperscans.com/", "https://kunmanga.com/", "https://mangarockteam.com/home/", "https://flamescans.org/", "https://gogoscans.com/", "https://lhtranslation.net/"],
    "Testing": ["https://www.youtube.com/", "https://www.google.com/"],
    "Tester": []};


//chrome.storage.sync.set({"shortcutExtensionData": scd}, function() {});

function loadDataToPage() {
  chrome.storage.sync.get("shortcutExtensionData", function(data) {
    const shortcuts = data["shortcutExtensionData"];
    
    // Read shortcut data and create needed buttons and shortcuts
    let shortcutsContainer = document.getElementById("container");
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
          delete shortcuts[shortcutName]; // will be modified later on
        } 
      }
      shortcutRow.appendChild(shortcutDeleteButton);

      shortcutsContainer.appendChild(shortcutRow);
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
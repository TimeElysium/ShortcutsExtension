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
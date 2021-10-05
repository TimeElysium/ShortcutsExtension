// Read shortcut data and create needed buttons and shortcuts
let shortcutsContainer = document.getElementById("shortcuts-content");
let shortcutsContent = JSON.parse(shortcuts);
for (let i = 0; i < shortcutsContent.length; i++) {
  let shortcutButton = document.createElement("button");
  shortcutButton.innerHTML = shortcutsContent[i].name;
  shortcutButton.onclick = function() {
    for (let j = 0; j < shortcutsContent[i].sites.length; j++) {
      chrome.tabs.create({
        url: shortcutsContent[i].sites[j]
      });
    }
  }
  shortcutsContainer.appendChild(shortcutButton);
}





/*
mangaButton.addEventListener("click", async () => {
    chrome.tabs.create({
        url: 'https://www.youtube.com'
    });
});

testingButton.addEventListener("click", async () => {
    
});

let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
});

function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
}
*/
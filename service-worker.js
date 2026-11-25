chrome.action.onClicked.addListener((tab) => {
  if (tab.windowId === undefined) {
    console.error("Cannot open the side panel without a browser window.");
    return;
  }

  chrome.sidePanel.open({ windowId: tab.windowId }).catch((error) => {
    console.error("Failed to open the side panel.", error);
  });
});

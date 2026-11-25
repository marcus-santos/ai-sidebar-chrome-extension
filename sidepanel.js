const assistantSelect = document.querySelector("#assistant-select");
const panels = Array.from(document.querySelectorAll("[data-service]"));
const assistantNames = new Set(panels.map((panel) => panel.dataset.service));
let selectionChanged = false;

function selectAssistant(name) {
  assistantSelect.value = name;
  for (const panel of panels) {
    const isSelected = panel.dataset.service === name;
    panel.hidden = !isSelected;
  }
}

assistantSelect.addEventListener("change", async () => {
  selectionChanged = true;
  const selectedAssistant = assistantSelect.value;
  selectAssistant(selectedAssistant);

  try {
    await chrome.storage.local.set({ selectedAssistant });
  } catch (error) {
    console.error("Failed to save the selected assistant.", error);
  }
});

async function restoreAssistant() {
  try {
    const { selectedAssistant } = await chrome.storage.local.get("selectedAssistant");
    if (!selectionChanged) {
      const assistant = assistantNames.has(selectedAssistant) ? selectedAssistant : "chatgpt";
      selectAssistant(assistant);
    }
  } catch (error) {
    console.error("Failed to restore the selected assistant.", error);
  }
}

restoreAssistant();

const assistantToggle = document.querySelector("#assistant-toggle");
const assistantMenu = document.querySelector("#assistant-menu");
const currentAssistantIcon = document.querySelector("#current-assistant-icon");
const assistantOptions = Array.from(document.querySelectorAll(".assistant-option"));
const panels = Array.from(document.querySelectorAll("[data-service]"));
const assistantNames = new Set(panels.map((panel) => panel.dataset.service));
let selectionChanged = false;

function getAssistantName(name) {
  return assistantOptions.find((option) => option.dataset.service === name)?.textContent.trim();
}

function openMenu({ focusFirst = false } = {}) {
  assistantToggle.setAttribute("aria-expanded", "true");
  assistantMenu.setAttribute("aria-hidden", "false");
  assistantMenu.inert = false;
  assistantMenu.classList.add("is-open");

  if (focusFirst) {
    assistantOptions[0].focus();
  }
}

function closeMenu({ restoreFocus = false } = {}) {
  assistantToggle.setAttribute("aria-expanded", "false");
  assistantMenu.setAttribute("aria-hidden", "true");
  assistantMenu.inert = true;
  assistantMenu.classList.remove("is-open");

  if (restoreFocus) {
    assistantToggle.focus();
  }
}

function selectAssistant(name) {
  const selectedOption = assistantOptions.find((option) => option.dataset.service === name);
  currentAssistantIcon.src = selectedOption.querySelector("img").getAttribute("src");
  assistantToggle.setAttribute(
    "aria-label",
    `Abrir menu de assistentes. Atual: ${getAssistantName(name)}`
  );

  for (const option of assistantOptions) {
    option.setAttribute("aria-checked", String(option === selectedOption));
  }

  for (const panel of panels) {
    const isSelected = panel.dataset.service === name;
    panel.hidden = !isSelected;
  }
}

assistantToggle.addEventListener("click", (event) => {
  if (assistantToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
  } else {
    openMenu({ focusFirst: event.detail === 0 });
  }
});

assistantToggle.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    openMenu({ focusFirst: true });
  }
});

for (const option of assistantOptions) {
  option.addEventListener("click", async (event) => {
    const selectedAssistant = option.dataset.service;
    const keyboardInitiated = event.detail === 0;
    selectionChanged = true;
    selectAssistant(selectedAssistant);
    closeMenu({ restoreFocus: keyboardInitiated });

    try {
      await chrome.storage.local.set({ selectedAssistant });
    } catch (error) {
      console.error("Failed to save the selected assistant.", error);
    }
  });

  option.addEventListener("keydown", (event) => {
    const currentIndex = assistantOptions.indexOf(option);
    let nextIndex;

    switch (event.key) {
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % assistantOptions.length;
        break;
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + assistantOptions.length) % assistantOptions.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = assistantOptions.length - 1;
        break;
      case "Escape":
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        return;
      case "Tab":
        setTimeout(() => closeMenu(), 0);
        return;
      default:
        return;
    }

    event.preventDefault();
    assistantOptions[nextIndex].focus();
  });
}

document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest(".assistant-switcher")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && assistantToggle.getAttribute("aria-expanded") === "true") {
    closeMenu({ restoreFocus: true });
  }
});

assistantMenu.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu({ restoreFocus: true });
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
    if (!selectionChanged) {
      selectAssistant("chatgpt");
    }
  }
}

restoreAssistant();

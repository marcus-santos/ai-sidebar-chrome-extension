# AI Sidebar

A lightweight Chromium Manifest V3 extension (built for Brave, Chrome, Edge, and other Chromium-based browsers) that embeds **ChatGPT**, **Claude**, and **Gemini** directly into the browser's native side panel—giving you an integrated, side-by-side AI workspace without leaving your active tab.

## Features

- **Multi-Provider Support:** Seamlessly switch between **ChatGPT** (`chatgpt.com`), **Claude** (`claude.ai`), and **Gemini** (`gemini.google.com`) inside a single side panel.
- **Floating Switcher Menu:** Compact floating assistant selector on the right edge of the panel that overlays the view without squeezing or reflowing the chat layout.
- **Persistent State:** Automatically saves your last selected AI provider in browser storage and restores it the next time you open the panel.
- **True Open/Close Toggle:** Clicking the extension toolbar icon—or pressing the keyboard shortcut—opens the side panel when closed and closes it when already open.
- **Iframe Header Handling:** Uses `declarativeNetRequest` (`rules.json`) to strip `X-Frame-Options` and `Content-Security-Policy` headers on supported AI and authentication domains so web interfaces render properly inside the panel.

---

## Installation

### Option 1: Load Unpacked (Recommended for Development)

> **Note:** When loaded as an unpacked extension, the browser reads files directly from this folder. Keep the repository in a permanent directory (e.g., `~/projects/ai-sidebar`) so it isn't removed on browser restart.

1. Open `brave://extensions` (or `chrome://extensions`) in your browser.
2. Enable **Developer mode** using the toggle in the top-right corner.
3. Click **Load unpacked** and select the root directory of this repository (where `manifest.json` is located).
4. *(Optional)* Click the puzzle-piece **Extensions** icon in the toolbar and pin **AI Sidebar** for quick access.

### Option 2: Pack as `.crx` (Permanent Local Install)

If you want the extension stored permanently inside your browser profile without depending on an external folder:

1. Open `brave://extensions` (or `chrome://extensions`) with **Developer mode** enabled.
2. Click **Pack extension**, select this repository's root folder, and generate the `.crx` package.
3. Drag and drop the generated `.crx` file onto the extensions page and confirm installation.

---

## Usage & Shortcuts

- **Open / Close Panel:** Click the **AI Sidebar** icon in your browser toolbar, or press **`Ctrl+Shift+Y`** (`Command+Shift+Y` on macOS).
- **Customize Shortcut:** Visit `brave://extensions/shortcuts` (or `chrome://extensions/shortcuts`), find **AI Sidebar**, and bind any preferred key combination (such as `Alt+S` or `Alt+A`).
- **Switch AI Providers:** Click the floating assistant button on the right side of the panel to switch between ChatGPT, Claude, and Gemini.

---

## Troubleshooting Login & Cookies

If a provider (especially **ChatGPT** or **Claude**) refuses to connect or fails to stay logged in inside the side panel:

1. Open the provider (`https://chatgpt.com`, `https://claude.ai`, or `https://gemini.google.com`) in a **regular browser tab** and sign in normally.
2. In **Brave**, click the **Brave Shields** (lion) icon in the address bar while on the provider's site, expand **Advanced controls**, and allow cookies (`All cookies allowed`) if strict third-party cookie blocking prevents the iframe from reading your active session.
3. Reload the extension in `brave://extensions` and reopen the side panel.

---

## Project Structure

```text
├── manifest.json         # Manifest V3 config, permissions, and host access
├── service-worker.js     # Manages side panel state and open/close toggle logic
├── sidepanel.html        # Side panel layout and provider iframe container
├── sidepanel.css         # Dark-mode styling and floating switcher UI
├── sidepanel.js          # Provider switching, persistence, and port messaging
└── rules.json            # declarativeNetRequest header rules for iframe embedding

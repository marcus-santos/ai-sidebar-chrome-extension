# AI Sidebar

A Chromium Manifest V3 extension that opens ChatGPT, Claude, and Gemini in a
browser side panel.

## Load the extension

1. Open `chrome://extensions` in Chromium.
2. Enable **Developer mode**.
3. Select **Load unpacked** and choose this repository directory.
4. Click the extension icon to open or close the side panel.

The `Ctrl+Shift+Y` shortcut (or `Command+Shift+Y` on macOS) toggles the panel
too. You can change it at `chrome://extensions/shortcuts`.

Use the floating assistant button on the right side of the panel to switch
between the three assistants. Its compact menu overlays the page rather than
resizing it. Your last selection is saved in the browser and restored the next
time the panel opens.

## Embedding limitation

The panel uses iframes for `https://chatgpt.com`, `https://claude.ai`, and
`https://gemini.google.com`. A provider may block iframe embedding through its
Content Security Policy or `X-Frame-Options`; the extension does not bypass
those browser-enforced protections.

The extension also declares the `declarativeNetRequest` permission and registers
`rules.json`, which is currently an empty ruleset.

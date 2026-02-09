# Wiki SOP Enhancer

## Why this exists

Clinical SOPs in our wiki are safety-critical.
This browser extension provides **non-persistent visual aids** to reduce the risk of missed steps during review and QA.

It does **NOT**:
- modify wiki content
- save any state
- store patient or user data

Everything resets on page reload by design.

---

## What it does

When enabled on our internal wiki, the extension can:

- Add **checkboxes** to top-level SOP list items  
  → Checking an item visually strikes the entire step (including sub-steps)

- Add a **temporary note area** at the top of the page  
  → For short, local notes during review (cleared on refresh)

Both features are:
- opt-in
- local to your browser
- fully reversible

---

## Safety principles

- ❌ No persistence
- ❌ No hidden state
- ❌ No backend communication
- ✅ Fail-open (if anything breaks, the wiki remains unchanged)

This tool is intentionally *assistive only*.

---

## Installation (Edge / Chrome)

1. Download and unzip the folder
2. Open:
   - Edge: `edge://extensions`
   - Chrome: `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the unzipped folder

---

## Daily use

- Click the extension icon in the browser toolbar
- Enable:
  - “Checklist”
  - “Note area”
- Reload the wiki page

That’s it.

---

## Uninstalling

- Open the extensions page
- Click **Remove**

No system changes remain.

---

## License

MIT

---

## Contact

Maintainer: Emin Tavlayan  
Feedback and improvement ideas are [welcome](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

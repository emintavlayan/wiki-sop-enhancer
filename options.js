// Load settings from storage
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(
    { enableChecklist: true, enableNotes: true },
    (items) => {
      document.getElementById("enableChecklist").checked = items.enableChecklist;
      document.getElementById("enableNotes").checked = items.enableNotes;
    }
  );
});

// Save settings when changed
document.getElementById("enableChecklist").addEventListener("change", (e) => {
  chrome.storage.sync.set({ enableChecklist: e.target.checked });
});
document.getElementById("enableNotes").addEventListener("change", (e) => {
  chrome.storage.sync.set({ enableNotes: e.target.checked });
});

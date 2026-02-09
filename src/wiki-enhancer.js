// ======================================================
//  Wiki Enhancer (Extension Version)
//  Author: Emin Tavlayan /eta
//  Purpose:
//    Apply checklist and/or note area automatically
//    based on extension settings.
//
//  Safety:
//    - No persistence
//    - No UI buttons
//    - Fail-open
// ======================================================


// === CSS Hook Classnames ===============================
const CLASS_CHECKED   = "checked";
const CLASS_CONTAINER = "checkbox-container";
const CLASS_INPUT     = "task-checkbox";
const CLASS_CHECKMARK = "checkmark";


// === Internal Flags ====================================
const DATA_LI_INITIALIZED    = "etaChecklistInitialized";
const DATA_SCOPE_INITIALIZED = "etaChecklistScopeInitialized";
const NOTE_AREA_ID           = "eta-note-area";


// === Utilities =========================================
function getParserOutputRoot() {
    return document.querySelector("#mw-content-text .mw-parser-output");
}


// ======================================================
//  NOTE AREA
// ======================================================

function injectNoteArea() {
    if (document.getElementById(NOTE_AREA_ID)) return;

    const root = getParserOutputRoot();
    if (!root) return;

    const wrapper = document.createElement("div");
    wrapper.id = NOTE_AREA_ID;

    wrapper.style.border = "1px solid #ccc";
    wrapper.style.padding = "8px";
    wrapper.style.margin = "0 0 12px 0";
    wrapper.style.background = "#f9f9f9";

    const textarea = document.createElement("textarea");
    textarea.rows = 10;
    textarea.style.width = "100%";
    textarea.style.boxSizing = "border-box";
    textarea.placeholder = "Notes (cleared on refresh)";

    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.textContent = "Clear";
    clearBtn.style.marginTop = "6px";
    clearBtn.addEventListener("click", () => textarea.value = "");

    wrapper.appendChild(textarea);
    wrapper.appendChild(document.createElement("br"));
    wrapper.appendChild(clearBtn);

    root.insertBefore(wrapper, root.firstChild);
}


// ======================================================
//  CHECKLIST
// ======================================================

function enableChecklist(root) {
    if (!root || root.dataset[DATA_SCOPE_INITIALIZED]) return;

    root.dataset[DATA_SCOPE_INITIALIZED] = "true";

    root.addEventListener("change", (ev) => {
        const input = ev.target;
        if (!(input instanceof HTMLInputElement)) return;
        if (!input.classList.contains(CLASS_INPUT)) return;

        const li = input.closest("li");
        if (!li) return;

        li.classList.toggle(CLASS_CHECKED, input.checked);
    });

    const lists = Array.from(root.querySelectorAll("ol, ul"))
        .filter(list => !list.closest("li"))
        .filter(list => !list.closest("table"));

    lists.forEach(list => {
        list.querySelectorAll(":scope > li").forEach(li => {
            if (li.dataset[DATA_LI_INITIALIZED]) return;
            li.dataset[DATA_LI_INITIALIZED] = "true";

            const label = document.createElement("label");
            label.className = CLASS_CONTAINER;

            const input = document.createElement("input");
            input.type = "checkbox";
            input.className = CLASS_INPUT;
            input.setAttribute("aria-label", "Mark step as completed");

            const mark = document.createElement("span");
            mark.className = CLASS_CHECKMARK;

            label.appendChild(input);
            label.appendChild(mark);

            li.insertBefore(label, li.firstChild);
        });
    });
}


// ======================================================
//  ENTRY POINT (EXTENSION CONTROLLED)
// ======================================================

(function initEnhancer() {
    chrome.storage.sync.get(
        { enableChecklist: true, enableNotes: true },
        (opts) => {

            const root = document.querySelector("#mw-content-text");
            if (!root) return;

            if (opts.enableNotes) {
                injectNoteArea();
            }

            if (opts.enableChecklist) {
                enableChecklist(root);

                // Re-run checklist on dynamic content updates
                const observer = new MutationObserver(() => {
                    enableChecklist(root);
                });

                observer.observe(root, {
                    childList: true,
                    subtree: true
                });
            }
        }
    );
})();

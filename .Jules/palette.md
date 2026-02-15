## 2025-02-15 - DaisyUI Dropdown Triggers
**Learning:** DaisyUI's dropdown pattern often uses `div role="button"` which lacks native keyboard semantics and screen reader support compared to a real `<button>`.
**Action:** Always replace `div role="button"` in dropdown triggers with `<button>` elements, ensuring `tabIndex={0}` is preserved if needed for CSS focus, or rely on button focus. Add `aria-label` to provide context.

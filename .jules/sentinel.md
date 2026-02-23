## 2025-05-27 - [Exposed Internal State in Production]
**Vulnerability:** The `window.shogun` and `window.gun` objects were exposed on the global `window` object in production builds. This allowed any user to access the internal state of the application, including the database instance and user credentials.
**Learning:** Debugging tools left in production code can inadvertently expose sensitive internal state and facilitate attacks. Developers often add these for convenience but forget to strip them out.
**Prevention:** Always wrap debug code in `if (import.meta.env.DEV) { ... }` or similar environment checks to ensure it is stripped from production builds.

## 2026-02-19 - [Hardcoded Debug Flags in Production]
**Vulnerability:** The `enableGunDebug` flag was hardcoded to `true` in `src/App.tsx`, potentially exposing verbose debug logs and internal state in production builds.
**Learning:** Hardcoded boolean flags for debug features are easy to overlook and can leak sensitive information or degrade performance in production.
**Prevention:** Use `import.meta.env.DEV` (or equivalent environment checks) for any debug-related configuration to ensure it is automatically disabled in production builds.

## 2026-10-27 - [Implicit Reliance on Window Extensions]
**Vulnerability:** The application blindly called `window.ShogunRelays.forceListUpdate()` without checking if the object existed. This creates a brittleness where failure of an external component (extension or package) crashes the feature, and could potentially be exploited if the namespace is polluted.
**Learning:** Relying on global window objects injected by side-effects or extensions is fragile and unsafe.
**Prevention:** Always guard access to global window objects with existence checks (e.g., `if (window.ShogunRelays) ...`) and handle their absence gracefully.

## 2026-10-27 - [Unsanitized Console Logs in Production]
**Vulnerability:** Sensitive authentication results and internal state (relay lists) were being logged to `console.log` and `console.error` without environment checks. `terser` (the default minifier) does not strip these by default.
**Learning:** Assuming that build tools automatically strip console logs is a common mistake. Explicitly wrapping sensitive logs in `if (import.meta.env.DEV)` is the most reliable way to prevent leakage.
**Prevention:** Wrap all debug logs in environment checks or configure the bundler/minifier to drop console statements explicitly.

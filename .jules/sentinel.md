## 2025-05-27 - [Exposed Internal State in Production]
**Vulnerability:** The `window.shogun` and `window.gun` objects were exposed on the global `window` object in production builds. This allowed any user to access the internal state of the application, including the database instance and user credentials.
**Learning:** Debugging tools left in production code can inadvertently expose sensitive internal state and facilitate attacks. Developers often add these for convenience but forget to strip them out.
**Prevention:** Always wrap debug code in `if (import.meta.env.DEV) { ... }` or similar environment checks to ensure it is stripped from production builds.

## 2026-02-19 - [Hardcoded Debug Flags in Production]
**Vulnerability:** The `enableGunDebug` flag was hardcoded to `true` in `src/App.tsx`, potentially exposing verbose debug logs and internal state in production builds.
**Learning:** Hardcoded boolean flags for debug features are easy to overlook and can leak sensitive information or degrade performance in production.
**Prevention:** Use `import.meta.env.DEV` (or equivalent environment checks) for any debug-related configuration to ensure it is automatically disabled in production builds.

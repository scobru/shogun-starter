## 2025-05-27 - [Exposed Internal State in Production]
**Vulnerability:** The `window.shogun` and `window.gun` objects were exposed on the global `window` object in production builds. This allowed any user to access the internal state of the application, including the database instance and user credentials.
**Learning:** Debugging tools left in production code can inadvertently expose sensitive internal state and facilitate attacks. Developers often add these for convenience but forget to strip them out.
**Prevention:** Always wrap debug code in `if (import.meta.env.DEV) { ... }` or similar environment checks to ensure it is stripped from production builds.

## 2026-02-19 - [Hardcoded Debug Flags in Production]
**Vulnerability:** The `enableGunDebug` flag was hardcoded to `true` in `src/App.tsx`, potentially exposing verbose debug logs and internal state in production builds.
**Learning:** Hardcoded boolean flags for debug features are easy to overlook and can leak sensitive information or degrade performance in production.
**Prevention:** Use `import.meta.env.DEV` (or equivalent environment checks) for any debug-related configuration to ensure it is automatically disabled in production builds.

## 2025-02-19 - [Missing Content Security Policy in dApp]
**Vulnerability:** The application lacked a Content Security Policy (CSP), leaving it vulnerable to XSS attacks. In a decentralized application where users interact with untrusted relays and potential malicious content, this is a significant risk.
**Learning:** Decentralized apps often require permissive networking (fetching from multiple relays), which can make configuring CSP challenging. However, a baseline CSP is critical for defense-in-depth.
**Prevention:** Implement a strict CSP that whitelists allowed sources for scripts, styles, and connections. Use `connect-src` to restrict relay connections if possible, or monitor them.

## 2025-05-27 - [Sensitive Data Leakage via Console Logs]
**Vulnerability:** User authentication data and relay configurations were being logged to the console in production builds via `console.log`.
**Learning:** Developers often use console logs for debugging during development but forget to remove or shield them before deployment. Even "benign" logs can leak sensitive user information or internal architecture details.
**Prevention:** Establish a pattern of wrapping all debug logs in `if (import.meta.env.DEV) { ... }` or use a logging utility that automatically strips logs in production.

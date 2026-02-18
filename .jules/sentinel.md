## 2025-05-27 - [Exposed Internal State in Production]
**Vulnerability:** The `window.shogun` and `window.gun` objects were exposed on the global `window` object in production builds. This allowed any user to access the internal state of the application, including the database instance and user credentials.
**Learning:** Debugging tools left in production code can inadvertently expose sensitive internal state and facilitate attacks. Developers often add these for convenience but forget to strip them out.
**Prevention:** Always wrap debug code in `if (import.meta.env.DEV) { ... }` or similar environment checks to ensure it is stripped from production builds.

## 2025-05-27 - [Hardcoded Debug Flags in Production]
**Vulnerability:** The `enableGunDebug` flag was hardcoded to `true` in `src/App.tsx`, enabling debug logging and potentially exposing internal state in production builds.
**Learning:** Hardcoded configuration flags, especially those related to debugging, can easily be overlooked and deployed to production.
**Prevention:** Use environment variables like `import.meta.env.DEV` to dynamically control debug features, ensuring they are automatically disabled in production.

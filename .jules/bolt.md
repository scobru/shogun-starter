## 2024-05-22 - [React Context Performance Pattern]
**Learning:** The `ShogunButtonProvider` from `shogun-button-react` takes an `options` object prop. In `App.tsx`, this object was being recreated on every render. Since this is a Context Provider, unstable props can cause all consumers to re-render, or trigger internal re-initialization logic within the SDK.
**Action:** Always memoize configuration objects passed to Context Providers, especially when using third-party SDKs where internal implementation details (like `React.memo` usage) are unknown.

## 2025-02-18 - [Stale-While-Revalidate for Gun Relays]
**Learning:** The application's initialization was blocked by a network request to fetch Gun relay peers, causing a delay in Time to Interactive. Since relay lists are relatively stable configuration, they can be cached in `localStorage` to allow immediate startup for returning users.
**Action:** Implement "Stale-While-Revalidate" pattern for critical configuration data fetched at startup. Initialize state from `localStorage` first, then update it in the background without blocking the UI or re-initializing the core application unnecessarily.

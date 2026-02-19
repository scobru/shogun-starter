## 2024-05-22 - [React Context Performance Pattern]
**Learning:** The `ShogunButtonProvider` from `shogun-button-react` takes an `options` object prop. In `App.tsx`, this object was being recreated on every render. Since this is a Context Provider, unstable props can cause all consumers to re-render, or trigger internal re-initialization logic within the SDK.
**Action:** Always memoize configuration objects passed to Context Providers, especially when using third-party SDKs where internal implementation details (like `React.memo` usage) are unknown.

## 2025-02-18 - [Stale-While-Revalidate for Relays]
**Learning:** Blocking the UI for decentralized peer discovery significantly degrades perceived performance (1-2s delay).
**Action:** Always implement Stale-While-Revalidate for peer lists, initializing from local storage immediately to achieve 0ms TTI for returning users.

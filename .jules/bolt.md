## 2024-05-22 - [React Context Performance Pattern]
**Learning:** The `ShogunButtonProvider` from `shogun-button-react` takes an `options` object prop. In `App.tsx`, this object was being recreated on every render. Since this is a Context Provider, unstable props can cause all consumers to re-render, or trigger internal re-initialization logic within the SDK.
**Action:** Always memoize configuration objects passed to Context Providers, especially when using third-party SDKs where internal implementation details (like `React.memo` usage) are unknown.

## 2024-05-22 - [Relay Loading Bottleneck]
**Learning:** The application was blocking initial UI rendering on a network request to `shogun-relays.forceListUpdate()`. This caused a noticeable delay on startup.
**Action:** Implemented Stale-While-Revalidate pattern using `localStorage` to show cached relays immediately while updating in the background. Always check for blocking async calls in `useEffect` during startup.

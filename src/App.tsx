import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  ShogunButtonProvider,
  ShogunButton,
  useShogun,
} from "shogun-button-react";
import { shogunConnector } from "shogun-button-react";
import type { ShogunCore } from "shogun-core";
import Gun from "gun";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import ExampleContent from "./components/ExampleContent";
import logo from "/logo.svg";

import "./index.css";
import "shogun-relays";

// Extend window interface for ShogunRelays
declare global {
  interface Window {
    ShogunRelays: {
      forceListUpdate: () => Promise<string[]>;
    };
    shogunDebug?: {
      clearAllData: () => void;
      sdk: ShogunCore;
      gun: any;
      relays: string[];
    };
    gun?: any;
    shogun?: ShogunCore;
  }
}

interface MainAppProps {
  shogun?: ShogunCore;
  location?: ReturnType<typeof useLocation>;
}

// Main component that uses the auth context
const MainApp: React.FC<MainAppProps> = () => {
  const { isLoggedIn } = useShogun();

  return (
    <div className="app-shell">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 btn btn-sm btn-primary"
      >
        Skip to content
      </a>
      <header className="navbar-custom">
        <div className="navbar-inner">
          <div className="navbar-title">
            <img src={logo} alt="Shogun Starter" className="w-12 h-12" />
            <div>
              <span className="font-semibold">Shogun Starter</span>
              <p className="navbar-subtitle">
                Decentralized application template
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="app-main" id="main-content">
        <div className="flex justify-center mb-6">
          <div className={`badge-custom ${isLoggedIn ? "success" : "error"}`}>
            <span className="badge-dot" />
            <span>{isLoggedIn ? "Authenticated" : "Not authenticated"}</span>
          </div>
        </div>

        {/* Authentication Card */}
        <div className="card content-card mb-6 p-8">
          <div className="card-body">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Authentication</h2>
              <p className="text-secondary">
                Connect with your preferred method and start building.
              </p>
            </div>
            <div className="flex justify-center">
              <ShogunButton />
            </div>
          </div>
        </div>

        {/* Example Content - Replace this with your app content */}
        <ExampleContent />
      </main>

      <footer className="w-full py-5 px-1 mt-auto">
        <div className="w-full">
          <ul className="menu menu-horizontal w-full">
            <div className="flex justify-center items-center gap-2 text-sm w-full">
              <div className="text-center">
                <a href="https://github.com/scobru/shogun-starter" target="_blank" rel="noreferrer" className="link">
                  Fork me
                </a>
              </div>
              <span>·</span>
              <div className="flex justify-center items-center gap-2">
                <p className="m-0 text-center">
                  Built with 
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  at
                </p>
                <a
                  className="flex justify-center items-center gap-1"
                  href="https://shogun-eco.xyz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="link">Shogun Ecosystem</span>
                </a>
                <span>·</span>
                <span className="text-center">by <a href="https://github.com/scobru" target="_blank" rel="noreferrer" className="link">scobru</a></span>
              </div>
              <span>·</span>
              <div className="text-center">
                <a href="https://t.me/shogun_eco" target="_blank" rel="noreferrer" className="link">
                  Support
                </a>
              </div>
            </div>
          </ul>
        </div>
      </footer>
    </div>
  );
};

// Wrapper for MainApp that provides access to useLocation
const MainAppWithLocation: React.FC<{ shogun: ShogunCore }> = () => {
  return <MainApp />;
};

interface ShogunAppProps {
  shogun: ShogunCore;
}

function ShogunApp({ shogun }: ShogunAppProps) {
  // Memoize provider options to prevent unnecessary re-renders in ShogunButtonProvider
  const providerOptions = useMemo(() => ({
    appName: "Shogun Starter App",
    theme: "dark",
    showWebauthn: true,
    showMetamask: true,
    showNostr: true,
    showZkProof: true,
    enableGunDebug: import.meta.env.DEV,
    enableConnectionMonitoring: true,
  }), []);

  // Memoize callback functions to ensure stable references
  const handleLoginSuccess = useCallback((result: any) => {
    console.log("Login success:", result);
  }, []);

  const handleError = useCallback((error: string | Error) => {
    console.error("Auth error:", error);
  }, []);

  return (
    <Router>
      <ShogunButtonProvider
        core={shogun}
        options={providerOptions}
        onLoginSuccess={handleLoginSuccess}
        onSignupSuccess={handleLoginSuccess}
        onError={handleError}
      >
        <Routes>
          <Route
            path="/"
            element={<MainAppWithLocation shogun={shogun} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ShogunButtonProvider>
    </Router>
  );
}

function App() {
  const [sdk, setSdk] = useState<ShogunCore | null>(null);

  // Initialize relays from localStorage if available (SWR pattern)
  // This allows the app to load immediately with cached relays while fetching updates in the background
  const [relays, setRelays] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('shogun-relays');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Failed to parse cached relays", e);
    }
    return [];
  });

  // If we have cached relays, we don't need to block the UI (isLoadingRelays = false)
  const [isLoadingRelays, setIsLoadingRelays] = useState(() => relays.length === 0);

  // First effect: fetch relays asynchronously
  useEffect(() => {
    async function fetchRelays() {
      try {
        // Only show loading state if we have no cached relays
        if (relays.length === 0) {
          setIsLoadingRelays(true);
        }

        const fetchedRelays = await window.ShogunRelays.forceListUpdate();

        console.log("Fetched relays:", fetchedRelays);

        // Use fetched relays, or fallback to default if empty
        const peersToUse =
          fetchedRelays && fetchedRelays.length > 0
            ? fetchedRelays
            : ["https://peer.wallie.io/gun"];

        // Cache the fresh relays for next time
        localStorage.setItem('shogun-relays', JSON.stringify(peersToUse));

        // Only update state if the relays have actually changed to avoid unnecessary re-initialization
        setRelays(prev => {
          if (JSON.stringify(prev) !== JSON.stringify(peersToUse)) {
            console.log("Relays updated, refreshing SDK...");
            return peersToUse;
          }
          return prev;
        });
      } catch (error) {
        console.error("Error fetching relays:", error);
        // Fallback to default peer if we have nothing at all
        setRelays(prev => {
          if (prev.length > 0) return prev;
          return ["https://peer.wallie.io/gun"];
        });
      } finally {
        setIsLoadingRelays(false);
      }
    }

    fetchRelays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Second effect: initialize ShogunCore only after relays are loaded
  useEffect(() => {
    if (isLoadingRelays || relays.length === 0) {
      return; // Wait for relays to be loaded
    }

    console.log("relays", relays);

    // Use shogunConnector to initialize ShogunCore
    const initShogun = async () => {
      const gun = Gun({
        peers: relays,
        localStorage: false,
        radisk: false,
      });

      const { core: shogunCore } = await shogunConnector({
        appName: "Shogun Starter App",
        // Pass explicit Gun instance
        gunInstance: gun,
        // Authentication method configurations
        web3: { enabled: true },
        webauthn: {
          enabled: true,
          rpName: "Shogun Starter App",
        },
        nostr: { enabled: true },
        zkproof: { enabled: true },
        // UI feature toggles
        showWebauthn: true,
        showNostr: true,
        showMetamask: true,
        showZkProof: true,
        // Advanced features
        enableGunDebug: import.meta.env.DEV,
        enableConnectionMonitoring: true,
        defaultPageSize: 20,
        connectionTimeout: 10000,
        debounceInterval: 100,
      });

      // Add debug methods to window for testing (only in development)
      if (import.meta.env.DEV && typeof window !== "undefined") {
        // Wait a bit for Gun to initialize
        setTimeout(() => {
          console.log("ShogunCore after initialization:", shogunCore);
          const gunInstance = shogunCore.gun;
          console.log("Gun instance found:", gunInstance);

          window.shogunDebug = {
            clearAllData: () => {
              if (shogunCore.storage) {
                shogunCore.storage.clearAll();
              }
              if (typeof sessionStorage !== "undefined") {
                sessionStorage.removeItem("gunSessionData");
              }
            },
            sdk: shogunCore,
            gun: gunInstance,
            relays: relays,
          };

          window.gun = gunInstance;
          window.shogun = shogunCore;
          console.log("Debug methods available at window.shogunDebug");
          console.log("Available debug methods:", Object.keys(window.shogunDebug));
          console.log("Initialized with relays:", relays);
        }, 1000);
      }

      setSdk(shogunCore);
    };

    initShogun();
  }, [relays, isLoadingRelays]);


  if (isLoadingRelays || !sdk) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-4">
        <span className="loading loading-lg"></span>
        <p className="text-secondary">
          {isLoadingRelays ? "Loading relays..." : "Initializing Shogun..."}
        </p>
      </div>
    );
  }

  return <ShogunApp shogun={sdk} />;
}

export default App;


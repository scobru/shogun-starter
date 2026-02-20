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
import ExampleContent from "./components/ExampleContent";
import { Shell } from "./components/layout/Shell";

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
    <Shell>
      <div className="flex flex-col gap-12">
        <div className="flex justify-start">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${isLoggedIn
            ? "bg-primary-container text-on-primary-container border-primary/20"
            : "bg-surface-variant text-on-surface-variant border-outline/20"}`}>
            <span className={`w-2 h-2 rounded-full ${isLoggedIn ? "bg-primary" : "bg-outline"}`} />
            <span>{isLoggedIn ? "Authenticated" : "Not authenticated"}</span>
          </div>
        </div>

        {/* Authentication Card */}
        <div className="bg-surface p-8 md:p-10 rounded-[28px] border border-outline/10 hover:border-primary/40 transition-colors shadow-elevation-1">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-on-surface font-display">Authentication</h2>
              <p className="text-on-surface-variant text-lg">
                Connect with your preferred method and start building.
              </p>
            </div>
            <div className="flex justify-start">
              <ShogunButton />
            </div>
          </div>
        </div>

        {/* Example Content */}
        <div className="bg-surface p-8 md:p-10 rounded-[28px] border border-outline/10 hover:border-primary/40 transition-colors shadow-elevation-1">
           <ExampleContent />
        </div>

        {/* Footer */}
        <footer className="border-t border-outline/20 pt-12 pb-16 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-variant flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">local_florist</span>
                    </div>
                    <span className="text-sm text-on-surface-variant font-medium">© 2024 Shogun Starter</span>
                </div>
                <div className="flex gap-10">
                    <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="https://github.com/scobru/shogun-starter" target="_blank" rel="noreferrer">GitHub</a>
                    <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="https://shogun-eco.xyz/" target="_blank" rel="noreferrer">Ecosystem</a>
                    <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="https://t.me/shogun_eco" target="_blank" rel="noreferrer">Support</a>
                </div>
            </div>
        </footer>
      </div>
    </Shell>
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
  const [relays, setRelays] = useState<string[]>([]);
  const [isLoadingRelays, setIsLoadingRelays] = useState(true);

  // First effect: fetch relays asynchronously
  useEffect(() => {
    async function fetchRelays() {
      try {
        setIsLoadingRelays(true);
        const fetchedRelays = await window.ShogunRelays.forceListUpdate();

        console.log("Fetched relays:", fetchedRelays);

        // Use fetched relays, or fallback to default if empty
        const peersToUse =
          fetchedRelays && fetchedRelays.length > 0
            ? fetchedRelays
            : ["https://peer.wallie.io/gun"];

        setRelays(peersToUse);
      } catch (error) {
        console.error("Error fetching relays:", error);
        // Fallback to default peer
        setRelays(["https://peer.wallie.io/gun"]);
      } finally {
        setIsLoadingRelays(false);
      }
    }

    fetchRelays();
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
      <div className="flex items-center justify-center h-screen flex-col gap-4 bg-background text-on-surface">
        <span className="loading loading-lg text-primary"></span>
        <p className="text-secondary">
          {isLoadingRelays ? "Loading relays..." : "Initializing Shogun..."}
        </p>
      </div>
    );
  }

  return <ShogunApp shogun={sdk} />;
}

export default App;

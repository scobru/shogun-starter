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
import type { IGunInstance, ShogunCore } from "shogun-core";
import Gun from "gun";
import "gun/sea";
import "gun/axe";
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

// Main component that uses the auth context
const MainApp: React.FC = () => {
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
            <img src={logo} alt="Shogun Starter" className="w-10 h-10" />
            <span className="font-heading">Shogun Starter</span>
          </div>
          <div className="flex items-center gap-4">
            <div className={`badge-custom ${isLoggedIn ? "success" : "error"}`}>
              <span className="badge-dot" />
              <span>{isLoggedIn ? "Authenticated" : "Not authenticated"}</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="app-main" id="main-content">
        <section className="mb-20">
          <h1 className="hero-title">
            Decentralized <br />
            <span className="text-primary italic">Innovation</span>
          </h1>
          <p className="hero-subtitle">
            A powerful, utility-first starter kit for building decentralized applications 
            with Shogun Core, GunDB, and modern web technologies.
          </p>
          
          <div className="terminal-card group">
            <span className="text-secondary">$</span>
            <span className="flex-1 ml-3 text-content">npm install shogun-starter</span>
            <button className="opacity-0 group-hover:opacity-60 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="inline-block">
               <ShogunButton />
            </div>
            <a href="https://github.com/scobru/shogun-starter" target="_blank" rel="noreferrer" className="btn-secondary-bloom">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </section>

        {/* Dynamic Content */}
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

interface ShogunAppProps {
  shogun: ShogunCore;
  options: any;
}

function ShogunApp({ shogun, options }: ShogunAppProps) {
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
        options={options}
        onLoginSuccess={handleLoginSuccess}
        onSignupSuccess={handleLoginSuccess}
        onError={handleError}
      >
        <Routes>
          <Route
            path="/"
            element={<MainApp />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ShogunButtonProvider>
    </Router>
  );
}

const DEFAULT_RELAYS = ["https://shogun-relay.scobrudot.dev/gun"];

const getInitialRelays = (): string[] => {
  try {
    const cached = localStorage.getItem("shogun-relays");
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error("Failed to parse cached relays:", error);
  }
  return DEFAULT_RELAYS;
};

function App() {
  const [shogunData, setShogunData] = useState<{
    core: ShogunCore;
    options: any;
  } | null>(null);
  // Initialize with cached relays for immediate startup
  const [relays, setRelays] = useState<string[]>(getInitialRelays);

  // Effect 1: Background relay update (Stale-While-Revalidate)
  useEffect(() => {
    async function updateRelays() {
      try {
        const fetchedRelays = await window.ShogunRelays.forceListUpdate();

        if (fetchedRelays && fetchedRelays.length > 0) {
          console.log("Updated relays:", fetchedRelays);
          localStorage.setItem("shogun-relays", JSON.stringify(fetchedRelays));
          setRelays(fetchedRelays);

        }
      } catch (error) {
        console.error("Error updating relays:", error);
        // Keep using existing relays (cache or default)
      }
    }

    updateRelays();
  }, []);

  // Effect 2: Initialize Shogun immediately using initial relays
  useEffect(() => {
    if (shogunData) return;

    const initShogun = async () => {
      const gun = Gun({
        peers: relays,
        localStorage: false,
        radisk: false,
      }) as IGunInstance;

      const result = await shogunConnector({
        appName: "Shogun Starter App",
        gunInstance: gun,
        web3: { enabled: true },
        webauthn: {
          enabled: true,
          rpName: "Shogun Starter App",
        },
        nostr: { enabled: true },
        zkproof: { enabled: true },
        showWebauthn: true,
        showNostr: true,
        showMetamask: true,
        showZkProof: true,
        enableGunDebug: import.meta.env.DEV,
        enableConnectionMonitoring: true,
        defaultPageSize: 20,
        connectionTimeout: 15000,
        debounceInterval: 100,
      });

      const { core: shogunCore } = result;

      // Add debug methods to window for testing (only in development)
      if (import.meta.env.DEV && typeof window !== "undefined") {
        setTimeout(() => {
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
            gun: shogunCore.gun,
            relays: relays,
          };

          window.gun = shogunCore.gun;
          window.shogun = shogunCore;
        }, 1000);
      }

      setShogunData({ core: shogunCore, options: result.options });
    };

    initShogun();
  }, []); // Run once on mount using initial relays

  // Effect 3: Sync Gun peers when relays change (handles race condition)
  useEffect(() => {
    if (shogunData?.core?.gun) {
      shogunData.core.gun.opt({ peers: relays });
    }
  }, [relays, shogunData]);


  if (!shogunData) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-4">
        <span className="loading loading-lg"></span>
        <p className="text-secondary">Initializing Shogun...</p>
      </div>
    );
  }

  return <ShogunApp shogun={shogunData.core} options={shogunData.options} />;
}

export default App;


import React from "react";
import { useShogun } from "shogun-button-react";

// Optimization: Define static content outside component to avoid recreation on every render
const features = [
  {
    title: "Utility-First Logic",
    desc: "Leverage the power of utility classes while maintaining a cohesive design system built for speed.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
  },
  {
    title: "Material 3 Aesthetic",
    desc: "High border radii, tonal surfaces, and adaptive color roles bringing the 'Papercraft' feel to the web.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  {
    title: "Accessible by Default",
    desc: "Colors and components are tested for contrast and screen reader compatibility. Build with confidence.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
  },
];

// Optimization: Use React.memo to prevent unnecessary re-renders when parent state updates
// (e.g. when "copied" state changes in MainApp)
const ExampleContent = React.memo(() => {
  const { isLoggedIn, userPub, username } = useShogun();

  if (!isLoggedIn) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="content-card p-8">
            <div className="card-icon">{f.icon}</div>
            <h3 className="text-xl font-bold mb-3 font-heading">{f.title}</h3>
            <p className="text-secondary text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="content-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-heading">User Profile</h2>
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-secondary font-bold">
                Username
              </span>
              <p className="text-xl font-medium">{username || "Anonymous"}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-secondary font-bold">
                Public Key
              </span>
              <p className="text-xs font-mono break-all bg-b1 p-3 rounded-xl mt-2 border border-white/5 opacity-70">
                {userPub}
              </p>
            </div>
          </div>
        </div>

        <div className="content-card p-8 bg-primary text-primary-content">
          <h2 className="text-2xl font-bold mb-6 font-heading">SDK Status</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg">System Active</p>
              <p className="opacity-80 text-sm">Shogun Core v6.9.4</p>
            </div>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            Everything is ready for your decentralized innovation. Start
            building your application logic now.
          </p>
        </div>
      </div>

      <div className="content-card p-10">
        <h2 className="text-2xl font-bold mb-8 font-heading text-center">
          Development Toolbox
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {["GunDB", "WebAuthn", "Nostr", "ZK Proofs"].map((tech) => (
            <div
              key={tech}
              className="p-4 rounded-2xl bg-white/5 border border-white/5"
            >
              <p className="font-bold">{tech}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

ExampleContent.displayName = "ExampleContent";

export default ExampleContent;

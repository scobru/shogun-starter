import React from 'react';
import { useShogun } from 'shogun-button-react';
import type { ShogunCore } from 'shogun-core';

/**
 * ExampleContent Component
 * 
 * This is a placeholder component that demonstrates how to use the Shogun SDK
 * after authentication. Replace this with your own application content.
 * 
 * The useShogun hook provides:
 * - isLoggedIn: boolean - whether user is authenticated
 * - userPub: string - user's public key
 * - username: string - user's username/alias
 * - logout: function - logout function
 * - sdk: ShogunCore instance - full SDK access
 */
const ExampleContent: React.FC = () => {
  const { isLoggedIn, userPub, username, sdk } = useShogun();

  const cardClasses = "bg-surface p-8 rounded-[28px] border border-outline/10 hover:border-primary/40 transition-colors shadow-elevation-1";
  const titleClasses = "text-2xl font-bold mb-4 font-display text-on-surface";
  const textClasses = "text-on-surface-variant mb-4";
  const codeClasses = "bg-surface-container-high text-primary px-2 py-1 rounded font-mono text-sm";

  if (!isLoggedIn) {
    return (
      <div className={cardClasses}>
        <div>
          <h2 className={titleClasses}>Welcome to Shogun Starter</h2>
          <p className={textClasses}>
            Please authenticate using the button above to access the application.
          </p>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary-container text-on-secondary-container">
            <span className="material-symbols-outlined">info</span>
            <span>This is example content. Replace this component with your own application logic.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Example: User Info Card */}
      <div className={cardClasses}>
        <div>
          <h2 className={titleClasses}>Example: User Information</h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-on-surface-variant">Username:</span>
              <p className="font-mono text-lg text-on-surface">{username || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-on-surface-variant">Public Key:</span>
              <p className="font-mono text-sm break-all text-on-surface">{userPub}</p>
            </div>
            <div>
              <span className="text-sm text-on-surface-variant">SDK Available:</span>
              <p className="font-mono text-on-surface">{sdk ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Example: SDK Usage */}
      <div className={cardClasses}>
        <div>
          <h2 className={titleClasses}>Example: SDK Access</h2>
          <p className={textClasses}>
            You can access the Shogun SDK through the <code className={codeClasses}>useShogun</code> hook.
          </p>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-primary-container text-on-primary-container mb-4">
            <span className="material-symbols-outlined">check_circle</span>
            <span>SDK is ready! You can now use GunDB, authentication, and other Shogun features.</span>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2 text-on-surface">Available SDK Methods:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-on-surface-variant">
              <li><code className={codeClasses}>sdk.gun</code> - GunDB instance for decentralized storage</li>
              <li><code className={codeClasses}>sdk.auth</code> - Authentication methods</li>
              <li><code className={codeClasses}>sdk.wallet</code> - Wallet management (if enabled)</li>
              <li><code className={codeClasses}>sdk.storage</code> - Storage utilities</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Example: Next Steps */}
      <div className={cardClasses}>
        <div>
          <h2 className={titleClasses}>Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-on-surface-variant">
            <li>Replace this <code className={codeClasses}>ExampleContent</code> component with your own application logic</li>
            <li>Use the <code className={codeClasses}>useShogun</code> hook to access authentication state and SDK</li>
            <li>Build your decentralized application using GunDB and Shogun features</li>
            <li>Customize the theme and styling in <code className={codeClasses}>src/index.css</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ExampleContent;

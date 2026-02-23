import React, { useState } from 'react';

interface CopyCommandProps {
  command: string;
}

export const CopyCommand: React.FC<CopyCommandProps> = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="terminal-card group relative">
      <span className="text-secondary select-none">$</span>
      <span className="flex-1 ml-3 text-content font-mono text-sm break-all">{command}</span>
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-2 rounded-md hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ml-2"
        aria-label={copied ? "Copied to clipboard" : "Copy command to clipboard"}
        title={copied ? "Copied!" : "Copy command"}
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
        )}
      </button>
    </div>
  );
};

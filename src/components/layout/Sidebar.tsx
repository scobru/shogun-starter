import React from 'react';
import { useShogun } from 'shogun-button-react';
import logo from '/logo.svg';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Sidebar: React.FC = () => {
  const { isLoggedIn, user } = useShogun();

  return (
    <aside className="w-[280px] h-full flex flex-col bg-surface border-r border-outline/20 hidden md:flex shrink-0">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
            <img src={logo} alt="Shogun" className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-on-surface font-bold text-lg leading-tight tracking-tight font-display">Shogun Starter</h1>
            <p className="text-primary text-xs font-medium">v1.0.0</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="px-3 py-2 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Getting Started</div>
          <a className="group flex items-center gap-3 px-4 py-3 rounded-full bg-secondary-container text-on-primary-container" href="#">
            <span className="material-symbols-outlined text-[20px] text-primary">rocket_launch</span>
            <span className="text-sm font-medium">Introduction</span>
          </a>
          <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span className="text-sm font-medium">Installation</span>
          </a>
          <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[20px]">palette</span>
            <span className="text-sm font-medium">Theming</span>
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <div className="px-3 py-2 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Components</div>
          <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[20px]">input</span>
            <span className="text-sm font-medium">Inputs</span>
          </a>
          <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[20px]">layers</span>
            <span className="text-sm font-medium">Surfaces</span>
          </a>
          <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[20px]">smart_button</span>
            <span className="text-sm font-medium">Actions</span>
          </a>
        </div>
      </nav>
      <div className="p-4 border-t border-outline/20 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface-container-high flex-1 overflow-hidden">
          {isLoggedIn ? (
            <>
              <div className="w-8 h-8 rounded-full bg-outline/30 overflow-hidden shrink-0">
                 <div className="w-full h-full flex items-center justify-center bg-primary text-on-primary">
                    {user?.alias ? user.alias[0].toUpperCase() : 'U'}
                 </div>
              </div>
              <div className="flex flex-col overflow-hidden">
                <p className="text-xs font-medium text-on-surface truncate">Logged in as</p>
                <p className="text-xs text-on-surface-variant truncate">{user?.alias || 'Unknown'}</p>
              </div>
            </>
          ) : (
             <div className="flex flex-col">
                <p className="text-xs font-medium text-on-surface">Guest</p>
                <p className="text-xs text-on-surface-variant">Please login</p>
             </div>
          )}
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
};

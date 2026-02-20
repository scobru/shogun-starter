import React from 'react';
import logo from '/logo.svg';
import { ThemeToggle } from '../ui/ThemeToggle';

interface MobileHeaderProps {
  onMenuClick?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="md:hidden flex items-center justify-between p-4 sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-outline/20">
      <button onClick={onMenuClick} className="text-on-surface p-1">
        <span className="material-symbols-outlined">menu</span>
      </button>
      <div className="flex items-center gap-2">
        <img src={logo} alt="Shogun" className="w-6 h-6" />
        <span className="font-bold text-lg text-primary font-display">Shogun Starter</span>
      </div>
      <ThemeToggle />
    </div>
  );
};

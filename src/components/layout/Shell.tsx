import React from 'react';
import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';

interface ShellProps {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-background text-on-surface overflow-hidden font-body">
      <Sidebar />
      <div className="flex-1 h-full flex flex-col relative overflow-hidden">
          <main className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth relative bg-background">
             <MobileHeader />
             <div className="max-w-[1200px] mx-auto p-6 lg:p-12">
                {children}
             </div>
          </main>
      </div>
    </div>
  );
};

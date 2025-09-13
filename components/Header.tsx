'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { MobileSidebar } from './MobileSidebar';

export function Header() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { actualTheme, direction, toggleTheme, toggleDirection } = useTheme();

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden">
        <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">File Explorer</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={`Switch to ${actualTheme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <span className="text-lg">{actualTheme === 'dark' ? '☀️' : '🌙'}</span>
              </button>
              
              {/* Direction Toggle */}
              <button
                onClick={toggleDirection}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={`Switch to ${direction === 'rtl' ? 'LTR' : 'RTL'} mode`}
              >
                <span className="text-lg">{direction === 'rtl' ? '↔️' : '🔀'}</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
      />
    </>
  );
}

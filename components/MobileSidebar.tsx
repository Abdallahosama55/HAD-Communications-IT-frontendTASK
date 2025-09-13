'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { actualTheme, direction, toggleTheme, toggleDirection } = useTheme();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
        shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out
        ${direction === 'rtl' ? 'right-0' : 'left-0'}
        ${isOpen ? 'translate-x-0' : direction === 'rtl' ? 'translate-x-full' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">File Explorer</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 mb-8">
            <Link 
              href="/" 
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 hover:text-blue-700 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200 group"
              onClick={onClose}
            >
              <span className="text-lg mr-3 group-hover:scale-110 transition-transform">📁</span>
              My Files
            </Link>
            <Link 
              href="/recent" 
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 hover:text-blue-700 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200 group"
              onClick={onClose}
            >
              <span className="text-lg mr-3 group-hover:scale-110 transition-transform">🕒</span>
              Recent Files
            </Link>
          </nav>

          {/* Settings */}
          <div className="mt-auto space-y-4">
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Settings</h3>
              
              {/* Theme Toggle */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-sm">{actualTheme === 'dark' ? '🌙' : '☀️'}</span>
                  <span className="text-xs font-medium capitalize">{actualTheme}</span>
                </button>
              </div>

              {/* Direction Toggle */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Direction</span>
                <button
                  onClick={toggleDirection}
                  className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-sm">{direction === 'rtl' ? '🔀' : '↔️'}</span>
                  <span className="text-xs font-medium uppercase">{direction}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

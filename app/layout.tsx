import type { ReactNode } from 'react';
import Link from 'next/link';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/Header';
import { SidebarControls } from '@/components/SidebarControls';
import './globals.css';

export const metadata = {
  title: 'File Explorer',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <ThemeProvider>
          {/* Mobile Header */}
          <Header />

          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex lg:w-64 xl:w-72 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-gray-200/60 dark:border-gray-700/60 p-4 flex-col gap-4 shadow-xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">File Explorer</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage your files and folders</p>
            </div>
            <nav className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 hover:text-blue-700 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200 group"
              >
                <span className="text-lg mr-3 group-hover:scale-110 transition-transform">📁</span>
                My Files
              </Link>
              <Link 
                href="/recent" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 hover:text-blue-700 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200 group"
              >
                <span className="text-lg mr-3 group-hover:scale-110 transition-transform">🕒</span>
                Recent Files
              </Link>
            </nav>
            
            {/* Settings Section */}
            <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Settings</h3>
              <SidebarControls />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="min-h-screen p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

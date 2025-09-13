'use client';

import { useState } from 'react';
import { getAllFiles } from '@/lib/data';
import { FolderList } from './FolderList';
import { useTranslation } from '@/hooks/useTranslation';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { t } = useTranslation();

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const allFiles = getAllFiles();
    const results = allFiles.filter(file =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder={t('searchFiles')}
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      
      {isSearching && (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-2xl mr-3">🔍</span>
            {t('searchResults')}
            {searchResults.length > 0 && (
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-3 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {searchResults.length} {searchResults.length === 1 ? t('result') : t('results')}
              </span>
            )}
          </h3>
          {searchResults.length > 0 ? (
            <FolderList nodes={searchResults} />
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-60">🔍</div>
              <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('noFilesFound')}</h4>
              <p className="text-gray-500 dark:text-gray-400">{t('noFilesMatch')} "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

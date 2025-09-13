'use client';

import { findFolder } from '@/lib/data';
import { CreateFolderButton } from '@/components/CreateFolderButton';
import { CreateFileButton } from '@/components/CreateFileButton';
import { FolderList } from '@/components/FolderList';
import { SearchBar } from '@/components/SearchBar';
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const folder = findFolder('root');
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Search Section */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
        <SearchBar />
      </div>

      {/* Main Content */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 px-6 py-8 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {folder?.name}
              </h1>
              <p className="text-blue-100 dark:text-blue-200 text-lg">
                {t('manageFiles')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <CreateFileButton parentId="root" />
              <CreateFolderButton parentId="root" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {folder && <FolderList nodes={folder.children} />}
        </div>
      </div>
    </div>
  );
}

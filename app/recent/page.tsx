import { getRecentFiles } from '@/lib/data';
import { FolderList } from '@/components/FolderList';

export default function RecentPage() {
  const recentFiles = getRecentFiles();
  
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Main Content */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 px-6 py-8 sm:px-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🕒</span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Recent Files</h1>
              <p className="text-purple-100 dark:text-purple-200 text-lg">
                {recentFiles.length} {recentFiles.length === 1 ? 'file' : 'files'} accessed recently
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {recentFiles.length > 0 ? (
            <FolderList nodes={recentFiles} />
          ) : (
            <div className="text-center py-16 lg:py-20">
              <div className="text-8xl mb-6 opacity-60">🕒</div>
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No recent files</h3>
              <p className="text-gray-500 dark:text-gray-400 text-lg">Files you access will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

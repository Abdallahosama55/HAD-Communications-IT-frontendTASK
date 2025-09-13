import Link from 'next/link';
import { getFolderPath } from '@/lib/data';

interface BreadcrumbProps {
  currentFolderId: string;
}

export function Breadcrumb({ currentFolderId }: BreadcrumbProps) {
  const path = getFolderPath(currentFolderId);
  
  if (path.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
      {path.map((folder, index) => (
        <div key={folder.id} className="flex items-center">
          {index > 0 && (
            <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {index === path.length - 1 ? (
            <span className="font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
              {folder.name}
            </span>
          ) : (
            <Link
              href={folder.id === 'root' ? '/' : `/folder/${folder.id}`}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg transition-all duration-200 font-medium"
            >
              {folder.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

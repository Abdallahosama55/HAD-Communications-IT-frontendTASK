import { findFolder } from '@/lib/data';
import { CreateFolderButton } from '@/components/CreateFolderButton';
import { CreateFileButton } from '@/components/CreateFileButton';
import { FolderList } from '@/components/FolderList';
import { Breadcrumb } from '@/components/Breadcrumb';

interface Props {
  params: { id: string };
}

export default function FolderPage({ params }: Props) {
  const folder = findFolder(params.id);
  if (!folder) {
    return <p>Folder not found</p>;
  }
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Breadcrumb */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-4">
        <Breadcrumb currentFolderId={params.id} />
      </div>

      {/* Main Content */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 px-6 py-8 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {folder.name}
              </h1>
              <p className="text-indigo-100 dark:text-indigo-200 text-lg">
                {folder.children.length} {folder.children.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <CreateFileButton parentId={params.id} />
              <CreateFolderButton parentId={params.id} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <FolderList nodes={folder.children} />
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { FolderNode, FileNode } from '@/lib/data';
import { FileViewer } from './FileViewer';
import { useTranslation } from '@/hooks/useTranslation';

function getFileIcon(fileName: string) {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return '📄';
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'webp':
    case 'svg':
      return '🖼️';
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'wmv':
    case 'flv':
      return '🎥';
    case 'mp3':
    case 'wav':
    case 'flac':
    case 'aac':
      return '🎵';
    case 'txt':
    case 'md':
      return '📝';
    case 'zip':
    case 'rar':
    case '7z':
      return '📦';
    case 'doc':
    case 'docx':
      return '📋';
    case 'xls':
    case 'xlsx':
      return '📊';
    case 'ppt':
    case 'pptx':
      return '📽️';
    default:
      return '📄';
  }
}

function isImageFile(fileName: string) {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(extension || '');
}

function isVideoFile(fileName: string) {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return ['mp4', 'avi', 'mov', 'wmv', 'flv'].includes(extension || '');
}

export function FolderList({ nodes }: { nodes: Array<FolderNode | FileNode> }) {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { t } = useTranslation();
  
  if (!nodes.length) {
    return (
      <div className="text-center py-16 lg:py-20">
        <div className="text-8xl mb-6 opacity-60">📁</div>
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('emptyFolder')}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-lg">{t('createFilesFolders')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
      {nodes.map((node) => {
        if (node.type === 'folder') {
          return (
            <Link
              key={node.id}
              href={`/folder/${node.id}`}
              className="group block p-6 border border-gray-200/60 dark:border-gray-700/60 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">📁</span>
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {node.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('folder')}</p>
                </div>
              </div>
            </Link>
          );
        }
        return (
          <div 
            key={node.id} 
            className="group block p-6 border border-gray-200/60 dark:border-gray-700/60 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl hover:border-green-300 dark:hover:border-green-500 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={() => {
              setSelectedFile(node);
              setIsViewerOpen(true);
            }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">{getFileIcon(node.name)}</span>
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {node.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {node.name.split('.').pop()?.toUpperCase() || 'FILE'}
                </p>
              </div>
              {isImageFile(node.name) && (
                <div className="w-full">
                  <img
                    src={`/${node.name}`}
                    alt={node.name}
                    className="w-full h-24 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600 group-hover:border-green-300 dark:group-hover:border-green-500 transition-colors"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
      {selectedFile && (
        <FileViewer
          file={selectedFile}
          isOpen={isViewerOpen}
          onClose={() => {
            setIsViewerOpen(false);
            setSelectedFile(null);
          }}
        />
      )}
    </div>
  );
}

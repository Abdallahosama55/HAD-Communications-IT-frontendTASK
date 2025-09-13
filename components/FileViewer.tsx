'use client';

import { useState } from 'react';

interface FileViewerProps {
  file: {
    id: string;
    name: string;
    type: 'file';
  };
  isOpen: boolean;
  onClose: () => void;
}

export function FileViewer({ file, isOpen, onClose }: FileViewerProps) {
  if (!isOpen) return null;

  const getFileExtension = (fileName: string) => {
    return fileName.split('.').pop()?.toLowerCase() || '';
  };

  const extension = getFileExtension(file.name);
  const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(extension);
  const isVideo = ['mp4', 'avi', 'mov', 'wmv', 'flv'].includes(extension);
  const isPdf = extension === 'pdf';

  const renderFileContent = () => {
    if (isImage) {
      return (
        <img
          src={`/${file.name}`}
          alt={file.name}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      );
    }

    if (isVideo) {
      return (
        <video
          src={`/${file.name}`}
          controls
          className="max-w-full max-h-full"
          onError={(e) => {
            (e.target as HTMLVideoElement).style.display = 'none';
          }}
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    if (isPdf) {
      return (
        <iframe
          src={`/${file.name}`}
          className="w-full h-full border-0"
          title={file.name}
        />
      );
    }

    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📄</div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Preview not available</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
          This file type cannot be previewed in the browser
        </p>
        <a
          href={`/${file.name}`}
          download={file.name}
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Download File
        </a>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {file.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          {renderFileContent()}
        </div>
      </div>
    </div>
  );
}

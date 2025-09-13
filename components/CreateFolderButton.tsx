'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

interface CreateFolderButtonProps {
  parentId?: string;
}

export function CreateFolderButton({ parentId = 'root' }: CreateFolderButtonProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
      >
        <span className="text-lg mr-2">📁</span>
        + {t('createFolder')}
      </button>
      {open && (
        <form
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const trimmed = name.trim();
            if (trimmed) {
              await fetch(`/api/folders/${parentId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: trimmed }),
              });
              router.refresh();
            }
            setOpen(false);
            setName('');
          }}
        >
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl space-y-6 min-w-96 max-w-md w-full">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('createFolderTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('createFolderDescription')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('folderName')}
              </label>
              <input
                autoFocus
                name="name"
                className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('enterFolderName')}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 font-semibold text-gray-700 dark:text-gray-300"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={!name.trim()}
              >
                {t('createFolder')}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

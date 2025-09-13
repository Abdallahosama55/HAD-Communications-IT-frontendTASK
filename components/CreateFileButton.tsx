'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

interface CreateFileButtonProps {
  parentId: string;
}

export function CreateFileButton({ parentId }: CreateFileButtonProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed && !file) return;

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    if (trimmed) {
      formData.append('name', trimmed);
    }

    try {
      await fetch(`/api/files/${parentId}`, {
        method: 'POST',
        body: formData,
      });
      router.refresh();
      setOpen(false);
      setName('');
      setFile(null);
    } catch (error) {
      console.error('Failed to create file:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20"
      >
        <span className="text-lg mr-2">📄</span>
        + {t('createFile')}
      </button>
      {open && (
        <form
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
          onSubmit={handleSubmit}
        >
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl space-y-6 min-w-96 max-w-md w-full">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('createFileTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('createFileDescription')}</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('fileName')}
                </label>
                <input
                  autoFocus
                  name="name"
                  className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('enterFileName')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('uploadFile')}
                </label>
                <input
                  type="file"
                  className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 dark:file:bg-green-900/30 file:text-green-700 dark:file:text-green-400 hover:file:bg-green-100 dark:hover:file:bg-green-900/50"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setName('');
                  setFile(null);
                }}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 font-semibold text-gray-700 dark:text-gray-300"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={!name.trim() && !file}
              >
                {t('createFile')}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

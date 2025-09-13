export const translations = {
  en: {
    // Navigation
    'fileExplorer': 'File Explorer',
    'myFiles': 'My Files',
    'recentFiles': 'Recent Files',
    'manageFiles': 'Manage your files and folders',
    
    // Actions
    'createFile': 'Create File',
    'createFolder': 'Create Folder',
    'searchFiles': 'Search files across all folders...',
    'searchResults': 'Search Results',
    'noFilesFound': 'No files found',
    'noFilesMatch': 'No files match',
    'result': 'result',
    'results': 'results',
    
    // File Types
    'folder': 'Folder',
    'file': 'File',
    'emptyFolder': 'This folder is empty',
    'createFilesFolders': 'Create files or folders to get started',
    'noRecentFiles': 'No recent files',
    'filesAccessAppear': 'Files you access will appear here',
    'filesAccessedRecently': 'files accessed recently',
    'fileAccessedRecently': 'file accessed recently',
    'item': 'item',
    'items': 'items',
    
    // Modals
    'createFileTitle': 'Create File',
    'createFileDescription': 'Upload a file or create a new one',
    'createFolderTitle': 'Create Folder',
    'createFolderDescription': 'Enter a name for the new folder',
    'fileName': 'File Name (optional)',
    'folderName': 'Folder Name',
    'uploadFile': 'Upload File',
    'enterFileName': 'Enter file name...',
    'enterFolderName': 'Enter folder name...',
    'cancel': 'Cancel',
    'previewNotAvailable': 'Preview not available',
    'fileTypeCannotPreview': 'This file type cannot be previewed in the browser',
    'downloadFile': 'Download File',
    
    // Settings
    'settings': 'Settings',
    'theme': 'Theme',
    'language': 'Language',
    'light': 'Light',
    'dark': 'Dark',
    'system': 'System',
    'english': 'English',
    'arabic': 'Arabic',
  },
  ar: {
    // Navigation
    'fileExplorer': 'مستكشف الملفات',
    'myFiles': 'ملفاتي',
    'recentFiles': 'الملفات الأخيرة',
    'manageFiles': 'إدارة ملفاتك ومجلداتك',
    
    // Actions
    'createFile': 'إنشاء ملف',
    'createFolder': 'إنشاء مجلد',
    'searchFiles': 'البحث في الملفات عبر جميع المجلدات...',
    'searchResults': 'نتائج البحث',
    'noFilesFound': 'لم يتم العثور على ملفات',
    'noFilesMatch': 'لا توجد ملفات تطابق',
    'result': 'نتيجة',
    'results': 'نتائج',
    
    // File Types
    'folder': 'مجلد',
    'file': 'ملف',
    'emptyFolder': 'هذا المجلد فارغ',
    'createFilesFolders': 'أنشئ ملفات أو مجلدات للبدء',
    'noRecentFiles': 'لا توجد ملفات حديثة',
    'filesAccessAppear': 'الملفات التي تصل إليها ستظهر هنا',
    'filesAccessedRecently': 'ملف تم الوصول إليه مؤخراً',
    'fileAccessedRecently': 'ملف تم الوصول إليه مؤخراً',
    'item': 'عنصر',
    'items': 'عناصر',
    
    // Modals
    'createFileTitle': 'إنشاء ملف',
    'createFileDescription': 'رفع ملف أو إنشاء ملف جديد',
    'createFolderTitle': 'إنشاء مجلد',
    'createFolderDescription': 'أدخل اسماً للمجلد الجديد',
    'fileName': 'اسم الملف (اختياري)',
    'folderName': 'اسم المجلد',
    'uploadFile': 'رفع ملف',
    'enterFileName': 'أدخل اسم الملف...',
    'enterFolderName': 'أدخل اسم المجلد...',
    'cancel': 'إلغاء',
    'previewNotAvailable': 'معاينة غير متاحة',
    'fileTypeCannotPreview': 'لا يمكن معاينة هذا النوع من الملفات في المتصفح',
    'downloadFile': 'تحميل الملف',
    
    // Settings
    'settings': 'الإعدادات',
    'theme': 'المظهر',
    'language': 'اللغة',
    'light': 'فاتح',
    'dark': 'داكن',
    'system': 'النظام',
    'english': 'الإنجليزية',
    'arabic': 'العربية',
  }
};

export function getTranslation(key: string, language: 'en' | 'ar'): string {
  return translations[language][key as keyof typeof translations['en']] || key;
}

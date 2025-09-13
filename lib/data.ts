export type FileNode = {
  id: string;
  name: string;
  type: "file";
  lastAccessed?: number;
};

export type FolderNode = {
  id: string;
  name: string;
  type: "folder";
  children: Array<FolderNode | FileNode>;
};

export const root: FolderNode = {
  id: "root",
  name: "root",
  type: "folder",
  children: [
    { 
      id: "folder-1", 
      name: "Documents", 
      type: "folder", 
      children: [
        { id: "file-1", name: "readme.txt", type: "file", lastAccessed: Date.now() - 86400000 },
        { id: "file-2", name: "project.pdf", type: "file", lastAccessed: Date.now() - 172800000 },
      ] 
    },
    { 
      id: "folder-2", 
      name: "Images", 
      type: "folder", 
      children: [
        { id: "file-3", name: "screenshot.png", type: "file", lastAccessed: Date.now() - 259200000 },
      ] 
    },
    { id: "file-4", name: "welcome.txt", type: "file", lastAccessed: Date.now() - 345600000 },
  ],
};

export function findFolder(
  id: string,
  current: FolderNode = root
): FolderNode | null {
  if (current.id === id) return current;
  for (const child of current.children) {
    if (child.type === "folder") {
      const result = findFolder(id, child);
      if (result) return result;
    }
  }
  return null;
}

export function findParentFolder(
  childId: string,
  current: FolderNode = root
): FolderNode | null {
  for (const child of current.children) {
    if (child.id === childId) return current;
    if (child.type === "folder") {
      const result = findParentFolder(childId, child);
      if (result) return result;
    }
  }
  return null;
}

export function getFolderPath(
  folderId: string,
  current: FolderNode = root,
  path: Array<{ id: string; name: string }> = []
): Array<{ id: string; name: string }> {
  if (current.id === folderId) {
    return [...path, { id: current.id, name: current.name }];
  }
  
  for (const child of current.children) {
    if (child.type === "folder") {
      const result = getFolderPath(folderId, child, [...path, { id: current.id, name: current.name }]);
      if (result.length > 0) return result;
    }
  }
  return [];
}

export function getAllFiles(current: FolderNode = root): FileNode[] {
  const files: FileNode[] = [];
  
  for (const child of current.children) {
    if (child.type === "file") {
      files.push(child);
    } else if (child.type === "folder") {
      files.push(...getAllFiles(child));
    }
  }
  
  return files;
}

export function getRecentFiles(limit: number = 10): FileNode[] {
  const allFiles = getAllFiles();
  return allFiles
    .filter(file => file.lastAccessed)
    .sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0))
    .slice(0, limit);
}

export function markFileAsAccessed(fileId: string, current: FolderNode = root): boolean {
  for (const child of current.children) {
    if (child.type === "file" && child.id === fileId) {
      child.lastAccessed = Date.now();
      return true;
    } else if (child.type === "folder") {
      if (markFileAsAccessed(fileId, child)) {
        return true;
      }
    }
  }
  return false;
}

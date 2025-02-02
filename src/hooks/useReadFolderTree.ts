import { readDir, stat } from '@tauri-apps/plugin-fs';
import { useEffect, useState } from 'react';

type FileInfo = {
  name: string;
  path: string;
  sizeBytes: number;
}

const readFolderTreeRecursive = async (folder: string): Promise<FileInfo[]> => {
  const results: FileInfo[] = [];
  const entries = await readDir(folder);

  for (const entry of entries) {
    const path = `${folder}/${entry.name}/`;
    console.log({ entry, path })
    if (entry.isDirectory) {
      results.concat(await readFolderTreeRecursive(path));
    } else if (entry.isFile) {
      const fileStats = await stat(path);
      results.push({ name: entry.name, path, sizeBytes: fileStats.size });

    }
  }
  return results;
}

export const useReadFolderTree = (folder: string | null): FileInfo[] | null => {
  const [allFiles, setAllFiles] = useState<FileInfo[] | null>(null);

  useEffect(() => {
    if (folder !== null) {


      console.time('read');
      readFolderTreeRecursive(folder).then((allEntries) => {
        console.timeEnd('read')
        console.log(allEntries);
        setAllFiles(allEntries);
      }).catch((err) => {
        console.timeEnd('read');
        console.error(err);
      });
    }
  }, [folder])

  return allFiles;
}
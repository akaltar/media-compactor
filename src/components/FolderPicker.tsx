import { open } from '@tauri-apps/plugin-dialog';
import { useCallback } from 'react';





export const FolderPicker = ({
    onFolder
}: { onFolder: (folder: string) => void }) => {

    const onButtonClick = useCallback(async () => {
        const folder = await open({ directory: true });
        if (folder !== null) {

            onFolder(folder);
        }
    }, [onFolder]);

    return <button onClick={onButtonClick} className="p-8 rounded-md text-md font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Open folder</button>
}
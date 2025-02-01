import React, { useState, useCallback } from "react";
import { Image, Trash2 } from "lucide-react";
import { CompressionOptions } from "./components/CompressionOptions";
import { DropZone } from "./components/DropZone";
import { ImageList } from "./components/ImageList";
import { DownloadAll } from "./components/DownloadAll";
import { useImageQueue } from "./hooks/useImageQueue";
import { DEFAULT_QUALITY_SETTINGS } from "./utils/formatDefaults";
import type {
  ImageFile,
  OutputType,
  CompressionOptions as CompressionOptionsType,
} from "./types";
import { FolderPicker } from "./components/FolderPicker";
import { Intro } from "./components/Intro";

export function App() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [outputType, setOutputType] = useState<OutputType>("webp");
  const [options, setOptions] = useState<CompressionOptionsType>({
    quality: DEFAULT_QUALITY_SETTINGS.webp,
  });

  const { addToQueue } = useImageQueue(options, outputType, setImages);

  const handleOutputTypeChange = useCallback((type: OutputType) => {
    setOutputType(type);
    if (type !== "png") {
      setOptions({ quality: DEFAULT_QUALITY_SETTINGS[type] });
    }
  }, []);

  const handleFilesDrop = useCallback(
    (newImages: ImageFile[]) => {
      // First add all images to state
      setImages((prev) => [...prev, ...newImages]);

      // Use requestAnimationFrame to wait for render to complete
      requestAnimationFrame(() => {
        // Then add to queue after UI has updated
        newImages.forEach((image) => addToQueue(image.id));
      });
    },
    [addToQueue]
  );

  const handleRemoveImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const handleClearAll = useCallback(() => {
    images.forEach((image) => {
      if (image.preview) {
        URL.revokeObjectURL(image.preview);
      }
    });
    setImages([]);
  }, [images]);

  const completedImages = images.filter(
    (img) => img.status === "complete"
  ).length;

  const [folder, setFolder] = useState<string | null>(null);

  const renderFolderPicker = folder === null;
  const renderProcessingStep = folder !== null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Intro />

        {
          renderFolderPicker ?
            (<div className="flex items-center justify-center mt-12">
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-medium text-xl">Choose a folder you want to compress</p>
                <FolderPicker onFolder={setFolder} />
              </div>
            </div>) : null
        }

        {
          renderProcessingStep ? (<p>Processing...</p>) : null
        }


      </div>
    </div>
  );
}

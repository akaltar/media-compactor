import React from "react";
import type { OutputType, CompressionOptions } from "../types";

interface CompressionOptionsProps {
  options: CompressionOptions;
  outputType: OutputType;
  onOptionsChange: (options: CompressionOptions) => void;
  onOutputTypeChange: (type: OutputType) => void;
}

export function CompressionOptions({
  options,
  outputType,
  onOptionsChange,
  onOutputTypeChange,
}: CompressionOptionsProps) {
  return (
    <div className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
          Output Format
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {(["avif", "jpeg", "jxl", "png", "webp"] as const).map((format) => (
            <button
              key={format}
              className={`px-4 py-2 rounded-md text-sm font-medium uppercase ${
                outputType === format
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => onOutputTypeChange(format)}
            >
              {format}
            </button>
          ))}
        </div>
      </div>

      {outputType !== "png" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quality: {options.quality}%
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={options.quality}
            onChange={(e) =>
              onOptionsChange({ quality: Number(e.target.value) })
            }
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}

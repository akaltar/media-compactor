import { Image } from "lucide-react";


export const Intro = () => {
  return (<div className="text-center mb-8">
    <div className="flex items-center justify-center gap-2 mb-4">
      <Image className="w-8 h-8 text-blue-500" />
      <h1 className="text-3xl font-bold">
        Media Compactor
      </h1>
    </div>
    <p className="text-gray-600 dark:text-gray-400">
      Automatically compress and convert your media library to the most efficient format to save disk space.
      Usually uses Jpeg XL for images, Planned: AV1 for videos
    </p>
  </div>)
}
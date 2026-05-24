"use client";
import { CameraPreview } from "@/app/_components/camera/CameraPreview";
import { useCamera } from "@/app/_lib/camera/useCamera";
import { useState } from "react";

const page = () => {
  const { videoRef, isReady, error, captureFrame } = useCamera();

  const [photos, setPhotos] = useState<string[]>([]);

  const handleCapture = async () => {
    const blob = await captureFrame();

    if (!blob) return;

    const url = URL.createObjectURL(blob);

    setPhotos((prev) => [...prev, url]);
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="p-4 space-y-4">
        <div className="w-[300px] h-[400px] bg-black overflow-hidden rounded">
          <CameraPreview videoRef={videoRef} />
        </div>

        <div>
          <p>Ready: {isReady ? "YES" : "NO"}</p>
          <p>Error: {error || "none"}</p>
        </div>

        <button
          onClick={handleCapture}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Capture
        </button>

        <div className="grid grid-cols-2 gap-2">
          {photos.map((photo: string, index: number) => (
            <img
              key={index}
              src={photo}
              alt={`capture-${index}`}
              className="w-35 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

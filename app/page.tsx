"use client";

import { useState } from "react";
import { CameraPreview } from "./_components/camera/CameraPreview";
import { useCamera } from "./_lib/camera/useCamera";

export default function Home() {
  const { videoRef, isReady, error, captureFrame } = useCamera();

  const [image, setImage] = useState<string | null>(null);

  const handleCapture = async () => {
    const blob = await captureFrame();

    if (!blob) return;

    const url = URL.createObjectURL(blob);

    setImage(url);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button
        onClick={async () => {
          const res = await fetch("/api/sessions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mode: "solo",
              shotCount: 4,
            }),
          });

          console.log(await res.json());
        }}
      >
        Create Session
      </button>

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

        {image && (
          <img src={image} alt="capture" className="w-[300px] rounded" />
        )}
      </div>
    </div>
  );
}

export async function createStrip(
  photos: string[]
) {
  const canvas = document.createElement("canvas");

  canvas.width = 600;
  canvas.height = 1800;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  let y = 50;

  for (const photo of photos) {
    const img = new Image();

    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.src = photo;
    });

    ctx.drawImage(
      img,
      50,
      y,
      500,
      350
    );

    y += 400;
  }

  return canvas.toDataURL("image/png");
}
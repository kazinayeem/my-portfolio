import { useState } from "react";
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDmJCrJLBiW8XiEA0xfzE_7JfHc7vC2KZ8",
});

// Helper to compress / resize image
async function compressBase64Image(
  base64: string,
  maxWidth = 1024,
  quality = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const scale = Math.min(maxWidth / img.width, 1);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("No canvas context");

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Use JPEG for smaller size (~1-2MB)
      const compressed = canvas.toDataURL("image/jpeg", quality);
      resolve(compressed);
    };
    img.onerror = (err) => reject(err);
  });
}

export function useGenerateImage() {
  const [loading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (title: string) => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `
Generate a professional, visually stunning 16:9 image for a project titled "${title}".
- Modern tech blog thumbnail or polished project illustration.
- Vibrant clean colors, subtle UI/code elements.
- Clear, engaging, suitable for web display.
`;

      const res = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: [prompt],
        config: { responseModalities: [Modality.TEXT, Modality.IMAGE] },
      });

      const parts = res.candidates?.[0]?.content?.parts || [];
      const imagePart = parts.find((p) => p.inlineData?.mimeType === "image/png");

      if (!imagePart?.inlineData?.data) throw new Error("No image returned");

      // Convert to base64 string
      const base64 = `data:image/png;base64,${imagePart.inlineData.data}`;

      // Compress / resize to ~1–2MB
      const compressed = await compressBase64Image(base64, 1024, 0.7);

      setImageBase64(compressed);
      return compressed;
    } catch (err: unknown) {
      console.error("Gemini AI error:", err);
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong generating the image.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateImage, imageBase64, loading, error };
}

import { useState } from "react";
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDmJCrJLBiW8XiEA0xfzE_7JfHc7vC2KZ8",
});

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
      const imagePart = parts.find(
        (p) => p.inlineData?.mimeType === "image/png"
      );

      if (!imagePart?.inlineData?.data) throw new Error("No image returned");

      const base64 = `data:image/png;base64,${imagePart.inlineData.data}`;
      setImageBase64(base64);
      return base64; // ✅ return immediately
    } catch (err: unknown) {
      console.error("Gemini AI error:", err);

      // Narrow the error to get the message safely
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong generating the blog content.");

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateImage, imageBase64, loading, error };
}

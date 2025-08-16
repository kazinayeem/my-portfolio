import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDmJCrJLBiW8XiEA0xfzE_7JfHc7vC2KZ8",
});

export function useProjectDescription() {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateDescription = async (title: string) => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `
You are a helpful and professional AI assistant. Generate a detailed, human-friendly, and rich-text-ready project description for the following project title:

Project Title: "${title}"

Instructions:
- Detect the language of the title (Bangla or English) and write the full description in that same language.
- Use that language consistently throughout — do not mix languages.
- Format the response as clean HTML suitable for Quill editor.
- Include introduction, features, benefits, emojis like ✅ 🚀 💡.
- Provide code if relevant with explanation.
- Do NOT include markdown or code block formatting.
`;

      const res = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [prompt],
      });

      const rawContent = res.candidates?.[0]?.content;
      const text =
        rawContent?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a description.";

      setDescription(text);
      return text; // ✅ return immediately
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

  return { generateDescription, description, loading, error };
}

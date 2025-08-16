import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDmJCrJLBiW8XiEA0xfzE_7JfHc7vC2KZ8",
});

export function useBlogContent() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async (title: string, description: string) => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `
You are a professional blog writer. Write a complete, engaging blog article based on the following inputs:

Title: "${title}"
Description: "${description}"

Instructions:
- Detect language (Bangla or English) and write the full blog in that same language.
- Use clear HTML output, suitable for Quill editor.
- Structure with <h2>, <h3>, <p>, <ul>, <li>, <strong>.
- Make it detailed, human-like, and well-formatted.
- Add examples, explanations, and benefits.
- Use emojis like ✅ 🚀 💡 to make it engaging.
- Do NOT use Markdown or code block formatting.
`;

      const res = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [prompt],
      });

      const rawContent = res.candidates?.[0]?.content;
      const text =
        rawContent?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a description.";

      setContent(text);
      return text;
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

  return { generateContent, content, loading, error };
}

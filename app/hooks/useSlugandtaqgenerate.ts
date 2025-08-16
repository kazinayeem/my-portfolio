import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDmJCrJLBiW8XiEA0xfzE_7JfHc7vC2KZ8",
});

export function useBlogMetadata() {
  const [loading, setLoading] = useState(false);
  const [categorySlug, setCategorySlug] = useState<string | null>(null);
  const [tags, setTags] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateMetadata = async (title: string, description: string) => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `
You are a professional blog assistant.
Based on the following title and description, generate:

1. A single category slug (in lowercase, dash-separated, no spaces).
2. A list of 3–6 relevant tags (comma-separated, lowercase, no hashtags).

Title: "${title}"
Description: "${description}"

Output strictly in JSON format:
{
  "categorySlug": "string",
  "tags": "comma, separated, keywords"
}
`;

      const res = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [prompt],
      });

      const rawContent = res.candidates?.[0]?.content;
      let text = rawContent?.parts?.[0]?.text;
      if (!text) throw new Error("Empty AI response");

      // Strip backticks and optional language identifiers
      text = text
        .trim()
        .replace(/^```(?:json)?/, "")
        .replace(/```$/, "")
        .trim();

      let data: { categorySlug: string; tags: string } | null = null;
      try {
        data = JSON.parse(text);
      } catch {
        console.warn("AI returned non-JSON after cleanup:", text);
      }

      if (data) {
        setCategorySlug(data.categorySlug);
        setTags(data.tags);
        return data;
      } else {
        throw new Error("Could not parse metadata");
      }
    } catch (err: unknown) {
      console.error("Gemini AI error:", err);

      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong generating blog metadata.");

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateMetadata, categorySlug, tags, loading, error };
}

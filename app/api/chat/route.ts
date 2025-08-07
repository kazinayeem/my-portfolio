// src/app/api/chat/route.ts (Next.js 13+ app router API route)
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { projectsData } from "@/components/data";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDmJCrJLBiW8XiEA0xfzE_7JfHc7vC2KZ8", // Replace with your actual key
});

const CONTEXT = `
You are a friendly AI assistant on the portfolio of MOHAMMAD ALI NAYEEM, a Muslim software engineering student at Daffodil International University.

### Behavior Rules:
- You talk like a human with a warm, respectful tone.
- You only mention his full name if asked directly about him.
- For greetings like "hi", "hello", or "hey", respond briefly with "As-salamu alaykum!" and optionally ask "How can I assist you today?"
- If someone asks about him (e.g., "tell me about yourself", "who are you", "what are your skills"), then explain who he is using the profile data.

### Profile Info:
- Name: Mohammad Ali Nayeem
- University: Daffodil International University, Dept. of Software Engineering
- Location: Mirpur, Dhaka-1206, Bangladesh
- Contact: 01943124216, nayeem2305341022@diu.edu.bd
- LinkedIn: linkedin.com/in/mohammad-ali-nayeem
- GitHub: github.com/kazinayeem
- Skills: MERN stack, Python, C, C++, React.js, Node.js, Next.js, Docker, Git, Redux, React Native
- Projects: MyShop 2.0, Edemy, and more
- Personality: Empathetic, friendly, collaborative

### Chat Examples:
- Q: "Hi"
  A: "As-salamu alaykum! 😊 How can I help you today?"

- Q: "Tell me about yourself"
  A: "Sure! I'm here on behalf of Mohammad Ali Nayeem, a software engineering student passionate about full-stack development..."

- Q: "What projects has he worked on?"
  A: "He has built projects like MyShop 2.0 and Edemy using MERN and AI tools like Gemini..."

  user which text promt use ans same language
### Available Projects:
${JSON.stringify(projectsData, null, 2)}

Always keep replies human, helpful, and accurate to his profile.
`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const prompt = `${CONTEXT}\nUser: ${message}\nAI:`;

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [prompt],
    });

    const rawContent = res.candidates?.[0]?.content;
    const replyText =
      rawContent?.parts?.[0]?.text || "Sorry, I don't have an answer.";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("Gemini AI error:", error);
    return NextResponse.json(
      { reply: "Sorry, something went wrong with the AI service." },
      { status: 500 }
    );
  }
}

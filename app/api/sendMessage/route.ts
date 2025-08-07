import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  const TELEGRAM_TOKEN = "8191114888:AAFEdFp10FeCS3HEFX54L7213nncXTulVvw";
  const CHAT_ID = "6526122156"; // ✅ Correct chat ID
  const text = `📬 New Message from Portfolio Website:\n\n👤 Name: ${name}\n📧 Email: ${email}\n📝 Message:\n${message}`;

  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    }
  );

  const result = await res.json();
  if (!res.ok || !result.ok) {
    console.error("Telegram API error:", result); // Debug
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

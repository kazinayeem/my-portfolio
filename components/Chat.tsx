"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { id: number; sender: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [partialReply, setPartialReply] = useState("");
  const [chatHeight, setChatHeight] = useState("75vh");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typing animation
  const typeReply = async (fullText: string) => {
    setPartialReply("");
    for (let i = 0; i < fullText.length; i++) {
      setPartialReply((prev) => prev + fullText[i]);
      await new Promise((r) => setTimeout(r, 15));
    }
    setMessages((prev) => [...prev, { id: Date.now(), sender: "ai", text: fullText }]);
    setPartialReply("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, partialReply]);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  // Fix: Adjust chat height on mobile when keyboard shows
  useEffect(() => {
    const updateHeight = () => {
      const height = window.innerHeight;
      if (height < 500) {
        setChatHeight("50vh");
      } else {
        setChatHeight("75vh");
      }
    };
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const sendMessage = async (overrideMessage?: string) => {
    const messageToSend = overrideMessage?.trim() || input.trim();
    if (!messageToSend) return;

    const userMessage = {
      id: Date.now(),
      sender: "user" as const,
      text: messageToSend,
    };

    setMessages((prev) => [...prev, userMessage]);

    if (!overrideMessage) setInput("");

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      });
      const data = await res.json();
      const aiReply = data.reply || "Sorry, I don't have an answer.";
      await typeReply(aiReply);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Error contacting AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 p-4 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 z-50 w-[90vw] max-w-md rounded-xl shadow-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col overflow-hidden"
            style={{ height: chatHeight }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-100 dark:bg-gray-800">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  Chat with AI
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ask about my portfolio or CV.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-red-600"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 0 && !partialReply && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Start the conversation...
                </p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[75%] text-sm whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && partialReply && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm max-w-[75%]">
                    {partialReply}
                    <motion.span
                      className="inline-block w-2 h-2 bg-current rounded-full ml-1"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t px-3 py-2 bg-gray-50 dark:bg-gray-800 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 px-3 py-2 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="px-3 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

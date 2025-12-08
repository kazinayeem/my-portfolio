"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { id: number; sender: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [partialReply, setPartialReply] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typing animation
  const typeReply = async (fullText: string) => {
    setPartialReply("");
    for (let i = 0; i < fullText.length; i++) {
      setPartialReply((prev) => prev + fullText[i]);
      await new Promise((r) => setTimeout(r, 15));
    }
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "ai", text: fullText },
    ]);
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

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

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

  const quickQuestions = [
    "Tell me about yourself",
    "What are your skills?",
    "Contact info?",
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 p-3 sm:p-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label={open ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-2 bottom-16 sm:bottom-20 sm:right-4 sm:left-auto z-50 sm:w-96 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col overflow-hidden"
            style={{ maxHeight: "calc(100vh - 120px)", height: "min(500px, 70vh)" }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-500 to-green-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-white">
                    AI Assistant
                  </h3>
                  <p className="text-xs text-green-100">
                    Ask about my portfolio
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-3 bg-gray-50 dark:bg-gray-800/50">
              {messages.length === 0 && !partialReply && (
                <div className="text-center py-4">
                  <Bot className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Hi! Ask me anything about Nayeem.
                  </p>
                  {/* Quick Questions */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(q)}
                        className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-500 hover:text-green-600 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                    </div>
                  )}
                  <div
                    className={`px-3 sm:px-4 py-2 rounded-2xl max-w-[80%] text-sm whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-md"
                        : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing indicator */}
              {loading && partialReply && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                    <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="px-3 sm:px-4 py-2 rounded-2xl rounded-bl-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm max-w-[80%] border border-gray-200 dark:border-gray-600">
                    {partialReply}
                    <motion.span
                      className="inline-block w-1.5 h-4 bg-green-500 ml-0.5"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    />
                  </div>
                </div>
              )}
              
              {/* Loading dots */}
              {loading && !partialReply && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                    <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center gap-1">
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-3 py-2 sm:px-4 sm:py-3 bg-white dark:bg-gray-900">
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-white border-0 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2 hidden sm:block">
                Press Ctrl+C to toggle chat
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

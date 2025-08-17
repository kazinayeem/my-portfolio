"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const motivationalQuotes = [
  {
    quote: "The best way to predict the future is to create it.",
    name: "Peter Drucker",
    title: "AI & ML Motivation",
  },
  {
    quote: "Artificial Intelligence is the new electricity.",
    name: "Andrew Ng",
    title: "AI & ML Motivation",
  },
  {
    quote:
      "Machine learning is a core, transformative way by which we’re rethinking everything.",
    name: "Sundar Pichai",
    title: "AI & ML Motivation",
  },
  {
    quote: "Data is the new oil. Harness it wisely.",
    name: "Unknown",
    title: "AI & ML Motivation",
  },
  {
    quote: "The science of today is the technology of tomorrow.",
    name: "Edward Teller",
    title: "AI & ML Motivation",
  },
  {
    quote: "Intelligence is the ability to adapt to change.",
    name: "Stephen Hawking",
    title: "AI & ML Motivation",
  },
];

export function MotivationSection() {
  return (
    <section className="relative h-[20rem] flex items-center justify-center bg-white/10 dark:bg-black/20 overflow-hidden rounded-md">
      <InfiniteMovingCards
        items={motivationalQuotes}
        direction="right"
        speed="slow"
      />
    </section>
  );
}

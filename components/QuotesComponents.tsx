"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const motivationalQuotes = [
  {
    quote: "When something is important enough, you do it even if the odds are against you.",
    name: "Elon Musk",
    title: "Build Relentlessly",
  },
  {
    quote: "The biggest risk is not taking any risk.",
    name: "Mark Zuckerberg",
    title: "Move Fast",
  },
  {
    quote: "Stay hungry, stay foolish.",
    name: "Steve Jobs",
    title: "Keep Curiosity",
  },
  {
    quote: "Success is a lousy teacher. It seduces smart people into thinking they can’t lose.",
    name: "Bill Gates",
    title: "Stay Humble",
  },
  {
    quote: "Our industry does not respect tradition. It only respects innovation.",
    name: "Satya Nadella",
    title: "Ship Innovation",
  },
  {
    quote: "Wear your failure as a badge of honor.",
    name: "Sundar Pichai",
    title: "Learn Out Loud",
  },
  {
    quote: "Play long-term games with long-term people.",
    name: "Naval Ravikant",
    title: "Long-Term Mindset",
  },
  {
    quote: "If you double the number of experiments you do per year, you’re going to double your inventiveness.",
    name: "Jeff Bezos",
    title: "Experiment More",
  },
  {
    quote: "The most important thing is stamina. You have to keep going.",
    name: "Jensen Huang",
    title: "Endurance Wins",
  },
  {
    quote: "Done is better than perfect.",
    name: "Sheryl Sandberg",
    title: "Bias for Action",
  },
  {
    quote: "Don’t compare your chapter 1 to someone else’s chapter 20.",
    name: "Patrick Collison",
    title: "Start Now",
  },
  {
    quote: "Culture eats strategy for breakfast.",
    name: "Peter Drucker",
    title: "Team First",
  },
  {
    quote: "Artificial Intelligence is the new electricity.",
    name: "Andrew Ng",
    title: "AI Energy",
  },
  {
    quote: "Be so good they can’t ignore you.",
    name: "Steve Martin",
    title: "Craft Mastery",
  },
  {
    quote: "Learning to write programs stretches your mind and helps you think better.",
    name: "Bill Gates",
    title: "Think in Code",
  },
  {
    quote: "জীবনকে সাহসের সাথে গ্রহণ করো; বাধা মানেই নতুন সুযোগ। (Embrace life with courage; every obstacle is a new opportunity.)",
    name: "Kazi Nazrul Islam",
    title: "Bangla Inspiration",
  },
  {
    quote: "Opportunities don’t happen. You create them.",
    name: "Chris Grosser",
    title: "Create Opportunity",
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    name: "Steve Jobs",
    title: "Lead with Innovation",
  },
];

export function MotivationSection() {
  return (
    <section className="relative h-[20rem] flex items-center justify-center bg-transparent dark:bg-transparent overflow-hidden rounded-md">
      <InfiniteMovingCards
        items={motivationalQuotes}
        direction="right"
        speed="slow"
  
      />
    </section>
  );
}

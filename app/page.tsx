"use client";
import { useEffect } from "react";
import About from "@/components/aboutme";
import Chat from "@/components/Chat";
import Contact from "@/components/contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/skills";
import { usePrefetch } from "@/lib/services/blogApi";

export default function Home() {
  const prefetchPosts = usePrefetch("getPosts");

  useEffect(() => {
    prefetchPosts({ page: 1, limit: 6 });
  }, [prefetchPosts]);

  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Chat />
    </main>
  );
}

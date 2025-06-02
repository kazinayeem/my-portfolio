// src/app/page.tsx
import About from "@/components/aboutme";
import Contact from "@/components/contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}

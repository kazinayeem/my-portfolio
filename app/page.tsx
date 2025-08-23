import About from "@/components/aboutme";
import Chat from "@/components/Chat";
import Contact from "@/components/contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/skills";
import { cn } from "@/lib/utils";
import ProjectsParallax from "@/components/ProjectsParallax";
import { MotivationSection } from "@/components/QuotesComponents";
import { GlobeDemo } from "@/components/GithubGlobe";

export default function Home() {
  return (
    <div className="relative min-h-screen min-w-full w-full bg-white dark:bg-black">
      {/* Grid background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Faded radial overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] dark:bg-black"></div>

      {/* Page content */}
      <main className="relative z-10">
        <Hero />

        <About />
        <Skills />
        <ProjectsParallax />
        <Projects />
        <MotivationSection />
        <GlobeDemo />
        <Contact />
        <Chat />
      </main>
    </div>
  );
}

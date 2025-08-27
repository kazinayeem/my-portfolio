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
    <div className="relative min-h-screen min-w-full w-full bg-white dark:bg-[#0B1120]">
      {/* Gradient background for dark mode */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#1a2336_1px,transparent_1px),linear-gradient(to_bottom,#1a2336_1px,transparent_1px)]",
          "dark:bg-gradient-to-b dark:from-[#0B1120] dark:via-[#0F162E] dark:to-[#1a2336]"
        )}
      />
      
      {/* Faded radial overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-gradient-to-b dark:from-[#0B1120] dark:via-[#0F162E] dark:to-[#1a2336]"></div>

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

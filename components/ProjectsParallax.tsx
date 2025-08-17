"use client";
import React from "react";

import { projectsParallaxData } from "@/app/utils/projectsParallaxData";
import { HeroParallax } from "./ui/hero-parallax";

export default function ProjectsParallax() {
  return (
    <section id="projects" className="relative">
      <HeroParallax products={projectsParallaxData} />
    </section>
  );
}

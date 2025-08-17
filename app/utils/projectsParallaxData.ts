// utils/projectsParallaxData.ts
import { projectsData } from "@/components/data";

export const projectsParallaxData = projectsData.map((p) => ({
  title: p.title,
  link: p.liveLink || p.githubLink || "#", // main click link
  githubLink: p.githubLink, // extra button
  demoLink: p.youtubeDemoLink || p.liveLink, // optional demo button
  thumbnail: p.imageSrc,
}));

"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function HeroBg() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: { color: { value: "transparent" } },
        particles: {
          number: { value: 40, density: { enable: true, area: 800 } },
          color: { value: "#a3a3a3" },
          opacity: { value: 0.2 },
          size: { value: 2 },
          move: { enable: true, speed: 0.5 },
          links: { enable: true, color: "#a3a3a3", opacity: 0.2 },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 w-full h-full z-0"
    />
  );
} 
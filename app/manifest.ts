import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mohammad Ali Nayeem",
    short_name: "Nayeem",
    theme_color: "#000000",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "/icons/apple-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/apple-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

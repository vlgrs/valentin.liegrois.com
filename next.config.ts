import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages — outputs the whole site to `out/`
  // as plain HTML/JS/CSS that Cloudflare's CDN can serve from the edge.
  output: "export",

  // Cloudflare Pages serves clean URLs better when each route is `/route/index.html`.
  trailingSlash: true,

  // No next/image optimizer in static export — Pages doesn't run a Node server.
  // The site doesn't use <Image> anyway; this is just a safety setting.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

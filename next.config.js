/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: { unoptimized: true },
  experimental: { serverActions: { allowedOrigins: ["*"] } },
  async rewrites() {
    return [
      { source: "/home",       destination: "/home.html"       },
      { source: "/about",      destination: "/about.html"      },
      { source: "/blog",       destination: "/blog.html"       },
      { source: "/med-school", destination: "/med-school.html" },
      { source: "/resources",  destination: "/resources.html"  },
    ];
  },
};
module.exports = nextConfig;

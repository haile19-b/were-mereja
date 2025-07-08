import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google user content
      'avatars.githubusercontent.com', // GitHub avatars (if you use those)
      'your-other-domains.com' // Any other domains you need
    ],
  },
};

export default nextConfig;

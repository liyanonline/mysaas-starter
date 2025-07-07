import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: false, // Disable Partial Prerendering
  },
};

export default nextConfig;

// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   experimental: {
//     ppr: false, // Disable Partial Prerendering
//     nodeMiddleware: true,
//     clientSegmentCache: true,
//   }
// };

// export default nextConfig;

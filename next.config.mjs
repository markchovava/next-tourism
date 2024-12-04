/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8003',
        pathname: '/assets/img/**',
      },
    ],
  },
  eslint:{ 
        ignoreDuringBuilds: true,
  },
  typescript: {
        ignoreBuildErrors: true,
  },
};

export default nextConfig;

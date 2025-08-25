/** @type {import('next').NextConfig} */
const backend = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_URL;

const nextConfig = {
  async rewrites() {
    if (!backend) return [];
    const destBase = backend.replace(/\/$/, '');
    return [
      {
        source: '/api/:path*',
        destination: `${destBase}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

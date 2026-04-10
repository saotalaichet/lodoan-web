/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'owner.ovenly.io' }],
        destination: '/owner/login',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
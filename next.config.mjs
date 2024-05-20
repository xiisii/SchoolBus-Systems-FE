/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NODE_ENV == 'staging' ? 'export' : undefined
};

export default nextConfig;

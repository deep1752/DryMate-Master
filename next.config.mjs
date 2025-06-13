/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    domains: ['127.0.0.1'], // Allow image loading from this host
  },
};

export default nextConfig;

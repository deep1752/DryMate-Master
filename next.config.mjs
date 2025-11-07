/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    domains: ['https://drymate-api.onrender.com'], // Allow image loading from this host
  },
};

export default nextConfig;

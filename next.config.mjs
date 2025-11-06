/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    domains: ['res.cloudinary.com', 'drymate-api.onrender.com'], // Allow image loading from these hosts
  },
  eslint: {
    // Don't fail the build on ESLint warnings
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

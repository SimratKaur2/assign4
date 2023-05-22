/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "pokeapi.co",
      "www.freepnglogos.com",
      "raw.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "www.svgrepo.com",
      "api.tv7guide.com",
      "mp-photos-cdn.azureedge.net",
      "babeleye.s3.eu-west-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",

    domains: [
      "www.svgrepo.com",
      "api.tv7guide.com",
      "mp-photos-cdn.azureedge.net",
      "babeleye.s3.eu-west-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;

// module.exports = {
//   /* config for next-optimized-images */
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     // loader: "akamai",
//     // path: "",
//     unoptimized: true,
//     domains: [
//       "www.svgrepo.com",
//       "api.tv7guide.com",
//       "mp-photos-cdn.azureedge.net",
//       "babeleye.s3.eu-west-1.amazonaws.com",
//     ],
//   },
//   // your config for other plugins or the general next.js here...
// };

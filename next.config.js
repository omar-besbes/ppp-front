/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      ...process.env.IMAGES_DOMAINS.split(",").filter(
        (domain) => domain !== ""
      ),
    ],
  },
};

module.exports = nextConfig;

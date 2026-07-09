/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/maize",
        permanent: false,
      },
    ]
  },
}

export default nextConfig

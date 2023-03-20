/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/juancamiloqhz/ai-workshop',
        permanent: false,
      },
    ]
  },
}

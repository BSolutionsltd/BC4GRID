/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
    },
    reactStrictMode: false,
    transpilePackages: ['crypto-js']

}

module.exports = nextConfig

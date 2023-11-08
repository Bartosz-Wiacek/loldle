/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        domains: ['ddragon.leagueoflegends.com'],
        unoptimized: true,
    },
}

module.exports = nextConfig

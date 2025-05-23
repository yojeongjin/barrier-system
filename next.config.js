/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public', // service worker 파일이 생성될 위치
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  distDir: '.next',
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[hash][ext][query]',
      },
    });
    return config;
  },
});

module.exports = nextConfig;

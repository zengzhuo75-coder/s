/** @type {import('next').NextConfig} */
const nextConfig = {
  // 推荐配置（适合大多数 App Router 项目）
  output: 'standalone',     // 这是 Vercel 推荐的配置

  // 如果你需要静态导出（可选）
  // output: 'export',

  // 解决 Leaflet 等客户端组件问题
  images: {
    unoptimized: true,      // 如果使用了 next/image
  },

  // 确保 React Leaflet 等客户端组件正常工作
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-leaflet': 'react-leaflet',
    };
    return config;
  },
};

module.exports = nextConfig;

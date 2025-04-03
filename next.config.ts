import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: 'https://docs.google.com/document/d/1ZcuRdbz4S0YNhIP8rr2sIUP1hg2KEjjzTgnUho8ATAs/edit?usp=sharing',
        permanent: true,
      },
      {
        source: '/guidelines',
        destination: 'https://docs.google.com/document/d/1ZcuRdbz4S0YNhIP8rr2sIUP1hg2KEjjzTgnUho8ATAs/edit?usp=sharing',
        permanent: true,
      }
    ]
  },
}

export default nextConfig;

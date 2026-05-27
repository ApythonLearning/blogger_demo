/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/.git/**",
        "**/.next/**",
        "**/node_modules/**",
        "**/pagefile.sys",
        "**/hiberfil.sys",
        "**/swapfile.sys",
        "**/$Recycle.Bin/**",
        "**/System Volume Information/**",
      ],
    };

    return config;
  },
};

export default nextConfig;

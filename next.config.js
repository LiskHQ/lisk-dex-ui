/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error:
      // "Module not found: Can't resolve 'fs'"
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      };
    }

    return {
      ...config,
      mode: 'development',
      devtool: 'eval-source-map',
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.(ts|tsx)?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'ts-loader',
                options: { transpileOnly: true },
              },
            ],
          },
        ],
      },
    };
  },
};

module.exports = nextConfig;

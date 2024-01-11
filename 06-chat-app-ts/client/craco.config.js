// craco.config.js
const CracoAliasPlugin = require('craco-alias');

module.exports = {
  webpack: {
    alias: {},
    plugins: [
      {
        plugin: CracoAliasPlugin,
        options: {
          aliases: {
            // Add your aliases here if needed
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "os": require.resolve("os-browserify/browser"),
    },
  },
};
